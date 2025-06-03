
import { useSuiStore } from "@root/stores/sui/sui.store";
import { useState } from "react"

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

interface SuiUploadFormatProps {
    tipoFormato: string;
    ano: number;
    mes: string;
    mercado: number;

}


export const SuiUploadFormat = ({ tipoFormato, ano, mes, mercado, }: SuiUploadFormatProps) => {

    const [file, setFile] = useState<File | null>(null);
    const cargarFormatoSui = useSuiStore(state => state.cargarFormatoSui);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {

            (e.target.files[0].type === 'text/csv')
                ? setFile(e.target.files[0])
                : (
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Solo se permiten archivos CSV!',
                    }),
                    setFile(null)

                );

        }

    }

    const handleUpload = async () => {
        if (file) {

            if (tipoFormato === '') return;


            const formData = new FormData();
            formData.append('file', file);
            try {

                const respuesta = await cargarFormatoSui(tipoFormato, ano, mes, mercado, formData);

                Swal.fire({
                    icon: 'success',
                    title: '¡Genial!',
                    text: `${respuesta.mensaje} -  Nro. Registros ${respuesta.registros}`,
                });


            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `'Error al subir el archivo' ${error}`,
                });

            }
        }
    }


    return (
        <>
            <div className="row justify-content-center">
                <div className="col-md-4 d-flex justify-content-center">
                    <label htmlFor="file" className="fileUpload">
                        Seleccionar archivo
                    </label>
                    <input id="file" type="file" onChange={handleFileChange} />
                    <span id="file-name" className="fileName">{(file?.name) ? file.name : 'Ningún archivo seleccionado'}</span>
                    {file && <button className="btn btn-default" title="Cargar archivo" onClick={handleUpload}>
                        <i className="fadeIn animated bx bx-upload"></i>
                    </button>}
                </div>
            </div>

        </>
    )
}
