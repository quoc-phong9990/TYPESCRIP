import { ReactNode, createContext,useReducer } from "react";
import IUser from "../interface/IUser";
import IProduct from "../interface/IProduct";
type Prop = {
    children: ReactNode

}
// export const CountContext = createContext({} as { name: string })
export const CountContext = createContext({} as { count: number,dispatch:any })

function reducer(state:any, action:any){
    console.log("action: ", action);
    console.log("state trước: ",state);
    switch(action){
        case "ADD":
            state = state + 1
            break;
        case "DELETE":
            state = state -1;
            break;
        case "RESET":
            state = 0;
            break;
        default: 
            state = state;
    }
    console.log("state sau: ",state);
    return state;
}


  
export function CountProvider(prop: Prop) {
    const [count,dispatch] = useReducer(reducer,0)
    return (
        <CountContext.Provider value={{ count, dispatch }}>
            {prop.children}
        </CountContext.Provider>
    )
}