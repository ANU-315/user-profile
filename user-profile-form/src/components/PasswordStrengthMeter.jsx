import React from "react";

const getStrength = (password) => {
  if (!password) return "";
  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[!@#$%^&*]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;

  if (strength === 0) return "Weak";
  if (strength === 1) return "Fair";
  if (strength === 2) return "Good";
  if (strength === 3) return "Strong";
};

const PasswordStrengthMeter = ({ password }) => {
  const strength = getStrength(password);
  const color = {
    Weak: "red",
    Fair: "orange",
    Good: "gold",
    Strong: "green",
  }[strength];

  return <div style={{ color, fontWeight: "bold" }}>{strength && `Strength: ${strength}`}</div>;
};

export default PasswordStrengthMeter;
