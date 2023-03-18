import React from "react";
import src from './fish.svg';

export default function Fish(props) {
    return (
        <img 
            src={src} 
            alt="fish" 
            style={{top: props.y + 'vh',left: props.x + 'vw',position: 'absolute', width:props.power*8+'px',transform:props.direction==='ltr'?'scaleX(-1)':'scaleX(1)',}}
        />
    )
}
