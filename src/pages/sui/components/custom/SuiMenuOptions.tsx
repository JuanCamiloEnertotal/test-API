
import { useSuiStore } from "@root/stores/sui/sui.store";


import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';


interface SuiMenuOptionsProps {
    tipoFormato: string;
    anio: number;
    mes: string;
    mercado: number;

}


export const SuiMenuOptions = ({ tipoFormato, anio, mes, mercado }: SuiMenuOptionsProps) => {

    const eliminarFormatoSui = useSuiStore(state => state.eliminarFormatoSui);





    const handleDelete = () => {
        if (tipoFormato === '' || anio === 0 || mes === '' || mercado === 0) {
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
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {

                    await eliminarFormatoSui(tipoFormato, anio, mes, mercado);


                    Swal.fire(
                        'Eliminado!',
                        `Formato Sui Eliminado`,
                        'success'
                    )

                } catch (error) {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: `Ocurrio un error al eliminar el formato ${error}`,
                    });


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
                                <img src="/src/assets/images/icons/delete32.png" alt="" />
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
