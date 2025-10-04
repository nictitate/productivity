import { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [value, setValue] = useState("");

  const handleClick = (event) => {
    setValue((prevValue) => prevValue + event.target.value);
  };

  const calculate = () => {
    try {
      setValue(eval(value).toString());
    } catch {
      setValue("Error");
    }
  };

  const clear = () => {
    setValue("");
  };

  return (
    <div className="calculator-container">
      <h2 className="calculator-title">Calculator</h2>
      <input
        type="text"
        value={value}
        readOnly
        className="calculator-input"
      />
      <div className="calculator-grid">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"].map(
          (item, index) => (
            <button
              key={index}
              value={item}
              onClick={handleClick}
              className="calculator-btn btn-number"
            >
              {item}
            </button>
          )
        )}
        {["+", "-", "*", "/", "%"].map((item, index) => (
          <button
            key={index}
            value={item}
            onClick={handleClick}
            className="calculator-btn btn-operator"
          >
            {item}
          </button>
        ))}
        <button
          onClick={calculate}
          className="calculator-btn btn-equals"
        >
          =
        </button>
        <button
          onClick={clear}
          className="calculator-btn btn-clear"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default Calculator;
