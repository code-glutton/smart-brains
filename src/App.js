import React , {Component} from 'react';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

import FaceRecog from './components/faceRecognition/FaceRecog';
import Signin from './components/signin/Signin';
import Register from './components/register/Register';



const paramsForParticles = {
  particles: {
    number:{
      value:500,
      density: {
        enable: true,
        value_area:4000
      }
    }
  }
}

const initialState = {
  input : '',
  imageUrl : '',
  box : {},
  route : 'signin',
  isSignedIn:false,
  user:{
   id:'',
   name:'',
   email:'',
   password:'',
   entries: 0,
   joined: ''
  }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
    
  }

  // componentDidMount(){
  //   fetch('http://localhost:1000/').then(response => response.json()).then(console.log);
  // }

  displayFaceBox = (box) => {
    
    this.setState({box: box});  
    
  }

loadUser = (user) =>{
  this.setState({
    user:{
        id:user.id,
        name:user.name,
        email:user.email,
        password:user.password,
        entries: user.entries,
        joined: user.joined
    }
  })
}

  calculateFaceRectangle = (data) => {
     const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');    
    const width = Number(image.width);
    const height = Number(image.height); 
    console.log(width + height);
    console.log(clarifyFace);

   return ({
     leftCol: clarifyFace.left_col * width,
     topRow: clarifyFace.top_row * height,
     rightCol: width - (clarifyFace.right_col * width),
     bottomRow: height - (clarifyFace.bottom_row * height)
   });
  }



  onInputChange = (event) => {
    this.setState({input : event.target.value});
  }

  onSubmit = () => {
    this.setState({imageUrl : this.state.input})
    console.log(this.state.input)
    fetch('https://morning-island-79879.herokuapp.com/imageurl',{
      method:'post',
      headers: {'Content-Type':'application/json'},
      body : JSON.stringify({
      input : this.state.input
    })
  })
  .then(response => response.json())
    .then(
    response => {
      if(response){
        fetch('https://morning-island-79879.herokuapp.com/image',{
          method:'put',
          headers: {'Content-Type':'application/json'},
          body : JSON.stringify({
          id : this.state.user.id
        })
      }).then(response => response.json()).then(count => {
        this.setState(
        Object.assign(this.state.user, {entries: count})
        )
      })
      .catch(console.log);
  }
  this.displayFaceBox(this.calculateFaceRectangle(response))
}).catch(err => console.log("error"));
  }
onRouteChange = (route) => {
  if (route === 'signout'){
    this.setState(initialState)
  } else if(route === 'home'){
    this.setState({isSignedIn: true})
  }
  this.setState({route : route});
}


  render(){
  return (
    <div className="App">
      <Particles className = 'particles' 
              params={paramsForParticles}
            />
      <Navigation isSignedIn = {this.state.isSignedIn} onRouteChange = {this.onRouteChange}/>
      {
        this.state.route === 'home' 
        ? <div>
        <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries}/> 
        <ImageLinkForm onInputChange = {this.onInputChange} onSubmit = {this.onSubmit}/>
        <FaceRecog box = {this.state.box} imageUrl = {this.state.imageUrl}/>
      </div>
        : 
        (
          this.state.route === 'signin' 
          ?  <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
          : <Register onRouteChange = {this.onRouteChange} loadUser={this.loadUser}/>
        )
        
  }
    </div>
  );
  }
}

export default App;
