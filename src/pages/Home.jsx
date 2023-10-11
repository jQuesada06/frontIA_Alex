import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './Home.css'
import AccountMenu from '../components/AccountSettings';
import RecognizeEmotions from './RecognizeEmotions';

export default function MenuAppBar(props) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            IA
          </Typography>
          <AccountMenu setLogged={props.setLogged}></AccountMenu>
        </Toolbar>
      </AppBar>
      <RecognizeEmotions></RecognizeEmotions>
    </Box>
  );
}