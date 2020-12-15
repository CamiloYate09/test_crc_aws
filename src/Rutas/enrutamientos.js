
export default function enrutamientos(usuario){
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
}