import React from "react";
import "./Contact.scss";
import {
  appleMapsUrl,
  googleMapsUrl,
  locations,
  mapEmbedUrl,
} from "../data/locations";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaGoogle,
  FaApple,
} from "react-icons/fa";

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-info-card">
          <h2 className="contact-heading">Get in touch</h2>
          <div className="info-grid">
            <div className="info-item">
              <FaMapMarkerAlt className="info-icon" />
              <div>
                <strong>{locations.length > 1 ? "Offices" : "Office"}</strong>
                {locations.map((l) => (
                  <p key={l.city}>
                    {l.street}
                    <br />
                    {l.region}
                  </p>
                ))}
              </div>
            </div>
            <div className="info-item">
              <FaPhone className="info-icon" />
              <div>
                <strong>Phone</strong>
                <p>
                  {/* Same formatting as the header and footer, and dialable
                      from a phone rather than plain text to copy out. */}
                  <a href="tel:905-931-3776">905-931-3776</a>
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
                  <a href="mailto:info@endlesspathways.ca">
                    info@endlesspathways.ca
                  </a>
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
            {/* One map per office. Each card carries its own directions links,
                so there is never any doubt which address a button applies to. */}
            {locations.map((l) => (
              <div className="map-card" key={l.city}>
                <div className="map-card__head">
                  <h3 className="map-card__city">{l.city}</h3>
                  <p className="map-card__addr">
                    {l.street}, {l.region}
                  </p>
                </div>

                <a
                  className="map-container"
                  href={googleMapsUrl(l)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open the ${l.city} office in Google Maps`}
                >
                  <iframe
                    title={`Map of the ${l.city} office`}
                    src={mapEmbedUrl(l)}
                    width="100%"
                    height="220"
                    style={{ border: 0, pointerEvents: "none" }}
                    allowFullScreen
                    loading="lazy"
                  />
                </a>

                <div className="map-buttons">
                  <a
                    href={googleMapsUrl(l)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-btn"
                  >
                    <FaGoogle /> Google Maps
                  </a>
                  <a
                    href={appleMapsUrl(l)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-btn"
                  >
                    <FaApple /> Apple Maps
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;