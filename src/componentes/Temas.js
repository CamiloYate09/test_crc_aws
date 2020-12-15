import React, {useEffect, useState} from 'react';
import Axios from "axios";
import cargarSubtema from '../Helpers/cargar-subtemas'
import Subtemas from "./Subtemas";

const Temas = (props) => {
    const [tema, setTema] = useState([]);
    const [subTema, setSubTema] = useState([]);

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
        const {data} = await Axios.get("/api/consultar/temas");
        // options = data.temas.map(({ idTema, descripcion }) => ({ value: idTema, label: descripcion }));
        // console.log('cargando temas ', options);
        return data;
    }


    async function obtenerSubTemas(e){
        const id = e.target.value;
        try {
            const subtemas = await cargarSubtema(id);
            setSubTema(subtemas);
            CargarListaSubtema(subtemas)
            console.log(subtemas)
        }catch (error) {
            console.log(error);
        }
    }

    return (

        <div name="temas">

            {
                tema.temas && (
                    <select name="tema"  onChange={obtenerSubTemas}   >
                        <option value={-1}>Seleccione un Tema:</option>
                        {tema.temas.map((tema) => (
                            <option   key={tema.idTema} value={tema.idTema}>{tema.descripcion}</option>
                        ))}
                    </select>

                )
            }
        </div>

    )

}

export default Temas

function CargarListaSubtema({subTema}){
    return(
        <Subtemas subtemas={subTema}></Subtemas>
    )
}

