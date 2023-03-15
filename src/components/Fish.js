import React,{useState} from "react";
import src from './fish.png';
import './Fish.css'

export default function Fish(props) {

    const classname = props.isPlaying? 'fish': 'fish stop';

    return (
        <img src={src} alt="fish" className={classname}/>
    )
}
