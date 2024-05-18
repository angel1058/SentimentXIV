import React, {useEffect ,useContext } from 'react'
import { GlobalStateContext } from '../state/StateProvider.js';
import { maxScoreForBits } from '../functions/stateFunctions.js';

/* global BigInt */
function DebugPanel()
{
    const { state, dispatch } = useContext(GlobalStateContext);
    const maxScore = maxScoreForBits(state.bits);
    
    return (
        <div className="fullWidthBackground">
            <div>binaryOutput : {state.count.toString()}</div>
            <div>bits : {state.bits.toString()}</div>
            <div>maxForBits : {maxScoreForBits(state.bits)}</div>
        </div>
    )
}

export default DebugPanel;