import './App.css';
import Fish from './components/Fish';
import Player from './components/Player';
import React,{useState, useEffect} from 'react';
import { nanoid } from "nanoid";


function App(props) {
  const frame = 4;
  const max_y = 700;
  const min_y = -50;
  const max_power = 25;
  const min_power = 2;
  const max_speed = 380;
  const min_speed = 280;
  const w_h = 1.5;
  const grow_factor = 0.1;
  const end_power = max_power*0.5;
  const min_fish = 5;
  const death_time = 1000/frame * 2; // 2 seconds
  let dis_factor = 6;


  const [dealthTime, setDeathTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timer, setTimer] = useState(0); // used to count the frame time

  const [score, setScore] = useState(0);
  const [lifes, setLifes] = useState(5);

  const [allFishes, setAllFishes] = useState(props.allFishes);
  const [playerFish, setPlayerFish] = useState({
    x:300,
    y:200,
    speed:0.8,
    power:min_power+4,
    direction:'ltr',
    key:0,
    opacity:1,
  });


  // const [tempFish, setTempFish] = useState([{x:0,y:0,speed:5,direction:'ltr',power:15, key:100000}]);
  // const temp = (tempFish)? tempFish.map((fish) => (
  //   <Fish 
  //     x={fish.x}
  //     y={fish.y}  
  //     key={fish.key}
  //     power={fish.power}
  //     direction={fish.direction}
  //   />
  // )):"";

  const [keyMap, setKeyMap] = useState({
    '37': false,
    '38': false,
    '39': false,
    '40': false,
  });
  

  useEffect(()=>{
    // check if the player is dead
    if(dealthTime > 0){
      setDeathTime(dealthTime => dealthTime - 1);
      if(dealthTime == 1){
        setPlayerFish({
          ...playerFish,
          opacity:1,
        });
      }
      if(dealthTime == death_time){
        // set opacity of player fish to 0.5;
        setPlayerFish(playerFish => ({...playerFish, opacity:0.5,}));
      }
      return;
    }
      

    // too less fish
    if(allFishes.length < min_fish){
      addFish();
    }
    // check collision
    allFishes.forEach((fish)=>{
      console.log('check collision');
      // console.log(fish.x);
      dis_factor = 8 - Math.max(fish.power, playerFish.power)/5; 
      console.log(fish.x, fish.y);
      console.log(playerFish.x, playerFish.y);
      const dis_x = Math.abs(fish.x-playerFish.x + (fish.power - playerFish.power)/2);
      const dis_y = Math.abs(fish.y-playerFish.y + (fish.power - playerFish.power)/2/w_h);
      console.log(dis_x,dis_y);
      const x = Math.max(fish.power*dis_factor, playerFish.power*dis_factor);
      const y = Math.max(fish.power*dis_factor/w_h, playerFish.power*dis_factor/w_h);
      console.log(x, y);
      if(dis_x < x){
        if(dis_y < y){
          // collision
          if(fish.power > playerFish.power){
            //eaten
            console.log('eaten');
            setLifes(lifes => lifes-1);
            setDeathTime(death_time);
            if(lifes == 1) {
              alert('Game Over');
              setKeyMap({
                '37':false,
                '38':false,
                '39':false,
                '40':false,
              })
            }
            
          }
          else if(fish.power < playerFish.power){
            // eat
            console.log('eat');
            setScore(score => score+fish.power);
            setPlayerFish({...playerFish, power: playerFish.power + fish.power* grow_factor +0.5});
            // delete the fish
            setAllFishes(allFishes.filter(allFish => allFish.key != fish.key));
            // addFish();
            if(playerFish.power > max_power + end_power){
              alert('You Win!');
            }
          }
        }
      }

    })
  }, [playerFish, allFishes]);
  



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
        x:1200,
        y:y,
        speed:speed,
        direction:'rtl',
        power:power, 
        key:`${nanoid()}`
      }
      setAllFishes([...allFishes, newFishes]);
    }
     
  }

  // let b = { key: 1 };
  // // Object* inner = new Object();
  // // Object** b = new Object*(&inner);

  // const func = () => {
  //   // const Object** b' = &b;
  //   return () => {
  //     console.log(b.key);
  //     // console.log(b'->inner->key);
  //     b.key += 1;
  //   }
  // }

  // const exec = () => {
  //   setTimeout(() => {
  //     const addFunc = func();
  //     addFunc();
  //     addFunc();
  //     addFunc();
  //   }, 10);
  // }

  // exec();
  // exec();
  // b = { key: 2 }
  // // b->inner = &{ key: 2 }
  // exec();
  // b = { key: 3 }


  const startGame = () => {

    setIsPlaying(isPlaying => !isPlaying);

    const id = setInterval(() => {
      // const Object** tempFish = &tempFish
      // the frame action
      setTimer(timer => timer + 1);
      // move all fishes
      
    }, frame);
    setIntervalId(id);
  }

  useEffect(() => console.log('rerender'), []);


  const pauseGame = () => {
    setIsPlaying(isPlaying => !isPlaying);
    clearInterval(intervalId);
    setIntervalId(null);
  }



  useEffect(() => {
    return () => {
      // console.log('IntervalEnd');
      clearInterval(intervalId);
    }
  }, [intervalId]);


  useEffect(() => {
    // generate fish randomly
      if(timer % 500 == 0){
        addFish();
        console.log(timer);
      }
  },[timer / 500]);


  
  useEffect(()=>{
    // response to keydown
    setAllFishes(allFishes => allFishes.map(fish => {
      if(fish.direction=='ltr') return {...fish, x: fish.x+fish.speed/500};
      else return {...fish, x: fish.x-fish.speed/500};
    }).filter(fish => fish.x < 1100 && fish.x > -100)   // filter the fish go far
    );

    if(keyMap['37']){
      console.log('left move');
      setPlayerFish(playerFish => {
        return { ...playerFish, x: playerFish.x - playerFish.speed, direction: 'rtl' };
      });
    }
    // move up
    keyMap['38'] && setPlayerFish(playerFish=>{
      return {...playerFish, y: playerFish.y-playerFish.speed};
    });
    // move right
    keyMap['39'] && setPlayerFish(playerFish=>{
      return {...playerFish, x: playerFish.x+playerFish.speed, direction:'ltr'};
    });
    // move down
    keyMap['40'] && setPlayerFish(playerFish=>{
      return {...playerFish, y: playerFish.y+playerFish.speed};
    });


  },[timer]);





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
    opacity={playerFish.opacity}
  />;




  const onKeyDown = (event) => {
    setKeyMap({
      ...keyMap,
      [event.keyCode]: true
    });
  }

  const onKeyUp = (event) => {
    setKeyMap({
      ...keyMap,
      [event.keyCode]: false
    });
  }


  return (

    <div id="game-container">
      <div className="header">
        <h1>EAT OR BE EATEN</h1>
      </div>
      
      <div className='msg'>
        {         
          intervalId ? (
            <button className="toggle-btn" onClick={pauseGame}>Pause</button>
          ) : (
            <button className="toggle-btn" onClick={startGame}>Start</button>
          )
        }

        <p className='score'>Score: {score}</p>
        <p className='score'>Lifes: {lifes}</p>
      </div>


      <div id="game-window" tabIndex={0} onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
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
