import './App.css';
import Fish from './components/Fish';
import Player from './components/Player';
import React,{useState, useEffect} from 'react';
import { nanoid } from "nanoid";


function App(props) {
  const frame = 0.1;
  const max_y = 70;
  const min_y = -5;
  const max_power = 25;
  const min_power = 2;
  const max_speed = 30;
  const min_speed = 5;

  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timer, setTimer] = useState(0); // used to count the frame time

  const [allFishes, setAllFishes] = useState(props.allFishes);
  const [playerFish, setPlayerFish] = useState({
    x:40,
    y:30,
    speed:5,
    power:min_power+5,
    direction:'ltr',
    key:0
  });


  function addFish(){
    const r = Math.random();
    const y = Math.floor(Math.random() * (max_y - min_y) ) + min_y;
    const speed = Math.floor(Math.random() * (max_speed - min_speed) ) + min_speed;
    const power = Math.floor(Math.random() * (max_power - min_power) ) + min_power;
    if(r > 0.5){
      const newFishes= {
        x:-10,
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
        x:110,
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
      
      if(timer % 500 == 0){
        addFish();
        console.log(timer);
      }
  },[timer / 500]);

  function handleKeyDown(event) {
    if(!isPlaying) return;
      switch (event.keyCode) {
        case 37: // Left arrow
          console.log('left move');
          setPlayerFish(playerFish=>{
            return {...playerFish, x: playerFish.x-1, direction:'rtl'};
          });
          break;
        case 38: // Up arrow
          // Move player up
          console.log('up move');
          setPlayerFish(playerFish=>{
            return {...playerFish, y: playerFish.y-1};
          });
          break;
        case 39: // Right arrow
          // Move player right
          console.log('right move');
          setPlayerFish(playerFish=>{
            return {...playerFish, x: playerFish.x+1, direction:'ltr'};
          });
          break;
        case 40: // Down arrow
          // Move player down
          console.log('down move');
          setPlayerFish(playerFish=>{
            return {...playerFish, y: playerFish.y+1};
          });
          break;
        default:
          // Do nothing for other keys
          break;
      }
  }



  const fishList = (allFishes)?allFishes.map((fish) => (
    <Fish 
      x={fish.x}
      y={fish.y}  
      key={fish.key}
      power={fish.power}
      direction={fish.direction}
    />
  )):"";

  const player = <Player
  x={playerFish.x}
  y={playerFish.y}  
  key={playerFish.key}
  power={playerFish.power}
  direction={playerFish.direction}
/>;

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

      <div id="game-window" tabIndex={0} onKeyDown={handleKeyDown}>
        {/* <p>hello</p> */}
        {fishList}
        {player}
      </div>

      

      <div className="footer">
        <p>Made by Maysion</p>
      </div>
    </div>

  );
}

export default App;
