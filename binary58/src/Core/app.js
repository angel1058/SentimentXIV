import React, { useContext, useEffect } from 'react';
import BinaryOutput from '../components/binaryOutput';
import { GlobalStateContext } from '../state/StateProvider.js';
import DebugPanel from '../components/debug/debugPanel.js';
import TwoRowButton from '../components/buttons/two_row.js';
import ResetButton from '../components/buttons/reset_button.js'
import { canIncrement,buttonCost,canAfford,upgradeCost } from '../state/stateFunctions.js';
import {  Box } from '@mui/material';
/* global BigInt */
const App = () => {
  // State hook for managing counter state
  const { state, dispatch } = useContext(GlobalStateContext);

  // The component renders a button that updates the state
  return (
    <div>
      <BinaryOutput></BinaryOutput>
     <Box sx={{ display: 'flex', gap: 1 }}>
      {<TwoRowButton disableState={!(state.power >= buttonCost(state))} line1={"BUY BIT " + state.bits} line2={buttonCost(state) + " power"} dispatchType="ADD_BIT"/>}
      {!canIncrement(state) && <ResetButton line1="Reset Binary" line2="Does not reset power" dispatchType="RESET"/>}
      </Box>

      <Box sx={{ paddingTop:'10px', display: 'flex', gap: 1 }}>
      {state.bits > 2 && <TwoRowButton disableState={!(state.power >= upgradeCost(state))} line1={"Auto Reset"} line2={upgradeCost(state) + " power"} dispatchType="BUY_AUTO_RESET"/>}
      </Box>

      
      {state.debugVisible && <DebugPanel></DebugPanel>}
      <button onClick={() => dispatch({type:'TOGGLE_DEBUG'})}>debug</button>
     
    </div>
  );
}

export default App;
