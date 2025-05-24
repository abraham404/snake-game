import { useEffect, useState } from 'react'
import './App.css'
//import init, { greeting } from '@pkg/snake_lib.js';
import SnakeCanvas from './components/SnakeCanvas';
import up from '../src/assets/images/chevron-up.svg';
import down from '../src/assets/images/chevron-down.svg';
import left from '../src/assets/images/chevron-left.svg';
import right from '../src/assets/images/chevron-right.svg';

function App() {
  const [isRunning, setIsRunnig] = useState(false);
  const [direction, setDirection] = useState('RIGHT');
  /*
useEffect(() => {
  const run = async () => {
    await init()
    setResult(greeting)
  }
  run()
}, [])
*/

  const handleIsRunning = () => {
   isRunning ? setIsRunnig(false) : setIsRunnig(true);
  }
 


return (
    <>
     
     <h2 style={{fontSize: '35px'}}>Snake Game 🐍</h2>

     <SnakeCanvas isRunning={isRunning} direction={direction} />
     <div style={{marginTop: '20px'}} className="btn-rows">
     <button  onClick={() => setDirection('UP')}>
        <img 
          src={up} 
          alt="Up" 
          style={{ 
            filter: 'brightness(0) invert(1)', // Convierte a blanco
         
          }} 
        />
      </button>
      <div className='btn-row-h'>
        <button onClick={() => setDirection('LEFT')}>
        <img 
          src={left} 
          alt="left" 
          style={{ 
            filter: 'brightness(0) invert(1)', // Convierte a blanco
         
          }} 
        />
        </button>
        <button style={{width: '77px', height: '50px'}} onClick={handleIsRunning}>{isRunning ? 'Stop' : 'Start'}</button>
        <button onClick={() => setDirection('RIGHT')}>
        <img 
          src={right} 
          alt="right" 
          style={{ 
            filter: 'brightness(0) invert(1)', // Convierte a blanco
         
          }} 
        />
        </button>
      </div>
      <button style={{marginTop: '15px'}} onClick={() => setDirection('DOWN')}>
        <img 
          src={down} 
          alt="down" 
          style={{ 
            filter: 'brightness(0) invert(1)', // Convierte a blanco
         
          }} 
        />
        </button>
     </div>
     
    </>
  )
}

export default App  
