import Axios from "axios";

export default async function cargarSubtema(idSubtema){
    let  subTemaActualizado;
    if(idSubtema !== -1){
        const {data} = await Axios.get(`api/consultar/tema/${idSubtema}`);
        subTemaActualizado = {
            data
        };
        console.log(subTemaActualizado)
    }
    return subTemaActualizado;
}