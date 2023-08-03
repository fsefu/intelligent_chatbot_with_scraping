import React, { Component } from 'react';
import "./login.css";
import Notify from '../toast';
import { toast } from 'react-toastify';
import { Box, CircularProgress } from '@mui/material';



class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      passwordError: '',
      password: '',
      activeClass: 'wrapper active',
      isLogged: false,
      locations: [],
      isForgetPage: false,
      isEmailSent: false,
      isCircularProgress: false
    }
  }
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

  componentDidMount() {
    const token = localStorage.getItem('token');
    console.log("this is token: " + token);
    const data = "hello";
    fetch('http://127.0.0.1:8000/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        console.log("Status:", data.message);
        if (data.message === "success") {
          const isLogged = true;
          this.setState({ isLogged })
          const newLocations = [...this.state.locations, "http://localhost:3000/admin"];
          this.setState({ locations: newLocations });
          window.location.href = newLocations[newLocations.length - 1];
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }
  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    console.log("target Name:" + name);
    if (target.name === "password") {
      const password = event.target.value;
      this.setState({ password });
      const passwordError = this.validatePassword(password);
      this.setState({ passwordError });
    }
    if (target.name === "username") {
      const username = event.target.value;
      this.setState({ username });
    }

    if (target.name === "email") {
      const email = event.target.value;
      this.setState({ email });
    }

  }

  setEmptyValue = (event) => {
    const name = event.target.name
    document.getElementById(name).value = "";
  }
  handleForm = () => {
    if (this.state.activeClass === "wrapper") {
      const activeClass = "wrapper active";
      this.setState({ activeClass });
    }
    if (this.state.activeClass === "wrapper active") {
      const activeClass = "wrapper";
      this.setState({ activeClass });
    }
  }
  validatePassword = (password) => {
    // Add your password validation rules here
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }

    // Add more validation rules as needed

    return ''; // Empty string indicates no error
  };

  singin = async (event) => {
    const data = { email: this.state.email, password: this.state.password };
    event.preventDefault();
    fetch('http://127.0.0.1:8000/login', {
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
          this.setState({ password: '' })
          throw new Error("Wrong Email or Password");
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


  resetPassword = async (event) => {
    const data = { email: this.state.email };
    const isCircularProgress = true;
    this.setState({ isCircularProgress });
    console.log("reset password: ", data.email);
    event.preventDefault();
    fetch('http://127.0.0.1:8000/reset-password', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        if (response.status === 200) {
          const isCircularProgress = false;
          this.setState({ isCircularProgress });
          this.setState({ isEmailSent: true })
          // navigate('/login')
          // return response.json();
        } else if (response.status === 404) {
          throw new Error("This account not found");
        } else if (response.status === 500) {
          throw new Error("Failed to send password reset email.");
        }
        else {
          throw new Error("Something become wrongs");
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
        // toast(error.message, this.toastOption);
      });

  }

  pageHandler = () => {
    console.log("is Clicked");
    if (this.state.isForgetPage === false) {
      this.setState({ isForgetPage: true });
    }
    if (this.state.isForgetPage === true) {
      this.setState({ isForgetPage: false });
    }
  }

  render() {
    return (
      <div>
        <Notify />
        <div>

          <div>
            <div className='general-form'>
              <section className="wrapper active">
                {!this.state.isForgetPage ? (
                  <div className='login-form'>
                    <header className='login-header'>Login</header>
                    <div className="form login">
                      <form method='post' onSubmit={this.singin}>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          defaultValue={this.state.email}
                          onChange={this.handleInputChange}
                          placeholder="Email address"
                          required />
                        <input
                          type="password"
                          id="password"
                          name="password"
                          defaultValue={this.state.password}
                          onChange={this.handleInputChange}
                          placeholder="Password"
                          required />
                        {this.state.passwordError && (
                          <span className="error-message">{this.state.passwordError}</span>
                        )}
                        <a onClick={this.pageHandler}>Forgot password?</a>
                        <input type="submit" value="Login" />
                      </form>
                    </div>
                  </div>
                ) : (

                  <div>
                    <div className='circular_spinner'>

                      {this.state.isCircularProgress ? (
                        <CircularProgress color='secondary' />
                      ) : (null)}
                    </div>

                    <div className="form-forgot">
                      <form method='post' onSubmit={this.resetPassword}>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          defaultValue={this.state.email}
                          onChange={this.handleInputChange}
                          placeholder="Email address"
                          required />
                        <input type="submit" value="Reset Password" />
                        <div class="link-container">
                          <a class="login-link" onClick={this.pageHandler}>Login</a>
                        </div>
                      </form>
                    </div>
                    {this.state.isEmailSent ? (
                      <div className='sent-email'>
                        <p> The Reset Link has been successfully sent. Please check your email: {this.state.email}  and open the link provided to create a new password. </p>
                      </div>
                    ) : (null)
                    }
                  </div>

                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
