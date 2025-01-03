import React from "react";

interface SuiMonthProps {
  onSelectChange: (value: string) => void;
}

export const SuiMonthSelect: React.FC<SuiMonthProps> = ({onSelectChange}) => {

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(e.target.value);
  }


  return (
    <>
        <label>Mes:</label>
        <select id="inputStatus" className="form-select" onChange={handleSelectChange}>
            <option value='' >Seleccione</option>
            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
        </select>     
    </>
  )
}
