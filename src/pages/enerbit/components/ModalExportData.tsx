import { useEnerbitStore } from "@root/stores/enerbit/enerbit.store"
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as XLSX from "xlsx";



export const ModalExportData = () => {

    const showModal = useEnerbitStore(state => state.mostrarModalExportarDatos);
    const closeModal = useEnerbitStore(state => state.cerrarModalExportarDatos);
    const exportData = useEnerbitStore(state => state.exportarDatosLecturas);

    const formik = useFormik({
        initialValues: {
            fechaInicio: "",
            fechaFin: ""
        },
        onSubmit: async (formData) => {

            const datos = await exportData(formData.fechaInicio, formData.fechaFin);

            const libro = XLSX.utils.book_new();
            const hoja = XLSX.utils.json_to_sheet(datos);
            XLSX.utils.book_append_sheet(libro, hoja, "enerbit");

            setTimeout(() => {
                XLSX.writeFile(libro, `Matriz Consumos-${new Date().getTime()}.xlsx`);

            }, 1000)
        }
    })

    return (
        <>
            <Modal show={showModal} onHide={closeModal}>
                <form onSubmit={formik.handleSubmit}>
                    <Modal.Header>
                        <Modal.Title>Descargar Lecturas</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="fechaInicio">Fecha Inicio</label>
                                        <input
                                            name="fechaInicio"
                                            type="date"
                                            className="form-control"
                                            id="fechaInicio"
                                            onChange={formik.handleChange}
                                            value={formik.values.fechaInicio}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="fechaFin">Fecha Fin</label>
                                        <input
                                            name="fechaFin"
                                            type="date"
                                            className="form-control"
                                            id="fechaFin"
                                            onChange={formik.handleChange}
                                            value={formik.values.fechaFin}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 mt-4">
                                <div className="form-group">
                                    <button type="submit" className="btn btn-primary">
                                        <i className="bx bx-save"></i>
                                        Descargar
                                    </button>
                                </div>
                            </div>
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={() => closeModal()}>Cerrar</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}
