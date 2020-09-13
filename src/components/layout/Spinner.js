import React from 'react'
import spinner from './spinner.gif'

export default () => {
    return (
        <div>
            <img 
                src={spinner} 
                alt="Loading..." 
                style={{width: '200px', display: 'block', margin: '40px auto'}} />
        </div>
    )
}