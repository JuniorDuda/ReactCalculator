import React, { useState } from 'react';

import './calculator.css';

const Calculator = () => {
  const [history, setHistory] = useState('');
  const [result, setResult] = useState('');
  const [operator, setOperator] = useState('');
  const [calculated, setCalculated] = useState(false);
  const numberAllowed = '1234567890.';
  const operatorAllowed = '-+*/';

  const handleKeyPress = (event) => {
    const keyPress = event.key;
    
    if (keyPress === '=') calculate();
    if (keyPress.toLowerCase() === 'c') clearResult();

    if (numberAllowed.includes(keyPress) || operatorAllowed.includes(keyPress)) {
      insert(keyPress);
    }
  };

  const back = () => {
    setOperator('');
    setResult(result.slice(0, -1));

    if (calculated) {
      setHistory('');
    }
  };

  const insert = (num) => {
    if (calculated) {
      if (numberAllowed.includes(num)) {
        setHistory('');
        setResult('');
      }
      setCalculated(false);
    }

    if (operatorAllowed.includes(num)) {
      if (operator !== '') return false;
      if (result === '') return false;
      setOperator(num);
    } else {
      setOperator('');
    }

    setResult(result + num);
  };

  const clearResult = () => {
    setOperator('');
    setResult('');
    setHistory('');
    setCalculated(false);
  };

  const calculate = () => {
    if (result) {
      setHistory(result + '=');
      setResult(eval(result).toString());
      setCalculated(true);
    } else {
      return false;
    }
  };

  return (
    <div className="calculator" onKeyDown={handleKeyPress} tabIndex="0">
      <div className="display">
        <input type="text" id="history" value={history} readOnly />
        <input type="text" id="result" value={result} readOnly />
      </div>
      <div className="buttons">
        {[...Array(10).keys()].map((num) => (
          <button key={num} onClick={() => insert(num.toString())}>
            {num}
          </button>
        ))}
        <button onClick={() => insert('/')}>/</button>
        <button onClick={() => insert('*')}>*</button>
        <button onClick={() => insert('-')}>-</button>
        <button onClick={() => insert('+')}>+</button>
        <button onClick={() => insert('.')}>.</button>
        <button onClick={calculate}>=</button>
        <button onClick={clearResult}>C</button>
        <button onClick={back}> &lt; </button>
        <button> </button>
        <button> </button>
      </div>
    </div>
  );
};

export default Calculator;
