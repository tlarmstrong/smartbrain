import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'

import './logo.styles.css';

const Logo = () => {
  return (
    <div className='logo-container'>
      <div className='logo-wrapper'>
        <Tilt className='logo-image-wrapper'>
          <div>
            <img alt='brain logo' src={brain} />
          </div>
        </Tilt>
        <div className='attribution'>
          <a target="_blank" href="https://icons8.com/icon/MZAVr0pxQzZV/brain">Brain</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
        </div>
      </div>
      <h1 className='app-description'>I am a magic brain. <br/> I can detect faces in your images.</h1>
    </div>
  )
}

export default Logo;
