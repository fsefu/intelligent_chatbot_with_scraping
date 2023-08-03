import React, { Component } from 'react';
import "../Login/login.css";
import Notify from '../toast';
import { toast } from 'react-toastify';
// import { useParams } from "react-router-dom";


class Recover extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newpassword: '',
      confirmpassword:'',
      currentLink:window.location.href,
      // link_key:useParams(),
      // code: "",


    }
  }
  // const { match } = this.props;


  toastOption = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  }


  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    console.log("target Name:" + name);
    if (target.name === "newpassword") {
      const newpassword = event.target.value;
      this.setState({ newpassword });
    }
    if (target.name === "confirmpassword") {
      const confirmpassword = event.target.value;
      this.setState({ confirmpassword });
    }

  }

  recover = async (event) => {
    console.log(this.state.currentLink);
    const {currentLink} = this.state;
    const code = currentLink.substring(currentLink.lastIndexOf('/') + 1);
    const  link = `http://127.0.0.1:8000/reset-password/change-password/${code}`
   console.log(link);
    // console.log(this.state.link_key);

    const current_link = this.state.currentLink;
    const data = { newpassword: this.state.newpassword , confirmpassword: this.state.confirmpassword };
    event.preventDefault();
    fetch(link, {
    // fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 200) {
          // return response.json();
          toast("Password reset successful.", this.toastOption);
        } else if (response.status === 404) {
          throw new Error("There is no account With these email");
        } else {
          throw new Error("Something went wrong.");
        }
      }
      )
      .then(data => {
        console.log('Success:', data);
        localStorage.setItem('token', data.token)
        window.location.href = "http://localhost:3000/admin";
      })
      .catch((error) => {
        console.error('Error:', error.message);
        toast(error.message, this.toastOption);
      });
  }

  render() {
    return (
      <div>
        <Notify />
        <div>
          <div>
            <div className='general-form'>
              <section className="wrapper active">
                  <div className='login-form'>
                    <header className='login-header'>Password Reset</header>
                    <div className="form login">
                      <form method='post' onSubmit={this.recover}>
                          <input
                          type="password"
                          id="newpassword"
                          name="newpassword"
                          defaultValue={this.state.newpassword.password}
                          onChange={this.handleInputChange}
                          placeholder="Enter New Password"
                          required />
                        <input
                          type="password"
                          id="confirmpassword"
                          name="confirmpassword"
                          defaultValue={this.state.confirmpassword.password}
                          onChange={this.handleInputChange}
                          placeholder="Confirm New Password"
                          required />
                        <input type="submit" value="Change Password" />
                      </form>
                    </div>
                  </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Recover;
