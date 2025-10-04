import React, { useState } from 'react';
import './EncoderDecoder.css';

function base64Encode(str) {
  try {
    return btoa(unescape(encodeURIComponent(str)));
  } catch {
    return '';
  }
}

function base64Decode(str) {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    return '';
  }
}

function urlEncode(str) {
  try {
    return encodeURIComponent(str);
  } catch {
    return '';
  }
}

function urlDecode(str) {
  try {
    return decodeURIComponent(str);
  } catch {
    return '';
  }
}

export default function EncoderDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('base64-encode');

  const handleInput = (e) => setInput(e.target.value);
  const handleMode = (e) => setMode(e.target.value);

  const handleConvert = () => {
    let result = '';
    if (mode === 'base64-encode') result = base64Encode(input);
    else if (mode === 'base64-decode') result = base64Decode(input);
    else if (mode === 'url-encode') result = urlEncode(input);
    else if (mode === 'url-decode') result = urlDecode(input);
    setOutput(result);
  };

  return (
    <div className="encoder-decoder ed-card">
      <h2 className="ed-title">Encoder / Decoder</h2>
      <div className="ed-controls">
        <label className="ed-label" htmlFor="ed-mode">Mode:</label>
        <select id="ed-mode" value={mode} onChange={handleMode} className="ed-select">
          <option value="base64-encode">Base64 Encode</option>
          <option value="base64-decode">Base64 Decode</option>
          <option value="url-encode">URL Encode</option>
          <option value="url-decode">URL Decode</option>
        </select>
      </div>
      <div className="ed-section">
        <label className="ed-label" htmlFor="ed-input">Input</label>
        <textarea
          id="ed-input"
          className="ed-input"
          rows={4}
          placeholder="Enter text here..."
          value={input}
          onChange={handleInput}
        />
      </div>
      <button className="ed-btn" onClick={handleConvert}>Convert</button>
      <div className="ed-section">
        <label className="ed-label" htmlFor="ed-output">Output</label>
        <textarea
          id="ed-output"
          className="ed-output"
          rows={4}
          placeholder="Output..."
          value={output}
          readOnly
        />
      </div>
    </div>
  );
}
