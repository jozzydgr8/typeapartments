import { RoomGrid } from "../Components/RoomGrid"
import { UseContextData } from "../ContextFolder/UseContextData"
import { contextType } from "../Types/Types";
type arrProps = contextType[] 
export const Rooms = ()=>{
    const {state} = UseContextData();
    const shuffleArray = (array:arrProps) => {
        const shuffledArray = [...array]; // Create a copy to avoid mutating the original
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      };
      
      let randomArray = state?.data && shuffleArray(state.data);
    return(
        <section className="room " id="rooms">
            <div className="container-fluid">
                <h1 className="heading aSection" style={{textAlign:'center'}}>Our Rooms</h1>
                <div className="row fSection">
                    {
                        randomArray&& randomArray.slice(0,3).map(items =>(
                            <RoomGrid key={items.id} items={items}/>
                        ))
                    }
                </div>
                
            </div>
        </section>
    )
}