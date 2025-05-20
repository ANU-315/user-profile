import logo from "./assets/logo.png";
import React, { useState } from "react";
import { FormProvider } from "./FormContext";
import Step1PersonalInfo from "./components/Step1PersonalInfo";
import Step2ProfessionalDetails from "./components/Step2ProfessionalDetails";
import Step3Preferences from "./components/Step3Preferences";
import Step4Summary from "./components/Step4Summary";
function App() {
  const [step, setStep] = useState(1);

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  return (
    <FormProvider>
      <div className="container">
      <img
  src={logo}
  alt="FREQUENT RESEARCH"
  style={{
    width: "150px",
    marginBottom: "20px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto"
  }}
/>

        <h2>FREQUENT RESEARCH – User Profile Form(Step {step})</h2>
        <p style={{
  textAlign: "center",
  fontWeight: "500",
  color: "#555",
  marginBottom: "30px"
}}>
  Step {step} of 4
</p>
<div className="progress-bar">
  {[1, 2, 3, 4].map((s, i) => (
    <div key={i} className={`progress-step ${step >= s ? "active" : ""}`}>
      {i < 3 && <div className="progress-line"></div>}
    </div>
  ))}
</div>

        {step === 1 && <Step1PersonalInfo next={next} />}
        {step === 2 && <Step2ProfessionalDetails next={next} prev={prev} />}
        {step === 3 && <Step3Preferences next={next} prev={prev} />}
        {step === 4 && <Step4Summary prev={prev} />}
      </div>
    </FormProvider>
  );
}

export default App;
