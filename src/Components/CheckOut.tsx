import { useState } from "react";
import { message } from "antd";
type checkProps = {
    checkOut:any,
    checkIn:any,
    guest:number,
    apartment:string,
    nights:number,
    price:string
}
type checkValid = {
    name:string | undefined,
    phone:string | undefined,
    email:string | undefined,
    address:string | undefined
}

export const CheckOut = ({ checkOut, checkIn, guest, apartment, nights, price }:checkProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({} as checkValid);

    const styles = {
        input: {
            background: 'none',
            marginBottom: '5px',
            outline: 'none',
            borderRadius: '7px'
        },
        error: {
            color: 'red',
            fontSize: '12px'
        }
    };

    const validateInputs = () => {
        const newErrors:checkValid  = {
            name: "",
            phone: "",
            email: "",
            address:''
        };
        const phoneRegex = /^[0-9]{10,15}$/; // Adjust based on your requirements
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name) newErrors.name = "Name is required";
        if (!phone) {
            newErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(phone)) {
            newErrors.phone = "Phone number is invalid";
        }
        if (email && !emailRegex.test(email)) {
            newErrors.email = "Email format is invalid";
        }

        return newErrors;
    };

    const handleBooking = async () => {
        const validationErrors = validateInputs();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return message.warning('Please correct the errors before submitting');
        }

        const sMessage = `
            *Booking Request for ${name}*: Apartment: ${apartment}, Current Daily Price: ${price}, Check In: ${checkIn}, Check Out: ${checkOut}, Days: ${nights}, Guests: ${guest}, 
            Email: ${email || 'N/A'}, Phone: ${phone}, Address: ${address || 'N/A'}`.trim().replace(/\n/g, '');

        const whatsappURL = `https://wa.me/2348113828486?text=${encodeURIComponent(sMessage)}`;
        window.open(whatsappURL, '_blank');
    };

    return (
        <>
            <p>Please fill out these fields</p>
            <input
                style={styles.input}
                placeholder="Name"
                required
                onChange={e => {
                    setName(e.target.value);
                    setErrors({ ...errors, name: undefined });
                }}
            />
            {errors.name && <div style={styles.error}>{errors.name}</div>}
            <br />
            <input
                style={styles.input}
                placeholder="Address (optional)"
                onChange={e => {
                    setAddress(e.target.value);
                    setErrors({ ...errors, address: undefined });
                }}
            />
            <br />
            <input
                type="text"
                style={styles.input}
                placeholder="Phone"
                onChange={e => {
                    setPhone(e.target.value);
                    setErrors({ ...errors, phone: undefined });
                }}
            />
            {errors.phone && <div style={styles.error}>{errors.phone}</div>}
            <br />
            <input
                type="email"
                style={styles.input}
                placeholder="Email"
                onChange={e => {
                    setEmail(e.target.value);
                    setErrors({ ...errors, email: undefined });
                }}
            />
            {errors.email && <div style={styles.error}>{errors.email}</div>}
            <br />
            <button className='regBtn' onClick={handleBooking}>Submit</button>
        </>
    );
};
