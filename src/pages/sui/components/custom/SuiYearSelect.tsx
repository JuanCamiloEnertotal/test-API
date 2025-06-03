import { useSuiStore } from "@root/stores/sui/sui.store";
import React, { useEffect } from "react";



interface SuiYearProps {
  onSelectChange: (value: string) => void;
}

export const SuiYearSelect: React.FC<SuiYearProps> = ({ onSelectChange }) => {

  const anios = useSuiStore(state => state.anios);
  const listarAnios = useSuiStore(state => state.listarAnios);

  const getData = async () => {
    listarAnios();
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(e.target.value);
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <>
      <label>Año:</label>
      <select id="inputStatus" className="form-select" onChange={handleSelectChange}>
        <option value={Number(0)} >Seleccione</option>
        {
          anios.map(option => (
            <option key={option.id} value={option.id}>{option.descripcion}</option>
          ))
        }
      </select>
    </>
  )
}
