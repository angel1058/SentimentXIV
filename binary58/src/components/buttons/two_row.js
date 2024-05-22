import React, {useContext } from 'react'
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { GlobalStateContext } from '../../state/StateProvider.js';
import { canIncrement } from '../../state/stateFunctions.js';

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

const TwoRowButton = ({disableState, line1, line2 ,dispatchType}) => {
    const { state, dispatch } = useContext(GlobalStateContext);

  return (
    <SlimButton disabled={disableState} onClick = {() => dispatch({type:dispatchType})} >
     <Typography variant="body2" component="div" style={{ fontSize: '0.75rem', lineHeight: 1.2 }}>
        {line1}
      </Typography>
      <Typography variant="caption" component="div" style={{ fontSize: '0.60rem', lineHeight: 1 }}>
        {line2}
      </Typography>
    </SlimButton>
  );
};

export default TwoRowButton;