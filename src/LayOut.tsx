import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import { Footer } from "./Components/Footer"

export const LayOut = ()=>{
    return(
        <>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    )
       
    
}