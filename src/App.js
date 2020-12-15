import React, {useEffect, useState} from 'react';
import './assets/App.css';
import Login from "./componentes/Login"
import Axios from "axios";
import Dashboard from "./componentes/Dashboard";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {deleteToken, getToken, initAxiosInterceptors, setToken} from "./Helpers/auth-helpers";
import DashboardConsulta from "./componentes/DashboardConsulta";
import DashboardCarga from "./componentes/DashboardCarga";
import DashboardHistoria from "./componentes/DashboardHistoria";


//Apenas cargue el navegador llamamos esta funcion
initAxiosInterceptors();

/**
 * Constantes
 */
const ROL_CONSULTA = "ROLE_CONSULTA";
const ROL_CARGA = "ROLE_CARGA";
const ROL_HISTORIA = "ROLE_HISTORIA";
const NUM_ROLES = 3;
export default function App() {


    /*
    Nuevas Variables
     */
    //No sabemos si hay un usuario autenticado
    const [usuario, setUsuario] = useState(null);

    //saber esl estado del usuario
    const [cargandoUsuario, setCargandoUsuario] = useState(true);

    //contener los errores
    const [error, setError] = useState(null);


    /**
     * funcion a cambiar con el token
     * antes -> api/public/login
     * ahora-> /api/consultar/temas
     */
    useEffect(() => {

        async function cargarUsuario() {
            //validamos si existe un token
            if (!getToken()) {
                setCargandoUsuario(false);
                return;
            }
            try {
                const {data: usuario} = await Axios.get('api/public/login/jwt');
                setUsuario(usuario);
                console.log(usuario)
                setCargandoUsuario(false);
            } catch (error) {
                console.log(error);
            }

        }


        cargarUsuario();

    }, []);

    /**
     *  data.usuario
     *  data.token
     * @param email
     * @param password
     * @returns {Promise<void>}
     */
    async function login(user, password) {
        const {data} = await Axios.post('api/public/login', {
                user,
                password,

            }
        );

        console.log(JSON.stringify(data));

        if (data.loginExitoso === true && data.roles.length > 0) {
            if (data.roles.length === NUM_ROLES) {
                console.log('1');
                setUsuario('1');
            }else{
                    if (data.roles[0] === ROL_HISTORIA) {
                        console.log('4');
                        setUsuario('4');
                    } else if (data.roles[0] === ROL_CARGA) {
                        console.log('3');
                        setUsuario('3');
                    } else if (data.roles[0] === ROL_CONSULTA) {
                        console.log('2');
                        setUsuario('2');
                    } else {
                        console.log('0');
                        setUsuario('0');
                }
            }
        } else {
            setUsuario('0');
        }

        /**
         * Asiganomos el Token al sistema para consultas.
         */
        setToken(data.jwt);

    }


    const clearInputs = () => {
        setUsuario('');
    }

    // const clearErrors = () => {
    //     setemailError('');
    //     setpasswordError('');
    // }


    /**
     * Funcion para salir de la aplicación
     */
    function logout() {
        setUsuario(null);
        deleteToken();
    }

    /**
     * Funcion para mostrar errores
     */
    function mostrarError(mensaje) {
        setError(mensaje);
    }

    /**
     * Funcion para esconder el boton del error
     */
    function esconderError() {
        setError(null);
    }


    return (
        <Router>
            <div className="App">
                {
                    (() => {


                        switch (usuario) {

                            case '1':

                                return (

                                    <LoginRoutes/>

                                )

                            case '2':

                                return (

                                    <LoginRoutesConsulta/>

                                )
                            case '3':

                                return (

                                    <LoginRoutesCarga/>

                                )
                            case '4':

                                return (

                                    <LoginRoutesHistoria/>

                                )

                            default:

                                return (

                                    <LogoutRoutes login={login}/>

                                )

                        }


                    })()

                    // usuario ? (<LoginRoutes/>) : (<LogoutRoutes login={login} />)

                }
                <div>{JSON.stringify(usuario)}</div>
            </div>
        </Router>

    );


}

//Nuevos componentes de las rutas del usuario que este autenticado
function LoginRoutes() {
    return (
        <Switch>
            <Route path="/" component={() => (
                <Dashboard/>
            )}/>
        </Switch>
    )

}

//Nuevos componentes de las rutas del usuario que este autenticado
function LoginRoutesConsulta() {
    return (
        <Switch>
            <Route path="/" component={() => (
                <DashboardConsulta/>
            )}/>
        </Switch>
    )

}

//Nuevos componentes de las rutas del usuario que este autenticado
function LoginRoutesCarga() {
    return (
        <Switch>
            <Route path="/" component={() => (
                <DashboardCarga/>
            )}/>
        </Switch>
    )

}

//Nuevos componentes de las rutas del usuario que este autenticado
function LoginRoutesHistoria() {
    return (
        <Switch>
            <Route path="/" component={() => (
                <DashboardHistoria/>
            )}/>
        </Switch>
    )

}


//Render las rutas cuando no esta autenticado
function LogoutRoutes({login}) {
    return (
        <Switch>
            <Route
                default
                path="/"
                render={props => <Login {...props} login={login}></Login>}/>} />
        </Switch>
    )
}





