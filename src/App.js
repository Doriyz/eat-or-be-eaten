import './App.css';
import Fish from './components/Fish';
import React,{useState} from 'react';
import StartButton from './StartButton';

function App() {
  
  const [isPlaying, setIsPlaying] = useState.apply(false);

  return (

    <div id="game-container">
      <div className="header">
        <h1>EAT OR BE EATEN</h1>
      </div>
      
      <div> score and lifes </div>

      <div>
        <StartButton isPlaying={isPlaying} setPlaying={()=>{setIsPlaying(!isPlaying)}}></StartButton>
      </div>

      <div id="game-window">
        <div className="game-content"> 
          <p>hello</p>
          <Fish isPlaying={isPlaying}></Fish>
          <Fish isPlaying={isPlaying}></Fish>
          <Fish isPlaying={isPlaying}></Fish>
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
