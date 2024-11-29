import React, { useState } from "react";

const StringCalculator = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculateSum = (numbers) => {
    if (!numbers) return 0;
    // Default delimiters: comma or newline
    let delimiter = /,|\n/;

    // Check for custom delimiter
    if (numbers.startsWith("//")) {
      const parts = numbers.split("\n", 2);
      delimiter = new RegExp(parts[0].slice(2));
      numbers = parts[1];
    }

    const numberList = numbers.split(delimiter);
    const negatives = [];
    let total = 0;

    for (const num of numberList) {
      // Skip empty strings
      if (num.trim() === "") continue;
      const value = parseInt(num, 10);
      // Skip invalid numbers
      if (isNaN(value)) continue;
      if (value < 0) negatives.push(value);
      total += value;
    }

    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }

    return total;
  };

  const Calculate = () => {
    try {
      setError("");
      setResult(calculateSum(number));
    } catch (err) {
      setError(err.message);
      setResult(null);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>String Calculator</h1>
      <textarea
        rows="4"
        cols="50"
        placeholder="Enter numbers to calculate sum..."
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        style={{ marginBottom: "10px", width: "100%", padding: "10px" }}
      />
      <br />
      <button onClick={Calculate} style={{ padding: "10px 20px" }}>
        Calculate
      </button>
      {result !== null && (
        <h2 style={{ color: "green", marginTop: "20px" }}>Result: {result}</h2>
      )}
      {error && <h2 style={{ color: "red", marginTop: "20px" }}>{error}</h2>}
    </div>
  );
};

export default StringCalculator;
