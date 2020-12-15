import React from 'react';
import logo from "../assets/img/logindashboard.png";


export default function Navbar({handleLogout}) {
    return (
        <nav className="flex items-center bg-white p-3 flex-wrap">
            <div className="md:flex justify-center">
                <a href="#">
                    <span className="sr-only">CRC</span>
                    <img className="md:h-20"
                         src={logo} alt=""/>
                </a>

            </div>
            <button
                className="text-white inline-flex p-3 hover:bg-gray-900 rounded lg:hidden ml-auto hover:text-white outline-none nav-toggler"
                data-target="#navigation"
            >
                <i className="material-icons">menu</i>
            </button>
            <div
                className="hidden top-navbar w-full text-center lg:inline-flex lg:justify-center lg:w-auto"
                id="navigation"
            >
                <div
                    className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex flex-col lg:h-auto"
                >
                    <a
                        href="#"
                        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                    >
                        <span>Home</span>
                    </a>
                    <a
                        href="#"
                        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                    >
                        <span>About</span>
                    </a>
                    <a
                        href="#"
                        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                    >
                        <span>Services</span>
                    </a>
                    <a
                        href="#"
                        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                    >
                        <span>Gallery</span>
                    </a>
                    <a
                        href="#"
                        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                    >
                        <span>Products</span>
                    </a>
                    <a
                        href="#"
                        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-gray-400 items-center justify-center hover:bg-gray-900 hover:text-white"
                    >
                        <span>Contact Us</span>
                    </a>
                </div>
            </div>
            <div
                className="md:mt-8 mr-5 transform hover:bg-opacity-25 transition duration-200 hover:scale-110">

                <button type="button"
                        className="flex items-center  text-white px-3 py-1 border font-medium rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                    </svg>
                    <a onClick={handleLogout}
                       className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-rosa hover:bg-gris">
                        Salir
                    </a>
                </button>
            </div>
        </nav>
    )
}