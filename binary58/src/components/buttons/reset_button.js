import React, {useContext, useState, useEffect, useRef  } from 'react'
import { Button, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { GlobalStateContext } from '../../state/StateProvider.js';

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

const ResetButton = ({disableState, line1, line2 ,dispatchType}) => 
  {
    const { state, dispatch } = useContext(GlobalStateContext);
    const [timeLeft, setTimeLeft] = useState(state.autoResetTimer); // Example countdown time in seconds
    const timerRef = useRef(null);

    useEffect(() => {
      if (state.autoReset) {
        startTimer();
      } else {
        stopTimer();
      }
      return () => stopTimer();
  });

  const startTimer = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0.1) {
          stopTimer();
          handleButtonClick();
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

 const handleButtonClick = () => {
    stopTimer();
    setTimeLeft(state.autoResetTimer); // Reset to initial time
    dispatch({type:dispatchType})
  };

  return (
    <SlimButton disabled={disableState} onClick = {() => handleButtonClick()} >
     <Typography variant="body2" component="div" style={{ fontSize: '0.75rem', lineHeight: 1.2 }}>
     {line1} (reset in {timeLeft.toFixed(1)}s)
      </Typography>
      <Typography variant="caption" component="div" style={{ fontSize: '0.60rem', lineHeight: 1 }}>
        {line2}
      </Typography>
    </SlimButton>
  );
};

export default ResetButton;