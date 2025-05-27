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
  const [arrowTecla, setArrowTecla] = useState('');
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


  useEffect(() => {
    
    const StartStop = (e) => {
     
      e.key === 'Enter' && setIsRunnig(prev => !prev);

    }

    window.addEventListener('keydown', StartStop);
    
    return () => window.removeEventListener('keydown', StartStop)
    
  }, []) 
 

  useEffect(() => {
   const handleArrosTecla = (e) => {
      switch(e.key){
        case 'ArrowUp':
          setDirection((prev) => (prev !== 'DOWN' ? 'UP' : prev));
          break;
        case 'ArrowDown':
          setDirection((prev) => (prev !== 'UP' ? 'DOWN' : prev));
          break;
        case 'ArrowRight':
          setDirection((prev) => (prev !== 'LEFT' ? 'RIGHT' : prev));
          break;
        case 'ArrowLeft':
          setDirection((prev) => (prev !== 'RIGHT' ? 'LEFT' : prev));
          break;
          default:
            break;
      }
      
   };
  
     window.addEventListener('keydown', handleArrosTecla);
  
    return () => {
      window.removeEventListener('keydown', handleArrosTecla);
    }


    
  }, []);

return (
    <>
     
     <h2 style={{fontSize: '35px',  color: 'white'}}>Snake Game 🐍</h2>

     <SnakeCanvas isRunning={isRunning} direction={direction} arrowTecla={arrowTecla} />
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
        <button style={{width: '77px', height: '50px', color: 'white'}} onClick={handleIsRunning}>{isRunning ? 'Stop' : 'Start'}</button>
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
