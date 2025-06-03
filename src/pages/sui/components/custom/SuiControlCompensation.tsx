import { useSuiStore } from "@root/stores/sui/sui.store";
import { useEffect } from "react";


interface SuiControlCompensationProps {
    anio: number;
    mes: string;
    mercado: number;
}

export const SuiControlCompensation = ({ anio, mes, mercado }: SuiControlCompensationProps) => {


    const listarVariablesCompensacion = useSuiStore(state => state.listarVariablesCompensacion);
    const variablesCompensacion = useSuiStore(state => state.variablesCompensacion);


    const getData = async (anio: number, mes: string, mercado: number) => {

        if (anio === 0 || mes === '' || mercado === 0) return;

        await listarVariablesCompensacion(anio, mes, mercado)

    }


    useEffect(() => {
        getData(anio, mes, mercado);
    }, [anio, mes, mercado])


    return (
        <>
            <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-0 row-group text-center border-top">
                <div className="col">
                    <div className="p-3">
                        <h5 className="mb-0">TC1</h5>
                        <small className="mb-0">
                            {
                                (variablesCompensacion.tc1 === 0 || variablesCompensacion.tc1 === undefined)
                                    ? <img src="/src/assets/images/icons/cancel.png" style={{ height: 15 }} />
                                    : <img src="/src/assets/images/icons/checked.png" style={{ height: 15 }} />

                            }
                            <span>
                                <i className="bx bx-right-arrow-alt align-middle"></i> {variablesCompensacion.tc1}
                            </span>
                        </small>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3">
                        <h5 className="mb-0">CS2</h5>
                        <small className="mb-0">
                            {
                                (variablesCompensacion.cs2 === 0 || variablesCompensacion.cs2 === undefined)
                                    ? <img src="/src/assets/images/icons/cancel.png" style={{ height: 15 }} />
                                    : <img src="/src/assets/images/icons/checked.png" style={{ height: 15 }} />

                            }
                            <span>
                                <i className="bx bx-right-arrow-alt align-middle"></i> {variablesCompensacion.cs2}
                            </span>
                        </small>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3">
                        <h5 className="mb-0">CONSUMOS</h5>
                        <small className="mb-0">
                            {
                                (variablesCompensacion.consumos === 0 || variablesCompensacion.consumos === undefined)
                                    ? <img src="/src/assets/images/icons/cancel.png" style={{ height: 15 }} />
                                    : <img src="/src/assets/images/icons/checked.png" style={{ height: 15 }} />

                            }
                            <span>
                                <i className="bx bx-right-arrow-alt align-middle"></i> {variablesCompensacion.consumos}
                            </span>
                        </small>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3">
                        <h5 className="mb-0">CARGOS DT</h5>
                        <small className="mb-0">
                            {
                                (variablesCompensacion.cargos === 0 || variablesCompensacion.cargos === undefined)
                                    ? <img src="/src/assets/images/icons/cancel.png" style={{ height: 15 }} />
                                    : <img src="/src/assets/images/icons/checked.png" style={{ height: 15 }} />

                            }
                            <span>
                                <i className="bx bx-right-arrow-alt align-middle"></i> {variablesCompensacion.cargos}
                            </span>
                        </small>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3">
                        <h5 className="mb-0">CDI</h5>
                        <small className="mb-0">
                            {
                                (variablesCompensacion.cdi === 0 || variablesCompensacion.cdi === undefined)
                                    ? <img src="/src/assets/images/icons/cancel.png" style={{ height: 15 }} />
                                    : <img src="/src/assets/images/icons/checked.png" style={{ height: 15 }} />

                            }
                            <span>
                                <i className="bx bx-right-arrow-alt align-middle"></i> {variablesCompensacion.cdi}
                            </span>
                        </small>
                    </div>
                </div>
            </div>
        </>
    )
}
