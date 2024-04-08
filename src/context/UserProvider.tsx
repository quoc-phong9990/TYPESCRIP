import { ReactNode, createContext, useReducer } from "react";
import IUser from "../interface/IUser";

// USER
type Prop={
  children : ReactNode
}
export const UserContext = createContext({} as {listUser: any,dispatchUser: any})

export const SET_DATAUS = 'set_data';
export const ADD_DATAUS = 'add_data';
export const EDIT_DATAUS = 'edit_data';
export const DELETE_DATAUS = 'delete_data';

  const initUser = {
    data: [] as IUser[]
  }

  function reducerUser(state: any, action: any) {
    switch (action.type) {
      case SET_DATAUS:
        return {
          ...state,
          data: action.payload
        };
      case ADD_DATAUS:
        return {
          ...state,
          data: [...state.data, action.payload]
        };

      case EDIT_DATAUS:
        return {
          ...state,
          data: state.data.map((item: IUser) => {
            if (item.id == action.payload.id)
              return action.payload;
            else
              return item;
          })
        };
        case DELETE_DATAUS:
          return {
            ...state,
            data : state.data.filter((item: IUser)=>{
              return item.id != action.payload;
            })
          };
          default:
            return state;
    }

  }
  export function UserProvider(prop: Prop){
    const [listUser,dispatchUser] = useReducer(reducerUser,initUser)

    return (
        <UserContext.Provider value={{listUser,dispatchUser}}>
            {prop.children}
        </UserContext.Provider>
        
    )
}