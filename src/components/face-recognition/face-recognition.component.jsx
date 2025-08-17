import React from 'react';
import './face-recognition.styles.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className='face-box-container'>
      <div className='face-box-wrapper'>
      {(imageUrl) ? 
        <img id='imageView' alt='image' src={ imageUrl } /> : 
        <span>No image!</span>
      }
      {(boxes) ?
        boxes.map((box, index) => {
          return (
            <div 
              key={index} 
              className='bounding-box' 
              style={ {top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol} }
            >
            </div>
          )
        }) : null
      }
      </div>
    </div>
  )
}

export default FaceRecognition;
