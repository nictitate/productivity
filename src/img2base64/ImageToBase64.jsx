import React, { useState } from 'react';
import './ImageToBase64.css';

export default function ImageToBase64() {
  const [image, setImage] = useState(null);
  const [base64, setBase64] = useState('');
  const [error, setError] = useState('');

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      setImage(null);
      setBase64('');
      return;
    }
    setError('');
    setImage(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.onload = (evt) => {
      setBase64(evt.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    if (base64) {
      navigator.clipboard.writeText(base64);
    }
  };

  return (
    <div className="img2b64-card">
      <h2 className="img2b64-title">Image to Base64 Converter</h2>
      <label className="img2b64-label">
        <span className="img2b64-btn">Choose Image</span>
        <input type="file" accept="image/*" onChange={handleFile} className="img2b64-input" />
      </label>
      {error && <div className="img2b64-error">{error}</div>}
      {image && (
        <div className="img2b64-preview">
          <img src={image} alt="Preview" className="img2b64-img" />
        </div>
      )}
      <div className="img2b64-section">
        <label className="img2b64-label" htmlFor="img2b64-output">Base64 Output</label>
        <textarea
          id="img2b64-output"
          className="img2b64-output"
          rows={6}
          value={base64}
          readOnly
          placeholder="Base64 string will appear here..."
        />
        <button className="img2b64-copy" onClick={handleCopy} disabled={!base64}>Copy</button>
      </div>
    </div>
  );
}
