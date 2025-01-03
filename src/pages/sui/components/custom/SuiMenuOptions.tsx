
import { cgmApi } from "@api/cmgApi";
import { AxiosRequestHeaders, isAxiosError } from "axios";

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';


interface SuiMenuOptionsProps {
    tipoFormato: string;
    ano: number;
    mes: string;
    mercado: number;
    setStatus: (status: boolean) => void;
}


export const SuiMenuOptions = ({ tipoFormato, ano, mes, mercado, setStatus}: SuiMenuOptionsProps) => {
  
    

    const handleDelete = () => {
        if(tipoFormato === '' || ano === 0 || mes === '' || mercado === 0)  {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Debes seleccionar los parametros a eliminar!',
              })
              return;
        } 
        
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
          }).then(async(result) => {
            if (result.isConfirmed) {
                    
                    try {
                        let response:AxiosRequestHeaders ;
                        
                        if(tipoFormato === 'cs2') {
                               response = await cgmApi.delete(`/sui/eliminar/formato?tipo=cs2&anio=${ano}&mes=${mes}&mercado=${mercado}`);                   
                               setStatus(true);
                               
                        } else if (tipoFormato === 'tc1') {
                               response = await cgmApi.delete(`/sui/eliminar/formato?tipo=tc1`);
                               setStatus(true);
                        } else if (tipoFormato === 'dt') {
                               response = await cgmApi.delete(`/sui/eliminar/formato?tipo=cargos&anio=${ano}&mes=${mes}&mercado=${mercado}`);
                               setStatus(true);
                        } else if (tipoFormato === 'cns') {
                               response = await cgmApi.delete(`/sui/eliminar/formato?tipo=consumos&anio=${ano}&mes=${mes}&mercado=${mercado}`);
                               setStatus(true);
                        } else if (tipoFormato === 'compensacion') {
                                response = await cgmApi.delete(`/sui/eliminar/formato?tipo=compensacion&anio=${ano}&mes=${mes}&mercado=${mercado}`);
                                setStatus(true);
                        } 
                        else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'El tipo de formato seleccionado no existe!',
                              })
                              return;
                        }
        
                        Swal.fire(
                            'Eliminado!',
                            `${response.data.mensaje}`,
                            'success'
                        )
                        
                    } catch (error) {
                       
                        if(isAxiosError(error)) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: `${error.response?.data?.message}`,
                              });
                        }
                        
                    }
                 
                }
          })
          
    }

   
  
  return (
    <>
    <div className="dropdown ms-auto">
                <a
                    className="dropdown-toggle dropdown-toggle-nocaret"
                    href="#"
                    data-bs-toggle="dropdown"
                >
                    <i className="bx bx-dots-horizontal-rounded font-22 text-option"></i>
                </a>
                <ul className="dropdown-menu">
                    <li>
                        <button className="dropdown-item text-center" onClick={handleDelete}>
                            <i>
                                <img src="/src/assets/images/icons/delete32.png" alt=""/>
                            </i>
                             
                        </button>       
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>

                </ul>
    </div>
    
    </>
  )
}
