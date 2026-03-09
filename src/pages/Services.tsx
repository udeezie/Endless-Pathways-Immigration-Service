import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";

const Services: React.FC = () => {
  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="services-hero-content">
          <h1>OUR IMMIGRATION SERVICES</h1>
          <p className="hero-subtitle">
            We offer comprehensive immigration solutions tailored to your unique
            journey. From temporary visas to permanent residence and
            citizenship, we're here to help you navigate every step.
          </p>
        </div>
      </section>

      <section className="service-section" id="temporary-residence">
        <div className="section-header">
          <h2>TEMPORARY RESIDENCE</h2>
          <p className="section-intro">
            Your gateway to Canada. Temporary residence is often the first step
            in your Canadian immigration journey, offering opportunities to
            visit, study, or work while contributing to Canada's vibrant
            communities.
          </p>
        </div>

        <div className="services-grid">
          {temporaryServices.map((service, index) => (
            <ServiceCard
              key={index}
              id={service.id}
              title={service.title}
              description={service.description}
              features={service.features}
              type="temporary"
            />
          ))}
        </div>
      </section>

      <section className="service-section" id="permanent-residence">
        <div className="section-header">
          <h2>PERMANENT RESIDENCE</h2>
          <p className="section-intro">
            Build your future in Canada. Permanent residence offers long-term
            stability, allowing you to live, work, and study while enjoying the
            benefits of Canadian society and pathways to citizenship.
          </p>
        </div>

        <div className="services-grid">
          {permanentServices.map((service, index) => (
            <ServiceCard
              key={index}
              id={service.id}
              title={service.title}
              description={service.description}
              features={service.features}
              type="permanent"
            />
          ))}
        </div>
      </section>

      <section className="service-section" id="citizenship">
        <div className="section-header">
          <h2>CITIZENSHIP & OTHER SERVICES</h2>
          <p className="section-intro">
            Complete your journey and protect your status. From citizenship
            applications to resolving complex immigration matters, we provide
            comprehensive support for every stage of your Canadian experience.
          </p>
        </div>

        <div className="services-columns">
          <div className="service-column">
            <h3>CITIZENSHIP SERVICES</h3>
            <div className="compact-services">
              {citizenshipServices.map((service, index) => (
                <div key={index} className="compact-service">
                  <div>
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="service-column">
            <h3>SPECIALIZED SUPPORT</h3>
            <div className="compact-services">
              {otherServices.map((service, index) => (
                <div key={index} className="compact-service">
                  <div>
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="services-cta">
        <div className="cta-content">
          <h2>READY TO BEGIN YOUR JOURNEY?</h2>
          <p>
            Each immigration journey is unique. Our experienced team provides
            personalized guidance to help you navigate Canada's immigration
            system with confidence.
          </p>
          <div className="cta-buttons">
            <Link to="/book-consultation" className="cta-button">
              BOOK A CONSULTATION
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  features: string[];
  type: "temporary" | "permanent";
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  features,
  type,
}) => {
  return (
    <div className={`service-card card-${type}`}>
      <div className="service-card-header">
        <div className="service-card-title">
          <h3>{title}</h3>
        </div>
      </div>
      <p className="service-description">{description}</p>
      <ul className="service-features">
        {features.map((feature, i) => (
          <li key={i}>
            <span className="feature-icon">→</span>
            <span className="feature-text">{feature}</span>
          </li>
        ))}
      </ul>
      <div className="service-card-footer">
        <Link to={`/services/${id}`} className="learn-more-btn">
          LEARN MORE →
        </Link>
      </div>
    </div>
  );
};

const temporaryServices = [
  {
    id: "temporary-resident-visa",
    title: "TEMPORARY RESIDENT VISA (TRV)",
    description:
      "Travel to Canada for visiting family, tourism, or business purposes from visa-required countries.",
    features: [
      "Eligibility assessment",
      "Risk identification",
      "Document preparation",
      "Temporary intent demonstration",
    ],
  },
  {
    id: "eta",
    title: "ELECTRONIC TRAVEL AUTHORIZATION (ETA)",
    description:
      "Mandatory authorization for visa-exempt country nationals flying to or transiting through Canada.",
    features: [
      "Eligibility determination",
      "Admissibility screening",
      "Accurate application submission",
      "Travel disruption prevention",
    ],
  },
  {
    id: "super-visa",
    title: "PARENT & GRANDPARENT SUPER VISA",
    description:
      "Long-term visitor visa allowing extended family reunification in Canada.",
    features: [
      "Multi-entry validity",
      "Extended stay options",
      "Medical insurance guidance",
      "Financial support assessment",
    ],
  },
  {
    id: "visitor-record",
    title: "VISITOR RECORD",
    description:
      "Extension of authorized stay or restoration of visitor status.",
    features: [
      "Status extension",
      "Compliance maintenance",
      "Overstay solutions",
      "Restoration applications",
    ],
  },
  {
    id: "temporary-resident-permit",
    title: "TEMPORARY RESIDENT PERMIT (TRP)",
    description:
      "Entry or stay for inadmissible individuals under exceptional circumstances.",
    features: [
      "Inadmissibility assessment",
      "Compelling factor presentation",
      "Discretionary case preparation",
      "Risk/benefit analysis",
    ],
  },
  {
    id: "study-permit",
    title: "STUDY PERMIT",
    description:
      "Authorization for international students to pursue education at designated Canadian institutions.",
    features: [
      "DLI admission support",
      "Financial capacity proof",
      "Study intent demonstration",
      "Post-graduation planning",
    ],
  },
  {
    id: "work-permits",
    title: "WORK PERMITS",
    description:
      "Legal authorization for foreign nationals to work in Canada with various program options.",
    features: [
      "Employer-specific permits",
      "Post-graduation work permits",
      "Co-op placement support",
      "PGWP applications",
    ],
  },
];

const permanentServices = [
  {
    id: "family-class",
    title: "FAMILY CLASS SPONSORSHIP",
    description:
      "Reunite with close family members through sponsorship for permanent residence.",
    features: [
      "Spouse/partner sponsorship",
      "Parent/grandparent sponsorship",
      "Financial obligation guidance",
      "Application completeness",
    ],
  },
  {
    id: "economic-immigration",
    title: "ECONOMIC IMMIGRATION",
    description:
      "Pathways for skilled workers, entrepreneurs, and professionals contributing to Canada's economy.",
    features: [
      "Express Entry programs",
      "Provincial nominations",
      "Business immigration",
      "Comprehensive ranking optimization",
    ],
  },
  {
    id: "humanitarian-compassionate",
    title: "HUMANITARIAN & COMPASSIONATE",
    description:
      "Discretionary pathway for those facing hardship if required to leave Canada.",
    features: [
      "Case assessment",
      "Evidence preparation",
      "Humanitarian factors presentation",
      "Legal basis establishment",
    ],
  },
  {
    id: "refugee-protection",
    title: "REFUGEE PROTECTION",
    description:
      "Protection for individuals fleeing persecution, conflict, or serious threats.",
    features: [
      "Asylum claim support",
      "Refugee resettlement",
      "Protection assessment",
      "Credible evidence preparation",
    ],
  },
];

const citizenshipServices = [
  {
    id: "citizenship-naturalization",
    title: "CITIZENSHIP BY NATURALIZATION",
    description:
      "For permanent residents meeting residency, language, and knowledge requirements.",
  },
  {
    id: "citizenship-descent",
    title: "CITIZENSHIP BY DESCENT",
    description:
      "Proof of citizenship for individuals born outside Canada to Canadian parents.",
  },
  {
    id: "citizenship-minors",
    title: "CITIZENSHIP APPLICATIONS FOR MINORS",
    description: "Support for adults, minors, and special circumstances.",
  },
  {
    id: "citizenship-resumption-renunciation",
    title: "RESUMPTION & RENUNCIATION",
    description:
      "Guidance for regaining or voluntarily giving up Canadian citizenship.",
  },
];

const otherServices = [
  {
    id: "admissibility-issues",
    title: "ADMISSIBILITY ISSUES",
    description:
      "Assistance with misrepresentation, non-compliance, criminality, or medical concerns.",
  },
  {
    id: "appeals-reviews",
    title: "APPEALS & REVIEWS",
    description:
      "Support for immigration appeals, refugee appeals, and Federal Court reviews.",
  },
  {
    id: "enforcement-matters",
    title: "ENFORCEMENT MATTERS",
    description:
      "Guidance for removal orders, detention reviews, and compliance issues.",
  },
  {
    id: "strategic-advice",
    title: "STRATEGIC ADVICE",
    description:
      "Case-specific consultations for complex immigration histories and planning.",
  },
];

export default Services;
