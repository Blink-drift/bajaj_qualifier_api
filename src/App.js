import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./App.css";

const options = [
  { value: "alphabets", label: "Alphabets" },
  { value: "numbers", label: "Numbers" },
  { value: "highest_alphabet", label: "Highest Alphabet" }
];

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    document.title = "22BCS13159";
  }, []);

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(jsonInput);
      setError(null);

      const res = await axios.post("https://bajaj-qualifier-api.onrender.com/bfhl", parsedData);
      setResponse(res.data);
    } catch (err) {
      setError("Invalid JSON format");
      setResponse(null);
    }
  };

  const filteredResponse = () => {
    if (!response) return null;
    let result = {};
    if (selectedOptions.some(opt => opt.value === "alphabets")) {
      result.alphabets = response.alphabets;
    }
    if (selectedOptions.some(opt => opt.value === "numbers")) {
      result.numbers = response.numbers;
    }
    if (selectedOptions.some(opt => opt.value === "highest_alphabet")) {
      result.highest_alphabet = response.highest_alphabet;
    }
    return result;
  };

  return (
      <div className="container" style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
        <h2>API Input</h2>
        <textarea
            rows="3"
            style={{ width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            placeholder='Enter JSON Here'
        ></textarea>
        <button
            onClick={handleSubmit}
            style={{ width: "100%", padding: "10px", marginTop: "10px", backgroundColor: "#0056b3", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
        >Submit</button>
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
        {response && (
            <>
              <h3>Multi Filter</h3>
              <Select
                  isMulti
                  options={options}
                  onChange={setSelectedOptions}
                  styles={{ container: (base) => ({ ...base, marginBottom: "10px" }) }}
              />
              <h3>Filtered Response</h3>
              <div style={{ backgroundColor: "#f9f9f9", padding: "10px", borderRadius: "5px" }}>
                {Object.entries(filteredResponse()).map(([key, value]) => (
                    <p key={key}><strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value}</p>
                ))}
              </div>
            </>
        )}
      </div>
  );
}

export default App;

