import React, { useContext, useEffect } from 'react';
import BinaryOutput from '../components/binaryOutput';
import { GlobalStateContext } from '../state/StateProvider.js';


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
      <p>You clicked {state.count} times</p>

      <button onClick={() => dispatch({type:'DOUBLE'})}>
        Click me
      </button>
    </div>
  );
}

export default App;
