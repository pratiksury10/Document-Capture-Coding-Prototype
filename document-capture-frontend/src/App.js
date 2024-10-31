import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/extract', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
      setData(null);
    }
  };

  return (
    <div className="App">
      <h1>Document Capture</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} accept="image/*" required />
        <button type="submit">Extract Information</button>
      </form>
      {data && (
        <div>
          <h2>Extracted Information:</h2>
          <p>Name: {data.name}</p>
          <p>Document Number: {data.document_number}</p>
          <p>Expiration Date: {data.expiration_date}</p>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;