import { ReactNode, createContext, useReducer } from "react";
import IProduct from "../interface/IProduct";

type Prop={
    children : ReactNode
}

export const ProductContext = createContext({} as {listProduct: any,dispatchProduct: any})

// biến action.type
export const SET_DATA = 'set_data';
export const ADD_DATA = 'add_data';
export const EDIT_DATA = 'edit_data';
export const DELETE_DATA ='delete_data';

const initProduct={
    data : [] as IProduct[],
}
function reducerProduct(state:any, action:any){
    switch(action.type){
        case SET_DATA:
          return {
            ...state,
            data : action.payload
          };
        case ADD_DATA:
          return {
            ...state,
            data : [...state.data, action.payload]
          };
        case EDIT_DATA:
          return {
            ...state,
            data : state.data.map((item: IProduct)=>{
              if(item.id == action.payload.id)
                return action.payload;
              else
                return item;
            })
          };
        case DELETE_DATA:
          return {
            ...state,
            data : state.data.filter((item: IProduct)=>{
              return item.id != action.payload;
            })
          };
        default: 
          return state;
      }
}

export function ProductProvider(prop: Prop){
    const [listProduct,dispatchProduct] = useReducer(reducerProduct,initProduct)

    return (
        <ProductContext.Provider value={{listProduct,dispatchProduct}}>
            {prop.children}
        </ProductContext.Provider>
    )
}