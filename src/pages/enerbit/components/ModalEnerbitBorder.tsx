
import { useEnerbitStore } from "@root/stores/enerbit/enerbit.store";
import { Modal } from "react-bootstrap";
import { toast } from 'react-toastify';
import Flatpickr from "react-flatpickr";
import { object, string } from "yup";
import { useFormik } from "formik";
import { Border } from "../types";
import 'flatpickr/dist/themes/material_blue.css';


interface BorderForm extends Omit<Border, 'fechaInicio' | 'ultimaLectura'> {
    fechaInicio: Date;
    ultimaLectura: Date;
}


const validationSchema = object({
    sic: string().required(),
    nombre: string().required(),
    medidor: string().required()
});

const initialValues: BorderForm = {
    sic: "",
    nombre: "",
    producto: "",
    medidor: "",
    estado: "A",
    fechaInicio: new Date(),
    ultimaLectura: new Date()
}


export const ModalEnerbitBorder = () => {
    const frontera = useEnerbitStore(state => state.frontera);
    const setFrontera = useEnerbitStore(state => state.setFrontera);
    const crearFrontera = useEnerbitStore(state => state.crearFrontera);
    const actualizarFrontera = useEnerbitStore(state => state.actualizarFrontera);
    const showModal = useEnerbitStore(state => state.mostrarModalFrontera)
    const closeModal = useEnerbitStore(state => state.cerrarModalFrontera);
    const accion = useEnerbitStore(state => state.accion);


    const formik = useFormik<BorderForm>({
        initialValues: {
            ...frontera,
            estado: frontera.estado || "A"
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: async (formValues, { resetForm }) => {


            const newValues = {
                ...formValues,
                fechaInicio: formValues.fechaInicio,
                ultimaLectura: formValues.ultimaLectura
            }


            if (accion === "editar") {
                await actualizarFrontera(newValues);
                setFrontera(initialValues);
                toast.success("Frontera actualizada correctamente");
            } else if (accion === "nuevo") {
                await crearFrontera(newValues);
                setFrontera(initialValues);
                toast.success("Frontera creada correctamente");
            }

            resetForm()

            closeModal()

        }
    });


    return (
        <>
            <Modal show={showModal} onHide={closeModal}
                backdrop="static"
                keyboard={false} size="lg">
                <form onSubmit={formik.handleSubmit}>
                    <Modal.Header>
                        <Modal.Title>Administracion de fronteras</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="card-body p-4">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="sic">Codigo Sic</label>
                                    <input type="text"
                                        name="sic"
                                        className="form-control"
                                        placeholder="Frt00000"
                                        onChange={formik.handleChange}
                                        value={formik.values.sic}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="producto">Producto</label>
                                    <input type="text"
                                        name="producto"
                                        className="form-control"
                                        placeholder="101000"
                                        onChange={formik.handleChange}
                                        value={formik.values.producto}
                                    />
                                </div>
                            </div>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input type="text"
                                        name="nombre"
                                        className="form-control"
                                        placeholder="Enertotal sa esp"
                                        onChange={formik.handleChange}
                                        value={formik.values.nombre}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="medidor">Medidor</label>
                                    <input type="text"
                                        name="medidor"
                                        className="form-control"
                                        placeholder="22276541098"
                                        onChange={formik.handleChange}
                                        value={formik.values.medidor}
                                    />
                                </div>
                            </div>

                            <div className="row g-3">
                                <div className="col-md-6">

                                    <label className="form-label">Fecha Inicio</label>
                                    <Flatpickr
                                        name="fechaInicio"
                                        className="form-control"
                                        value={
                                            formik.values.fechaInicio
                                                ? new Date(formik.values.fechaInicio)
                                                : new Date()
                                        }
                                        onChange={(fecha) => formik.setFieldValue('fechaInicio', fecha[0])}
                                        options={{
                                            dateFormat: "Y-m-d",
                                        }}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Ultima Lectura</label>
                                    <Flatpickr
                                        name="ultimaLectura"
                                        className="form-control"
                                        value={
                                            formik.values.ultimaLectura
                                                ? new Date(formik.values.ultimaLectura)
                                                : new Date()
                                        }
                                        onChange={(fecha) => formik.setFieldValue('ultimaLectura', fecha[0])}
                                        options={{
                                            dateFormat: "Y-m-d",
                                        }}
                                    />

                                </div>

                            </div>

                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={() => closeModal()}>Cerrar</button>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}
