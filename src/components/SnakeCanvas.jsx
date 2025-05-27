// src/components/SnakeCanvas.js
import { useRef, useEffect, useState, use } from 'react';
import confetti from "canvas-confetti";


function SnakeCanvas({ isRunning, direction }) {
  const canvasRef = useRef(null);
  const intervalRef = useRef(null);
  const [resetFlag, setResetFlag] = useState(false);
  const [score, setScore] = useState(0);  
  const gameOverRef = useRef(false);
  const isRunningRef = useRef(isRunning);
  localStorage.setItem("playScore", localStorage.getItem("playScore") || 0);


  //Canva s size
  const squareSize = 20;
  const canvasWidth = 340;
  const canvasHeight = 400;


  //initial
  const [snake, setSnake] = useState([
    {x: 0, y: 9},
    {x: 1, y: 9},
  ]);

  
  const getRandomColor = () => {
    let color;
    do {
      // Genera un color hexadecimal aleatorio
      color = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    } while (color.toLowerCase() === '#000000' || color.toLowerCase() === '#ffffff');
    return color;
  };

  
  
  const generateRandomFood = () => {
    return {
      x: Math.floor(Math.random() * (canvasWidth / squareSize)),
      y: Math.floor(Math.random() * (canvasHeight / squareSize))
    };
  };
  
  const [food, setFood] = useState({
    x: Math.floor(Math.random() * (canvasWidth / squareSize)),
    y: Math.floor(Math.random() * (canvasHeight / squareSize)),
    color: getRandomColor()
  });
  
  const resetGame = () => {
    let scoreStorage = parseInt(localStorage.getItem("playScore")); // Para enteros
    clearInterval(intervalRef.current);
    
    gameOverRef.current = false;
    
    setScore(0);
    setSnake([
      { x: 0, y: 9 },
      { x: 1, y: 9 }
    ]);
    
    setFood({
      ...generateRandomFood(),
      color: getRandomColor()
    });

    setResetFlag(prev => !prev);
    

  };


useEffect(() => {
  isRunningRef.current = isRunning;
}, [isRunning]);

  //Moving
  useEffect(() => {
    if (isRunning) {
      clearInterval(intervalRef.current); // <- Asegura que solo haya un intervalo activo
  
      intervalRef.current = setInterval(() => {
        if (!isRunning || gameOverRef.current) return;
  
        setSnake((prev) => {
          if (gameOverRef.current) return prev;
  
          const head = prev[prev.length - 1];
          let newHead;
  
          switch (direction) {
            case 'UP':
              newHead = { x: head.x, y: (head.y - 1 ) };
              break;
            case 'DOWN':
              newHead = { x: head.x, y: (head.y + 1) };
              break;
            case 'LEFT':
              newHead = { x: (head.x - 1), y: head.y };
              break;
            case 'RIGHT':
            default:
              newHead = { x: (head.x + 1), y: head.y };
              break;
          }
  
          // Verificar colisión con bordes
          const hitWall =
            newHead.x < 0 || newHead.x >= canvasWidth / squareSize ||
            newHead.y < 0 || newHead.y >= canvasHeight / squareSize;
  
          if (hitWall) {
            gameOverRef.current = true;
            clearInterval(intervalRef.current);
  
            // Usamos un timeout para ejecutar el alert fuera de la lógica de React
            setTimeout(() => {

              let scoreLocalStorage = parseInt(localStorage.getItem("playScore"));

              if (score > scoreLocalStorage){
                localStorage.setItem("playScore", score)

                  confetti({
                    particleCount: 80,
                    spread: 60,
                    angle: 60,
                    origin: { x: 0, y: 0.6 }
                  });

                  confetti({
                    particleCount: 80,
                    spread: 60,
                    angle: 120,
                    origin: { x: 1, y: 0.6 }
                  });

                  // 🎉 Explosión central
                  confetti({
                    particleCount: 100,
                    spread: 100,
                    origin: { y: 0.6 }
                  });
              }


              alert(`Game Over your Score: ${score} Best Score: ${Math.max(score, scoreLocalStorage)}`);

              resetGame();
            }, 0);
  
            return prev; // <- Detiene avance del estado
          }

          /*
          const newSnake = [...prev.slice(1), newHead];
          return newSnake;
          */

        let newSnake;
        if (newHead.x === food.x && newHead.y === food.y) {
          newSnake = [...prev, newHead]; // crece
          setFood({
            ...generateRandomFood(),
            color: getRandomColor()
          });
          setScore(prev => prev + 5);

        } else {
          newSnake = [...prev.slice(1), newHead]; // movimiento normal
        }
        return newSnake;

        });
      }, 200);
    } else {
      clearInterval(intervalRef.current);
    }
  
    return () => clearInterval(intervalRef.current);
  }, [isRunning, direction]);
  
  

//Draw
useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const numCols = canvas.width / squareSize;
  const numRows = canvas.height / squareSize;

  // Dibuja la comida (una sola vez)
  ctx.fillStyle = food.color;
  ctx.fillRect(food.x * squareSize, food.y * squareSize, squareSize, squareSize);

  for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
      const x = col * squareSize;
      const y = row * squareSize;

      if (snake.some(segment => segment.x === col && segment.y === row)) {
        ctx.fillStyle = '#CCFF00';
        ctx.fillRect(x, y, squareSize, squareSize);
      }

      ctx.strokeStyle = 'white';
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, squareSize, squareSize);
    }
  }
}, [snake, food]);


  return (
    
    <>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        style={{ border: '4px solid white' }}
      />
      <p style={{color: '#39FF14'}}>Score {score}</p>
    </>
    

    
  );
}

export default SnakeCanvas;
