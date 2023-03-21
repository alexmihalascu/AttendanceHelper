import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography, Box } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(to right, #283c86, #45a247)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(3),
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.background.paper,
    boxShadow: theme.shadows[4],
    minWidth: 300,
  },
  submit: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1.5),
    width: '100%',
    borderRadius: theme.shape.borderRadius,
    background: 'linear-gradient(to right, #283c86, #45a247)',
    color: theme.palette.text.primary,
    '&:hover': {
      background: 'linear-gradient(to right, #45a247, #283c86)',
    },
  },
}));

const LoginPage = ({ setIsAuthenticated }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'tesla' && password === 'modelx') {
      setIsAuthenticated(true);
      navigate('/schedule');
    } else {
      console.log('Invalid username or password');
    }
  };

  return (
    <Box className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          margin="normal"
          required
          autoFocus
        />
        <TextField
          label="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          margin="normal"
          type="password"
          required
        />
        <Button type="submit" variant="contained" className={classes.submit}>
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginPage;
