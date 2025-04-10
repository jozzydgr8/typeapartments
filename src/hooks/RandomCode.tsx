export const RandomCode = ()=>{
    return Math.random().toString(36).substring(2, 8).toLocaleUpperCase();
}