import React,{useState} from "react";

export default function(props){

    const [buttonText, setButtonText] = useState('Start');
    
    function handleClick(){
        if(props.isPlaying == false) setButtonText('Start');
        else setButtonText('Pause');
        props.setPlaying();
    }

    return (
        <button type="button" className="btn toggle-btn" onClick={handleClick}>
            <span>{buttonText}</span>
        </button>
    )
}