import { useSuiStore } from "@root/stores/sui/sui.store";
import { useEffect } from "react";



interface SuiOperatorSelectProps {
  onSelectChange: (value: string) => void;
}

export const SuiOperatorSelect: React.FC<SuiOperatorSelectProps> = ({ onSelectChange }) => {

  const mercados = useSuiStore((state) => state.mercados);
  const listarMercados = useSuiStore((state) => state.listarMercados);

  const getData = async () => {
    await listarMercados();
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
