import React, { useState, useRef, useEffect } from "react";
import "./BookConsultation.css";

export interface ConsultationOption {
  id: string;
  title: string;
  duration: string;
  price: number;
  isUrgent?: boolean;
  location: "Online" | "In Person" | "Online/In Person";
  category: "canada" | "outside";
  description: string;
}

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Côte d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const consultationOptions: ConsultationOption[] = [
  {
    id: "ca-30-online",
    title: "Initial Consultation",
    duration: "30 Minutes",
    price: 150,
    location: "Online",
    category: "canada",
    description:
      "Ideal for individuals who are unsure which immigration pathway may be right for them. This session focuses on understanding your background, identifying possible options, and answering initial questions about eligibility and next steps.",
  },
  {
    id: "ca-30-inperson",
    title: "Initial Consultation",
    duration: "30 Minutes",
    price: 200,
    location: "In Person",
    category: "canada",
    description:
      "Best suited for clients who prefer face-to-face discussions and need clarity on their immigration options. This consultation provides an overview of potential pathways based on your circumstances and helps you understand your eligibility.",
  },
  {
    id: "ca-1h-online",
    title: "Initial Consultation",
    duration: "1 Hour",
    price: 250,
    location: "Online",
    category: "canada",
    description:
      "Designed for clients seeking a more in-depth assessment. This session includes a detailed discussion of potential immigration pathways based on your education, work experience, language proficiency, and long-term goals, with time for strategic planning and questions.",
  },
  {
    id: "ca-1h-inperson",
    title: "Initial Consultation",
    duration: "1 Hour",
    price: 300,
    location: "In Person",
    category: "canada",
    description:
      "A comprehensive, face-to-face consultation for clients who want a thorough evaluation of their immigration options. This session allows for deeper analysis, strategic guidance, and personalized recommendations tailored to your profile.",
  },
  {
    id: "ca-urgent",
    title: "Urgent Consultation",
    duration: "1 Hour",
    price: 500,
    location: "Online/In Person",
    isUrgent: true,
    category: "canada",
    description:
      "Ideal for individuals who require immediate assistance due to time-sensitive immigration issues, enforcement concerns, or urgent application deadlines. Priority scheduling and focused guidance are provided to address critical matters quickly and effectively.",
  },
  {
    id: "out-30-online",
    title: "Initial Consultation",
    duration: "30 Minutes",
    price: 150,
    location: "Online",
    category: "outside",
    description:
      "Ideal for individuals who are unsure which immigration pathway may be right for them. This session focuses on understanding your background, identifying possible options, and answering initial questions about eligibility and next steps.",
  },
  {
    id: "out-1h-online",
    title: "Initial Consultation",
    duration: "1 Hour",
    price: 250,
    location: "Online",
    category: "outside",
    description:
      "Designed for clients seeking a more in-depth assessment. This session includes a detailed discussion of potential immigration pathways based on your education, work experience, language proficiency, and long-term goals, with time for strategic planning and questions.",
  },
  {
    id: "out-urgent",
    title: "Urgent Consultation",
    duration: "1 Hour",
    price: 500,
    location: "Online",
    isUrgent: true,
    category: "outside",
    description:
      "Ideal for individuals who require immediate assistance due to time-sensitive immigration issues, enforcement concerns, or urgent application deadlines. Priority scheduling and focused guidance are provided to address critical matters quickly and effectively.",
  },
];

const BookConsultation: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    countryResidence: "",
    countryCitizenship: "",
    timeSlots: ["", "", "", "", ""],
    details: "",
  });

  const [selectedConsultation, setSelectedConsultation] =
    useState<ConsultationOption | null>(null);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    countryResidence: "",
    countryCitizenship: "",
    timeSlots: "",
    details: "",
    consultation: "",
  });
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showConsultationHint, setShowConsultationHint] = useState(false);

  const [showResidenceDropdown, setShowResidenceDropdown] = useState(false);
  const [showCitizenshipDropdown, setShowCitizenshipDropdown] = useState(false);
  const [residenceSearch, setResidenceSearch] = useState("");
  const [citizenshipSearch, setCitizenshipSearch] = useState("");

  const residenceRef = useRef<HTMLDivElement>(null);
  const citizenshipRef = useRef<HTMLDivElement>(null);
  const consultationSectionRef = useRef<HTMLDivElement>(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [activeSlotIndex, setActiveSlotIndex] = useState<number | null>(null);

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 8; hour <= 17; hour++) {
      for (let minute of ["00", "30"]) {
        const ampm = hour >= 12 ? "PM" : "AM";
        const displayHour = hour > 12 ? hour - 12 : hour;
        times.push(
          `${displayHour.toString().padStart(2, "00")}:${minute} ${ampm}`,
        );
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const filteredResidenceCountries = countries.filter((country) =>
    country.toLowerCase().includes(residenceSearch.toLowerCase()),
  );

  const filteredCitizenshipCountries = countries.filter((country) =>
    country.toLowerCase().includes(citizenshipSearch.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        residenceRef.current &&
        !residenceRef.current.contains(event.target as Node)
      ) {
        setShowResidenceDropdown(false);
      }
      if (
        citizenshipRef.current &&
        !citizenshipRef.current.contains(event.target as Node)
      ) {
        setShowCitizenshipDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleCountrySelect = (
    field: "countryResidence" | "countryCitizenship",
    country: string,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: country }));
    setErrors((prev) => ({ ...prev, [field]: "" }));

    if (field === "countryResidence") {
      setShowResidenceDropdown(false);
      setResidenceSearch("");
    } else {
      setShowCitizenshipDropdown(false);
      setCitizenshipSearch("");
    }
  };

  const handleTimeSlotClick = (index: number) => {
    if (!selectedConsultation) {
      setShowConsultationHint(true);
      setErrors((prev) => ({
        ...prev,
        consultation: "Please select a consultation package first",
      }));
      if (consultationSectionRef.current) {
        consultationSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      return;
    }
    setActiveSlotIndex(index);
    setSelectedDate("");
    setSelectedTime("");
  };

  const handleAddTimeSlot = () => {
    if (activeSlotIndex !== null && selectedDate && selectedTime) {
      const newTimeSlots = [...formData.timeSlots];
      newTimeSlots[activeSlotIndex] = `${selectedDate} at ${selectedTime}`;
      setFormData((prev) => ({ ...prev, timeSlots: newTimeSlots }));
      setActiveSlotIndex(null);
      setSelectedDate("");
      setSelectedTime("");

      const hasAnySlotFilled = newTimeSlots.some((slot) => slot !== "");
      if (hasAnySlotFilled) {
        setErrors((prev) => ({ ...prev, timeSlots: "" }));
      }
    }
  };

  const handleRemoveTimeSlot = (index: number) => {
    const newTimeSlots = [...formData.timeSlots];
    newTimeSlots[index] = "";
    setFormData((prev) => ({ ...prev, timeSlots: newTimeSlots }));
  };

  const handleSelectConsultation = (option: ConsultationOption) => {
    setSelectedConsultation(option);
    setErrors((prev) => ({ ...prev, consultation: "" }));
    setShowConsultationHint(false);
  };

  const validateForm = (): boolean => {
    const newErrors = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      countryResidence: "",
      countryCitizenship: "",
      timeSlots: "",
      details: "",
      consultation: "",
    };
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^[\d\s\-+()]{10,}$/.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid phone number";
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }
    if (!formData.countryResidence.trim()) {
      newErrors.countryResidence = "Country of residence is required";
      isValid = false;
    }
    if (!formData.countryCitizenship.trim()) {
      newErrors.countryCitizenship = "Country of citizenship is required";
      isValid = false;
    }
    if (!formData.details.trim()) {
      newErrors.details =
        "Please provide details about your immigration matter";
      isValid = false;
    }

    const hasValidSlot = formData.timeSlots.some((slot) => slot !== "");
    if (!hasValidSlot) {
      newErrors.timeSlots = "Please provide at least one preferred time slot";
      isValid = false;
    }

    if (!selectedConsultation) {
      newErrors.consultation = "Please select a consultation package";
      isValid = false;
      setShowConsultationHint(true);
      if (consultationSectionRef.current) {
        consultationSectionRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData,
          selectedConsultation,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccessToast(true);
        handleReset();
        setTimeout(() => setShowSuccessToast(false), 5000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      countryResidence: "",
      countryCitizenship: "",
      timeSlots: ["", "", "", "", ""],
      details: "",
    });
    setSelectedConsultation(null);
    setErrors({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      countryResidence: "",
      countryCitizenship: "",
      timeSlots: "",
      details: "",
      consultation: "",
    });
    setShowConsultationHint(false);
    setActiveSlotIndex(null);
    setSelectedDate("");
    setSelectedTime("");
  };

  const renderCards = (category: "canada" | "outside") => {
    return consultationOptions
      .filter((opt) => opt.category === category)
      .map((option) => (
        <div
          key={option.id}
          className={`consultation-card ${option.isUrgent ? "urgent" : ""} ${
            selectedConsultation?.id === option.id ? "selected" : ""
          } ${showConsultationHint && errors.consultation && !selectedConsultation ? "highlight-subtle" : ""}`}
          onClick={() => handleSelectConsultation(option)}
        >
          {option.isUrgent && <span className="urgent-badge">Priority</span>}
          <div className="card-header">
            <p className="card-title">{option.title}</p>
            <div className="duration">
              {option.duration} • {option.location}
            </div>
            <div className="price">${option.price}</div>
          </div>
          <div className="card-body">
            <p>{option.description}</p>
          </div>
          <div className="card-footer">
            <div
              className={`select-indicator ${selectedConsultation?.id === option.id ? "selected" : ""}`}
            >
              {selectedConsultation?.id === option.id ? (
                <>
                  <span className="check-icon">✓</span>
                  <span>Selected</span>
                </>
              ) : (
                <span>Click to select</span>
              )}
            </div>
          </div>
        </div>
      ));
  };

  return (
    <div className="consultation-page">
      <div className="container">
        {showSuccessToast && (
          <div className="success-toast">
            <div className="toast-icon">✓</div>
            <div className="toast-content">
              <h4>Request Submitted Successfully!</h4>
              <p>
                Thank you for booking a consultation. We will contact you within
                24 hours.
              </p>
            </div>
            <button
              className="toast-close"
              onClick={() => setShowSuccessToast(false)}
            >
              ×
            </button>
          </div>
        )}

        <section className="consultation-section" ref={consultationSectionRef}>
          <h2 className="section-title">
            <i className="fas fa-flag"></i> Residing in Canada
          </h2>

          <div className="card-grid">{renderCards("canada")}</div>
        </section>

        <section className="consultation-section">
          <h2 className="section-title">
            <i className="fas fa-globe-americas"></i> Residing Outside Canada
          </h2>
          <div className="card-grid">{renderCards("outside")}</div>
        </section>

        <section className="form-section">
          <div className="form-container">
            <div className="consultation-form">
              <span className="form-heading">Consultation Intake Form</span>
              <span className="form-subheading">
                Please complete the form below to help us prepare for your
                consultation and respond to your request efficiently.
              </span>

              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="input-group">
                    <input
                      type="text"
                      name="firstName"
                      className={`consultation-input ${errors.firstName ? "error" : ""}`}
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    {errors.firstName && (
                      <span className="error-message">{errors.firstName}</span>
                    )}
                  </div>
                  <div className="input-group">
                    <input
                      type="text"
                      name="lastName"
                      className={`consultation-input ${errors.lastName ? "error" : ""}`}
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    {errors.lastName && (
                      <span className="error-message">{errors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group">
                    <input
                      type="tel"
                      name="phone"
                      className={`consultation-input ${errors.phone ? "error" : ""}`}
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                    {errors.phone && (
                      <span className="error-message">{errors.phone}</span>
                    )}
                  </div>
                  <div className="input-group">
                    <input
                      type="email"
                      name="email"
                      className={`consultation-input ${errors.email ? "error" : ""}`}
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <span className="error-message">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group" ref={residenceRef}>
                    <div className="country-selector">
                      <input
                        type="text"
                        className={`consultation-input ${errors.countryResidence ? "error" : ""}`}
                        placeholder="Country of Residence *"
                        value={formData.countryResidence}
                        onClick={() =>
                          setShowResidenceDropdown(!showResidenceDropdown)
                        }
                        readOnly
                      />
                      <i
                        className={`fas fa-chevron-down dropdown-icon ${showResidenceDropdown ? "open" : ""}`}
                      ></i>
                    </div>
                    {showResidenceDropdown && (
                      <div className="country-dropdown">
                        <input
                          type="text"
                          className="country-search"
                          placeholder="Search country..."
                          value={residenceSearch}
                          onChange={(e) => setResidenceSearch(e.target.value)}
                          autoFocus
                        />
                        <div className="country-list">
                          {filteredResidenceCountries.map((country) => (
                            <div
                              key={country}
                              className={`country-item ${formData.countryResidence === country ? "selected" : ""}`}
                              onClick={() =>
                                handleCountrySelect("countryResidence", country)
                              }
                            >
                              {country}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {errors.countryResidence && (
                      <span className="error-message">
                        {errors.countryResidence}
                      </span>
                    )}
                  </div>

                  <div className="input-group" ref={citizenshipRef}>
                    <div className="country-selector">
                      <input
                        type="text"
                        className={`consultation-input ${errors.countryCitizenship ? "error" : ""}`}
                        placeholder="Country of Citizenship *"
                        value={formData.countryCitizenship}
                        onClick={() =>
                          setShowCitizenshipDropdown(!showCitizenshipDropdown)
                        }
                        readOnly
                      />
                      <i
                        className={`fas fa-chevron-down dropdown-icon ${showCitizenshipDropdown ? "open" : ""}`}
                      ></i>
                    </div>
                    {showCitizenshipDropdown && (
                      <div className="country-dropdown">
                        <input
                          type="text"
                          className="country-search"
                          placeholder="Search country..."
                          value={citizenshipSearch}
                          onChange={(e) => setCitizenshipSearch(e.target.value)}
                          autoFocus
                        />
                        <div className="country-list">
                          {filteredCitizenshipCountries.map((country) => (
                            <div
                              key={country}
                              className={`country-item ${formData.countryCitizenship === country ? "selected" : ""}`}
                              onClick={() =>
                                handleCountrySelect(
                                  "countryCitizenship",
                                  country,
                                )
                              }
                            >
                              {country}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {errors.countryCitizenship && (
                      <span className="error-message">
                        {errors.countryCitizenship}
                      </span>
                    )}
                  </div>
                </div>

                <span className="section-label">
                  Preferred Consultation Times (up to 5, in order of priority) *
                </span>

                <div className="time-slots-modern">
                  {formData.timeSlots.map((slot, index) => (
                    <div key={index} className="time-slot-modern">
                      <div className="time-slot-header">
                        <span className="time-slot-number">{index + 1}.</span>
                        {slot ? (
                          <div className="selected-time-display">
                            <span>{slot}</span>
                            <button
                              type="button"
                              className="remove-time-btn"
                              onClick={() => handleRemoveTimeSlot(index)}
                              aria-label="Remove time slot"
                            >
                              ×
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="add-time-btn"
                            onClick={() => handleTimeSlotClick(index)}
                          >
                            + Add preferred time
                          </button>
                        )}
                      </div>

                      {activeSlotIndex === index && (
                        <div className="time-picker-modern">
                          <div className="time-picker-row">
                            <div className="time-picker-field">
                              <label>Date</label>
                              <div className="date-input-wrapper">
                                <input
                                  type="date"
                                  min={new Date().toISOString().split("T")[0]}
                                  value={selectedDate}
                                  onChange={(e) =>
                                    setSelectedDate(e.target.value)
                                  }
                                  className="date-input"
                                />
                              </div>
                            </div>
                            <div className="time-picker-field">
                              <label>Time</label>
                              <select
                                value={selectedTime}
                                onChange={(e) =>
                                  setSelectedTime(e.target.value)
                                }
                                className="time-select"
                              >
                                <option value="">Select time</option>
                                {timeOptions.map((time) => (
                                  <option key={time} value={time}>
                                    {time}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="time-picker-actions">
                            <button
                              type="button"
                              className="cancel-time-btn"
                              onClick={() => setActiveSlotIndex(null)}
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              className="confirm-time-btn"
                              onClick={handleAddTimeSlot}
                              disabled={!selectedDate || !selectedTime}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {errors.timeSlots && (
                    <span className="error-message time-error">
                      {errors.timeSlots}
                    </span>
                  )}
                </div>

                <span className="section-label">Consultation Details *</span>
                <textarea
                  name="details"
                  className={`consultation-textarea ${errors.details ? "error" : ""}`}
                  rows={5}
                  placeholder="Please describe your immigration matter in detail. Include your current status, any deadlines you're facing, previous applications if any, and any specific concerns you'd like to address during the consultation. The more information you provide, the better we can prepare for our discussion."
                  value={formData.details}
                  onChange={handleInputChange}
                />
                {errors.details && (
                  <span className="error-message">{errors.details}</span>
                )}

                <div className="button-container">
                  <button
                    type="submit"
                    className="send-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </button>
                  <div className="reset-button-container">
                    <button
                      type="button"
                      className="reset-button"
                      onClick={handleReset}
                      disabled={isSubmitting}
                    >
                      Clear Form
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* Centered package selection hint */}
      {showConsultationHint && errors.consultation && (
        <div className="package-subtle-hint">
          <span className="hint-text">
            Please select a consultation package to continue
          </span>
        </div>
      )}
    </div>
  );
};

export default BookConsultation;
