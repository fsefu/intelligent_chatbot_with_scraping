import { useEffect } from 'react';

const UnansQuery = (props) => {
  const data = props.unansweredQue;

  const sendData = async (event) => { // Fixed the variable name from 'singin' to 'signin'
    // const data = { email: this.state.email, password: this.state.password };
    // event.preventDefault();
    fetch('http://127.0.0.1:8000/unsansQuery', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error("Wrong Email or Password");
        } else {
          throw new Error("Something went wrong.");
        }
      })
      .then(data => {
        // Handle the response data here
      })
      .catch((error) => {
        console.error('Error:', error.message);
        // toast(error.message, this.toastOption);
      });
  };
  sendData();
  return null; // or return any JSX if needed
};

export default UnansQuery;
