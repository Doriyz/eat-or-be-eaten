import React from "react";
import src from './player.svg';

export default function Fish(props) {
    return (
        <img 
            src={src} 
            alt="fish" 
            style={{
                top: props.y + 'px',
                left: props.x + 'px',
                position: 'absolute', 
                width:props.power*8+'px',
                transform:props.direction==='ltr'?'scaleX(-1)':'scaleX(1)',
                // backgroundColor: 'blue',
                opacity: props.opacity,
            }}
        />

        // <svg 
        //     src={src} 
        //     alt="fish" 
        //     style={{
        //         top: props.y + 'vh',
        //         left: props.x + 'vw',
        //         position: 'absolute', 
        //         width:props.power*8+'px',
        //         transform:props.direction==='ltr'?'scaleX(-1)':'scaleX(1)',
        //         'aria-hidden': true,
        //         focusable: false,
        //     }}>
        // <linearGradient id="linearGradient" x2="0" y2="1">
        // <stop offset="0%" stop-color="#FFB546" />
        // <stop offset="100%" stop-color="#FF9901" />
        // </linearGradient>
        // </svg>

    )
}
