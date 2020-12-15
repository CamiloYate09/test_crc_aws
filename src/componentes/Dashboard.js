import React from 'react';
import logo from '../assets/img/logindashboard.png';
import Buscar from './Buscar';
import '../assets/App.css'
import Cargar from './Cargar'
import ORC from "./OCR";
import Historia from "./Historia";

import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";
import ReactNotifications from "react-notifications-component";


const Dashboard = () => {

    return (
        <Router>
                <ReactNotifications />
            <nav className="bg-gray-400 fixed inset-x-0 top-0 left-0  py-1">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-1/6">
                        <div className="flex-shrink-0 flex items-center">
                            <img className="block lg:hidden h-20 w-auto"
                                 src={logo}/>
                            <img className="hidden lg:block h-20 w-auto"
                                 src={logo}
                                 alt="Workflow"/>


                        </div>
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-center">

                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    <NavLink exact activeClassName="active" to="/"
                                             className="text-black hover:bg-rosa hover:text-white text-xl px-3 py-2 rounded-md text-sm">
                                        Buscar
                                    </NavLink>
                                    <NavLink activeClassName="active" to="/cargar">
                                        <a
                                            className="text-black hover:bg-rosa hover:text-white px-3 py-2 rounded-md text-sm text-xl	">Cargar</a>
                                    </NavLink>
                                    <NavLink activeClassName="active" to="/ocr">
                                        <a
                                            className="text-black hover:bg-rosa hover:text-white px-3 py-2 rounded-md text-sm text-xl	">OCR</a>
                                    </NavLink>
                                    <NavLink activeClassName="active" to="/historia">
                                        <a
                                            className="text-black hover:bg-rosa hover:text-white px-3 py-2 rounded-md text-sm text-xl">Historia</a>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                        <div
                            className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">


                            <div className="ml-3 relative">
                                <div>
                                    <button type="button"
                                            className="flex  text-white px-3 py-1 border font-medium rounded">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                                        </svg>
                                        <NavLink activeClassName="active" to="/"
                                                 className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-rosa hover:bg-gris">
                                            Salir
                                        </NavLink>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="md:mt-40 md:text-center ml-8">

                <Switch>


                    <Route path="/" exact component={Buscar}/>
                    <Route path="/cargar" component={Cargar}/>
                    <Route path="/ocr" component={ORC}/>
                    <Route path="/historia" component={Historia}/>


                </Switch>
            </div>
        </Router>


    );
};

export default Dashboard;