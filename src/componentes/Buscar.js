import React, {useEffect, useState,useRef} from 'react'
import Axios from "axios";
import {store} from "react-notifications-component";
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import TableTemas from "./TableTemas"

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Buscar = () => {
    const [temasSubTemasEntradas, setTemasSubTemasEntradas] = useState( [{
        tema: '',
        subtema:[]
    },]);

    /**
     * Evitamos que el usuario le de multiples veces al botón
     */
    const [cargandoDatosEnvio, setCargandoDatosEnvio] = useState(false);


    /**
     * Estado para obtener el valor digitado
     */
    const [palabra, setPalabra] = useState('');


    const [tema, setTema] = useState([]);

    const [subtemas, setSubtemas] = useState([]);

    const [subtemasBandeja, setSubtemasBandeja] = useState(false);

    const [cargarListTemas, setCargarListTemas] = useState(false);

    const [valorTemaSelecionado,setValorTemaSelecionado ] = useState('');
    const [valorTemaSubSelecionado,setValorTemaSubSelecionado ] = useState([]);




    const [enviandoPeticion, setenviandoPeticion] = useState(false);
    /**
     * Estado para el archivo subido
     * @param e
     */
    const [archivo, setArchivo] = useState('');
    const [archivoNombre, setArchivoNombre] = useState('');
    const [archivotype, setArchivotype] = useState('');
    const [temaSelecionado, settemaSelecionado] = useState([]);


    useEffect(() => {
        async function cargarTemasIniciales() {
            try {
                const nuevosTemas = await cargarTemas();
                setTema(nuevosTemas);
                console.log(nuevosTemas);
            } catch (error) {
                console.log(error);

            }
        }

        cargarTemasIniciales();
    }, []);

    async function cargarTemas() {
        const {data} = await Axios.get("api/consultar/temas");
        // options = data.temas.map(({ idTema, descripcion }) => ({ value: idTema, label: descripcion }));
        // console.log('cargando temas ', options);
        return data;
    }



        async function cargarSubTemas(e) {
            e.preventDefault();

            const idSubtema = e.target.value;

            const temaSeleciona = tema.temas.filter(element => element.idTema == idSubtema );
            const temaSelecionaDescripcion = temaSeleciona.map((temass) => (
                     temass.descripcion
            ));
            setValorTemaSelecionado(temaSelecionaDescripcion)
            try {
                const {data} = await Axios.get(`api/consultar/tema/${idSubtema}`);
                setSubtemas(data);
                setSubtemasBandeja(true)
                console.log(subtemas)
            } catch (error) {
                console.log(error);

            }
        }

    const handleChangeSubtemas =(event) =>{
        event.preventDefault();

        const idSubtema = event.target.value;
        console.log(idSubtema)
        setValorTemaSubSelecionado(idSubtema);
        console.log(valorTemaSubSelecionado)

    }



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
    const clearInputs = () => {
        setArchivo('');
        setArchivoNombre('');
        setArchivotype('');
    }

    /**
     * Enviar Data
     */

    async function handleEnviandoConsulta(evento) {
        evento.preventDefault();
        if(cargandoDatosEnvio){
            return;
        }
        //Object.entries(valorTemaSelecionado).length  === 0 palabra != ''
        try {
            if (archivoNombre != '' || archivo != '' || Object.entries(temasSubTemasEntradas).length  === 0) {
                console.log('datos de temas enviados' , temasSubTemasEntradas)
                const datosCompuesta = {
                    'fileName': archivoNombre,
                    'file': archivo,
                    'temas': temasSubTemasEntradas,

                }
                setCargandoDatosEnvio(true);
                const {data} = await Axios.post('api/buscar', datosCompuesta);
                setCargandoDatosEnvio(false);
                const notificationExitosa = {
                    title: "Exitoso!",
                    message: data.estado.message,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
                    animationOut: ["animate__animated animate__fadeOut"] // `animate.css v4` classes
                };


                store.addNotification({
                    ...notificationExitosa,
                    dismiss: {
                        duration: 10000,
                        onScreen: true
                    }
                });
                clearInputs();
            }else if(palabra != '' || Object.entries(temasSubTemasEntradas).length  === 0 ){
                const dummy =  [
                    {
                        "tema":"Petroleo",
                        "subtemas": ["Ambiental","Ambientals"]
                    },
                    {
                        "tema":"Educacion",
                        "subtemas": ["Sociales",]
                    }
                ]

                const datosSimple = {
                    'query':palabra,
                    'temas': temasSubTemasEntradas,

                }
                setCargandoDatosEnvio(true);
                const {data} = await Axios.post('api/buscar', datosSimple);
                setCargandoDatosEnvio(false);
                const notificationExitosa = {
                    title: "Exitoso!",
                    message: data.estado.message,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
                    animationOut: ["animate__animated animate__fadeOut"] // `animate.css v4` classes
                };


                store.addNotification({
                    ...notificationExitosa,
                    dismiss: {
                        duration: 10000,
                        onScreen: true
                    }
                });
            } else {
                const notificationDatosNulos = {
                    title: "Aviso!",
                    message: "Parámetros de Busqueda Vacíos.",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
                    animationOut: ["animate__animated animate__fadeOut"] // `animate.css v4` classes
                };
                store.addNotification({
                    ...notificationDatosNulos,
                    dismiss: {
                        duration: 10000,
                        onScreen: true
                    }
                });
                setCargandoDatosEnvio(false);

            }
        } catch (error) {
            let mensajeErro = '';
            if (error.response && (error.response.status === 404 || error.response.status === 400)) {
                mensajeErro = 'Búsqueda (003) - Debe enviar un tipo de busqueda válido: Simple (palaba y/o temas) ó compleja (archivo y/o temas).';
            } else {
                mensajeErro('Se presento un error enviando la información. Intente nuevamente ');
            }
            const notificationError = {
                title: "Error!",
                message: mensajeErro,
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
            setCargandoDatosEnvio(false);
            clearInputs();

        }
    }


    /**
     * Tabla de busquedas
     */

    const handleChangeInput =(index, event) =>{
        const valores = [...temasSubTemasEntradas];
        valores[index][event.target.name] = event.target.value;
        setTemasSubTemasEntradas(valores);
    }
    const  handleAddCampos = () => {
        if(temasSubTemasEntradas.length >3){
            const notification = {
                title: "Aviso!",
                message: 'El maximo de temas seleccionados son : 5',
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
                animationOut: ["animate__animated animate__fadeOut"] // `animate.css v4` classes
            };


            store.addNotification({
                ...notification,
                dismiss: {
                    duration: 10000,
                    onScreen: true
                }
            });
            return;
        }
        if(Object.entries(valorTemaSelecionado).length  === 0 || Object.entries(valorTemaSubSelecionado).length  === 0){
            const notification = {
                title: "Aviso!",
                message: 'Para agregar un tema o subtema debe seleccionarlos',
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated animate__fadeIn"], // `animate.css v4` classes
                animationOut: ["animate__animated animate__fadeOut"] // `animate.css v4` classes
            };


            store.addNotification({
                ...notification,
                dismiss: {
                    duration: 10000,
                    onScreen: true
                }
            });
        }else{
            console.log('final',temasSubTemasEntradas )
            setTemasSubTemasEntradas([...temasSubTemasEntradas,{tema:valorTemaSelecionado[0],subtema:[valorTemaSubSelecionado]}]);
            setCargarListTemas(true);
        }


    }
    const handleEliminarCampos = (idx) =>{
        const  valores = [...temasSubTemasEntradas];
        valores.splice(idx,1);
        setTemasSubTemasEntradas(valores);
    }




    return (
        <form onSubmit={handleEnviandoConsulta}>
            <div className="container mx-auto mt-5 shadow-lg">
                <div className="w-auto mr-10 text-center">
                    <h3 className="pb-2 border-b mb-3 text-lg  font-black">Escriba
                        una palabra
                        o seleccione un archivo para buscarlo
                        en
                        la de conocimiento</h3>

                </div>
                <div className="bg-white p-6  rounded-lg flex justify-center items-center ml-52">

                    <div className="p-0.5">
                        <div
                            className="bg-white flex items-center rounded-full shadow-xl border border-rosa cursor-pointer">
                            <input name="palabra" value={palabra} onChange={e => setPalabra(e.target.value)}
                                   maxLength="30"
                                   className="rounded-l-full w-96 py-4 px-6 text-black leading-tight focus:outline-none font-sans font-si"
                                   id="search" type="text" placeholder="Digite una palabra clave"/>

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
                            <input accept=".doc,.docx,.txt" type='file' className="hidden" onChange={onChangeArchivo}/>
                        </label>


                    </div>
                </div>
                <br/>
                <div className="container mx-auto mt-0">
                    <tr>
                        <th className="py-4 px-16 bg-auto w-auto uppercase mx-10  md:text-lg  ">TEMAS:

                        </th>
                    </tr>
                    <div className="flex flex-col mx-3 px-8 py-6 rounded-b-md ">
                        <div className="flex">
                            <div className="w-1/2 ml-4 shadow-xl">
                                <div className="rounded-md md:p-6 bg-white">
                                    <div className="mb-2 pb-2">

                                            {
                                                tema.temas && (
                                                    <select  name="tema"  className="rounded-l-md w-52 h-10 rounded-lg shadow-lg  tracking-wide border border-rosa cursor-pointer hover:text-azul"  onChange={cargarSubTemas}   >
                                                        <option disabled defaultValue="1" >Seleccione un Tema:</option>
                                                        {tema.temas.map((tema) => (
                                                            <option  key={tema.idTema} value={tema.idTema} >{tema.descripcion}</option>
                                                        ))}
                                                    </select>

                                                )
                                            }



                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 ml-4 shadow-xl">
                                <div className="rounded-md md:p-6 bg-white">
                                    <div className="mb-2 pb-2">
                                        {
                                            subtemasBandeja && (
                                                <select name="subTema" onChange={handleChangeSubtemas}   className="rounded-l-md w-56 h-10 rounded-lg shadow-lg  tracking-wide border border-rosa cursor-pointer hover:text-azul"  >
                                                    <option >Seleccione un SubTema:</option>
                                                    {subtemas.tema.subtemaList.map((tema) => (
                                                        <option key={tema.idTema} value={tema.idTema}  >{tema.descripcion}</option>
                                                    ))}
                                                </select>

                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2 ml-4 shadow-xl">
                                <div className="rounded-md p-6 bg-white shadow">
                                    <div className="mb-2 pb-2 border-rosa cursor-pointer hover:text-white">
                                        <div className="flex justify-center">
                                            <label
                                                className="w-30 flex flex-col items-center px-2 py-1  bg-white text-black rounded-lg shadow-lg tracking-wide uppercase border border-rosa cursor-pointer hover:bg-rosa hover:text-white">
                                                <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                                <span className="mt-2 text-base leading-normal">agregar</span>
                                                <input type='button' className="hidden" onClick={() => handleAddCampos()}/>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex text-center">
                    <table
                        className="md:table table-bordered table-hover text-center ml-40"
                        id="tab_logic"
                    >
                        <thead>
                        <tr>
                            <th className="py-4 px-6 bg-auto md:w-auto uppercase md:text-lg ">TEMAS
                                SELECIONADOS:
                            </th>
                        </tr>
                        </thead>
                        <thead>
                        <tr>
                            <th className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"> #</th>
                            <th className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"> Tema</th>
                            <th className="px-5 text-center py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"> Subtema</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody className="text-center">
                        {cargarListTemas &&
                            temasSubTemasEntradas.map((item, idx) => (
                                    <tr id="addr0" key={idx}>
                                        <td>{idx}</td>
                                        <td className="px-5 py-5 border-b border-gray-200  text-sm">
                                            <input
                                                className="rounded-l-md w-56 h-10 rounded-lg shadow-lg text-center  tracking-wide border border-rosa cursor-pointer hover:text-azul"
                                                type="text"
                                                name="tema"
                                                disabled
                                                value={item.tema}
                                                onChange={event => handleChangeInput(idx, event)}
                                            />
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-blue-50 text-sm">
                                            <input
                                                type="text"
                                                className="rounded-l-md w-56 h-10 rounded-lg shadow-lg  text-center  tracking-wide border border-rosa cursor-pointer hover:text-azul"
                                                name="subtema"
                                                disabled
                                                value={item.subtema}
                                                onChange={event => handleChangeInput(idx, event)}
                                            />
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <label
                                                className="md:w-32 flex flex-col items-center px-2 py-1  bg-white text-black rounded-lg shadow-lg tracking-wide uppercase border border-rosa cursor-pointer hover:bg-rosa hover:text-white">
                                                <svg className="h-8 w-8"
                                                     xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd"
                                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                                <span
                                                    className="mt-4 text-base leading-normal">Eliminar</span>
                                                <input  type='button' className="hidden" onClick={(i) => handleEliminarCampos(idx)}/>
                                            </label>
                                        </td>
                                    </tr>
                                ))

                        }

                        </tbody>
                    </table>
                </div>

                <br/>

                <div className="bg-white p-6 shadow-lg rounded-lg flex justify-end items-center">
                    <label
                        className="w-30 flex flex-col items-center px-2 py-1  bg-white text-black rounded-lg shadow-lg tracking-wide uppercase border border-rosa cursor-pointer hover:bg-rosa hover:text-white">
                        <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
                        </svg>
                        <span className="mt-2 text-base leading-normal">Buscar</span>
                        <button className="bg-rosa hover:opacity-75 text-white rounded-full px-8 py-2 w-52">

                        </button>
                    </label>

                </div>
                <br/>
                <br/>
            </div>
        </form>


    )
}

export default Buscar