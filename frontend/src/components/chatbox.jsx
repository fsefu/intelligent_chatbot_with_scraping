import React, { Component, useState } from 'react';
import './App.css';
import Typing from './typing';
import icon_img from "images/chatbox-icon.svg";
import chat_logo from "images/ic.png";
import send_btn from "images/sendrb.png";
import Feedback from "./feedback";
import News from './news';


class Chatbox extends Component {

  state = {
    boxClassName: "chatbox__support",
    setInputValue: "",
    data: [],
    userQuestion: [],
    messages: [],
    messages2: [],
    msgLength: 0,
    animationTime: true,
    hasAnimated: false,
    isTyping: true, // add a new state variable for typing animation
    liked: false,
    disliked: false,
    feedback: '',
    unsansQue: '',
  }
  // const [unansweredQue, setUnansweredQue] = useState(null);


  handleButton = () => {
    console.log("Pressed");
    if (this.state.boxClassName === "chatbox__support") {
      const boxClassName = "chatbox__support chatbox--active";
      this.setState({ boxClassName })
    }

    if (this.state.boxClassName === "chatbox__support chatbox--active") {
      const boxClassName = "chatbox__support";
      this.setState({ boxClassName })
    }

  }

  handleInput = (event) => {
    const input_text = event.target.value;
    const question = [...this.state.userQuestion, input_text];
    let msg2 = { name: "user", message: question }
    const messages = this.state.messages.push(msg2);
    this.setState({ messages });
    console.log("message Question is " + this.state.messages);
    console.log("Here is question", question);
    this.setState({ userQuestion: question });
    console.log("Here is user Question", this.state.userQuestion);
  }

  sendData = (data) => { 
    console.log("sdjak>>>>>>>>> ", data);
    fetch('http://127.0.0.1:8000/unsansQuery', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "data": data,
      }),
      // body: JSON.stringify(data)
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

  sendToFlask = async (message) => {
    const apiUrl = "http://127.0.0.1:5000/predict";
    await fetch(apiUrl, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
      body: JSON.stringify({
        "message": message,
      }),
      credentials: 'include',

    })
      .then((response) => response.json())
      .then((data) => {

        const response = [...this.state.data, data.news];
        console.log("Here is Response: ", response);
        this.setState(prevState => {

          if (data.news) {
            console.log("this is news: ", data.news);
            return {
              data: [data],
              messages2: [...prevState.messages2, { news: data.news, isUser: false }]
            };

          }
          if (data.events) {
            console.log("this is events: ", data.events);
            return {
              data: [data],
              messages2: [...prevState.messages2, { events: data.events, isUser: false }]
            };
          }
          if (data.unanswered) {
            console.log("I do not understand... ", data.unansweredQue);
           
            this.sendData(data.unansweredQue);
            return {
              data: [data],
              messages2: [...prevState.messages2, { unansQue: data.unanswered, isUser: false }]
            };
          }
          else {
           
            if (data.answer) {
              console.log("Stored>>>>: ", data)
            }
            return {
              data: [...prevState.data, data],
              messages2: [...prevState.messages2, { text: data.answer, isUser: false }]
            };
          }
        });
        this.setState({ isTyping: true });
        this.typingAnimation();
        console.log("Please Message>>>", this.state.messages2);

      })
      .catch((err) => {
        console.log(err.message);
      });
  };



  responseFunc = () => {
    <div className="messages__item messages__item--visitor">hello</div>
  }

  handleInputChange = (event) => {
    let setInputValue = { ...this.state.setInputValue };
    setInputValue = event.currentTarget.value;
    this.setState({ setInputValue });
    console.log("input: ", setInputValue)
  }

  keyHandler = (event) => {
    if (event.keyCode === 13) {
      console.log("Enter key pressed! Sending content:", this.state.setInputValue);
      let setInputValue = event.currentTarget.value;
      this.setState({ setInputValue });
      console.log("The result: ", setInputValue);

      console.log("Does this is question: ", this.state.setInputValue);
      const animationTime = true;
      this.setState({ animationTime });

      this.setState({
        messages2: [...this.state.messages2, { text: this.state.setInputValue, isUser: true }]
      });
      console.log("Please Message2 Que>>>", this.state.messages2);
      this.sendToFlask(this.state.setInputValue);
      setInputValue = "";
      this.setState({ setInputValue });

    }
  }

  handleButtonClick = (event) => {
    console.log("Does this is question: ", this.state.setInputValue);
    const animationTime = true;
    this.setState({ animationTime });

    this.setState({
      messages2: [...this.state.messages2, { text: this.state.setInputValue, isUser: true }]
    });
    console.log("Please Message2 Que>>>", this.state.messages2);
    this.sendToFlask(this.state.setInputValue);
    const setInputValue = "";
    this.setState({ setInputValue });

  }

  typingAnimation = () => {
    setTimeout(() => {
      const animationTime = false;
      this.setState({ animationTime, isTyping: false });

    }, 2000);
  }
  render() {
    const { isTyping } = this.state;
    return (
      <div className="chatbox">
        <div className={this.state.boxClassName}>
          <div className="chatbox__header">
            <div className="chatbox__image--header">
              <img
                src={chat_logo}
                alt="Chatbot Logo"
              />
            </div>
            <div className="chatbox__content--header">
              <h4 className="chatbox__heading--header">
                Chat with Jimma University Bot
              </h4>
              <p className="chatbox__description--header"></p>
            </div>
          </div>
          <div className="chatbox__messages">

            {this.state.messages2.reverse().map((message, index) => {
              if (message.isUser) {
                return (
                  <div key={index}>
                    <div className="messages__item messages__item--operator">{message.text}
                  
                    </div>
                  </div>
                );
              }
              if (message.news) {
                return (
                  <div key={index}>
                    {this.state.animationTime ? (
                      <div>
                        {index === 0 ? (<Typing />) : (<div className="messages__item messages__item--visitor">
                          {message.news.map((item, index) => (
                            <News key={index} data={item} showIntroText={index === 0} />
                          ))}</div>)}
                      </div>                    
                        ) :
                      (
                        <div>
                          <div className="messages__item messages__item--visitor">{<p>Here is some of the latest News about Jimma University</p>}</div>
                          {message.news.reverse().map((item, index) => (
                            <News key={index} data={item} showIntroText={index === 0} />
                          ))}
                        </div>
                      )
                    }
                  </div>
                );
              }

            
            if (message.events) {
                // Render for news message
                if(message.events.noevent){
                  return (
                    <div key={index}>
                      {this.state.animationTime ? (
                        <div>
                          {index === 0 ? (<Typing />) : (
                            <div>
  
                          <div className="messages__item messages__item--visitor">
                            {message.text}
                            </div>
                            </div>
                            )}
                        </div>
                      ) : (
                        <div className="messages__item messages__item--visitor">
                        <div className="message-text">
                          {message.events.noevent}
                        </div>
                        <div>
                        <div className="feedback-container">
                          <Feedback />
                        </div>
                        </div>
                        
                      </div>
                      )}
                    </div>
                  );
                }
                else{

                return (
                  <div key={index}>
                    {this.state.animationTime ? (
                      <div>
                        {index === 0 ? (<Typing />) : (<div className="messages__item messages__item--visitor">
                          {message.events.map((item, index) => (
                            <News key={index} data={item} showIntroText={index === 0} />
                          ))}</div>)}
                      </div>                 
                      ) :
                      (
                        <div>
                          <div className="messages__item messages__item--visitor">{<p>Here is some of the latest Event about Jimma University</p>}</div>
                          {message.events.map((item, index) => (
                            <News key={index} data={item} showIntroText={index === 0} />
                          ))}
                        </div>
                        
                      )
                    }
                  </div>
                );
              }
              }
              if (message.unansQue) {
                return (
                  <div key={index}>
                    {this.state.animationTime ? (
                      <div>
                        {index === 0 ? (<Typing />) : (<div className="messages__item messages__item--visitor">{message.unansQue}</div>)}
                      </div>
                      ) : (
                      <div>
                        <div className="messages__item messages__item--visitor">{message.unansQue}</div>

                      </div>
                    )}
                  </div>
                );
              }
              else {
                return (
                  <div key={index}>
                    {this.state.animationTime ? (
                      <div>
                        {index === 0 ? (<Typing />) : (
                          <div>

                        <div className="messages__item messages__item--visitor">
                          {message.text}
                          </div>
                          </div>
                          )}
                      </div>
                    ) : (
                      <div className="messages__item messages__item--visitor">
                      <div className="message-text">
                        {message.text}
                      </div>
                      <div>
                      <div className="feedback-container">
                        <Feedback />
                      </div>
                      </div>
                    </div>
                    )}
                  </div>
                );
              }
            })}

            <div></div>
          </div>
          <div className="chatbox__footer">
            <input
              value={this.state.setInputValue}
              onChange={this.handleInputChange}
              onKeyDown={this.keyHandler}
              className="msg-input"
              type="text"
              placeholder="Write a message..."
            />
            <button
              disabled={this.state.setInputValue === "" ? true : false}
              onClick={this.handleButtonClick} className="chatbox__send--footer send__button">
              <img
                className="send-button"
                src={send_btn}
                alt="Send Button Image"
              />
            </button>
          </div>
        </div>
        <div onClick={this.handleButton} className="chatbox__button">
          <button>
            <img
              src={icon_img} alt="Chatbot Icon"
            />
          </button>
        </div>
      </div>
    );
  }
}

export default Chatbox;