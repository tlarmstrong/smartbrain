import { useState, useEffect } from 'react'
import ParticlesBg from 'particles-bg'

import Navigation from '../components/navigation/navigation.component'
import SignIn from '../components/sign-in/sign-in.component'
import SignUp from '../components/sign-up/sign-up.component'
import Logo from '../components/logo/logo.component'
import Rank from '../components/rank/rank.component'
import ImageLinkForm from '../components/image-link-form/image-link-form.component'
import FaceRecognition from '../components/face-recognition/face-recognition.component'

import './App.css'

function App() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [ route, setRoute ] = useState('sign-in');
  const [ isSignedIn, setIsSignedIn ] = useState(false);
  const [ user, setUser ] = useState([]);

  const [ imageUrl, setImageUrl ] = useState(null);
  const [ faceBoxes, setFaceBoxes ] = useState([]);
  const [ count, setCount ] = useState(0);

  const calculateFaceBoxes = (result) => {
    const image = document.getElementById('imageView');

    if(!image) {
      console.log('No image url provided');
      return null;
    }
    const width = Number(image.width);
    const height = Number(image.height);

    const regions = result;
    let boxes = [];

    regions.forEach(region => {
      // Accessing and rounding the bounding box values
      const boundingBox = region.regionInfo.boundingBox;

      const topRow = boundingBox.topRow.toFixed(3);
      const leftCol = boundingBox.leftCol.toFixed(3);
      const bottomRow = boundingBox.bottomRow.toFixed(3);
      const rightCol = boundingBox.rightCol.toFixed(3);

      boxes.push({
        'topRow': topRow * height,
        'leftCol': leftCol * width,
        'bottomRow': height - (bottomRow * height),
        'rightCol': width - (rightCol * width)
      })
    })
    setFaceBoxes(boxes);
  }

  const fetchFaceDetectionOutputs = async function(imageUrl) {
    if(!imageUrl) {
      console.log('Please add an image');
      return;
    }

    const response = await fetch(API_URL+"/fetchFaceDetectionOutputs", {
        method: 'post', 
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({imageUrl: imageUrl})
      }
    )
    const data = await response.json();
    if(!data.is_error) {
      const update_counts = await fetch(API_URL+"/image", {
          method: 'put', 
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({id: user.id})
        }
      )
      const updated = await update_counts.json();
      if(!updated.is_error) {
        setUser({...user, count: updated.count});
      }
      calculateFaceBoxes(data.result);
    }
    else {
      console.log(data.message);
    }
  }

  const getUser = async function(user_id) {
    if(!user_id) {
      console.log('Missing user id');
      return;
    }
    const response = await fetch(API_URL+"/profile/"+user_id);
    const user = await response.json();
  }

  const onRouteChange = (route, user) => {
    (route !== 'sign-in' && route !== 'sign-up') ? setIsSignedIn(true) : setIsSignedIn(false);
    setRoute(route);
    setUser(user);

    if(user) {
      getUser(user.id);
    }

    if(!user) {
      setImageUrl(null);
      setFaceBoxes([]);
      setCount(0);
    }
  }

  const onInputChange = (event) => {
    setImageUrl(event.target.value);
    setFaceBoxes([]);
  }

  const onButtonSubmit = () => {
    if(!imageUrl) {
      console.log('No image to detect');
      return;
    }
    fetchFaceDetectionOutputs(imageUrl);
  }

  return (
    <>
      <ParticlesBg color="#ff0000" num={200} type="cobweb" bg={true} />
      { isSignedIn
        ? 
          <>
            <Navigation onRouteChange={ onRouteChange } isSignedIn={ isSignedIn }/>
            <Logo />
            <Rank user={ user } />
            <ImageLinkForm onInputChange={ onInputChange } onButtonSubmit={ onButtonSubmit }/>
            <FaceRecognition boxes={ faceBoxes } imageUrl={ imageUrl }/>
          </>
        : 
          <> 
            <Navigation onRouteChange={ onRouteChange } isSignedIn={ isSignedIn } />
            {route === 'sign-in' 
              ? <SignIn onRouteChange={ onRouteChange } /> 
              : <SignUp onRouteChange={ onRouteChange } /> 
            }
          </>
      }
    </>
  )
}

export default App
