import { useRouteError } from "react-router"

const ErrorPage = () => {
    const error = useRouteError()
    console.log(error);
    return (
        <div className="min-h-screen px-6 py-12 bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-100">
            <h1 className="text-4xl font-bold mb-4">OooPs!!!</h1>
            <h3 className="text-xl mb-2">{error.statusText +" : "+ error.status}</h3>
            <h2 className="text-lg text-red-600 dark:text-red-400">{error?.error?.message}</h2>
        </div>
    )
}

export default ErrorPage
