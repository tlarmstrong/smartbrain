import React from 'react';
import { useState, useEffect } from 'react';

import './sign-in.styles.css';

const defaultUserData = {
  id: '',
  name: '',
  email: '',
  password: '',
  count: 0,
  joined: ''
}

const signInUser = async function(user, onRouteChange) {
  if(!user.email  || !user.password) {
    console.log('Unable to sign in: Email and password are required');
    return;
  }

  const response = await fetch(import.meta.env.VITE_API_URL+"/signin", {
    method: 'post', 
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(user)}
  )
  const data = await response.json();

  if(!data.is_error) {
    onRouteChange('home', data.user);
  }
  else {
    console.log('Error:', data.message);
  }
}

const SignIn = ({ onRouteChange }) => {
  const [ user, setUser ] = useState(defaultUserData);

  const onEmailChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  const onPasswordChange = (event) => {
    setUser({...user, [event.target.name]: event.target.value});
  }

  const handleSignIn = (event) => {
    event.preventDefault();
    signInUser(user, onRouteChange);
  }

  const handleSignOut = async(event) => {
    event.preventDefault();
    setUser(defaultUserData);
    onRouteChange('sign-out');
  }

  return (
    <div className='sign-in-container'>
      <main className='sign-in-wrapper'>
        <form className='sign-in-form'>
          <fieldset id="sign-in">
            <legend>Sign In</legend>
            <div className='form-input'>
              <label htmlFor="email">Email</label>
              <input onChange={ onEmailChange } type="email" name="email"  id="email-address" />
            </div>
            <div className='form-input'>
              <label htmlFor="password">Password</label>
              <input onChange={ onPasswordChange } type="password" name="password"  id="password" />
            </div>
          </fieldset>
          <div className='submit-button-wrapper'>
            <input onClick={ handleSignIn } type="submit" value="Submit" />
          </div>
          <div onClick={ () => onRouteChange('sign-up') } className='register'>
            <a href="#0">Register</a>
          </div>
        </form>
      </main>
    </div>
  )
}

export default SignIn;
