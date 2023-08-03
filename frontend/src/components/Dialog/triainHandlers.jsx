import { React, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./triainHandlers.css";
// import { useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Notify from '../toast';
import { Box, CircularProgress } from '@mui/material';


const TrainHandlers = (props) => {
  const [serverResponse, setServerResponse] = useState('');
  // const [id, setid] = useState(null);
  // console.log("this passed id:", props.id);
  const { selectedQuestionId } = props;
  const { selectedQuestion } = props;
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

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

  const handleClose = () => {
    console.log("Yes Button is Pressed")
    setClicked(true);
    setLoading(true);
    fetch('http://127.0.0.1:5000/train', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          setLoading(false);
          props.handleAnswerButton();
          toast("Thanks for supporting me, Training was completed successfully!!", toastOption);
          return response.json();
        } else if (response.status === 400) {
          throw new Error("Invalid JSON format, please try to check it again and try again.");
        } else if (response.status === 400) {
          throw new Error("Server Error, please try again.");
        } else {
          throw new Error("Something went wrong, please try again.");
        }
      })
      .catch(error => {
        console.error('Error:', error.message);
        setLoading(false);
        toast("raining was failed instead it will use the previous one", toastOption);

      });
  };

  const handleCloseButton = () => {
    props.handleAnswerButton();
  }
  console.log("this is server Response" + serverResponse);
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


  // const [inputFieldValue, setinputFieldValue] = useState(defaultValue);

  // const handleInputChange = (event) => {
  //   setinputFieldValue(event.target.value);
  //   setHasChanged(true);
  //   console.log(inputFieldValue);
  // };

  const cancelButtonStyle = ({
    backgroundColor: '#e16527',
    color: 'white',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#f6cf87',
    },
  });
  const submitButtonStyle = ({
    backgroundColor: '#154c79',
    color: 'white'
  });

  return (

    <div>
      <Notify />
      <div>

        <div>

        {clicked && loading ? (
        <Dialog open={true}>
      <DialogContent>
      <div className="custom-dialog-content">
          <div className="dialog-inner-content">
            <h2>Chatbot are on training Please wait...</h2>
            <CircularProgress color="secondary" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
      ) : null}


        {!clicked && !loading ? (
        <Dialog
          maxWidth="sm"
          open={props.open}
          onClose={handleClose}
          PaperProps={{
            style: {
              minHeight: '400px', // Set the desired height
              borderRadius: '20px',
              backgroundColor: '#f5c6ee'
            },
          }}
        >
        {/* <div>
              {clicked && loading ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100vh"
                >
                  <div>
                    <h2>Please wait...</h2>
                    <CircularProgress color="secondary" />
                  </div>
                </Box>
              ) : null}

            </div> */}

         <DialogTitle>Welcome To Train Page</DialogTitle>
          <DialogContent>
            
            <DialogContentText>
              <p>There is new data available that needs to be incorporated into the training process. I kindly request your assistance in providing the necessary training.</p>
              <h3>Would you like to update ?</h3>
            </DialogContentText>
          </DialogContent>
          <div className="actions-container">
            <DialogActions>
              <Button style={cancelButtonStyle} onClick={handleCloseButton} className='cancel-button'>Later</Button>
              <span className={"submit-button"}>
                <Button onClick={handleClose}
                >Yes</Button>
              </span>
            </DialogActions>
          </div>
        </Dialog>
        ): null}

        </div>
      </div>
    </div>
  );
};

export default TrainHandlers;
