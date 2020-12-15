import React from "react";

class TableTemas extends React.Component {
    state = {
        rows: [{}]
    };
    handleChange = idx => e => {
        const {name, value} = e.target;
        const rows = [...this.state.rows];
        rows[idx] = {
            [name]: value
        };
        this.setState({
            rows
        });
    };
    handleAddRow = () => {
        const item = {
            tema: "",
            subtema: ""
        };
        this.setState({
            rows: [...this.state.rows, item]
        });
    };
    handleRemoveRow = () => {
        this.setState({
            rows: this.state.rows.slice(0, -1)
        });
    };
    handleRemoveSpecificRow = (idx) => () => {
        const rows = [...this.state.rows]
        rows.splice(idx, 1)
        this.setState({rows})
    }

    render() {
        return (
            <div></div>
            // <div className="flex text-center">
            //     <table
            //         className="table table-bordered table-hover text-center ml-56"
            //         id="tab_logic"
            //     >
            //         <thead>
            //         <tr>
            //             <th className="py-4 px-6 bg-auto w-auto uppercase md:text-lg ">TEMAS
            //                 SELECIONADOS:
            //             </th>
            //         </tr>
            //         </thead>
            //         <thead>
            //         <tr>
            //             <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"> #</th>
            //             <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"> Tema</th>
            //             <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"> Subtema</th>
            //             <th/>
            //         </tr>
            //         </thead>
            //         <tbody>
            //         {this.state.rows.map((item, idx) => (
            //             <tr id="addr0" key={idx}>
            //                 <td>{idx}</td>
            //                 <td className="px-5 py-5 border-b border-gray-200  text-sm ">
            //                     <input
            //                         type="text"
            //                         name="tema"
            //                         value={this.state.rows[idx].tema}
            //                         onChange={this.handleChange(idx)}
            //                         className="border-red-400"
            //                     />
            //                 </td>
            //                 <td className="px-5 py-5 border-b border-gray-200 bg-blue-50 text-sm">
            //                     <input
            //                         type="text"
            //                         name="subtema"
            //                         value={this.state.rows[idx].subtema}
            //                         onChange={this.handleChange(idx)}
            //                         className="bg-blue-50"
            //                     />
            //                 </td>
            //                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            //                     <label
            //                         className="md:w-32 flex flex-col items-center px-2 py-1  bg-white text-black rounded-lg shadow-lg tracking-wide uppercase border border-rosa cursor-pointer hover:bg-rosa hover:text-white">
            //                         <svg className="h-8 w-8"
            //                              xmlns="http://www.w3.org/2000/svg"
            //                              viewBox="0 0 20 20" fill="currentColor">
            //                             <path fillRule="evenodd"
            //                                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
            //                                   clipRule="evenodd"/>
            //                         </svg>
            //                         <span
            //                             className="mt-4 text-base leading-normal">Eliminar</span>
            //                         <input onClick={this.handleRemoveRow} type='button' className="hidden"/>
            //                     </label>
            //                 </td>
            //                 <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            //                     <label
            //                         className="md:w-32 flex flex-col items-center px-2 py-1  bg-white text-black rounded-lg shadow-lg tracking-wide uppercase border border-rosa cursor-pointer hover:bg-rosa hover:text-white">
            //                         <svg className="h-8 w-8"
            //                              xmlns="http://www.w3.org/2000/svg"
            //                              viewBox="0 0 20 20" fill="currentColor">
            //                             <path fillRule="evenodd"
            //                                   d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
            //                                   clipRule="evenodd"/>
            //                         </svg>
            //                         <span
            //                             className="mt-4 text-base leading-normal">Agregar</span>
            //                         <input onClick={this.handleAddRow} type='button' className="hidden"/>
            //                     </label>
            //                 </td>
            //             </tr>
            //         ))}
            //         </tbody>
            //     </table>
            // </div>


        );
    }
}

export default TableTemas

