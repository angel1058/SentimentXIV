import React, { createContext, useContext, useReducer } from 'react';
import { maxScoreForBits } from '../functions/stateFunctions.js';
/* global BigInt */
// Define the context
export const GlobalStateContext = createContext();

// Define a reducer function
function reducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            if (state.count < maxScoreForBits(state.bits))
                return { ...state, count: state.count + BigInt(1) };
            return state;
        case 'DECREMENT':
            return { ...state, count: state.count - BigInt(1)};
        case 'DOUBLE':
            return { ...state, count: state.count * BigInt(2)};
        case 'ADD_BIT':
            return { ...state, bits: state.bits + 1 , count : BigInt(0)};
        case 'TOGGLE_AUTO':
            return {...state, autoIncrement : !state.autoIncrement};
        default:
            return state;
    }
}

// Create a provider component
export const GlobalProvider = ({ children }) => {
    const initialState = 
    { 
        count: BigInt(0), 
        bits:4,
        autoIncrement:false,
        maxForBits: BigInt(Math.pow(4 , 2)-1)
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
};
