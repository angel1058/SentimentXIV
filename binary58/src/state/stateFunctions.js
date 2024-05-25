/* global BigInt */
import { GlobalStateContext } from './StateProvider.js'


const maxScoreForBits = (bits) => {
    return Math.pow(2,bits) - 1;
  };

const calculateDelay = (incrementAmount) =>
    {
        
        let interval = 0;
        if ( incrementAmount < BigInt(2))
            interval =  1000;
        else if ( incrementAmount > BigInt(9))
            interval = 100;
        else
            interval = Number(BigInt(1000) / incrementAmount)

        //now calculate value per interval
        const intervalCount = BigInt(1000) / BigInt(interval)
        const deltaPerInterval = incrementAmount / intervalCount;
        const remainder = incrementAmount - ( intervalCount * deltaPerInterval)
        
        return {interval, deltaPerInterval, intervalCount , remainder}
        }

const incrementalComplete = (state , bit) => { return state.completeIncrements[bit]}
const getIncrement = (state, bit) =>    { return state.increments[bit] }
const canIncrement = (state) =>  { return state.count < maxScoreForBits(state.bits)   }
const canAfford    = (state) =>  { return state.power >= buttonCost(state)}
const buttonCost   = (state) =>  { return Math.pow(state.bits, 5) }
const upgradeCost  = (state, bit , incremental) =>  
    {
        const thisBit = bit ;   
        return Math.pow(thisBit, thisBit )* (incremental ? (getIncrement(state , bit)+1) **(bit) : 1n) 
    }
export {maxScoreForBits, incrementalComplete,calculateDelay,canIncrement ,buttonCost,canAfford,upgradeCost,getIncrement}