import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { checkValid, contextType } from "../Types/Types";
import { UseContextData } from "../ContextFolder/UseContextData";
import { ValidateForm } from "../hooks/ValidateForm";
import { addDoc } from "firebase/firestore";
import { cartRef } from "../App";
import { PaystackButton } from "react-paystack";
import axios from "axios";

// Make sure to type `booked` as `contextType`
export const CheckOut = () => {
    const [booked, setBooked] = useState<contextType>({} as contextType);
    const { state } = UseContextData();
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [checked, setChecked] = useState<boolean>(false);
    const { id } = useParams();
    const [proceed, setProceed] = useState(false);
    const [error, setErrors] = useState<any | null>(null);
    const { validateInputs } = ValidateForm();
    const publicKey = process.env.REACT_APP_PUBLICKEY!;
    const totalFee = parseFloat(booked.daily || '0');
    const location = useLocation();
    const routeInfo = location.state;


    // Helper function to create the summary
    const createSummary = () => {
        return {
            email,
            name,
            phone,
            total: totalFee,
            items: {
                itemId: booked.id,
                item: booked.title,
                itemPrice: booked.daily,
                nights: routeInfo?.nights,
                checkIn: routeInfo?.checkIn,
                checkOut: routeInfo?.checkOut
            }
        };
    };

    // Component props for Paystack
    const emailSubmit = async()=>{
        axios.post("http://localhost:5000/send_email",{
          recipient_email:'jozzydgreat1@gmail.com',
          subject:'Congratulations',
          message:`congratulations on your bookings your code is 123dPe`
        }).then(()=>alert('message sent success'))
        .catch(()=>'error');
        return;
    
  }
  const handleSuccess = async ()=>{
    
            try {
                const summary = createSummary();
                const data = await addDoc(cartRef, summary);
                if(data){
                    emailSubmit();
                }
            } catch (error) {
                console.error(error);
            }
  }
    const componentProp = {
        email,
        amount: totalFee * 100, // Amount should be in kobo (100 kobo = 1 naira)
        metaData: {
            name,
            phone
        },
        publicKey,
        text: `Checkout ${totalFee}`,
        onSuccess: () => {
            handleSuccess();
        },
        onClose: () => {
            alert('You have closed the payment modal');
        }
    };

    // Form submit handler
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateInputs({ name, email, phone });

        if (Object.keys(validationErrors).length > 0) {
            console.log(validationErrors)
            if (validationErrors.name ==''&& validationErrors.email ==''&& validationErrors.phone == ''){
                setErrors(null);
                alert('success');
            setProceed(true);
                return
            }else{
                setErrors(validationErrors);
            return;
            }
            
        }
        
        


            
        
    };

    // Fetch booking data when the component mounts or when `id` changes
    useEffect(() => {
        const data = state?.data?.find(item => item.id === id);
        if (data) {
            setBooked(data);
        }
    }, [id, state?.data]);

    return (
        <section>
            <div className="container-fluid">
                <h2>Booking for {booked.title}</h2>
                <p>{booked.overview}</p>
                <form onSubmit={handleSubmit} className="checkOutBookingForm">
                    <input
                        required
                        placeholder="Name *"
                        onChange={(e) => setName(e.target.value)}
                    />
                    {error && error.name && <div>{error.name}</div>}

                    <input
                        required
                        placeholder="Email *"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && error.email && <div>{error.email}</div>}

                    <input
                        type="number"
                        required
                        placeholder="Phone *"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    {error && error.phone && <div>{error.phone}</div>}

                    <div>
                        <input
                            required
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                            type="checkbox"
                        />{" "}
                        Please read and agree to our terms and conditions
                    </div>

                    <button type="submit">Submit</button>
                    {proceed &&  <PaystackButton {...componentProp} />}
                </form>
                {error && error.name}
            </div>
        </section>
    );
};
