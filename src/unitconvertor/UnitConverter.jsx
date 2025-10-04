import { useState } from 'react';
import './UnitConverter.css';

const units = {
  length: [
    { label: 'Meter', value: 'm', factor: 1 },
    { label: 'Kilometer', value: 'km', factor: 1000 },
    { label: 'Centimeter', value: 'cm', factor: 0.01 },
    { label: 'Millimeter', value: 'mm', factor: 0.001 },
    { label: 'Mile', value: 'mi', factor: 1609.34 },
    { label: 'Yard', value: 'yd', factor: 0.9144 },
    { label: 'Foot', value: 'ft', factor: 0.3048 },
    { label: 'Inch', value: 'in', factor: 0.0254 },
  ],
  speed: [
    { label: 'Meter/second', value: 'mps', factor: 1 },
    { label: 'Kilometer/hour', value: 'kmph', factor: 0.277778 },
    { label: 'Mile/hour', value: 'mph', factor: 0.44704 },
    { label: 'Foot/second', value: 'fps', factor: 0.3048 },
    { label: 'Knot', value: 'kt', factor: 0.514444 },
  ],
  time: [
    { label: 'Second', value: 's', factor: 1 },
    { label: 'Minute', value: 'min', factor: 60 },
    { label: 'Hour', value: 'h', factor: 3600 },
    { label: 'Day', value: 'd', factor: 86400 },
    { label: 'Week', value: 'wk', factor: 604800 },
    { label: 'Month (30 days)', value: 'mo', factor: 2592000 },
    { label: 'Year', value: 'yr', factor: 31536000 },
  ],
  data: [
    { label: 'Bit', value: 'b', factor: 1 },
    { label: 'Byte', value: 'B', factor: 8 },
    { label: 'Kilobyte', value: 'KB', factor: 8 * 1024 },
    { label: 'Megabyte', value: 'MB', factor: 8 * 1024 * 1024 },
    { label: 'Gigabyte', value: 'GB', factor: 8 * 1024 * 1024 * 1024 },
    { label: 'Terabyte', value: 'TB', factor: 8 * 1024 * 1024 * 1024 * 1024 },
    { label: 'Petabyte', value: 'PB', factor: 8 * 1024 * 1024 * 1024 * 1024 * 1024 },
  ],
  area: [
    { label: 'Square Meter', value: 'm2', factor: 1 },
    { label: 'Square Kilometer', value: 'km2', factor: 1e6 },
    { label: 'Square Centimeter', value: 'cm2', factor: 0.0001 },
    { label: 'Square Millimeter', value: 'mm2', factor: 0.000001 },
    { label: 'Hectare', value: 'ha', factor: 10000 },
    { label: 'Acre', value: 'ac', factor: 4046.8564224 },
    { label: 'Square Mile', value: 'mi2', factor: 2.59e6 },
    { label: 'Square Yard', value: 'yd2', factor: 0.83612736 },
    { label: 'Square Foot', value: 'ft2', factor: 0.09290304 },
    { label: 'Square Inch', value: 'in2', factor: 0.00064516 },
  ],
  weight: [
    { label: 'Kilogram', value: 'kg', factor: 1 },
    { label: 'Gram', value: 'g', factor: 0.001 },
    { label: 'Milligram', value: 'mg', factor: 0.000001 },
    { label: 'Pound', value: 'lb', factor: 0.453592 },
    { label: 'Ounce', value: 'oz', factor: 0.0283495 },
  ],
  temperature: [
    { label: 'Celsius', value: 'C' },
    { label: 'Fahrenheit', value: 'F' },
    { label: 'Kelvin', value: 'K' },
  ],
};

function convert(value, from, to, type) {
  if (type === 'temperature') {
    if (from === to) return value;
    if (from === 'C') {
      if (to === 'F') return value * 9/5 + 32;
      if (to === 'K') return value + 273.15;
    }
    if (from === 'F') {
      if (to === 'C') return (value - 32) * 5/9;
      if (to === 'K') return (value - 32) * 5/9 + 273.15;
    }
    if (from === 'K') {
      if (to === 'C') return value - 273.15;
      if (to === 'F') return (value - 273.15) * 9/5 + 32;
    }
    return '';
  } else {
    const fromUnit = units[type].find(u => u.value === from);
    const toUnit = units[type].find(u => u.value === to);
    if (!fromUnit || !toUnit) return '';
    return (value * fromUnit.factor) / toUnit.factor;
  }
}

const UnitConverter = () => {
  const [type, setType] = useState('length');
  const [from, setFrom] = useState(units.length[0].value);
  const [to, setTo] = useState(units.length[1].value);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setFrom(units[e.target.value][0].value);
    setTo(units[e.target.value][1].value);
    setInput('');
    setOutput('');
  };

  const handleConvert = () => {
    const val = parseFloat(input);
    if (isNaN(val)) {
      setOutput('');
      return;
    }
    setOutput(convert(val, from, to, type));
  };

  return (
    <div className="unit-converter-container">
      <h2 className="unit-converter-title">Unit Converter</h2>
      <div className="unit-converter-card">
        <div className="unit-converter-row">
          <label>Type:</label>
          <select value={type} onChange={handleTypeChange} className="unit-converter-select">
            {Object.keys(units).map((key) => (
              <option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>
            ))}
          </select>
        </div>
        <div className="unit-converter-row">
          <label>From:</label>
          <select value={from} onChange={e => setFrom(e.target.value)} className="unit-converter-select">
            {units[type].map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </div>
        <div className="unit-converter-row">
          <label>To:</label>
          <select value={to} onChange={e => setTo(e.target.value)} className="unit-converter-select">
            {units[type].map((u) => (
              <option key={u.value} value={u.value}>{u.label}</option>
            ))}
          </select>
        </div>
        <div className="unit-converter-row">
          <label>Value:</label>
          <input type="number" value={input} onChange={e => setInput(e.target.value)} className="unit-converter-input" />
        </div>
        <button onClick={handleConvert} className="unit-converter-btn">Convert</button>
        <div className="unit-converter-output">
          {output !== '' && <span>Result: {output}</span>}
        </div>
      </div>
    </div>
  );
};

export default UnitConverter;
