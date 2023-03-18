import './App.css';
import Fish from './components/Fish';
import Player from './components/Player';
import React,{useState, useEffect} from 'react';
import { nanoid } from "nanoid";


function App(props) {
  const frame = 0.1;
  const max_y = 700;
  const min_y = -50;
  const max_power = 25;
  const min_power = 2;
  const max_speed = 380;
  const min_speed = 250;
  const dis_factor = 1;

  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timer, setTimer] = useState(0); // used to count the frame time

  const [score, setScore] = useState(0);
  const [lifes, setLifes] = useState(5);


  const [allFishes, setAllFishes] = useState(props.allFishes);
  const [playerFish, setPlayerFish] = useState({
    // x:40,
    // y:30,
    x:0,
    y:0,
    speed:5,
    power:min_power+5,
    direction:'ltr',
    key:0
  });

  function checkCollision(fish){
    // comare the position of playerfish with input fish
    const dis_x = Math.abs(fish.x + -playerFish.x);
    const dis_y = Math.abs(fish.y-playerFish.y);

  }



  function addFish(){
    const r = Math.random();
    const y = Math.floor(Math.random() * (max_y - min_y) ) + min_y;
    const speed = Math.floor(Math.random() * (max_speed - min_speed) ) + min_speed;
    const power = Math.floor(Math.random() * (max_power - min_power) ) + min_power;
    if(r > 0.5){
      const newFishes= {
        x:-100,
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
        x:1100,
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
      }).filter(fish => fish.x < 1100 && fish.x > -100)   // filter the fish go far
      );
      // check collision 
      checkCollision(player, tempFish);

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

  const [tempFish, setTempFish] = useState({x:0,y:0,speed:5,direction:'ltr',power:3, key:100000});
  const temp =  <Fish
  x={tempFish.x}
  y={tempFish.y}  
  key={tempFish.key}
  power={tempFish.power}
  direction={tempFish.direction}
  />;





  return (

    <div id="game-container">
      <div className="header">
        <h1>EAT OR BE EATEN</h1>
      </div>
      
      <div> score:{score}</div>
      <div> lifes:{lifes}</div>
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
        {fishList}

        {/* {temp} */}
        

        {player}
      </div>

      

      <div className="footer">
        <p>Made by Maysion</p>
      </div>
    </div>

  );
}

export default App;
