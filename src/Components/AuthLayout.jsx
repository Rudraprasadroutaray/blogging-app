import React,{useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Protected({children,authentication=true}){
    

    const navigate=useNavigate()
    const [loader,setLoader]=useState(true)
    const authStatus=useSelector(state=>state.auth.status)


    useEffect(()=>{

        // true && true

        if(authentication && authStatus !=authentication){
            navigate("/Login")

        }else if(!authentication && authStatus !==authentication){
            navigate("/")

        }
        setLoader(false)

    }, [authStatus,navigate,authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}