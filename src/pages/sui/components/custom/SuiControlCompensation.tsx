import { cgmApi } from "@api/cmgApi";
import { useEffect, useState } from "react";

interface Control {
    tc1: number;
    cs2: number;
    consumos: number;
    cargos: number;
    cdi: number;
}

interface SuiControlCompensationProps {
    ano: number;
    mes: string;
    mercado: number;
    setValidProcess: (valid: boolean) => void;
}

export const SuiControlCompensation = ({ ano, mes, mercado, setValidProcess }: SuiControlCompensationProps) => {

    const [data, setData] = useState<Control>();

    const getData = async (ano: number, mes: string, mercado: number) => {

        if(ano === 0 || mes === '' || mercado === 0) return;
        
        const {data} = await cgmApi.get(`/sui/variables/compensacion?anio=${ano}&mes=${mes}&mercado=${mercado}`);   
        setData(data);
    }

    const validProcess = (data: Control) => {


        if(data?.tc1 === 0 || data?.cs2 === 0 || data?.consumos === 0 || data?.cargos === 0 || data?.cdi === 0){
            setValidProcess(true);
        } else if(data?.tc1 === undefined || data?.cs2 === undefined || data?.consumos === undefined || data?.cargos === undefined || data?.cdi === undefined) {
            setValidProcess(true);
        } else {
            setValidProcess(false);
        }
    }

    useEffect(() => {
        getData(ano, mes, mercado);
    }, [ano, mes, mercado])

    useEffect(() => {
        validProcess(data!);
    });



  return (
    <>
        <div className="row row-cols-1 row-cols-md-3 row-cols-xl-5 g-0 row-group text-center border-top">
                <div className="col">
                    <div className="p-3">
                        <h5 className="mb-0">TC1</h5>
                        <small className="mb-0">
                            {
                                (data?.tc1 === 0 || data?.tc1 === undefined) 
                                ? <img src="/src/assets/images/icons/cancel.png" style={{height:15}} />
                                : <img src="/src/assets/images/icons/checked.png" style={{height:15}} />
                                
                            }
                            <span>
                                <i className="bx bx-right-arrow-alt align-middle"></i> {data?.tc1}
                            </span>
                        </small>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3">
                        <h5 className="mb-0">CS2</h5>
                        <small className="mb-0">
                            {
                                (data?.cs2 === 0 || data?.cs2 === undefined) 
                                ? <img src="/src/assets/images/icons/cancel.png" style={{height:15}} />
                                : <img src="/src/assets/images/icons/checked.png" style={{height:15}} />
                                
                            }
                            <span>
                                <i className="bx bx-right-arrow-alt align-middle"></i> {data?.cs2}
                            </span>
                        </small>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3">
                        <h5 className="mb-0">CONSUMOS</h5>
                        <small className="mb-0">
                            {
                                (data?.consumos === 0 || data?.consumos === undefined) 
                                ? <img src="/src/assets/images/icons/cancel.png" style={{height:15}} />
                                : <img src="/src/assets/images/icons/checked.png" style={{height:15}} />
                                
                            }
                            <span>
                                <i className="bx bx-right-arrow-alt align-middle"></i> {data?.consumos}
                            </span>
                        </small>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3">
                        <h5 className="mb-0">CARGOS DT</h5>
                        <small className="mb-0">
                            {
                                (data?.cargos === 0 || data?.cargos === undefined) 
                                ? <img src="/src/assets/images/icons/cancel.png" style={{height:15}} />
                                : <img src="/src/assets/images/icons/checked.png" style={{height:15}} />
                                
                            }
                            <span>
                                <i className="bx bx-right-arrow-alt align-middle"></i> {data?.cargos}
                            </span>
                        </small>
                    </div>
                </div>
                <div className="col">
                    <div className="p-3">
                        <h5 className="mb-0">CDI</h5>
                        <small className="mb-0">
                            {
                                (data?.cdi === 0 || data?.cdi === undefined) 
                                ? <img src="/src/assets/images/icons/cancel.png" style={{height:15}} />
                                : <img src="/src/assets/images/icons/checked.png" style={{height:15}} />
                                
                            }
                            <span>
                                <i className="bx bx-right-arrow-alt align-middle"></i> {data?.cdi}
                            </span>
                        </small>
                    </div>
                </div>
        </div>
    </>
  )
}
