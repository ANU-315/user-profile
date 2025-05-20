import React, { useContext, useState } from "react";
import { FormContext } from "../FormContext";
import PasswordStrengthMeter from "./PasswordStrengthMeter";

const Step1PersonalInfo = ({ next }) => {
  const { formData, setFormData } = useContext(FormContext);
  const [preview, setPreview] = useState(formData.profilePhoto ? URL.createObjectURL(formData.profilePhoto) : null);
  const [usernameStatus, setUsernameStatus] = useState("");

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png") && file.size <= 2 * 1024 * 1024) {
      setFormData({ ...formData, profilePhoto: file });
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Only JPG/PNG files under 2MB are allowed.");
    }
  };

  // Simulated API check
  const checkUsername = async (username) => {
    setUsernameStatus("Checking...");
    // Replace with real API later
    setTimeout(() => {
      const isAvailable = username !== "anoop"; // simulate existing username
      setUsernameStatus(isAvailable ? "✅ Available" : "❌ Taken");
    }, 500);
  };

  // Validate and proceed
  const handleNext = () => {
    if (!formData.profilePhoto) return alert("Profile Photo is required.");
    if (formData.username.length < 4 || formData.username.includes(" ")) return alert("Invalid username.");
    if (formData.newPassword && !formData.currentPassword) return alert("Current password required to change password.");
    next();
  };

  return (
    <div>
      <label>Profile Photo (JPG/PNG ≤ 2MB):</label><br />
      <input type="file" accept="image/*" onChange={handleImageChange} /><br />
      {preview && <img src={preview} alt="preview" width={100} />}

      <br /><br />
      <label>Username:</label><br />
      <input
        type="text"
        value={formData.username}
        onChange={(e) => {
          const val = e.target.value;
          setFormData({ ...formData, username: val });
          if (val.length >= 4 && !val.includes(" ")) {
            checkUsername(val);
          } else {
            setUsernameStatus("");
          }
        }}
      />
      <div>{usernameStatus}</div>

      <br />
      <label>Current Password:</label><br />
      <input
        type="password"
        value={formData.currentPassword}
        onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
      />

      <br />
      <label>New Password:</label><br />
      <input
        type="password"
        value={formData.newPassword}
        onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
      />
      <PasswordStrengthMeter password={formData.newPassword} />

      <br />
      <label>Gender:</label><br />
      <select
        value={formData.gender}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
      >
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      {formData.gender === "Other" && (
        <>
          <br />
          <label>Please specify:</label><br />
          <input
            type="text"
            value={formData.customGender}
            onChange={(e) => setFormData({ ...formData, customGender: e.target.value })}
          />
        </>
      )}

      <br /><br />
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Step1PersonalInfo;
