import React, { useState } from "react";
import JsonEditor from "./Components/JsonEditor";
import FormPreview from "./Components/FormPreview";

const App = () => {
  const [jsonData, setJsonData] = useState({});
  const [error, setError] = useState(null);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* left side: json editor */}
      <JsonEditor jsonData={jsonData} setJsonData={setJsonData} error={error} setError={setError} />

      {/* right side: form preview */}
      <FormPreview jsonData={jsonData} />
    </div>
  );
};

export default App;
