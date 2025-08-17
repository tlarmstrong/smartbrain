import React from 'react';

import SignOut from '../sign-out/sign-out.component';

import './navigation.styles.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if(isSignedIn) {
    return (
      <nav className='navigation-container'>
        <SignOut onRouteChange={ onRouteChange } />
      </nav>
    )
  }
  else {
    return (
      <nav className='navigation-container'>
        <div onClick={ () => onRouteChange('sign-in') } className='register'>
          <a href="#0">Sign In</a>
        </div>
        <div onClick={ () => onRouteChange('sign-up') } className='register'>
          <a href="#0">Register</a>
        </div>
      </nav>
    )
  }
}

export default Navigation;
