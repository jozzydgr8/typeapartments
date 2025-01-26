import { createContext, useReducer } from "react";
import { contextType } from "../Types/Types";
export type valueProps = {
    state:stateProps | null,
    dispatch: React.Dispatch<actionProps>
}
type contextProps = {
    children:React.ReactNode
}
export type stateProps = {
    data:contextType[] | null,
    loading:boolean
}
type actionProps = dataAction | loadAction;

type dataAction = {
    payload:contextType[] ,
    type:'getData' 
}
type loadAction = {
    payload: boolean,
    type:'loading'
}
const initialState = {
    data:null,
    loading:false
}
export const Context = createContext({}as valueProps)
const reducer = (state:stateProps, action:actionProps) =>{
    switch(action.type){
        case'getData':
        return {...state, data:action.payload}
        case'loading':
        return {...state, loading:action.payload}
        default : return state
    }
}
export const ContextData = ({children}:contextProps)=>{
    const [state, dispatch] = useReducer(reducer, initialState)
    return <Context.Provider value={{state, dispatch}}>
        {children}
    </Context.Provider>
}