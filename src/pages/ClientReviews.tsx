import React from "react";
import { Link } from "react-router-dom";
import "./ClientReviews.css";

const ClientReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Bernard Asare",
      initials: "BA",
      location: "Ghana",
      type: "Study Permit + Co-op",
      year: "2023",
      rating: 5,
      text: "Endless Pathways helped me get my study permit and co op work permit in 2023. They walked me through everything and made sure I understood each step. From my application to landing in Canada, it was smooth all the way.",
    },
    {
      id: 2,
      name: "Jonathan Asamoah",
      initials: "JA",
      location: "Ghana",
      type: "Study Permit",
      rating: 5,
      text: "I didn't know much about the study permit process, but Endless Pathways took time to explain everything. They answered all my questions and made sure I felt confident before submitting. Grateful for their patience.",
    },
    {
      id: 3,
      name: "Prince Vortia",
      initials: "PV",
      location: "Ghana",
      type: "Study Permit",
      rating: 5,
      text: "Endless Pathways didn't just process my application, they guided me through it all. From explaining what documents I needed to submitting on time, their service was top notch. So glad I found them.",
    },
  ];

  const renderStars = (rating: number) => {
    return Array(rating)
      .fill(0)
      .map((_, i) => <i key={i} className="fas fa-star"></i>);
  };

  return (
    <div className="client-reviews-page">
      <div className="background-pattern" aria-hidden="true"></div>

      <section className="client-reviews-hero">
        <div className="client-reviews-hero-gradient"></div>
        <div className="client-reviews-hero-content">
          <h1 className="client-reviews-hero-title">Client Reviews</h1>
          <p className="client-reviews-hero-subtitle">
            Real feedback from people we've helped
          </p>
        </div>
      </section>

      <section className="client-reviews-grid-section">
        <div className="client-reviews-container">
          <div className="client-reviews-grid">
            {reviews.map((review) => (
              <article key={review.id} className="client-review-card">
                <div className="client-review-rating">
                  {renderStars(review.rating)}
                </div>
                <p className="client-review-text">"{review.text}"</p>
                <div className="client-review-author">
                  <div className="client-review-author-initials">
                    {review.initials}
                  </div>
                  <div className="client-review-author-info">
                    <h4>{review.name}</h4>
                    <p>
                      {review.type} • {review.location}
                      {review.year ? ` (${review.year})` : ""}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="client-reviews-cta-section">
        <div className="client-reviews-cta-container">
          <p className="client-reviews-cta-text">
            Join our growing family of satisfied clients.
          </p>
          <Link to="/book-consultation" className="styled-btn">
            Book a Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ClientReviews;
