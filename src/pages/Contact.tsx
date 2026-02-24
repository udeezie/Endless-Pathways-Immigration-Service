import React from "react";
import "./Contact.css";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaGoogle,
  FaApple,
} from "react-icons/fa";

const Contact: React.FC = () => {
  const openGoogleMaps = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=190+Harwood+Avenue+S,+Ajax,+ON+L1S+2H6",
      "_blank",
    );
  };

  const openAppleMaps = () => {
    window.open(
      "http://maps.apple.com/?q=190+Harwood+Avenue+S,+Ajax,+ON+L1S+2H6",
      "_blank",
    );
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info-card">
          <h2 className="contact-heading">Get in touch</h2>
          <div className="info-grid">
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <strong>Office</strong>
                <p>
                  190 Harwood Avenue S<br />
                  Ajax, Ontario L1S 2H6
                </p>
              </div>
            </div>
            <div className="info-item">
              <FaPhone className="info-icon" />
              <div>
                <strong>Phone</strong>
                <p>
                  +1 (905) 931-3776
                  <br />
                  Mon–Fri, 9AM–6PM
                </p>
              </div>
            </div>
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div>
                <strong>Email</strong>
                <p>
                  info@endlesspathways.ca
                </p>
              </div>
            </div>
            <div className="info-item">
              <FaClock className="info-icon" />
              <div>
                <strong>Hours</strong>
                <p>
                  Mon–Fri: 9AM–6PM
                  <br />
                  Sat: 10AM–2PM
                  <br />
                  Sun: Closed
                </p>
              </div>
            </div>
          </div>

          <div className="map-section">
            <div
              className="map-container"
              onClick={openGoogleMaps}
              style={{ cursor: "pointer" }}
            >
              <iframe
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2876.67319489291!2d-79.0206786844817!3d43.861914779115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d51c1d7b5b5b5b%3A0x5f5f5f5f5f5f5f5f!2s190%20Harwood%20Avenue%20S%2C%20Ajax%2C%20ON%20L1S%202H6!5e0!3m2!1sen!2sca!4v1645543432468!5m2!1sen!2sca"
                width="100%"
                height="220"
                style={{ border: 0, pointerEvents: "none" }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div className="map-buttons">
              <button onClick={openGoogleMaps} className="map-btn">
                <FaGoogle /> Google Maps
              </button>
              <button onClick={openAppleMaps} className="map-btn">
                <FaApple /> Apple Maps
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;