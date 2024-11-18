import React, { useState, useEffect } from "react";
import formConfig from "../app.json";

const JsonEditor = ({ jsonData, setJsonData, error, setError }) => {
  useEffect(() => {
    setJsonData(formConfig); // initialize with imported JSON data
  }, [setJsonData]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    try {
      const parsedData = JSON.parse(value);
      setJsonData(parsedData);
      setError(null); // clear error if JSON is valid
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  return (
    <div style={{ flex: 1, padding: "1rem", borderRight: "1px solid #ccc" }}>
      <h2>JSON Editor</h2>
      <textarea
        value={JSON.stringify(jsonData, null, 2)}
        onChange={handleInputChange}
        style={{ width: "100%", height: "300px" }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default JsonEditor;
