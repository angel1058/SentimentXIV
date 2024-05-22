import React, {useEffect ,useContext } from 'react'
import { GlobalStateContext } from '../../state/StateProvider.js';
import { maxScoreForBits , canIncrement} from '../../state/stateFunctions.js';
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
                    <div>power    : {state.power.toString()}</div>
                    <div>bits            : {state.bits.toString()}</div>
                    <div>Can Increment : {canIncrement(state) ? 'true' : 'false'}</div>
                    <div>Auto Reset : {state.autoReset ? 'true' : 'false'}</div> 

                </div>
                <div className={styles.column}>
                    <div>maxForBits      : {maxScoreForBits(state.bits)}</div>
                    <div>autoIncrement   : {state.autoIncrement ? 'true' : 'false'}</div>
                    <div>incrementAmount : {state.incrementAmount.toString()}</div>
                    <div>incrementDelay  : {state.incrementDelay}</div>
                    <div>bit4set : { state.bit4set ? 'yes' : 'no'}</div>
                    <div>Auto Reset Timer: {state.autoResetTimer.toFixed(1)}</div> 
                </div>
            </div>
            <div >
                <button onClick={() => dispatch({type:'DOUBLE'})}>double</button>
                <button onClick={() => dispatch({type:'ADD_BIT'})}>add bits</button>
                <button onClick={() => dispatch({type:'TOGGLE_AUTO'})}>toggle auto</button>
                <button onClick={() => dispatch({type:'INCREMENT', payload:BigInt(1)})}>increment</button>     
                <button onClick={() => dispatch({type:'SHIFT_LEFT'})}>shift left</button>     
                <button onClick={() => dispatch({type:'INCREASE_INCREMENT'})}>increase increment</button>
                <button onClick={() => dispatch({type:'BUY_AUTO_RESET'})}>auto reset</button>
                <button onClick={() => dispatch({type:'REDUCE_RESET_TIME' , payload:0.1})}>reduce reset time</button>
            </div>
        </div>
    )
}

export default DebugPanel;