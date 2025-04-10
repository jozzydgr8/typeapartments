import { Outlet } from "react-router-dom"
import Navbar from "./Components/Navbar"
import { Footer } from "./Components/Footer"
import ScrollToTop from "./hooks/ScrollToTop"

export const LayOut = ()=>{
    return(
        <>
        <ScrollToTop/>
        <Navbar/>
        <Outlet/>
        <Footer/>
        </>
    )
       
    
}