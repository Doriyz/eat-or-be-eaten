import './App.css';
import Fish from './components/Fish';
import React,{useState, useEffect} from 'react';
import { nanoid } from "nanoid";


function App(props) {
  const frame = 0.1;
  const max_y = 70;
  const min_y = -5;
  const max_power = 30;
  const min_power = 2;
  const max_speed = 18;
  const min_speed = 5;

  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timer, setTimer] = useState(0); // used to count the frame time

  const [allFishes, setAllFishes] = useState(props.allFishes);
  const [playerFish, setPlayerFish] = useState({x:0,y:0,speed:5,direction:'ltr', key:0});


  function addFish(){
    const r = Math.random();
    const y = Math.floor(Math.random() * (max_y - min_y) ) + min_y;
    const speed = Math.floor(Math.random() * (max_speed - min_speed) ) + min_speed;
    const power = Math.floor(Math.random() * (max_power - min_power) ) + min_power;
    if(r > 0.5){
      const newFishes= {
        x:-5,
        y:y,
        speed:speed,
        direction:'ltr',
        power:power, 
        key:`${nanoid()}`
      }
      setAllFishes([...allFishes, newFishes]);
    }
    else{
      const newFishes= {
        x:105,
        y:y,
        speed:speed,
        direction:'rtl',
        power:power, 
        key:`${nanoid()}`
      }
      setAllFishes([...allFishes, newFishes]);
    }
     
  }

  


  const startGame = () => {

    setIsPlaying(isPlaying => !isPlaying);

    const id = setInterval(() => {
      // the frame action
      setTimer(timer => timer + 1);
      // move all fishes
      setAllFishes(allFishes => allFishes.map(fish => {
        if(fish.direction=='ltr') return {...fish, x: fish.x+fish.speed/500};
        else return {...fish, x: fish.x-fish.speed/500};
      }).filter(fish => fish.x < 110 && fish.x > -10)   // filter the fish go far
      );
    

      console.log('loop');

    }, frame);
    setIntervalId(id);
  }


  const pauseGame = () => {
    setIsPlaying(isPlaying => !isPlaying);
    clearInterval(intervalId);
    setIntervalId(null);
  }


  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);


  useEffect(() => {
    // generate fish randomly

      // const a = Math.floor(Math.random() * (1000/frame * 10 - 1000/frame) ) + 1000/frame;
      
      const a = 100;
      if(timer % 50 == 0){
        addFish();
        console.log(timer);
      }
  },[timer%50]);



  const fishList = (allFishes)?allFishes.map((fish) => (
    <Fish 
      x={fish.x}
      y={fish.y}  
      isPlaying={isPlaying}
      key={fish.key}
      power={fish.power}
      direction={fish.direction}
    />
  )):"";


  return (

    <div id="game-container">
      <div className="header">
        <h1>EAT OR BE EATEN</h1>
      </div>
      
      <div> score and lifes </div>
      <div>
        {         
          intervalId ? (
            <button className="btn toggle-btn" onClick={pauseGame}>Pause</button>
          ) : (
            <button className="btn toggle-btn" onClick={startGame}>Start</button>
          )
        }
      </div>

      <div id="game-window">
        {/* <p>hello</p> */}
        {fishList}

      </div>

      

      <div className="footer">
        <p>Made by Maysion</p>
      </div>
    </div>

  );
}

export default App;
