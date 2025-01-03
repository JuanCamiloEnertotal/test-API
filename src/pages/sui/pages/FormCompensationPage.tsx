import { cgmApi } from "@api/cmgApi";
import { SuiAlertMessage, SuiMenuOptions, SuiMonthSelect, SuiOperatorSelect, SuiYearSelect, SuiControlFormat, SuiControlCompensation } from "@sui/components/custom";
import { isAxiosError } from "axios";
import { useState } from "react";

import * as XLSX from "xlsx";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';
import { Compensacion } from "../types";

export const FormCompensationPage = () => {

    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedOperator, setSelectedOperator] = useState<string>('');
    const [status, setStatus] = useState(false);
    const [validProcess, setValidProcess] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSelectYear = (value: string) => {
        setSelectedYear(value);
    }

    const handleSelectMonth = (value: string) => {
        setSelectedMonth(value);
    }

    const handleSelectOperator = (value: string) => {
        setSelectedOperator(value);
    }

    const handleExcel = async (ano: number, mes: string, mercado: number) => {

        if (ano === 0 || mes === '' || mercado === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes seleccionar los parametros para descargar el archivo!',
            })
            return;
        }

        try {

            const { data } = await cgmApi.get(`sui/compensacion/consulta?anio=${ano}&mercado=${mercado}&mes=${mes}`);

            if (data.length === 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'No hay datos para descargar!',
                })
                return;
            }

            const cleanData = data.map((item: Compensacion) => ({
                ...item,
                cargoDt: Number(item.cargoDt),
                diug: Number(item.diug),
                diu: Number(item.diu),
                thc: Number(item.thc),
                hc: Number(item.hc),
                vcd: Number(item.vcd),
                fiug: Number(item.fiug),
                fium: Number(item.fium),
                cec: Number(item.cec),
                consumo: Number(item.consumo),
                total: Number(item.total)
            }));

            const libro = XLSX.utils.book_new();

            const hoja = XLSX.utils.json_to_sheet(cleanData);
            XLSX.utils.book_append_sheet(libro, hoja, "Compensaciones");

            setTimeout(() => {
                XLSX.writeFile(libro, `Compensaciones-${mercado}-${new Date().getTime()}.xlsx`);
            }, 1000);

            Swal.fire({
                title: '¡Excelente!',
                text: 'El archivo se ha descargado correctamente.',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            });

        } catch (error) {
            console.log(error);
            (isAxiosError(error) && error.response)
                ? Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                })
                : Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al descargar el archivo',
                });

        }
    }


    const handleCalculateCompensation = async (ano: number, mes: string, idMercado: number) => {


        try {

            setLoading(true);
            await cgmApi.post(`/sui/compensacion/calculo`, { anio: ano, mes: mes, mercado: idMercado });
            setLoading(false);
            setStatus(!status);

            Swal.fire({
                icon: 'success',
                title: '¡Genial!',
                text: `Compensaciones calculadas!`,
            });


        } catch (error) {
            setLoading(false);
            (isAxiosError(error) && error.response) ?
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                })
                : Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al calcular las compensaciones',
                })
        }


    }

    const getStatus = (status: boolean) => {

        setStatus(status);

        setTimeout(() => {
            setStatus(false);
        }, 1000)
    }

    // Obtiene el flag para conocer si las variable requeridas para compensar estan completas
    const getValidProcess = (valid: boolean) => {
        // (valid) ? console.log('inactivo') : console.log('activo');
        setValidProcess(valid);
    }

    return (
        <>
            <div className="page-wrapper">
                <div className="page-content">
                    <div className="row">
                        <div className="col-12 col-lg-12 d-flex">
                            <div className="card radius-10 w-100">
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <h6 className="mb-0">Calcular Compensacion</h6>
                                        </div>

                                        <SuiMenuOptions tipoFormato='compensacion' ano={Number(selectedYear)} mes={selectedMonth} mercado={Number(selectedOperator)} setStatus={getStatus} />

                                    </div>
                                </div>
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-md-2">
                                            <SuiYearSelect onSelectChange={handleSelectYear} />
                                        </div>

                                        <div className="col-md-2">
                                            <SuiMonthSelect onSelectChange={handleSelectMonth} />
                                        </div>

                                        <div className="col-md-8">
                                            <SuiOperatorSelect onSelectChange={handleSelectOperator} />
                                        </div>
                                    </div>

                                </div>
                                <SuiControlCompensation ano={Number(selectedYear)} mes={selectedMonth} mercado={Number(selectedOperator)} setValidProcess={getValidProcess} />
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-md-3 d-flex justify-content-center">
                            <button disabled={validProcess} type="button" onClick={() => handleCalculateCompensation(Number(selectedYear), selectedMonth, Number(selectedOperator))} className="btn btn-primary px-5 radius-30">Calcular</button>
                            <button type="button" className="btn btn-outline-primary excelButton" onClick={() => handleExcel(Number(selectedYear), selectedMonth, Number(selectedOperator))}>
                                <i className="lni lni-cloud-download me-0"></i>
                            </button>
                        </div>
                    </div>

                    {
                        (loading) ? <SuiAlertMessage /> : null
                    }

                    <div className="row mt-5">

                        <SuiControlFormat tipoFormato='compensacion' ano={Number(selectedYear)} mercado={Number(selectedOperator)} status={status} />

                    </div>

                </div>
            </div>
        </>
    )
}
