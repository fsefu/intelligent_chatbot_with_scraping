import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './feedback.css'
import axios from 'axios'; // Import the Axios library

import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';

class Feedback extends Component {
    state = {
        liked: false,
        disliked: false,
        feedbackInput: '',
        incorrect: false,
        dontUnderstand: false,
        unclear: false
    }
   
    handleLikeClick = () => {
        const { liked, disliked } = this.state;
        if (liked === false) {
            this.setState({ disliked: false })
            this.setState({ liked: true });
        }
        
    };

    handleDislikeClick = () => {
        const { liked, disliked } = this.state;
        if (disliked === false) {
            this.setState({ disliked: true })
            this.setState({ liked: false });
        }
    };

    handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        this.setState({ [name]: checked });
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    submitHandler = () => {
        // Retrieve the data from the state
        const { liked, disliked, feedbackInput, incorrect, dontUnderstand, unclear } = this.state;
      
        // Create a data object with the necessary information
        const data = {
          liked,
          disliked,
          feedbackInput,
          incorrect,
          dontUnderstand,
          unclear
        };
      
        // Make an HTTP POST request to the server
        fetch('http://127.0.0.1:8000/feedback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              // Handle the response from the server
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Request failed.');
              }
            })
            .then((responseData) => {
              // Handle the response data from the server
              console.log(responseData);
            })
            .catch((error) => {
              // Handle any errors that occur during the request
              console.error(error);
            });

            // const { liked, disliked } = this.state;
            if (liked === false) {
                this.setState({ disliked: false })
                this.setState({ liked: false });
            }
            window.location = "http://localhost:3000/";

      };
    render() {
        const { incorrect, dontUnderstand, unclear } = this.state;
        console.log("Feedback component rendered. State:", this.state);

        return (
            <div>
            
                <Popup 
                    trigger={
                        <div className="feedback">

                            <button onClick={this.handleLikeClick} disabled={this.state.liked}>


                                {this.state.liked ? <FaThumbsUp scolor="green" /> : <FaThumbsUp/>}
                           {/* {<FaThumbsUp scolor="green" /> } */}
                            </button>
                            <button onClick={this.handleDislikeClick} disabled={this.state.disliked}>
                                {this.state.disliked ? <FaThumbsDown color="red" /> : <FaThumbsDown />}
                            </button>
                        </div>
                    }
                    position="top center"
                >
                    <div className="feedback_container">
                    <form>
                        <input
                            type="text"
                            name="feedbackInput"
                            value={this.state.feedbackInput}
                            placeholder="Write your feedback?"
                            onChange={this.handleInputChange}
                        />
                        <div className="checkbox-label">
                               <label>
                               {/* <label htmlFor="incorrectid">This isn't true</label> */}

                                <input
                                    type="checkbox"
                                    name="incorrect"
                                    id='incorrectid'
                                    checked={incorrect}
                                    onChange={this.handleCheckboxChange}
                                />
                                This isn't true
                            </label>
                            
                            <label>
                                
                                <input
                                    type="checkbox"
                                    name="dontUnderstand"
                                    checked={dontUnderstand}
                                    onChange={this.handleCheckboxChange}
                                />
                                I didn't understand the response.
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="unclear"
                                    checked={unclear}
                                    onChange={this.handleCheckboxChange}
                                />
                                The response is unclear.
                            </label>
                            </div>
                        <button className="feedback_button" type="button" onClick={this.submitHandler}>
                            Submit
                        </button>
                    </form>
                    </div>
                </Popup>
            </div>
        );
    }
}

export default Feedback;
