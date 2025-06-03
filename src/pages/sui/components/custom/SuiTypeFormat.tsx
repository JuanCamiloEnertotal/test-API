
interface SuiTypeFormatProps {
  onSelectChange: (value: string) => void;
}

export const SuiTypeFormat: React.FC<SuiTypeFormatProps> = ({ onSelectChange }) => {

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(e.target.value);
  }

  return (
    <>
      <label>Tipo Formato:</label>
      <select id="inputStatus" className="form-select" onChange={handleSelectChange}>
        <option value=''>Seleccione</option>
        <option value='tc1'>Tc1</option>
        <option value='cs2' >Cs2</option>
        <option value='dt' >Cargos Dt</option>
        <option value='cdi' >Cargos CDI</option>
        <option value='cns' >Consumos</option>
        {/* <option value='reinicio' >Reinicio Variables</option> */}
      </select>
    </>
  )
}
