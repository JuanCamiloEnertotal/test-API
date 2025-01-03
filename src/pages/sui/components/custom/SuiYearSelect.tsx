import { cgmApi } from "@api/cmgApi";
import React, { useEffect, useState } from "react";

interface ano {
    id: number;
    descripcion: string;
}

interface SuiYearProps {
   onSelectChange: (value: string) => void;
}

export const SuiYearSelect: React.FC<SuiYearProps> = ({onSelectChange}) => {

    const [anos, setAnos] = useState<ano[]>([]);

    const getData = async() => {
        const { data } = await cgmApi.get('/sui/anos');
        setAnos(data);
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onSelectChange(e.target.value);
    }

    useEffect(() => {
        getData();
    },[] );  


  return (
    <>
      <label>Año:</label>
      <select id="inputStatus" className="form-select" onChange={handleSelectChange}>
        <option value={Number(0)} >Seleccione</option>
        {
            anos.map( option => (
                <option key={option.id} value={option.id}>{option.descripcion}</option>
            ))
        }
       </select>
    </>
  )
}
