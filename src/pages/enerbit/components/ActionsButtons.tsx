import { useEnerbitStore } from "@root/stores/enerbit/enerbit.store"
import Swal from "sweetalert2";

export const ActionsButtons = () => {
    const openModalBorder = useEnerbitStore(state => state.abrirModalFrontera);
    const openModalExport = useEnerbitStore(state => state.abrirModalExportarDatos);
    const lecturaMasivaFronteras = useEnerbitStore(state => state.lecturaMasivaFronteras);
    const listadoFronteras = useEnerbitStore(state => state.listadoFronteras);
    const spinner = useEnerbitStore(state => state.spinner);
    const mostrarSpinner = useEnerbitStore(state => state.mostrarSpinner);




    const ejecutarProcesoLectura = async () => {
        Swal.fire({
            title: "Deseas ejecutar el proceso?",
            text: "Este proceso puede demorar dependiendo de la cantidad de fronteras!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, ejecutar proceso!",
            cancelButtonText: "No, cancelar!"
        }).then(async (result) => {
            if (result.isConfirmed) {

                mostrarSpinner(true);
                const respuesta = await lecturaMasivaFronteras();

                // console.log(respuesta)

                await listadoFronteras();

                (respuesta.process === 'ok') ? Swal.fire('Descarga de Datos', 'se ejecuto exitosamente el proceso', 'success')
                    : (respuesta.process === 'running') ? Swal.fire('Descarga de Datos', 'Ya existe una tarea ejecutandose', 'warning')
                        : Swal.fire('Descarga de Datos', 'se presento un error al descargar los datos desde el API de Enerbit', 'error')

                mostrarSpinner(false);

            }
        });

    }
    return (
        <>
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className="btn btn-outline-secondary" onClick={() => openModalExport()}>
                    <i className="bx bx-download"></i>
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => openModalBorder("nuevo")}>
                    <i className="bx bx-user-plus"></i>
                </button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => ejecutarProcesoLectura()} disabled={spinner}>
                    <i className="bx bx-terminal"></i>
                </button>
            </div>
        </>
    )
}
