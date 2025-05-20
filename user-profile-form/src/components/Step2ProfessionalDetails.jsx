import React, { useContext } from "react";
import { FormContext } from "../FormContext";

const Step2ProfessionalDetails = ({ next, prev }) => {
  const { formData, setFormData } = useContext(FormContext);

  const handleNext = () => {
    if (formData.profession === "Entrepreneur" && formData.companyName.trim() === "") {
      return alert("Company Name is required for Entrepreneurs.");
    }
    if (formData.addressLine1.trim() === "") {
      return alert("Address Line 1 is required.");
    }
    next();
  };

  return (
    <div>
      <label>Profession:</label><br />
      <select
        value={formData.profession}
        onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
      >
        <option value="">Select</option>
        <option value="Student">Student</option>
        <option value="Developer">Developer</option>
        <option value="Entrepreneur">Entrepreneur</option>
      </select>

      {formData.profession === "Entrepreneur" && (
        <>
          <br />
          <label>Company Name:</label><br />
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
        </>
      )}

      <br /><br />
      <label>Address Line 1:</label><br />
      <input
        type="text"
        value={formData.addressLine1}
        onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
      />

      <br /><br />
      <button onClick={prev}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step2ProfessionalDetails;
