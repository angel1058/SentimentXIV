import React, { createContext, useContext, useReducer } from 'react';
import { maxScoreForBits,buttonCost } from './stateFunctions.js';
/* global BigInt */
export const GlobalStateContext = createContext();

function reducer(state, action) {
    const maxValue = maxScoreForBits(state.bits);
    switch (action.type) {
        case 'TOGGLE_DEBUG':
            return {...state, debugVisible : !state.debugVisible}
        case 'MESSAGE':
            return {...state , message : action.payload}
        case 'REDUCE_RESET_TIME':
            return {...state , autoResetTimer : state.autoResetTimer - action.payload}
        case 'BUY_AUTO_RESET':
            if ( state.autoReset)
                {
                    return {...state , autoResetTimer : state.autoResetTimer - (0.1 * (state.autoResetLevel + 1)) , autoResetLevel : state.autoResetLevel + 1}
                }
            return {...state, autoReset : true}
        case 'RESET':
            return {...state, count : 0n}
        case 'INCREASE_INCREMENT':
            return {...state , incrementAmount : state.incrementAmount + 1n}
        case 'INCREMENT':
            if (state.count < maxValue)
                {
                    let oldValue = state.count;
                    let newValue = state.count + action.payload
                    const bitValueNew = (newValue >> 3n) & 1n;
                    const bitValueOld = (oldValue >> 3n) & 1n;
                return { ...state, count: newValue , power : state.power + action.payload , bit4set : bitValueNew === 1n && bitValueOld === 0n};
                }
            return state;    
        case 'ADD_BIT':
            return { ...state, bits: state.bits + 1 , count : 0n , power : state.power - BigInt(buttonCost(state))};
        case 'TOGGLE_AUTO':
            return {...state, autoIncrement : !state.autoIncrement};
        case 'SHIFT_LEFT':
            const shiftedValue = state.count << BigInt(1);
            if ( shiftedValue < maxValue)
                {
                    let delta = shiftedValue - state.count;
                    return {...state, count: shiftedValue , power : state.power + delta};
                }
            return state;
        default:
            return state;
    }
}

// Create a provider component
export const GlobalProvider = ({ children }) => {
    const initialState = 
    { 
        message: 'message',
        debugVisible  :true,
        count: BigInt(0), 
        power: BigInt(0),
        bits:1,
        autoReset:false,
        autoResetTimer:10.0,
        autoResetLevel:1,
        autoIncrement:true,
        incrementDelay : 1000,
        incrementAmount : BigInt(1),

        maxForBits: BigInt(Math.pow(4 , 2)-1),
        bit4set : true
    };
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <GlobalStateContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalStateContext.Provider>
    );
};
