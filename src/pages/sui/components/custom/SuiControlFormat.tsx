import { useSuiStore } from "@root/stores/sui/sui.store";
import { useEffect } from "react";



interface SuiControlFormatProps {
  tipoFormato: string;
  anio: number;
  mercado: number;
}

export const SuiControlFormat = ({ tipoFormato, anio, mercado }: SuiControlFormatProps) => {

  const formatosSui = useSuiStore(state => state.formatosSui);
  const controlFormatosSui = useSuiStore(state => state.controlFormatosSui);



  const getData = async (tipoFormato: string, anio: number, mercado: number) => {

    if (tipoFormato === '' || anio === 0 || mercado === 0) return;


    await controlFormatosSui(tipoFormato, anio, mercado);
  };

  useEffect(() => {
    getData(tipoFormato, anio, mercado);
  }, [tipoFormato, anio, mercado]);

  return (

    <>
      {

        formatosSui.map((control, index) => (
          <div className="col-md-2" key={index}>
            <div className="card">
              <div className="card-header text-center">{control.mes}</div>
              <div className="card-body text-center">
                {
                  (Number(control.total) === 0)
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
