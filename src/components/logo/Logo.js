import React from 'react';
import Tilt from 'react-tilt';
import './logo.css'
import brain from './logo.png'
export default function Logo() {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt shadow-2 ml3" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner"> <img alt='logo' src={brain}/> </div>
            </Tilt>
        </div>
    )
}
