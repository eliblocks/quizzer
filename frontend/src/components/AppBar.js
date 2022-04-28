import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import useUser from '../hooks/use-user';

export default function QuizzerAppBar() {
  const { user, mutate } = useUser()

  function logout() {
    axios.delete('/users/sign_out')
    .then(() => mutate()) 
  }

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" component={RouterLink} to="/quizzes" sx={{ color: 'white', textDecoration: 'none' }}>
          Quizzer
        </Typography>
        {user.email ?
          <Button color="inherit" onClick={logout}>Logout</Button>
        :
          <Button component={RouterLink} to="/login" sx={{ color: 'white', textDecoration: 'none' }}>
            Login
          </Button>
        }
      </Toolbar>
    </AppBar>
  );
}
