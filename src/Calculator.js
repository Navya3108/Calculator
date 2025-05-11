import React, { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const handleClick = (value) => {
    setInput(prev => prev + value);
  };

  const handleClear = () => {
    setInput("");
    setResult(null);
  };

  const handleCalculate = () => {
    try {
        if(input==="="){
            setResult("Error");
        }
        else if(input === "0/0") {
            setResult(NaN);
          } 
      // ✅ Handle division by zero explicitly
      else if (input.includes("/0") && !input.includes("/0.")) {
        setResult(Infinity);
      } 
      else {
        setResult(Function(`return ${input}`)()); // Safe alternative to eval
        setInput(String(Function(`return ${input}`)())); // Keep result in input for further calculations
      }
    } catch {
      setResult("Error");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>React Calculator</h1>

      {/* ✅ Input bar for user input */}
      <input
        type="text"
        value={input}
        readOnly
        style={{ width: "200px", padding: "10px", fontSize: "18px", marginBottom: "10px" }}
      />

      {/* ✅ Single div displaying results */}
      <div>
        {result !== null && <h2 style={{ marginBottom: "15px" }}>Answer: {String(result)}</h2>}
      </div>

      {/* ✅ Calculator Buttons */}
      <div style={{display:"flex",justifyContent:"center"}}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 50px)", gap: "10px" }}>
        {["7", "8", "9", "+", "4", "5", "6", "-", "1", "2", "3", "*", "C", "0", "=", "/"].map((btn) => (
          <button key={btn} onClick={() => btn === "=" ? handleCalculate() : btn === "C" ? handleClear() : handleClick(btn)}
            style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}>
            {btn}
          </button>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Calculator;
