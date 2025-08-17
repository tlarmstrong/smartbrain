import React from 'react';
import './image-link-form.styles.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <div className='action-container'>
        <div className='action-wrapper'>
          <label htmlFor='action-input' className='action-description'>
            Enter the url to your image
          </label>
          <input id='action-input' className='action-input' type='text' onChange={ onInputChange }/>
        </div>
        <button className='action-button' onClick={ onButtonSubmit }>
          Find the Face!
        </button>
      </div>
    </div>
  )
}

export default ImageLinkForm;
