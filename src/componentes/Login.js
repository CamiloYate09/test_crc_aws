import React, {useState} from 'react';
import '../assets/main.css';
import logo from '../assets/img/login.png';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';


export default function Login({login}) {


    const [userYPasword, setUserYPasword] = useState({
        user: '',
        password: '',

    });
    const [key, setKey] = useState(null);


    //contener los errores
    const [error, setError] = useState(null);

    /**
     * Cuando cambia un valor en el formulario
     * @param e
     */
    function handleInputChange(e) {
        setUserYPasword({
            ...userYPasword,
            [e.target.name]: e.target.value
        });
    }

    const keyboardEvents = (event) => {
        event.persist();
        setKey(event.key); // this will return string of key name like 'Enter'
        if (key === 'Enter') {
            handleSubmit(event);
        }
    }

    /**
     * Cuando se envie el formulario
     * llamamos esta funcion
     * Asincrona
     * @param e
     */
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(userYPasword.user, userYPasword.password);
        } catch (error) {
            console.log(error);
            setError('Usuario o contraseña incorrectos. Verifique los datos, asegurándose de estar registrado e intente nuevamente');
        }

    }


    return (
        <section className="login">
            <div className="loginContainer" onKeyPress={keyboardEvents}>
                <img src={logo} />
                <form onSubmit={handleSubmit}>
                    <label>Usuario <span className="text-rosa">*</span></label>
                    <input className="focus:ring-2 focus:ring-morado" type="text" name="user" autoFocus required
                           value={userYPasword.user}
                           onChange={handleInputChange}/>
                    <p className="errorMsg">{Error}</p>
                    <label>Contraseña <span className="text-rosa">*</span></label>
                    <input className="focus:ring-2 focus:ring-morado" type="password"
                           name="password"
                           required onChange={handleInputChange} value={userYPasword.password}/>
                    <p className="errorMsg">{Error}</p>

                    <div className="btnContainer transform hover:bg-opacity-25 transition duration-200 hover:scale-110">
                        <button type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-lg 2xl:font-medium rounded-md text-white bg-gris hover:bg-azul focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-azul">
                          <span className="absolute left-0 inset-y-0 flex items-center pl-3">

                                  <svg className="h-5 w-5 text-rosa group-hover:text-rosa"
                                       xmlns="http://www.w3.org/2000/svg"
                                       viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                  <path fill-rule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clip-rule="evenodd"/>
                                </svg>
                  </span>
                            Ingresar
                        </button>
                    </div>

                </form>

            </div>


        </section>
    )
}