import React, {useEffect ,useContext } from 'react'
import { GlobalStateContext } from '../state/StateProvider.js';

/* global BigInt */
function BinaryOutput()
{
    const { state, dispatch } = useContext(GlobalStateContext);

    useEffect(() =>
    {
        const IntervalId = setInterval(() => { dispatch({ type: 'INCREMENT' })},10);
        return () => clearInterval(IntervalId);
    })
    return (
        <div className="fullWidthBackground">
            {state.count.toString(2).padStart(64,"0")}
        </div>
    )
}

export default BinaryOutput;