import React from 'react';
import { useState, useEffect } from 'react';

import './sign-up.styles.css';

const defaultUserData = {
  id: '',
  name: '',
  email: '',
  password: '',
  count: 0,
  joined: ''
}

const signUpUser = async function(user, onRouteChange) {
  if(!user.email || !user.name || !user.password) {
    console.log('Unable to register user: Email, name, and password are required');
    return;
  }
  const response = await fetch(import.meta.env.VITE_API_URL+"/register", {
    method: 'post', 
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(user)}
  )
  const data = await response.json();

  if(!data.is_error) {
    onRouteChange('home', data.user);
  }
  else {
    console.log(data.message);
  }
}

const SignUp = ({ onRouteChange }) => {
  const [ user, setUser ] = useState(defaultUserData);

  const onNameChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  const onEmailChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  const onPasswordChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  const handleSignUp = (event) => {
    event.preventDefault();
    signUpUser(user, onRouteChange);
  }

  const handleSignOut = async(event) => {
    event.preventDefault();
    setUser(defaultUserData);
    onRouteChange('sign-out');
  }

  return (
    <div className='sign-up-container'>
      <main className='sign-up-wrapper'>
        <form className='sign-up-form'>
          <fieldset id="sign-up">
            <legend>Register</legend>
            <div className='form-input'>
              <label htmlFor="username">Name</label>
              <input onChange={ onNameChange } type="text" name="name"  id="username" />
            </div>
            <div className='form-input'>
              <label htmlFor="email-address">Email</label>
              <input onChange={ onEmailChange } type="email" name="email"  id="email-address" />
            </div>
            <div className='form-input'>
              <label htmlFor="password">Password</label>
              <input onChange={ onPasswordChange } type="password" name="password"  id="password" />
            </div>
          </fieldset>
          <div className='submit-button-wrapper'>
            <input onClick={ handleSignUp } type="submit" value="Submit" />
          </div>
          <div onClick={ () => onRouteChange('sign-in') } className='register'>
            <a href="#0">Sign In</a>
          </div>
        </form>
      </main>
    </div>
  )
}

export default SignUp;
