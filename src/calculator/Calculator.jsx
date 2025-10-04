import { useState, useRef, useEffect } from 'react';
import './Calculator.css';
import './Calculator-advanced.css';
import './SamsungCalculator.css';
import './Calculator.css';

const scientificOps = [
  { label: '(', value: '(' },
  { label: ')', value: ')' },
  { label: '√', value: 'sqrt(' },
  { label: 'x²', value: '^2' },
  { label: 'sin', value: 'sin(' },
  { label: 'cos', value: 'cos(' },
  { label: 'tan', value: 'tan(' },
  { label: 'log', value: 'log(' },
];

function safeEval(expr) {
  // Replace custom functions with JS Math equivalents
  let safe = expr
    .replace(/sqrt\(/g, 'Math.sqrt(')
    .replace(/sin\(/g, 'Math.sin(')
    .replace(/cos\(/g, 'Math.cos(')
    .replace(/tan\(/g, 'Math.tan(')
    .replace(/log\(/g, 'Math.log10(')
    .replace(/(\d+)\^2/g, 'Math.pow($1,2)');
  // Allow only safe characters
  if (/[^0-9+\-*/%.()Mathsqrtcosintanlog, ]/.test(safe)) return 'Error';
  try {
    // eslint-disable-next-line no-eval
    let result = eval(safe);
    return result;
  } catch {
    return 'Error';
  }
}

const Calculator = () => {
  const [value, setValue] = useState("");
  const [memory, setMemory] = useState(0);
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key.match(/[0-9+\-*/%.()]/)) {
        setValue((prev) => prev + e.key);
      } else if (e.key === 'Enter') {
        calculate();
      } else if (e.key === 'Backspace') {
        setValue((prev) => prev.slice(0, -1));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [value]);

  const handleClick = (event) => {
    const input = event.target.value;
    setValue((prevValue) => {
      // Prevent consecutive operators
      if (/[+\-*/%.]$/.test(prevValue) && /[+\-*/%.]/.test(input)) {
        return prevValue;
      }
      // Prevent starting with operator except minus
      if (prevValue === '' && /[+*/%.]/.test(input)) {
        return prevValue;
      }
      // Prevent multiple decimals in a number
      if (input === '.' && /\d*\.\d*$/.test(prevValue)) {
        return prevValue;
      }
      return prevValue + input;
    });
  };

  const handleScientific = (op) => {
    setValue((prev) => {
      // Prevent unmatched parentheses
      if (op === '(' && prev.endsWith('(')) return prev;
      if (op === ')' && ((prev.match(/\(/g)?.length || 0) <= (prev.match(/\)/g)?.length || 0))) return prev;
  // Prevent consecutive scientific functions
  const lastFunc = prev.slice(-5);
  const isLastFunc = /sin\($|cos\($|tan\($|log\($|sqrt\($/.test(lastFunc);
  const isCurrentFunc = /sin\(|cos\(|tan\(|log\(|sqrt\(/.test(op);
  if (isLastFunc && isCurrentFunc) return prev;
      if (op === '^2') {
        // Only allow ^2 after a number or closing parenthesis
        if (!/\d$|\)$/.test(prev)) return prev;
        return prev + '^2';
      }
      return prev + op;
    });
  };

  const calculate = () => {
    // Error prevention: unmatched parentheses
    const openParens = (value.match(/\(/g) || []).length;
    const closeParens = (value.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      setValue('Error: Unmatched parentheses');
      return;
    }
    // Error prevention: invalid ending
    if (/[^\d)]$/.test(value)) {
      setValue('Error: Invalid ending');
      return;
    }
    const result = safeEval(value);
    setHistory((prev) => [...prev, value + ' = ' + result]);
    setValue(result.toString());
  };

  const clear = () => {
    setValue("");
  };

  const memoryAdd = () => {
    const result = Number(safeEval(value));
    if (!isNaN(result)) setMemory((m) => m + result);
  };
  const memorySubtract = () => {
    const result = Number(safeEval(value));
    if (!isNaN(result)) setMemory((m) => m - result);
  };
  const memoryRecall = () => {
    setValue((prev) => prev + memory);
  };
  const memoryClear = () => {
    setMemory(0);
  };

  return (
    <div className="calculator-container">
      <h2 className="calculator-title">Calculator</h2>
      <input
        type="text"
        value={value}
        ref={inputRef}
        readOnly
        className="calculator-input"
      />
      <div className="calc-section">
        <div className="calc-section-header">Basic</div>
  <div className="basic-grid">
          {[
            [
              { label: 'C', value: 'clear', className: 'clear', onClick: clear },
              { label: '(', value: '(', className: '', onClick: handleClick },
              { label: ')', value: ')', className: '', onClick: handleClick },
              { label: '÷', value: '/', className: 'operator', onClick: handleClick },
            ],
            [
              { label: '7', value: '7', className: '', onClick: handleClick },
              { label: '8', value: '8', className: '', onClick: handleClick },
              { label: '9', value: '9', className: '', onClick: handleClick },
              { label: '×', value: '*', className: 'operator', onClick: handleClick },
            ],
            [
              { label: '4', value: '4', className: '', onClick: handleClick },
              { label: '5', value: '5', className: '', onClick: handleClick },
              { label: '6', value: '6', className: '', onClick: handleClick },
              { label: '−', value: '-', className: 'operator', onClick: handleClick },
            ],
            [
              { label: '1', value: '1', className: '', onClick: handleClick },
              { label: '2', value: '2', className: '', onClick: handleClick },
              { label: '3', value: '3', className: '', onClick: handleClick },
              { label: '+', value: '+', className: 'operator', onClick: handleClick },
            ],
            [
              { label: '0', value: '0', className: 'zero', onClick: handleClick },
              { label: '.', value: '.', className: '', onClick: handleClick },
              { label: '%', value: '%', className: '', onClick: handleClick },
              { label: '=', value: 'equals', className: 'equals', onClick: calculate },
            ],
          ].flat().map((btn, idx) => (
            btn.value === 'clear' ? (
              <button key={idx} onClick={btn.onClick} className={`btn ${btn.className}`}>{btn.label}</button>
            ) : btn.value === 'equals' ? (
              <button key={idx} onClick={btn.onClick} className={`samsung-btn ${btn.className}`}>{btn.label}</button>
            ) : (
              <button key={idx} onClick={btn.onClick} value={btn.value} className={`btn ${btn.className}`}>{btn.label}</button>
            )
          ))}
        </div>
      </div>
      <div className="calc-section">
        <div className="calc-section-header">Scientific</div>
        <div className="calc-scientific-group">
          {scientificOps.map((op, idx) => (
            <button
              key={op.label}
              onClick={() => handleScientific(op.value)}
              className="calculator-btn btn-operator calc-scientific-btn"
            >
              {op.label}
            </button>
          ))}
        </div>
      </div>
      <div className="calc-section">
        <div className="calc-section-header">Memory</div>
        <div className="calc-memory-group">
          <button onClick={memoryAdd} className="calculator-btn btn-operator calc-memory-btn">M+</button>
          <button onClick={memorySubtract} className="calculator-btn btn-operator calc-memory-btn">M-</button>
          <button onClick={memoryRecall} className="calculator-btn btn-operator calc-memory-btn">MR</button>
          <button onClick={memoryClear} className="calculator-btn btn-operator calc-memory-btn">MC</button>
        </div>
      </div>
      <div className="calc-section">
        <div className="calc-section-header">History</div>
        <ul className="calc-history-list">
          {history.length === 0 && <li className="calc-history-empty">No history yet.</li>}
          {history.slice(-10).reverse().map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Calculator;
