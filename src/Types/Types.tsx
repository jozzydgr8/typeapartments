import { Dayjs } from "dayjs"

export type contextType ={
    id:string
    fileUrls:{
        url?:string,
    }[]
    title:string,
    daily:string,
    overview:string
} 

export type checkValid = {
    name:string,
    phone:string,
    email:string,
}

export type bookingType = {
    id: string;
  checkIn: Dayjs;
  checkOut: Dayjs;
}





