import './App.css';
import Fish from './components/Fish';
import React,{useState} from 'react';
import StartButton from './StartButton';

function App(props) {
  
  const [isPlaying, setIsPlaying] = useState.apply(false);

  const [allFishes, setAllFishes] = useState(props.allFishes);
  const [playerFish, setPlayerFish] = useState({x:0,y:0,speed:5,direction:'ltr'});

  function checkCollision(fish){
    return true;                          //temp
  }

  function move(fishes){
    const newfishes = fishes.map((fish)=>{
      return {...fish, x: fish.x+1, y: fish.y+1};
    });
    setAllFishes(newfishes);
  }

  // class Fish{
  //   constructor(x, y ,speed, direction){
  //     this.x = x;
  //     this.y = y;
  //     this.speed = speed;
  //     this.direction = direction; // ltr or rtl
  //   }

  //   move(){
  //     // update position based on the speed and direction
  //     this.x = this.x + 1;
  //     this.y = this.y + 1;
  //   }

  //   checkCollision(fish){

  //   }
  // }

  function gameLoop(){
    // update all fished
    // for(const fish of allFishes){
    //   move(fish);
    //   checkCollision(playerFish);
    // }
    move(allFishes);
    // playerFish.move();
  }

  const [intervalId, setIntervalId] = useState(null);
  
  function gameStart(){
    const id = setIntervalId(gameLoop, 1000);
    setIntervalId(id);
  }

  function gamePause(){
    clearInterval(intervalId);
    setIntervalId(null);
  }

  gameStart();

  // for test
  // allFishes.push(new Fish(0, 0, 5, 'ltr'));

  setAllFishes([...allFishes, {x:0,y:0,speed:5,direction:'ltr'}]);


  const fishList = allFishes.map((fish) => (
    <Fish 
      x={fish.x}
      y={fish.y}  
      isPlaying={isPlaying}
    />
  ));

  function setPlaying(){
    setIsPlaying(!isPlaying);
  }

  return (

    <div id="game-container">
      <div className="header">
        <h1>EAT OR BE EATEN</h1>
      </div>
      
      <div> score and lifes </div>

      <div>
        <StartButton isPlaying={isPlaying} setPlaying={setPlaying}></StartButton>
      </div>

      <div id="game-window">
        <div className="game-content"> 
          <p>hello</p>
          {/* <Fish isPlaying={isPlaying}></Fish>
          <Fish isPlaying={isPlaying}></Fish>
          <Fish isPlaying={isPlaying}></Fish> */}

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
