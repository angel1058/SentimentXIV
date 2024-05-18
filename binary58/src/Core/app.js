import React, { useContext, useEffect } from 'react';
import BinaryOutput from '../components/binaryOutput';
import { GlobalStateContext } from '../state/StateProvider.js';
import DebugPanel from '../components/debugPanel.js';
import BitBuyer from '../components/bitbuyer.js';

function App() {
  // State hook for managing counter state
  const { state, dispatch } = useContext(GlobalStateContext);

  // Effect hook for updating the document title
  useEffect(() => {
    document.title = `You clicked ${state.count} times`;
  });

  // The component renders a button that updates the state
  return (
    <div>
      <BinaryOutput></BinaryOutput>
     
      <p>{state.count}</p>
      <BitBuyer>kkkk</BitBuyer>
      <DebugPanel></DebugPanel>
      <button onClick={() => dispatch({type:'DOUBLE'})}>double</button>
      <button onClick={() => dispatch({type:'ADD_BIT'})}>add bits</button>
      <button onClick={() => dispatch({type:'TOGGLE_AUTO'})}>toggle auto</button>
      <button onClick={() => dispatch({type:'INCREMENT'})}>increment</button>
    </div>
  );
}

export default App;
