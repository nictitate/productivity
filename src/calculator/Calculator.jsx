import { useState } from 'react';

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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-10 bg-white rounded shadow-md w-80">
        <input
          type="text"
          className="w-full p-3 text-right text-gray-700 border rounded-lg focus:outline-none"
          value={value}
        />
        <div className="grid grid-cols-4 gap-4 mt-5">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"].map(
            (item, index) => (
              <button
                key={index}
                value={item}
                onClick={handleClick}
                className="p-3 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none"
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
              className="p-3 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none"
            >
              {item}
            </button>
          ))}
          <button
            onClick={calculate}
            className="p-3 text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none"
          >
            =
          </button>
          <button
            onClick={clear}
            className="col-span-2 p-3 text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
