import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { contextType } from "./Types/Types";
import { UseContextData } from "./ContextFolder/UseContextData";
import Similar from "./Components/Similar";

export const IDLayout = ()=>{
    const{id} = useParams();
    const {state} = UseContextData();
    const [mapData, setMapData] = useState({}as contextType)
    useEffect(()=>{
        const data = state?.data && state.data.find(item => item.id === id);
        if(data){
            setMapData(data)
        }

    },[id, state?.data]);
    //map url to get images
    const url = mapData?.fileUrls&&mapData.fileUrls.map(item=>item.url)
    const headStyle = {
        backgroundImage:`url(${url})`
    }
    return(
        <section>
            <div style={headStyle}>
                yo
            </div>
            <div className="container-fluid">
                <h1>
                    {mapData.apartment}
                </h1>
                <p>
                    {mapData.overview}
                </p>

                <div>
                    {/* similar div comp */}
                    <Similar/>
                </div>
            </div>
            {id}
            {JSON.stringify(mapData)}
            
        </section>
    )
}