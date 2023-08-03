import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import icon_img from "public/images/chatbox-icon.svg";
import chat_logo from "public/images/ic.png";
import send_btn from "public/images/sendrb.png"

class Chatbox extends Component {
  state = {
    boxClassName: "chatbox__support",
    setInputValue: "",
    data: [],
    userQuestion: [],
    messages: {},

  }

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

    // this.setState({userQuestion:input_text});
    // console.log(input_text);
  }

 
  sendToFlask = async (message) => {
    const apiUrl = "http://127.0.0.1:5000/predict";
    await fetch(apiUrl, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        "message": message,
      }),
      headers: {
        "Content-Type": "application/json; charset=UTF-8"
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // const response = data.answer;
        const response = [...this.state.data, data.answer];
        // let msg1 = { name: "bot", message: response }
        // const messages = this.state.messages.push(msg1);
        // this.setState({ messages })

        // const messages = 
        console.log("Here is Response: ", response);
        this.setState({ data: response });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };


  responseFunc = () => {
    <div className="messages__item messages__item--visitor">hello</div>
  }
  // componentDidMount() {
  //   fetch('/predict')
  //     .then(response => response.json())
  //     .then(data => this.setState({ data }));

  //     console.log("Here is response",this.state.data);
  // }


  handleInputChange = (event) => {
    let setInputValue = { ...this.state.setInputValue };
    setInputValue = event.currentTarget.value;
    this.setState({ setInputValue });
    console.log("input: ", setInputValue)
  }

  handleButtonClick = () => {
    console.log("Does this is question: ", this.state.setInputValue);
    // let msgInput = 

    let msg2 = { name: "user", message: this.state.setInputValue }
    // let msg2 = this.state.setInputValue;
    console.log("Here is msg2",msg2);
    // const messages = [...this.state.messages, msg2];
    this.setState({
      // messages: [...this.state.messages, msg2]
      // messages
      messages:{name : "user", message:this.state.setInputValue}
    });
    console.log("message Question is: " + this.state.messages.length);

    for(let i = 0; i < this.state.messages.length; i++){
      console.log("For::",this.state.messages[i])
    }

    this.sendToFlask(this.state.setInputValue);
    // const setInputValue = "";
    // const userQue = [...this.state.userQuestion, this.state.setInputValue]


    // const question = [...this.state.userQuestion, input_text];


    // const latestMessage = this.state.messages[this.state.messages.length - 1].message;
    // console.log("Latest message is: " + latestMessage);



    const setInputValue = "";
    this.setState({ setInputValue });

    // let msg2 = { name: "user", message: userQue };
    // this.setState({ 
    //   messages:[...this.state.messages, msg2]
    // });

    // const latestMessage = this.state.messages[this.state.messages.length - 1].message;
    // console.log("Latest message is: " + latestMessage);

    // this.setState({ setInputValue });
    // this.setState({ userQuestion: userQue });

  }

  responseList = this.state.data.map((d) =>
    <div className="messages__item messages__item--visitor">{d}</div>

  );

  render() {
    return (
      <div className="chatbox">
        {/* <div className="chatbox__support chatbox--active"> */}
        <div className={this.state.boxClassName}>
          <div className="chatbox__header">
            <div className="chatbox__image--header">
              <img
                src={chat_logo}
                alt="image"
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
            {/* <div className="messages__item messages__item--visitor">{this.state.data}</div> */}
            {/* <div> {this.responseList}</div> */}


            {
              this.state.userQuestion.slice().reverse().map((u) =>
                <div className="messages__item messages__item--operator">{u}</div>
              )}

            {
              this.state.data.slice().reverse().map((d) =>
                <div className="messages__item messages__item--visitor">{d}</div>
              )}

            {/* 
{this.state.messages.forEach(function (item, index) {
            if (item.name === "bot") {
                // let typing_indicator = document.getElementsByClassName("typing-indicator");
                
                // html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
                <div className="messages__item messages__item--visitor">{item.message}</div>

                // document.getElementById("typing-indicator").style.display = "block";

            }
            else {
              <div className="messages__item messages__item--operator">{item.message}</div>
              // console.log(item.message);
            }
        })
        } */}

            {/* 
            {
              this.state.messages.map((d) =>
                <div className="messages__item messages__item--visitor">{d}</div>
              )} */}

            <div></div>
          </div>
          <div className="chatbox__footer">
            <input
              value={this.state.setInputValue}
              onChange={this.handleInputChange}
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
                alt="image"
              />
            </button>
          </div>
        </div>
        <div onClick={this.handleButton} className="chatbox__button">
          <button>
            <img
              src={icon_img} alt="Chatbot Icon"
            //   src="{{ url_for('static', filename='images/chatbox-icon.svg') }}"
            />
          </button>
        </div>
      </div>
    );
  }
}

export default Chatbox;