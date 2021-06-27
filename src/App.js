import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
import { NavbarBrand } from 'react-bootstrap';

export default class App extends Component {
  state = {
    isLogedIn: false,
    userID: '',
    name: '',
    email: ''
  }
  responseFacebook = response => {
  console.log(response);
  this.setState({
    isLogedIn: true,
    userID: response.userID,
    name: response.name,
    email: response.email
  })

  axios({
    method: "POST",
    url: "http://localhost:8080/api/v1/facebooksignin",
    data: {accessToken: response.accessToken, userID: response.userID}
  }).then(response => {
    console.log('facebook logged in successfully', response)
  })
    }


  render() {
    let fbContent;

    if(this.state.isLogedIn) {
    //   fbContent = null;
    } else {
      fbContent = (
      <FacebookLogin
          appId="538091360695447"
          fields="name,email"
          autoLoad={false}
          onClick={this.componentClicked}
          callback={this.responseFacebook}
       />
      );
    }
    return (
       this.state.isLogedIn ? 'Welcome to Zuri team' : 
       (
        <div>
          <nav className="navbar navbar-expand bg-secondary navbar-light">
        <div className="container">
          <NavbarBrand className="navbar-brand">My-HelperNG-pjt-62</NavbarBrand>
          <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
         <li className="nav-item">
        <a href="/" className="nav-link">Login</a>
         </li>
         <li className="nav-item">
         <a href="/" className="nav-link">Signin</a>
         </li>
       </ul>
          </div>
        </div>
      </nav>
        <div style={{display: 'flex', justifyContent: 'center', margin: '70px'}}>
        {fbContent}
        </div>
      </div>
       )
    )
  }
}
