import React, {useEffect ,useContext } from 'react'
import { GlobalStateContext } from '../../state/StateProvider.js';
import { maxScoreForBits , canIncrement, getIncrement, incrementalComplete} from '../../state/stateFunctions.js';
import styles from './debug.module.css'
/* global BigInt */
const DebugPanel = () =>
{
    const { state, dispatch } = useContext(GlobalStateContext);
    const maxScore = maxScoreForBits(state.bits);
    
    return (
        <div className={styles.debugPanel}>
            <div className={styles.container}>
                <div className={styles.column}>
                    <div>Message : {state.message}</div>
                    <div>binaryOutput    : {state.count.toString()}</div>
                    <div>bits            : {state.bits.toString()}</div>
                    <div>Can Increment : {canIncrement(state) ? 'true' : 'false'}</div>
                    <div>Auto Reset : {state.autoReset ? 'true' : 'false'}</div> 

                </div>
                <div className={styles.column}>
                    <div>incrementAmount : {state.incrementAmount.toString()}</div>
                    <div>incrementDelay  : {state.incrementDelay}</div>
                    <div>bit4set : { state.bit4set ? 'yes' : 'no'}</div>
                    <div>Auto Reset Timer: {state.autoResetTimer.toFixed(1)}</div> 
                    <div>Inc 3 : {getIncrement(state , 3)}</div>
                    <div>Inc 3 Complete: {incrementalComplete(state, 3) ? "Y" : "N"}</div>
                    
                </div>
            </div>
            <div >
                <button onClick={() => dispatch({type:'DOUBLE'})}>double</button>
                <button onClick={() => dispatch({type:'ADD_BIT'})}>add bits</button>
                <button onClick={() => dispatch({type:'TOGGLE_AUTO'})}>toggle auto</button>
                <button onClick={() => dispatch({type:'INCREMENT', payload:1n})}>increment</button>     
                <button onClick={() => dispatch({type:'SHIFT_LEFT'})}>shift left</button>     
                <button onClick={() => dispatch({type:'INCREASE_INCREMENT'})}>increase increment</button>
                <button onClick={() => dispatch({type:'DEBUG_BUY_AUTO_RESET'})}>auto reset</button>
                <button onClick={() => dispatch({type:'DEBUG_REDUCE_RESET_TIME' , payload:0.1})}>reduce reset time</button>
                <button onClick={() => dispatch({type:'ADD_n' , payload:{"count":100 , "bits":6}})}>add 100</button>
                <button onClick={() => dispatch({type:'ADD_n' , payload:{"count":1000 , "bits":10}})}>add 1000</button>
                <button onClick={() => dispatch({type:'ADD_n' , payload:{"count":10000 , "bits":18}})}>add 10000</button>

            </div>
        </div>
    )
}

export default DebugPanel;