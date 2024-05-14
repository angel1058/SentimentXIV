import React, { createContext, useContext, useReducer } from 'react';
/* global BigInt */
// Define the context
export const GlobalStateContext = createContext();

// Define a reducer function
function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + BigInt(1) };
        case 'DECREMENT':
            return { ...state, count: state.count - BigInt(1)};
        case 'DOUBLE':
            return { ...state, count: state.count * BigInt(2)};
        default:
            return state;
    }
}

// Create a provider component
export const GlobalProvider = ({ children }) => {
    const initialState = { count: BigInt(0) };
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
};
