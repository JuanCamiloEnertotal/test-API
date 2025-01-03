import { cgmApi } from "@api/cmgApi";
import { useEffect, useState } from "react";


interface Control {
  mes: string;
  total: number;
}

interface SuiControlFormatProps {
  tipoFormato: string;
  ano: number;
  mercado: number;
  status: boolean;

}

export const SuiControlFormat = ({tipoFormato, ano, mercado, status}:SuiControlFormatProps) => {

  const [control, setControl] = useState<Control[]>([]);
  
  const getData = async(tipoFormato: string, ano: number, mercado: number) => {
    
    if(tipoFormato === '' || ano === 0 || mercado === 0) return;
    const { data } = await cgmApi.get(`/sui/${tipoFormato}/listar?anio=${Number(ano)}&mercado=${Number(mercado)}`);
    setControl(data);
  };

  useEffect(() => {
    getData(tipoFormato, ano, mercado);
  }, [status,tipoFormato, ano, mercado]);

  return (
    
    <>
      {

        control.map((control, index) => (
            <div className="col-md-2" key={index}>
                <div className="card">
                    <div className="card-header text-center">{control.mes}</div>
                    <div className="card-body text-center">
                        {
                          (Number(control.total) === 0 ) 
                          ? <img src="/src/assets/images/icons/cancel.png" />
                          : <img src="/src/assets/images/icons/checked.png" />
                        }
                    </div>
                    <div className="card-footer text-center">
                       <strong>{control.total}</strong>
                    </div>
                </div>
            </div>
        ))
      }
    </>

  )
}
