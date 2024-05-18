import React, {useEffect ,useContext } from 'react'
import { GlobalStateContext } from '../state/StateProvider.js';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import styles from './styles/button.module.css'
/* global BigInt */
function BitBuyer()
{
    const { state, dispatch } = useContext(GlobalStateContext);

    return (
        <div>
            
            <Button className={styles.buttonFull} variant='outlined'>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <div className={styles.buyButtonTop}>Buy Bit 2</div>
                    <div className={styles.buyButtonBottom}>Cost 120231</div>
                </Box>
            </Button>
        </div>
    )
}

export default BitBuyer;