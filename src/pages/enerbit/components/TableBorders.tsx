import { useEffect } from "react";
import { useEnerbitStore } from "@root/stores/enerbit/enerbit.store";
import { Border } from "../types";


export const TableBorders = () => {
    const listadoFronteras = useEnerbitStore(state => state.listadoFronteras);
    const estadoFrontera = useEnerbitStore(state => state.cambiarEstadoFrontera);
    const openModalBorder = useEnerbitStore(state => state.abrirModalFrontera);
    const fronteras = useEnerbitStore(state => state.fronteras);
    const setFrontera = useEnerbitStore(state => state.setFrontera);


    const actualizarFrontera = (border: Border) => {
        setFrontera(border);
        openModalBorder("editar");
    }


    const cambiarEstadoFrontera = (border: Border) => {
        estadoFrontera(border);
    }

    useEffect(() => {

        const fetchBorders = async () => {
            try {
                await listadoFronteras(fronteras.paginaActual);
            } catch (error) {
                console.error("Error al obtener los borders:", error);
            }
        };

        fetchBorders();

    }, [])
    return (
        <>

            {fronteras.datos?.length === 0 ? (<div className="alert alert-warning">No hay fronteras registradas</div>) :
                (
                    <table className="table mb-0 table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Sic</th>
                                <th scope="col">Producto</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Medidor</th>
                                <th scope="col">Fecha Inicio</th>
                                <th scope="col">Ultima Lectura</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                fronteras.datos?.map((border: Border, index: number) => (
                                    <tr key={index}>
                                        <td>{border.sic}</td>
                                        <td>{border.producto}</td>
                                        <td>{border.nombre}</td>
                                        <td>{border.medidor}</td>
                                        <td>{border.fechaInicio.toString()}</td>
                                        <td>{border.ultimaLectura.toString()}</td>
                                        <td>
                                            <button className={`btn ${border.estado === 'A' ? "btn-success" : "btn-danger"}`} onClick={() => cambiarEstadoFrontera(border)}>
                                                {border.estado === 'A' ? "Activo" : "Inactivo"}
                                            </button>
                                        </td>
                                        <td>
                                            <div className="d-flex justify-content-evenly">
                                                <button type="button" className="btn btn-outline-warning" onClick={() => { actualizarFrontera(border) }}>
                                                    <i className="bx bx-edit-alt me-0"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                )
            }


        </>
    )
}
