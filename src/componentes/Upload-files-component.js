import React, {Component} from 'react';
import UploadService from '../servicios/Upload-files-services';

export default class UploadFiles extends Component {
    constructor(props) {
        super(props);
        this.selectFile = this.selectFile.bind(this);
        this.upload = this.upload.bind(this);

        this.state = {
            selectedFiles: undefined,
            currentFile: undefined,
            progress: 0,
            message: "",
            fileInfos: [],
            id: "",
        };
    }

    componentDidMount() {
        UploadService.getFiles().then((response) => {
            this.setState({
                fileInfos: response.data,
            });
        });
    }

    selectFile(event) {
        this.setState({
            selectedFiles: event.target.files,
        });
    }

    upload() {
        let currentFile = this.state.selectedFiles[0];

        this.setState({
            progress: 0,
            currentFile: currentFile,
        });

        UploadService.upload(currentFile, (event) => {
            this.setState({
                progress: Math.round((100 * event.loaded) / event.total),
            });
        })
            .then((response) => {
                this.setState({
                    message: response.data.message,
                });
                return UploadService.getFiles();
            })
            .then((files) => {
                this.setState({
                    fileInfos: files.data,
                });
            })
            .catch((e) => {
                this.setState({
                    progress: 0,
                    message: "No se pudo cargar el archivo",
                    currentFile: undefined,
                });
            });

        this.setState({
            selectedFiles: undefined,
        });
    }

    // download(){
    //     let id = this.state.id;
    //
    // }

    render() {
        const {
            selectedFiles,
            currentFile,
            progress,
            message,
            fileInfos,
        } = this.state;

        return (
            <div>
                {currentFile && (
                    <div className="relative pt-1">
                        <div
                            className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200"
                            aria-valuetext={progress}
                            style={{width: progress + "%"}}
                        >
                            {progress}%
                        </div>
                    </div>
                )}

                <label className="btn btn-default">
                    <input type="file" onChange={this.selectFile}/>
                </label>


                <button type="button"
                        disabled={!selectedFiles}
                        onClick={this.upload}
                        className="w-auto h-16 px-3 rounded   px-20 text-blue-600 bg-transparent border border-solid border-blue-600 hover:bg-blue-600 hover:text-white active:bg-blue-600 font-bold rounded-lg">
                    Seleccionar archivo
                </button>

                <div className="text-white px-6 py-4 border-0 rounded relative mb-4 bg-indigo-500">
                  <span className="text-xl inline-block mr-5 align-middle">
                    <i className="fas fa-bell"/>
                  </span>
                    <span className="inline-block align-middle mr-8">
                        <b className="capitalize"> {message}</b>
                    </span>
                    <button
                        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
                    </button>
                </div>

                <div className="card">
                    <div className="card-header">Lista de Archivos</div>
                    <ul className="list-group list-group-flush">
                        {fileInfos &&
                        fileInfos.map((file, index) => (
                            <li className="list-group-item" key={index}>
                                <a href={file.url}>{file.name}</a>
                            </li>

                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}