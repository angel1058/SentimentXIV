import React, {useContext, useState, useEffect, useRef  } from 'react'
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { GlobalStateContext } from '../../state/StateProvider.js';
import { upgradeCost,incrementalComplete} from '../../state/stateFunctions.js';
const SlimButton = styled(Button)({
  border : '1px solid',
  padding: '4px 8px', // Slimline padding
  minWidth: 'auto', // Remove default min-width
  fontSize: '0.75rem', // Adjust the font size as needed
  lineHeight: '1rem', // Adjust the line height for two rows
  textTransform: 'none', // Keep the text as-is, without uppercasing
  display: 'flex',
  flexDirection: 'column', // Arrange text in two rows
  alignItems: 'center'
});

const UpgradeButton = ({upgradeBit, text, incremental, dispatchType}) => 
  {
    const { state, dispatch } = useContext(GlobalStateContext);
    const visible = useRef(false);
    const enabled = useRef(false);
    const powerCost = upgradeCost(state, upgradeBit , incremental)

    useEffect(() => {
      visible.current = state.bits > upgradeBit;
      enabled.current = (state.power >= powerCost) && (!incremental || (incremental && !incrementalComplete(state, upgradeBit)))
     });
      // && (incrementalComplete(state , upgradeBit))   });

 const handleButtonClick = () => {
    dispatch({type:dispatchType , payload:{bit:upgradeBit , cost:powerCost}})
  };

  return (
    visible.current && 
    <SlimButton disabled={!(enabled.current) } onClick = {() => handleButtonClick()} >
     <Typography variant="body2" component="div" style={{ fontSize: '0.75rem', lineHeight: 1.2 }}>
     {text}
      </Typography>
      <Typography variant="caption" component="div" style={{ fontSize: '0.60rem', lineHeight: 1 }}>
        {incremental && incrementalComplete(state,upgradeBit) ? "maxed" : "cost : " + upgradeCost(state,upgradeBit,incremental) + " power"} 
      </Typography>
    </SlimButton>
  );
};

export default UpgradeButton;