import React, { useState } from 'react';
import * as math from 'mathjs';

function App() {

  const createDigitals = () => {
    const digitals = [];
    for (  let i = 1; i < 10;i++) {
      digitals.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
      
        
        
    }
    return digitals;
  };

  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = value => {
    if (
      (ops.includes(value) && calc === '') ||
      (ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);
    if (!ops.includes(value) && value !== '=') calculateResult(calc + value);
  };
  const calculate = () => {
    calculateResult(calc);
    setCalc(result); 
  };

  const calculateResult = calculation => {
    try {
      const res = math.evaluate(calculation);
      setResult(res.toString());
    } catch (error) {
      setResult('Enter numbers');
    }
  };
  const deleteAll = () => {
    if (calc === '') return;
    const value = calc.slice(0, 0);
    setCalc(value);
    calculateResult(value);
  };

  return (
    
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result && <span>{result}</span>}<br />{calc || '0'}
        </div>
        <div className="operators">
          <button onClick={() => updateCalc('*')}>*</button> 
        <button onClick={() => updateCalc('/')}>/</button>      
        <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={() => updateCalc('+')}>+</button>
          <button onClick={deleteAll}>C</button>
        </div>
        <div className="digitals">
          {createDigitals()}
          <button onClick={() => updateCalc('.')}>.</button>
          <button onClick={() => updateCalc('0')}>0</button>
          <button onClick={calculate}>=</button>

        </div>
      </div>
    </div>
  );
}
export default App;