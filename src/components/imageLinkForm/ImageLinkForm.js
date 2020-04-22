import React from 'react'
import './imageLinkForm.css'

export default function ImageLinkForm({ onInputChange,onSubmit }) {
    return (
        <div>
            <p>
                {'This magic face will detect faces in your pictures. Give it a try.'}
            </p>
            <div className = 'center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className ='f4 pa2 w-70 center' type='text' onChange = {onInputChange}/>
                    <button className = 'button  w-30 grow f4 link ph3 pv2 dib white bg-light-blue' onClick={onSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}
