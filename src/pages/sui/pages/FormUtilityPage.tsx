
import { cgmApi } from "@root/api/cmgApi";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';
import { ProcessResponse } from "../types";



export const FormUtilityPage = () => {


    const handleClick = async () => {
        try {

            const { data } = await cgmApi.get<ProcessResponse>(`/sui/compensacion/cargos/unificar`);

            if (data.ok) {
                Swal.fire({
                    title: '¡Excelente!',
                    text: 'El archivo se ha unificado correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Error al subir el archivo, verifique que la ruta exista',
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error al subir el archivo, verifique que la ruta exista',
            });
        }



    }

    return (
        <>
            <div className="page-wrapper">
                <div className="page-content">
                    <div className="row">
                        <div className="col-12 col-lg-12 d-flex">
                            <div className="card radius-10 w-100">
                                <div className="card-header">
                                    <div className="d-flex align-items-center">
                                        <div>
                                            <h6 className="mb-0">Unificar Archivos CREG 015</h6>
                                        </div>



                                    </div>
                                </div>
                                <div className="card-body">

                                    <button className="btn btn-primary" title="Cargar archivo" onClick={handleClick}>
                                        Unificar
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </>
    )
}
