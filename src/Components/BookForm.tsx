import { DatePicker } from "antd"
import { contextType } from "../Types/Types"
import { Link } from "react-router-dom"
import { PaystackButton } from "react-paystack"

type bookType ={
    id:string,
    checkOut:string ,
    checkIn:string,
    setIn:React.Dispatch<React.SetStateAction<string>>,
    setOut:React.Dispatch<React.SetStateAction<string>>,
    nights:number,
    setGuest:React.Dispatch<React.SetStateAction<string>>,
    guest:string,
    handleSubmit:(e:React.FormEvent<HTMLFormElement>)=>void,
    
}

export const BookForm = ({id,guest, handleSubmit, setGuest,checkOut,setIn,setOut, nights}:bookType)=>{
    return(
        <section>
            <div className="container-fluid">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <h3>Check-In</h3> 
                    <DatePicker onChange={setIn} />
                    <br/>
                
                    <h3>Check-Out</h3>
                    <DatePicker onChange={setOut} />
                    <h3>guests: {guest}</h3>
                    
                    <input type="range" min='1' max={'8'} onChange={(e)=>setGuest(e.target.value)}/>
                    <h3>nights: {nights}</h3>
                    <button className="btn btn-secondary btn-lg" >
                        Proceed to CheckOut
                    </button>
                    
                </form>
            </div>
        </section>
    )
}