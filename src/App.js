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
  const min_speed = 250;
  const dis_factor = 8;
  const w_h = 1.5;

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
    speed:0.5,
    power:min_power+5,
    direction:'ltr',
    key:0
  });


  const [tempFish, setTempFish] = useState([{x:0,y:0,speed:5,direction:'ltr',power:15, key:100000}]);
  const temp = (tempFish)? tempFish.map((fish) => (
    <Fish 
      x={fish.x}
      y={fish.y}  
      key={fish.key}
      power={fish.power}
      direction={fish.direction}
    />
  )):"";

  const [keyMap, setKeyMap] = useState({
    '37': false,
    '38': false,
    '39': false,
    '40': false,
  });
  

  useEffect(()=>{
    console.log('start check');
    allFishes.forEach((fish)=>{
      console.log('check collision');
      // console.log(fish.x);
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
            if(lifes == 0) {
              alert('game over');
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
            setPlayerFish({...playerFish, power: playerFish.power + fish.power/3 +1});
            // delete the fish
            // setAllFishes(allFishes.filter(allFish => allFish.x != fish.x && allFish.y != fish.y && allFish.power != fish.power));
            setAllFishes(allFishes.filter(allFish => allFish.key != fish.key));
            // setAllFishes(allFishes.filter(allFish => allFish.id != fish.id));
          }
        }
      }

    })
  }, [playerFish, allFishes]);
  


  // use effect to edit allFishes is not work
  // try to check collision in timer

  function checkCollision(fish){
    console.log(fish.x);
      const dis_x = Math.abs(fish.x-playerFish.x + (fish.power - playerFish.power)/2);
      const dis_y = Math.abs(fish.y-playerFish.y + (fish.power - playerFish.power)/2/w_h);
      // console.log(dis_x,dis_y);
      if(dis_x < Math.max(fish.power*dis_factor, playerFish.power*dis_factor)){
        if(dis_y < Math.max(fish.power*dis_factor/w_h, playerFish.power*dis_factor/w_h)){
          // collision
          if(fish.power > playerFish.power){
            //eaten
            console.log('eaten');
            setLifes(lifes => lifes-1);
            if(lifes == 0) alert('game over');
            
          }
          else if(fish.power < playerFish.power){
            // eat
            console.log('eat');
            setScore(score => score+fish.power);
            setPlayerFish({...playerFish, power: playerFish.power + fish.power/3 +1});
            // delete the fish
            // setallFishes(allFishes.filter(allFish => allFish.x != fish.x && allFish.y != fish.y && allFish.power != fish.power));
            setAllFishes(allFishes.filter(allFish => allFish.id != fish.id));
            // setAllFishes(allFishes.filter(allFish => allFish.id != fish.id));
          }
        }
      }

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
    console.log('tempFish has changed');
    console.log(tempFish);
  }, [JSON.stringify(tempFish)]);



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

      <div id="game-window" tabIndex={0} onKeyDown={onKeyDown} onKeyUp={onKeyUp}>
        {fishList}

        {temp}
        

        {player}
      </div>

      

      <div className="footer">
        <p>Made by Maysion</p>
      </div>
    </div>

  );
}

export default App;
