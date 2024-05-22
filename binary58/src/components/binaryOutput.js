import React, {useEffect ,useContext ,useRef} from 'react'
import { GlobalStateContext } from '../state/StateProvider.js';
import { calculateDelay } from '../state/stateFunctions.js';
/* global BigInt */
function BinaryOutput()
{
    const { state, dispatch } = useContext(GlobalStateContext);
    const intervalsCalled = useRef(0);
    const remainderStore = useRef(0);
    useEffect(() =>
    {
        if ( !state.autoIncrement)
            return;
        let intervalData = calculateDelay(state.incrementAmount); 
        if ( remainderStore.current == BigInt(0))
            remainderStore.current = intervalData.remainder;

        //get the four values - set them to state
        const IntervalId = setInterval(() => 
            { 
                console.log("Ha");
                intervalsCalled.current = intervalsCalled.current + 1
                if (intervalsCalled.current >= intervalData.intervalCount)
                {
                    intervalsCalled.current = 0;
                }
                else
                {
                    if (remainderStore.current > BigInt(0) )
                            {
                                dispatch({type:'INCREMENT', payload: BigInt(1)});
                                remainderStore.current -= BigInt(1);
                            }
                    }
                

                dispatch({type : 'MESSAGE' , payload:'' +intervalData.deltaPerInterval + ' ' + remainderStore.current + ' ' + intervalsCalled.current})
                dispatch({ type: 'INCREMENT',payload:intervalData.deltaPerInterval })},intervalData.interval);
                
        return () => clearInterval(IntervalId);
    })
    
    return (
        <div>
            <div className="fullWidthBackground">     {state.count.toString(2).padStart(state.bits,"0")}        </div>
            <div className="fullWidthBackground">     {"Power : " + state.power}        </div>
        </div>
    )
}

export default BinaryOutput;