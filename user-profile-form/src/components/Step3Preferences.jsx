import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "../FormContext";

const Step3Preferences = ({ next, prev }) => {
  const { formData, setFormData } = useContext(FormContext);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  // Dummy Data (Replace with real API calls later)
  const data = {
    India: {
      UttarPradesh: ["Noida", "Agra"],
      Delhi: ["New Delhi", "Dwarka"],
    },
    USA: {
      California: ["Los Angeles", "San Diego"],
      Texas: ["Houston", "Dallas"],
    },
  };

  // Load countries
  useEffect(() => {
    setCountries(Object.keys(data));
  }, []);

  // Update states when country changes
  useEffect(() => {
    if (formData.country) {
      setStates(Object.keys(data[formData.country]));
      setFormData({ ...formData, state: "", city: "" }); // Reset dependent fields
    }
  }, [formData.country]);

  // Update cities when state changes
  useEffect(() => {
    if (formData.state) {
      setCities(data[formData.country][formData.state]);
      setFormData({ ...formData, city: "" }); // Reset city on state change
    }
  }, [formData.state]);

  const handleNext = () => {
    if (!formData.country || !formData.state || !formData.city) {
      alert("Please select Country, State, and City.");
      return;
    }
    next();
  };

  return (
    <div>
      <label>Country:</label><br />
      <select
        value={formData.country}
        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <br /><br />
      <label>State:</label><br />
      <select
        value={formData.state}
        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
        disabled={!formData.country}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>

      <br /><br />
      <label>City:</label><br />
      <select
        value={formData.city}
        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        disabled={!formData.state}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>

      <br /><br />
      <label>Subscription Plan:</label><br />
      <input
        type="radio"
        value="Basic"
        checked={formData.subscriptionPlan === "Basic"}
        onChange={(e) => setFormData({ ...formData, subscriptionPlan: e.target.value })}
      /> Basic &nbsp;
      <input
        type="radio"
        value="Pro"
        checked={formData.subscriptionPlan === "Pro"}
        onChange={(e) => setFormData({ ...formData, subscriptionPlan: e.target.value })}
      /> Pro &nbsp;
      <input
        type="radio"
        value="Enterprise"
        checked={formData.subscriptionPlan === "Enterprise"}
        onChange={(e) => setFormData({ ...formData, subscriptionPlan: e.target.value })}
      /> Enterprise

      <br /><br />
      <label>
        <input
          type="checkbox"
          checked={formData.newsletter}
          onChange={(e) => setFormData({ ...formData, newsletter: e.target.checked })}
        />
        &nbsp; Subscribe to Newsletter
      </label>

      <br /><br />
      <button onClick={prev}>Back</button>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step3Preferences;
