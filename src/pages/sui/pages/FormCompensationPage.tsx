
import { SuiAlertMessage, SuiMenuOptions, SuiMonthSelect, SuiOperatorSelect, SuiYearSelect, SuiControlFormat, SuiControlCompensation } from "@sui/components/custom";
import { useState } from "react";


import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';
import { useSuiStore } from "@root/stores/sui/sui.store";


export const FormCompensationPage = () => {

    const exportarCompensacion = useSuiStore(state => state.exportarCompensacion);

    const calcularCompensacion = useSuiStore(state => state.calcularCompensacion);
    const loading = useSuiStore(state => state.loading)
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedOperator, setSelectedOperator] = useState<string>('');


    const validaCompensacion = useSuiStore(state => state.validaCompensacion);

    const handleSelectYear = (value: string) => {
        setSelectedYear(value);
    }

    const handleSelectMonth = (value: string) => {
        setSelectedMonth(value);
    }

    const handleSelectOperator = (value: string) => {
        setSelectedOperator(value);
    }

    const handleExcel = async (anio: number, mes: string, mercado: number) => {

        if (anio === 0 || mes === '' || mercado === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes seleccionar los parametros para descargar el archivo!',
            })
            return;
        }

        try {

            await exportarCompensacion(anio, mes, mercado);

            Swal.fire({
                title: '¡Excelente!',
                text: 'El archivo se ha descargado correctamente.',
                icon: 'success',
                confirmButtonText: 'Cerrar'
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Error al descargar el archivo ${error}`,
            });

        }
    }


    const handleCalculateCompensation = async (anio: number, mes: string, idMercado: number) => {

        try {
            await calcularCompensacion(anio, mes, idMercado);

            Swal.fire({
                icon: 'success',
                title: '¡Genial!',
                text: `Compensaciones calculadas!`,
            });

        } catch (error) {

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${error}`,
            })
        }

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

                                        <SuiMenuOptions tipoFormato='compensacion' anio={Number(selectedYear)} mes={selectedMonth} mercado={Number(selectedOperator)} />

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
                                <SuiControlCompensation anio={Number(selectedYear)} mes={selectedMonth} mercado={Number(selectedOperator)} />
                            </div>
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-md-3 d-flex justify-content-center">
                            <button disabled={validaCompensacion} type="button" onClick={() => handleCalculateCompensation(Number(selectedYear), selectedMonth, Number(selectedOperator))} className="btn btn-primary px-5 radius-30">Calcular</button>
                            <button type="button" className="btn btn-outline-primary excelButton" onClick={() => handleExcel(Number(selectedYear), selectedMonth, Number(selectedOperator))}>
                                <i className="lni lni-cloud-download me-0"></i>
                            </button>
                        </div>
                    </div>

                    {
                        (loading) ? <SuiAlertMessage /> : null
                    }

                    <div className="row mt-5">

                        <SuiControlFormat tipoFormato='compensacion' anio={Number(selectedYear)} mercado={Number(selectedOperator)} />

                    </div>

                </div>
            </div>
        </>
    )
}
