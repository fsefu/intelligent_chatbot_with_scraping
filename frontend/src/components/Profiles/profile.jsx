import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Notify  from '../toast';
import {toast} from 'react-toastify';

// import { makeStyles } from '@mui/styles';

import { makeStyles } from '@material-ui/core/styles' 


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(2),
  },
  formField: {
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
  },
  successMessage: {
    marginTop: theme.spacing(2),
    color: theme.palette.success.main,
  },
}));

const toastOption = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  }

const Profile = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [oldpass, setOldPass] = useState('');
  const [newpass, setNewPass] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showCircular, setshowCircular] =useState(false)

  // const handleEmailChange = (event) => {
  //   setEmail(event.target.value);
  // };

  const handleOldPassChange = (event) => {
    setOldPass(event.target.value);
  };

  const handleNewPassChange = (event) => {
    setNewPass(event.target.value);
  };

  const handleConfirmPassChange = (event) => {
    setConfirmPass(event.target.value);
  };

  const handleSubmit = (event) => {
    setshowCircular(true);
    event.preventDefault();

    // Create an object with the form data
    const formData = {
      token: localStorage.getItem('token'),
      oldpass: oldpass,
      newpass: newpass,
      confirmpass: confirmpass
    };

    // Send the form data to the server
    fetch('http://localhost:8000/profile_update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(response => {
        if(response.status === 200){
          setshowCircular(false);
          // setSuccessMessage('Profile updated successfully.');
          toast("You have succeessfully changed your password",this.toastOption );
          navigate('/login');
          console.log(response.message)
        }
        if(response.status === 403){
           setSuccessMessage("All input is required")
        }
        if(response.status === 402){
          setSuccessMessage("You have Entered Different New Password and Confirm New Password");
        }

    } )
      .catch(error => {
        console.error('Error:', error);
        setSuccessMessage('An error occurred. Please try again.');
      });
  };

  return (
    <div>
    <Notify/>
    <Box className={classes.root}>
      <Typography variant="h4">Change Your Password</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          type="password"
          label="Enter Old Password"
          value={oldpass}
          onChange={handleOldPassChange}
          required
          fullWidth
          className={classes.formField}
        />
        <TextField
          type="password"
          label="Enter New Password"
          value={newpass}
          onChange={handleNewPassChange}
          required
          fullWidth
          className={classes.formField}
        />
        <TextField
          type="password"
          label="Confirm New Password"
          value={confirmpass}
          onChange={handleConfirmPassChange}
          required
          fullWidth
          className={classes.formField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submitButton}
        >
          Change Password
        </Button>
      </form>
      {/* {successMessage && (
        <Typography variant="body1" className={classes.successMessage}>
          {successMessage}
        </Typography>
      )} */}
    </Box>
    </div>
  );
};

export default Profile;
