import React, { useState } from "react";
import "./App.css";
import MandE from "../Images/MandE.png";
import mastercard from "../Images/Mastercard-logo.png";
import Derejalogo from "../Images/Derejalogo.png";
import { Box } from "@mui/material";

function App() {
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [additionalQuestionVisible, setAdditionalQuestionVisible] =
    useState(false);
  const [selfEmployedQuestionVisible, setSelfEmployedQuestionVisible] =
    useState(false);
  const [UnemployedQuestionVisible, setUnEmployedQuestionVisible] =
    useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    graduationYear: "",
    employmentStatus: "",
    company: "",
    position: "",
    sector: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [phoneNumberExists, setPhoneNumberExists] = useState(false);

  const handleEmploymentChange = (event) => {
    const selectedStatus = event.target.value;
    setEmploymentStatus(selectedStatus);
    setFormData((prev) => ({ ...prev, employmentStatus: selectedStatus }));

    if (selectedStatus === "Employed") {
      setAdditionalQuestionVisible(true);
      setSelfEmployedQuestionVisible(false);
      setUnEmployedQuestionVisible(false);
    } else if (selectedStatus === "Self-Employed") {
      setSelfEmployedQuestionVisible(true);
      setAdditionalQuestionVisible(false);
      setUnEmployedQuestionVisible(false);
    } else if (selectedStatus === "Unemployed") {
      setUnEmployedQuestionVisible(true);
      setAdditionalQuestionVisible(false);
      setSelfEmployedQuestionVisible(false);
    } else {
      setAdditionalQuestionVisible(false);
      setSelfEmployedQuestionVisible(false);
      setUnEmployedQuestionVisible(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
    const { fullName, phoneNumber, graduationYear } = formData;

    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
      errors.fullName = "Full Name must only contain letters.";
    }

    if (!/^09\d{8}$/.test(phoneNumber)) {
      errors.phoneNumber = "Phone Number must start with 09 and be 10 digits.";
    }

    if (!/^\d+$/.test(graduationYear)) {
      errors.graduationYear = "Graduation Year must only contain numbers.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:3001/api/candidate/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setShowModal(true);

        setFormData({
          fullName: "",
          phoneNumber: "",
          graduationYear: "",
          employmentStatus: "",
          company: "",
          position: "",
          sector: "",
          feedback: "",
        });
        setPhoneNumberExists(false);
        console.log("Server Response:", data);
      } else {
        if (response.status === 409) {
          setPhoneNumberExists(true);
        } else {
          alert(data.error || "Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      console.error("Network Error:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="App">
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Thank You!</h2>
            <h2>Your information has been saved successfully.</h2>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          width: "90%",
          maxWidth: 500,
          margin: "0 auto",
          marginBottom: 3,
        }}
      >
        <img
          src={mastercard}
          alt="Logo"
          style={{
            height: 60,
            width: "45%",
            maxWidth: 200,
            objectFit: "contain",
            flexBasis: "45%",
          }}
        />
        <img
          src={Derejalogo}
          alt="Dereja Logo"
          style={{
            height: 60,
            width: "45%",
            maxWidth: 200,
            objectFit: "contain",
            flexBasis: "45%",
          }}
        />
      </Box>

      <h1>DEREJA PLACEMENT TRACKING FORM</h1>
      <form onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="ስምዎትን ይፃፉ"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
        {formErrors.fullName && (
          <p className="error" style={{ color: "red" }}>
            {formErrors.fullName}
          </p>
        )}

        <label>Phone Number</label>
        <input
          type="tel"
          name="phoneNumber"
          placeholder="ስልክ ቁጥሮን ይፃፉ.."
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
        {formErrors.phoneNumber && (
          <p className="error" style={{ color: "red" }}>
            {formErrors.phoneNumber}
          </p>
        )}
        {phoneNumberExists && (
          <p className="error" style={{ color: "red" }}>
            Phone number already exists. Please use a different one.
          </p>
        )}

        <label>Year of Graduation</label>
        <input
          type="text"
          name="graduationYear"
          placeholder="የተመረቁበትን ዓመተ ምህረት ይፃፉ(በኢትዮጵያ አቆጣጠር)"
          value={formData.graduationYear}
          maxLength={4}
          onChange={handleInputChange}
          required
        />
        {formErrors.graduationYear && (
          <p className="error" style={{ color: "red" }}>
            {formErrors.graduationYear}
          </p>
        )}

        <label>Are you currently employed?</label>
        <select
          value={employmentStatus}
          onChange={handleEmploymentChange}
          required
        >
          <option value="" className="selectoption">
            Select Employment Status
          </option>
          <option value="Employed">Employed</option>
          <option value="Unemployed">Unemployed</option>
          <option value="Self-Employed">Self-Employed</option>
        </select>

        {additionalQuestionVisible && (
          <div className="additional-questions">
            <label>Which company do you work for?</label>
            <input
              type="text"
              name="company"
              placeholder="ሚሰሩበትን ድርጅት ምንድን ነው?"
              value={formData.company}
              onChange={handleInputChange}
              required
            />

            <label>What is your current job position?</label>
            <input
              type="text"
              name="position"
              placeholder="የተሰማሩበትን የስራ መስክ ይፃፉ?"
              value={formData.position}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        {selfEmployedQuestionVisible && (
          <div className="additional-questions">
            <label>What sector are you working in?</label>
            <input
              type="text"
              name="sector"
              placeholder="የተሰማሩበት የስራ ዘርፍ ምንድን ነው?"
              value={formData.sector}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        {UnemployedQuestionVisible && (
          <div className="additional-questions">
            <label>What support can Dereja offer you?</label>
            <input
              type="text"
              name="feedback"
              placeholder="ከደረጃ የሚፈልጉት የተለየ ድጋፍ አይነት አለ?"
              maxLength={100}
              value={formData.feedback}
              onChange={handleInputChange}
              required
            />
          </div>
        )}

        <div className="footer-links">
          <button type="submit">Submit</button>
        </div>

        <div className="footer">
          <p>
            For more information, visit{" "}
            <a
              href="https://www.dereja.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Dereja Website
            </a>{" "}
            or join our{" "}
            <a
              href="https://t.me/DerejaOfficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              Telegram Channel
            </a>
            .
          </p>
        </div>
        <img src={MandE} alt="Logo" style={{ height: 50, width: 50 }} />
      </form>
    </div>
  );
}

export default App;
