import { checkValid } from "../Types/Types";


export const ValidateForm = ()=>{
    const validateInputs = ({name, email, phone}:checkValid) => {
                    const newErrors:checkValid  = {
                        name: "",
                        phone: "",
                        email: ""
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

                return { validateInputs}
}