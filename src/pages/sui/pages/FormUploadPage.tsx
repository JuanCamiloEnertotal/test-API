import { useSuiStore } from "@root/stores/sui/sui.store";
import { SuiYearSelect, SuiUploadFormat, SuiOperatorSelect, SuiTypeFormat, SuiMonthSelect, SuiAlertMessage, SuiMenuOptions, SuiControlFormat } from "@sui/components/custom"
import { useState } from "react";



export const FormUploadPage = () => {

    const loading = useSuiStore(state => state.loading);

    const [selectedTypeFormat, setSelectedTypeFormat] = useState<string>('');
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedOperator, setSelectedOperator] = useState<string>('');



    const handleSelectTypeFormat = (value: string) => {
        setSelectedTypeFormat(value);
    }

    const handleSelectYear = (value: string) => {
        setSelectedYear(value);
    }

    const handleSelectMonth = (value: string) => {
        setSelectedMonth(value);
    }

    const handleSelectOperator = (value: string) => {
        setSelectedOperator(value);
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
                                            <h6 className="mb-0">Cargar Formatos SUI</h6>
                                        </div>

                                        <SuiMenuOptions tipoFormato={selectedTypeFormat} anio={Number(selectedYear)} mes={selectedMonth} mercado={Number(selectedOperator)} />

                                    </div>
                                </div>
                                <div className="card-body">

                                    <div className="row">
                                        <div className="col-md-2">
                                            <SuiTypeFormat onSelectChange={handleSelectTypeFormat} />
                                        </div>
                                        <div className="col-md-2">
                                            <SuiYearSelect onSelectChange={handleSelectYear} />
                                        </div>

                                        <div className="col-md-2">
                                            <SuiMonthSelect onSelectChange={handleSelectMonth} />
                                        </div>
                                        <div className="col-md-6">
                                            <SuiOperatorSelect onSelectChange={handleSelectOperator} />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <SuiUploadFormat tipoFormato={selectedTypeFormat} ano={Number(selectedYear)} mes={selectedMonth} mercado={Number(selectedOperator)} />

                    {
                        (loading) ? <SuiAlertMessage /> : null
                    }

                    <div className="row mt-5">
                        {(selectedTypeFormat !== 'reinicio') &&
                            <SuiControlFormat tipoFormato={selectedTypeFormat} anio={Number(selectedYear)} mercado={Number(selectedOperator)} />
                        }
                    </div>


                </div>
            </div>
        </>
    )
}
