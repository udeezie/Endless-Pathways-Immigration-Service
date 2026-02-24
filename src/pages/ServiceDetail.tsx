import React, { useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { serviceDetails } from "../data/serviceDetails";
import "./ServiceDetail.css";

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? serviceDetails[serviceId] : undefined;

  useEffect(() => {
    if (service) {
      document.title = `${service.title} | Endless Pathways Immigration Services`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", service.heroText);
      } else {
        const newMeta = document.createElement("meta");
        newMeta.setAttribute("name", "description");
        newMeta.setAttribute("content", service.heroText);
        document.head.appendChild(newMeta);
      }
    }
    return () => {
      document.title = "Endless Pathways Immigration Services";
    };
  }, [service]);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <div className="service-detail-container">
      <div className="service-hero">
        <h1>{service.title}</h1>
        <p className="hero-text">{service.heroText}</p>
      </div>

      {service.hookParagraph && (
        <div className="hook-paragraph">
          <p>{service.hookParagraph}</p>
        </div>
      )}

      {service.policyAlert && (
        <div className="policy-alert">
          <h3>📢 {service.policyAlert.title}</h3>
          <p>{service.policyAlert.description}</p>
          <span className="policy-date">
            Effective: {service.policyAlert.effectiveDate}
          </span>
        </div>
      )}

      {service.sections.map((section, idx) => (
        <div key={idx} className="service-section">
          <h2>{section.heading}</h2>
          {section.content.map((item, i) => {
            if (typeof item === "string") {
              return <p key={i} dangerouslySetInnerHTML={{ __html: item }} />;
            }
            return (
              <ul key={i} className="bullet-list">
                {item.map((li, j) => (
                  <li key={j} dangerouslySetInnerHTML={{ __html: li }} />
                ))}
              </ul>
            );
          })}
        </div>
      ))}

      {service.comparisonTable && (
        <div className="comparison-section">
          <h2>{service.comparisonTable.title}</h2>
          <table className="comparison-table">
            <thead>
              <tr>
                {service.comparisonTable.headers.map((header, i) => (
                  <th key={i}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {service.comparisonTable.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {service.feeBreakdown && (
        <div className="fee-section">
          <h2>Government Fees</h2>
          <div className="fee-breakdown">
            {service.feeBreakdown.items.map((item, i) => (
              <div key={i} className="fee-item">
                <span>{item.description}</span>
                <span>{item.amount}</span>
              </div>
            ))}
            <div className="fee-item total">
              <span>Total</span>
              <span>{service.feeBreakdown.total}</span>
            </div>
          </div>
        </div>
      )}

      {service.processingTime && (
        <div className="processing-section">
          <h2>Processing Times</h2>
          <div className="processing-time">
            {service.processingTime.insideCanada && (
              <div className="time-card">
                <h4>Inside Canada</h4>
                <p>{service.processingTime.insideCanada}</p>
              </div>
            )}
            {service.processingTime.outsideCanada && (
              <div className="time-card">
                <h4>Outside Canada</h4>
                <p>{service.processingTime.outsideCanada}</p>
              </div>
            )}
          </div>
          {service.processingTime.note && (
            <p className="time-note">{service.processingTime.note}</p>
          )}
        </div>
      )}

      {service.refusalReasons && service.refusalReasons.length > 0 && (
        <div className="refusal-section">
          <h2>Common Refusal Reasons & How We Help</h2>
          <div className="refusal-grid">
            {service.refusalReasons.map((item, i) => (
              <div key={i} className="refusal-item">
                <div className="refusal-reason">{item.reason}</div>
                <div className="refusal-solution">{item.solution}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="how-we-help">
        <h2>How We Can Help</h2>
        <p>{service.howWeHelp.intro}</p>
        {service.howWeHelp.points && (
          <ul className="help-list">
            {service.howWeHelp.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        )}
        <div className="help-cta">
          <Link to="/book-consultation" className="cta-button">
            {service.howWeHelp.ctaText}
          </Link>
        </div>
      </div>

      {service.faqs && service.faqs.length > 0 && (
        <div className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            {service.faqs.map((faq, i) => (
              <details key={i} className="faq-item">
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
