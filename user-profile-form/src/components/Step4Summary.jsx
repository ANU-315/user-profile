import React, { useContext } from "react";
import { FormContext } from "../FormContext";

const Step4Summary = ({ prev }) => {
  const { formData } = useContext(FormContext);

  const handleSubmit = async () => {
  try {
    const cleanData = { ...formData };

    // Ensure profilePhoto is always a string
    if (typeof cleanData.profilePhoto !== "string") {
      cleanData.profilePhoto = "";
    }

    const res = await fetch("http://localhost:5000/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cleanData),
    });

    const data = await res.json();
    alert(data.message || "Submitted!");
  } catch (err) {
    alert("Error submitting the form");
    console.error("🔴 Submit Error:", err);
  }
};


  return (
    <div>
      <h3>Summary</h3>
      <ul>
        <li><strong>Username:</strong> {formData.username}</li>
        <li><strong>Gender:</strong> {formData.gender}</li>
        {/* add more fields here if needed */}
      </ul>

      <button className="back" onClick={prev}>Back</button>
      <button className="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Step4Summary;
