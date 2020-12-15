import React, {useEffect, useState} from 'react';
import '../assets/main.css';
import Axios from "axios";
import DataTable from "react-data-table-component";


const Historia = () => {

    const [cargandoHistoria, setCargandoHistoria ] = useState(true);
    const [historias, setHistorias] = useState([]);

    const columnas = [
        {
            name: "Búsqueda",
            selector: "uuid",
            sortable: true
        },
        {
            name: "Archivo",
            selector: "name",
            sortable: true
        },
        {
            name: "Fecha",
            selector: "time",
            sortable: true
        },
        {
            name: "Tiempo",
            selector: "when",
            sortable: true
        },
        {
            name: "Resultado",
            selector: "type",
            sortable: true
        }
    ];
    const paginacionOpciones={
        rowsPerPageText: 'Filas por Página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText :'Todos'
        
    }

    useEffect(() => {
        async function cargarHistorias(){
            try {
                setCargandoHistoria(true);
                const {data : data} = await Axios.get('api/historia');
                console.log('cargando las historias' , data);

                setHistorias(data.data);
                setCargandoHistoria(false);
            }catch (error) {
                if(error.response && (error.response.status === 404 || error.response.status === 400)){
                    // mostrarError('Hubo un problema cargando las Historias.');
                }else{
                    // mostrarError('Hubo un problema cargando las Historias.');
                }
                setCargandoHistoria(false);

            }
        }
        cargarHistorias();
    }, []);
    console.log(historias);




    return (
        <div className="container mx-auto px-4 sm:px-8 fixed shadow-lg">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    <div className="w-auto mr-10 text-center">
                        <h3 className="pb-2 border-b mb-3 text-lg  font-black">Historia</h3>

                    </div>
                    <table className="min-w-full leading-normal">
                <DataTable className="inline-block bg-blue-900"
                           columns={columnas}
                    data={historias}
                    defaultSortField="title"
                    pagination
                    selectableRows
                    fixedHeader
                    fixedHeaderScrollHeight="270px"
                    paginationComponentOptions={paginacionOpciones}

                />
                </ table>
            </div>
        </div>
        </div>
    )
}

export default Historia