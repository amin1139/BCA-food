import { useRouteError } from "react-router"

const ErrorPage = () => {
    const error = useRouteError()
    console.log(error);
    return (
        <>
        
            <h1>OooPs!!!</h1>
            
            <h3>{error.statusText +" : "+ error.status}</h3>
            <h2>{error.error.message}</h2>
        
        </>
    )
}

export default ErrorPage