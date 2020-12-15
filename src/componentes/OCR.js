import React, {useState} from 'react';
import Axios from "axios";
import {store} from "react-notifications-component";
import ProgressButton from "react-progress-button";


const ORC = () => {
    /**
     * Estado para el archivo subido
     * @param e
     */
    const [archivo, setArchivo] = useState('');
    const [archivoNombre, setArchivoNombre] = useState('');
    const [archivotype, setArchivotype] = useState('');
    const [botonCargando, setBotonCargando] = useState('');
    const [botonCargandoControl, setBotonCargandoControl] = useState(true);


    const onChangeArchivo = async e => {
        var arrayAuxiliar = [];
        const archivoByte = e.target.files[0];
        setArchivotype(archivoByte);
        const base64 = await convertirBase64(archivoByte);
        arrayAuxiliar = base64.split(',');
        const nombreArchivo = archivoByte.name;
        setArchivo(arrayAuxiliar[1]);
        setArchivoNombre(nombreArchivo);

    };

    /**
     * Función anonima que nos permite
     * convertir un archivo a Base64
     * @param e
     * @returns {Promise<void>}
     */
    const convertirBase64 = (archivo) => {
        return new Promise((resolve, reject) => {
            const archivoLeido = new FileReader();
            archivoLeido.readAsDataURL(archivo);
            archivoLeido.onload = (() => {
                resolve(archivoLeido.result);
            });
            archivoLeido.onerror = ((error) => {
                reject(error);
            });

        });
    }


    /**
     * Cargar Archivo
     */

    async function handleEnviandoCarga(evento) {
        evento.preventDefault();
        try {
            if (archivo != '') {

                const datos = {
                    'tipoCarga': "ocr",
                    'fileName': archivoNombre,
                    'file': archivo,

                }
                setBotonCargando('loading');

                const {data} = await Axios.post('api/cargar', datos);
                const notificationExitosa = {
                    title: "Exitoso!",
                    message: "Se ha empezado a ejecutar la carga solicitada.",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
                    animationOut: ["animate__animated animate__fadeOut"] // `animate.css v4` classes
                };
                setBotonCargando('success');
                store.addNotification({
                    ...notificationExitosa,
                    dismiss: {
                        duration: 7000,
                        onScreen: true
                    }
                });
                clearInputs();
            } else {
                const notificationDatosNulos = {
                    title: "Aviso!",
                    message: "Seleccione un archivo",
                    type: "warning",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
                    animationOut: ["animate__animated animate__fadeOut"] // `animate.css v4` classes
                };
                store.addNotification({
                    ...notificationDatosNulos,
                    dismiss: {
                        duration: 7000,
                        onScreen: true
                    }
                });
                setBotonCargando('error');
                clearInputs();
            }


        } catch (error) {
            const notificationError = {
                title: "Error!",
                message: "Error cargando el archivo.",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
                animationOut: ["animate__animated animate__fadeOut"] // `animate.css v4` classes
            };
            store.addNotification({
                ...notificationError,
                dismiss: {
                    duration: 10000,
                    onScreen: true
                }
            });
            setBotonCargando('error');
            clearInputs();

        }
    }

    const clearInputs = () => {
        setArchivo('');
        setArchivoNombre('');
        setArchivotype('');

    }


    return (
        <form onSubmit={handleEnviandoCarga}>
            <div className="md:container mx-auto mt-5 shadow-xl">
                <div className="flex flex-col mx-4 px-8 py-6 rounded-b-md">
                    <div className="flex flex-col  bg-white rounded-b-md ">
                        <div className="flex justify-center text-sm text-gray-700">
                            <div className="mb-4">
                                <div className="w-auto mr-10 text-center">
                                    <h3 className="pb-2 border-b mb-3 text-lg  font-black">Escoja un archivo
                                        escaneado (PDF) para que el sistema lo convierta en texto</h3>

                                </div>
                                <div className="bg-white p-6  rounded-lg flex justify-center items-center ml-52">

                                    <div className="p-0.5">
                                        <div
                                            className="bg-white flex items-center rounded-full shadow-xl border border-rosa cursor-pointer">
                                            <input value={archivoNombre} readonly disabled
                                                   className="rounded-l-full appearance-none w-96 py-4 px-6 text-black leading-tight focus:outline-none"
                                                   onChange={onChangeArchivo}/>

                                            <div className="p-4">
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-full w-50 mr-60 px-8 py-0">
                                        <label

                                            className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-rosa hover:bg-gris">
                                            <svg className="w-16 h-10" fill="currentColor"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 20 20">
                                                <path
                                                    d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z"/>
                                            </svg>
                                            <span className="mt-2 text-base leading-normal text-center">Selecionar archivo</span>
                                            <input accept="application/pdf" type='file' className="hidden"
                                                   onChange={onChangeArchivo}/>
                                        </label>


                                    </div>
                                </div>
                                <div className="bg-white p-6 shadow-lg rounded-lg flex justify-end items-center">
                                    <label
                                        className="w-30 flex flex-col items-center px-2 py-1  bg-white text-black rounded-lg shadow-lg tracking-wide uppercase border border-rosa cursor-pointer hover:bg-rosa hover:text-white">
                                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                             fill="currentColor">
                                            <path fill-rule="evenodd"
                                                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                                  clip-rule="evenodd"/>
                                        </svg>
                                        <span className="mt-2 text-base leading-normal">Convertir a texto</span>
                                            <button onClick={handleEnviandoCarga}  className="bg-rosa hover:opacity-75 text-white rounded-full px-8 py-2 w-52">

                                            </button>
                                    </label>

                                </div>
                            </div>


                        </div>

                    </div>

                </div>
            </div>
        </form>
    )

}

export default ORC