import React from 'react';

import './sign-out.styles.css';

const SignOut = ({ onRouteChange }) => {
  return (
    <div onClick={ () => onRouteChange('sign-in') } className='signin-signout'>
      Sign Out!
    </div>
  )
}

export default SignOut;
