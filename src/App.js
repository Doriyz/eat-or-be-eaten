import './App.css';
import Fish from './components/Fish';
import React,{useState, useEffect} from 'react';
import StartButton from './components/StartButton';

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
        return {...fish, x: fish.x+fish.speed/500};
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
    />
  )):"";


  console.log(intervalId);

  return (

    <div id="game-container">
      <div className="header">
        <h1>EAT OR BE EATEN</h1>
      </div>
      
      <div> score and lifes </div>
      

      <div id="game-window">
        <div className="game-content"> 
          <p>hello</p>
          {/* <Fish isPlaying={isPlaying} y={10} x={25}></Fish>
          <Fish isPlaying={isPlaying} y={20} x={15}></Fish> */}
          {/* <Fish isPlaying={isPlaying} y={20} x={15}></Fish> */}
          {/* <Fish isPlaying={isPlaying} y={30} x={15}></Fish> */}

          <div>
        {
          
          intervalId ? (
            <button onClick={pauseGame}>Pause</button>
          ) : (
            <button onClick={startGame}>Start</button>
          )
        }
      </div>

          {fishList}


        </div>
      </div>

      

      <div className="footer">
        <p>Made by Maysion</p>
      </div>
    </div>



    // <div className="App">

      

    //   {/* fellow will be discarded */}
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>




  );
}

export default App;
