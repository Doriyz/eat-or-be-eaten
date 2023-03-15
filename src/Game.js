import React, { useRef, useEffect } from 'react';
import Fish from './components/Fish';


function Game() {

  class Fish{
    constructor(x, y ,speed, direction){
      this.x = x;
      this.y = y;
      this.speed = speed;
      this.direction = direction; // ltr or rtl
    }

    move(){
      // update position based on the speed and direction
      this.x = this.x + 5;
      this.y = this.y + 5;
    }

    checkCollision(fish){

    }
  }

  const allFishesRef = useRef([]);
  const playerFishRef = useRef(new Fish(0, 0, 5, 'ltr'));



  useEffect(() => {
    const allFishes = allFishesRef.current;
    const playerFish = playerFishRef.current;

    function gameLoop() {
      // update all fishes
      for (const fish of allFishes) {
        fish.move();
        fish.checkCollision(playerFish);
      }
      playerFish.move();
      requestAnimationFrame(gameLoop);
    }

    requestAnimationFrame(gameLoop);

    // cleanup function
    return () => {
      cancelAnimationFrame(gameLoop);
    };
  }, []);

  return (
    <div className="game-window">
      {/* display all fishes in the game */}
      {allFishesRef.current.map((fish) => (
        <img
          key={fish.id}
          src={fish.image}
          style={{
            position: 'absolute',
            top: fish.y,
            left: fish.x,
            width: fish.width,
            height: fish.height,
          }}
        />
      ))}

      {/* display the player fish */}
      <img
        src='./components/fish.png'
        style={{
          position: 'absolute',
          top: playerFishRef.current.y,
          left: playerFishRef.current.x,
          width: playerFishRef.current.width,
          height: playerFishRef.current.height,
        }}
      />
    </div>
  );
}

export default Game;
