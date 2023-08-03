import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./answer.css";
import { useState } from 'react';
import {toast} from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notify  from '../toast';


const AnswerForm = (props) => {
  const [serverResponse, setServerResponse] = useState('');
  // const [id, setid] = useState(null);
  // console.log("this passed id:", props.id);
  const { selectedQuestionId } = props;
  const {selectedQuestion} = props;
  console.log("Selected question>>>> ", selectedQuestion);
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

  const handleQue = (selectedQuestionId) => {
    try {
        fetch('http://127.0.0.1:8000/answer_update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: selectedQuestionId }),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      
    } catch (error) {
      console.error(error);
    }
  
  }
  const handleClose = () => {
      // Send the data to the server
    fetch('http://127.0.0.1:5000/merge_json' ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: inputFieldValue }),
      // body: { data: inputFieldValue }
    })
      .then(response => {
        if (response.ok) {
          handleQue(selectedQuestionId);
          props.handleAnswerButton();
          toast("Thanks for supporting me make sure you have also train",toastOption );
          return response.json();
        } else if (response.status === 400) {
          throw new Error("Invalid JSON format please try to check it again and try again.");
        } else if(response.status === 400) {
          throw new Error("Server Error, please try again.");
        }
        else{
          throw new Error("Something went wrong, please try again.");
        }
      }
      ).catch(error => {
        // Handle any error that occurred during the request
        console.error('Error:', error.message);
        toast(error.message,toastOption );

      });
  
    // props.handleAnswerButton();
  };
  const handleCloseButton = () =>{
    props.handleAnswerButton();
  }
  console.log("this is server Response"+serverResponse);
  let defaultValue = `{
    "tag": "greeting",
    "patterns": [
         "Hi",
         "Hey",
         "how you all doing",
         "how you doing",
         "hey there",
         "How are you",
         "Is anyone there?"
    ],
    "responses": [
         "Hey :-)",
         "Hello, thanks for visiting",
         "Hi there, what can I do for you?",
         "Hi there, how can I help?",
         "Hi there, what can I help you?",
         "Hello Welcome, How can I be of your service?"
    ]
  }`;
  const [hasChanged, setHasChanged] = useState(false);


  const [inputFieldValue, setinputFieldValue] = useState(defaultValue);

  const handleInputChange = (event) => {
    setinputFieldValue(event.target.value);
    setHasChanged(true);
    console.log(inputFieldValue);
  };
  
  const cancelButtonStyle = ({
    backgroundColor:'#e16527',
     color: 'white',
     transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: '#f6cf87',
        },
  });
  const submitButtonStyle = ({
    backgroundColor:'#154c79',
     color: 'white' 
  });

  return (
    <div>
        <Notify/>
    <div>
      <Dialog
        maxWidth="md"
        open={props.open}
        onClose={handleClose}
        PaperProps={{
          style: {
            minHeight: '600px', // Set the desired height
            borderRadius: '20px',
            backgroundColor: '#f5c6ee'
          },
        }}
      >
        <DialogTitle>Give the Answer For Question ({(selectedQuestion)} ?)</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>"Hello! If you have any answer for asked question, please submit your answer using the form provided below. I'll be happy to get from help you!"</p>
            <p><span style={{ color: "red" }}>Note:</span>Also don't forget to train it !!</p>
          </DialogContentText>
          <textarea defaultValue={inputFieldValue} className="code-input" onChange={handleInputChange} />
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button style={cancelButtonStyle} onClick={handleCloseButton} className='cancel-button'>Cancel</Button>
          <span  className={`submit-button ${!hasChanged ? 'disabled-button' : ''}`}>
          <Button onClick={handleClose} disabled={!hasChanged}
           
          >Submit</Button>
          </span>
        </DialogActions>
      </Dialog>
    </div>
    </div>

  );
};

export default AnswerForm;
