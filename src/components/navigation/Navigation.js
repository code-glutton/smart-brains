import React from 'react';
import './navigation.css'

const Navigation = ({onRouteChange, isSignedIn}) => {
        
        if (isSignedIn){
            return(
            <div className='Nav'>
            <p onClick = {() => onRouteChange('signout')} className='f3 link dim black underline pa0 pointer'>Sign Out</p>
        </div>
        );
        } else {
            return(
            <div className='Nav'>
                <p onClick = {() => onRouteChange('signin')} className='f3 link dim black underline pr3 pointer'>Sign in</p>
                <p onClick = {() => onRouteChange('register')} className='f3 link dim black underline pa0 pointer'>Register</p>
            </div>
            )
        }
  
   
}

export default Navigation;