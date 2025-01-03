
import { cgmApi } from "@api/cmgApi";
import { isAxiosError } from "axios";
import { useState } from "react"

import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

interface SuiUploadFormatProps {
    tipoFormato: string;
    ano: number;
    mes: string;
    mercado: number;
    setStatus: (status: boolean) => void;
    setLoading: (loading: boolean) => void;
}


export const SuiUploadFormat = ({ tipoFormato, ano, mes, mercado, setStatus, setLoading }: SuiUploadFormatProps) => {

    const [file, setFile] = useState<File | null>(null);


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

            setStatus(false); //Estatus de la carga, envia al componente padre

            let request = '/sui/cargar/formato?tipo=';
            const formData = new FormData();
            formData.append('file', file);
            try {

                if (tipoFormato === 'cs2') request += 'cs2';
                if (tipoFormato === 'tc1' && ano !== 0 && mes !== '') request += `tc1&anio=${ano}&mes=${mes}`;
                if (tipoFormato === 'dt') request += `dt`;
                if (tipoFormato === 'cns') request += `cns`;
                if (tipoFormato === 'cdi') request += `cdi`;
                if (tipoFormato === 'reinicio') request += `reinicio&anio=${ano}&mes=${mes}&mercado=${mercado}`;


                setLoading(true);

                const response = await cgmApi.post(request, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                // console.log('File uploaded successfully:', response);

                Swal.fire({
                    icon: 'success',
                    title: '¡Genial!',
                    text: `${response.data.mensaje} - ${response.data.registros}`,
                });
                setLoading(false);

                setStatus(true); // Estatus de la carga, envia al componente padre

            } catch (error) {
                setLoading(false);
                (isAxiosError(error) && error.response) ?
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message,
                    })
                    : Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Error al subir el archivo',
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
