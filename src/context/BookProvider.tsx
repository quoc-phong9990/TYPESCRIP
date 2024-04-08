import React, { ReactNode, createContext, useReducer } from 'react';
import IBook from '../interface/IBook';

type Prop = {
  children: ReactNode;
};

export const BookContext = createContext({} as { listbook: any; dispatchBook: any });
export const SET_DATA = 'set_data';
export const ADD_DATA = 'add_data';
export const EDIT_DATA = 'edit_data';
export const DELETE_DATA = 'delete_data';

const initBook = {
  data: [] as IBook[],
};

function reducerBook(state: any, action: any) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_DATA:
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case EDIT_DATA:
      return {
        ...state,
        data: state.data.map((item: IBook) => {
          if (item.id === action.payload.id) return action.payload;
          else return item;
        }),
      };
    case DELETE_DATA:
      return {
        ...state,
        data: state.data.filter((item: IBook) => item.id !== action.payload),
      };
    default:
      return state;
  }
}

export const BookProvider = (props: Prop) => {
  const [listbook, dispatchBook] = useReducer(reducerBook, initBook);
  return (
    <BookContext.Provider value={{ listbook, dispatchBook }}>
      {props.children}
    </BookContext.Provider>
  );
};
  