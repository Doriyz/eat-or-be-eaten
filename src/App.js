import './App.css';
import Fish from './components/Fish';
import React,{useState, useEffect} from 'react';

function App(props) {
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState(null);


  const [allFishes, setAllFishes] = useState(props.allFishes);
  const [playerFish, setPlayerFish] = useState({x:0,y:0,speed:5,direction:'ltr', key:0});


  function gameLoop(){
    console.log(allFishes);

    // move 
    const newfishes = allFishes.map((fish)=>{
      console.log(fish.x+1);
      const newx = fish.x + 1;
      const newy = fish.y + 1;
      return {...fish, x: newx, y: newy};
    });
    console.log(newfishes);

    setAllFishes([newfishes]);


    // check collision
  }

  const startGame = () => {
    setIsPlaying(isPlaying => !isPlaying);

    const id = setInterval(() => {
      // gameLoop();


      setAllFishes(allFishes => allFishes.map(fish => {
        if(fish.direction=='ltr') return {...fish, x: fish.x+fish.speed/500};
        else return {...fish, x: fish.x-fish.speed/500};
      }));

      console.log('loop');
    }, 0.5);
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


  console.log(intervalId);

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
