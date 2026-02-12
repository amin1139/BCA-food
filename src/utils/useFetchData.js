import { useEffect, useState } from "react"


const useFetchData = (url) =>{
    const[resData, setResData] = useState(null)
    const[loading, setLoading] = useState(true)
    const[error, setError] = useState(null)
    useEffect(()=>{getResData()},[])

    const getResData = async ()=>{
        try{const res = await fetch (url)
        const data = await res.json()
        setResData(data)
        }
        catch(e){
            setError(e)
        }
        finally{
            setLoading(false)
        }
    }
    return { resData, loading, error }
}
export default useFetchData;