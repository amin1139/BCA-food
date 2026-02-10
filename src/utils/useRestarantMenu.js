import { useEffect, useState } from "react"
import { RES_MENU_URL } from "./constant"

const useRestarantMenu = (resId) =>{
    const[resData, setResData] = useState(null)
    useEffect(()=>{getResMenuData()},[])

    const getResMenuData = async ()=>{
        const res = await fetch (RES_MENU_URL + resId)
        const data = await res.json()
        setResData(data)
        
    }
    return resData
}
export default useRestarantMenu;