import { cgmApi } from "@api/cmgApi";
import { useEffect, useState } from "react";

interface mercado {
    id: number,
    nombre: string
}

interface SuiOperatorSelectProps {
    onSelectChange: (value: string) => void;
}

export const SuiOperatorSelect: React.FC<SuiOperatorSelectProps> = ({onSelectChange}) => {

  const [mercados, setMercados] = useState<mercado[]>([]);

  const getData = async() => {
    const { data } = await cgmApi.get('/sui/mercados');
    setMercados(data);
  }  

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(e.target.value);
  }

  useEffect(() => {
    getData();
  }, []);
  

  return (
    <>
        <label>Mercado:</label>
        <select id="inputStatus" className="form-select" onChange={handleSelectChange}>
            <option value={Number(0)}>Seleccione</option>
            {
                mercados.map(option => (
                    <option key={option.id} value={option.id}>{option.nombre}</option>
                ))
            }
        </select> 
    </>
  )
}
