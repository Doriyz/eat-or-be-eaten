import React,{useState} from "react";
import src from './fish.png';
// import './Fish.css'

export default function Fish(props) {

    const classname = props.isPlaying? 'fish': 'fish stop';
    const styleText = 'top:' + String(props.y) + 'px; left: ' + String(props.x) + 'px;';

    return (
        <img 
            src={src} 
            alt="fish" 
            className={classname}
            // style={styleText}
            // style="top:50px; left:20px;"
            style={{top: props.y + 'vh',left: props.x + 'vh',position: 'absolute'}}
        />
    )
}
