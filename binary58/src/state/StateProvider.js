import React, { createContext, useContext, useReducer } from 'react';
import { maxScoreForBits,buttonCost } from './stateFunctions.js';
/* global BigInt */
export const GlobalStateContext = createContext();


function debugReducer(state, action) {
    switch (action.type) {
        case 'DEBUG_REDUCE_RESET_TIME':
            return {...state , autoResetTimer : 0.2 }
        case 'DEBUG_BUY_AUTO_RESET':
            return {...state , 
                autoReset : true,
                increments : state.increments.map((item,i) => i === 3 ? item+1 : item),
                autoResetTimer : state.autoResetTimer - (0.1) }
 }
}

function autoReset(state , action)
{
    if ( state.completeIncrements[action.bit])
        return;

    if ( state.autoResetTimer <= 0.2)
        return {...state , completeIncrements : state.completeIncrements.map((item,i) => i === action.payload.bit ? true : item)};

    return {
        ...state , 
        autoReset : true,
        increments : state.increments.map((item,i) => i === action.payload.bit ? item+1 : item), 
        power : state.power - BigInt(action.payload.cost),
        autoResetTimer : state.autoResetTimerInitialValue - (state.autoResetTimerDelta * state.increments[action.payload.bit]) 
    }
}

function reducer(state, action) {
    if ( action.type.startsWith("DEBUG"))
        return debugReducer(state , action)
    const maxValue = maxScoreForBits(state.bits);
    switch (action.type) {
        case 'BUY_AUTO_RESET': return autoReset(state , action)
        case 'ADD_n':
             return { ...state, bits : state.bits+ action.payload.bits , count: state.count + BigInt(action.payload.count) , power : state.power + BigInt(action.payload.count)}
        case 'TOGGLE_DEBUG':
            return {...state, debugVisible : !state.debugVisible}
        case 'MESSAGE':
            return {...state , message : action.payload}
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
        increments: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        completeIncrements : [false, false, false, false, false, false, false, false, false, false, false, false, false, false],
        message: 'message',
        debugVisible  :true,
        count: BigInt(31), 
        power: BigInt(2000000),
        bits:5,
        autoReset:false,
        autoResetTimerInitialValue:0.6,
        autoResetTimer:1.6,
        autoResetTimerDelta:0.2,
        autoIncrement:true,
        incrementDelay : 1000,
        incrementAmount : BigInt(24),

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
