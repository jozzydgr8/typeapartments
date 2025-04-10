
import { AboutSection } from "./Pages/About"
import { Essentials } from "./Pages/Essentials"
import Header from "./Pages/Header"
import { Rooms } from "./Pages/Rooms"
import Welcome from "./Pages/Welcome"

export const Home = ()=>{
    return(
        <>
        <Header/>
        <Welcome/>
        <AboutSection/>
        <Rooms/>
        <Essentials/>
       
        </>

    )
}