import React from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useScrollSpy } from "../hooks/useScrollSpy";
import "./Services.scss";

// The page is built as a journey, so the navigator is too: three nodes on a
// rail, filling as you move through them. Labels are the stage names already
// used on the page.
const STAGES = [
  { id: "temporary-residence", label: "Stage One", name: "Temporary Residence" },
  { id: "permanent-residence", label: "Stage Two", name: "Permanent Residence" },
  { id: "citizenship", label: "Stage Three", name: "Citizenship & Other" },
];

const STAGE_IDS = STAGES.map((s) => s.id);

const Services: React.FC = () => {
  const activeStage = useScrollSpy(STAGE_IDS, 200);
  const activeIndex = Math.max(0, STAGE_IDS.indexOf(activeStage));

  return (
    <div className="svc-page">
      {/* Hero */}
      <section className="svc-hero">
        <div className="svc-hero__media" aria-hidden="true">
          <picture>
            <source media="(max-width: 700px)" srcSet="/services-hero-sm.jpg" />
            <img src="/services-hero.jpg" alt="" decoding="async" />
          </picture>
          <div className="svc-hero__scrim" />
        </div>

        <div className="wrap svc-hero__inner">
          <Reveal variant="mask">
            <span className="svc-hero__eyebrow">What We Offer</span>
            <h1 className="svc-hero__title">
              Your Pathway to<span className="svc-hero__accent"> Canada</span>
              <br />
              Starts Here
            </h1>
            <p className="svc-hero__sub">
              Comprehensive immigration solutions tailored to your unique
              journey. From temporary visas to permanent residence and
              citizenship, we navigate every step with you.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sticky journey rail — orientation on a long page, and it makes the
          three stages an actual progression rather than a decorative label. */}
      <nav
        className="svc-stagenav"
        aria-label="Service stages"
        style={{ "--stage-progress": activeIndex } as React.CSSProperties}
      >
        <div className="wrap svc-stagenav__inner">
          <div className="svc-stagenav__track" aria-hidden="true">
            <span
              className="svc-stagenav__fill"
              style={{
                width: `${(activeIndex / (STAGES.length - 1)) * 100}%`,
              }}
            />
          </div>

          <ul className="svc-stagenav__list">
            {STAGES.map((stage, i) => (
              <li key={stage.id}>
                <a
                  href={`#${stage.id}`}
                  className={`svc-stagenav__item ${
                    i === activeIndex ? "is-active" : ""
                  } ${i < activeIndex ? "is-done" : ""}`}
                  aria-current={i === activeIndex ? "true" : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById(stage.id)
                      ?.scrollIntoView({ block: "start" });
                    window.history.replaceState(null, "", `#${stage.id}`);
                  }}
                >
                  <span className="svc-stagenav__node" aria-hidden="true" />
                  <span className="svc-stagenav__text">
                    <span className="svc-stagenav__label">{stage.label}</span>
                    <span className="svc-stagenav__name">{stage.name}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Temporary */}
      <section className="svc-stage" id="temporary-residence">
        <div className="wrap">
          <Reveal className="svc-stage__head" as="header">
            <span className="svc-stage__label">Stage One</span>
            <h2>Temporary Residence</h2>
            <p>
              Your gateway to Canada. Temporary residence is often the first step
              in your Canadian immigration journey, offering opportunities to
              visit, study, or work while contributing to Canada's vibrant
              communities.
            </p>
          </Reveal>

          <div className="svc-grid">
            {temporaryServices.map((service, i) => (
              <ServiceCard key={service.id} {...service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Permanent */}
      <section className="svc-stage svc-stage--tinted" id="permanent-residence">
        <div className="wrap">
          <Reveal className="svc-stage__head" as="header">
            <span className="svc-stage__label">Stage Two</span>
            <h2>Permanent Residence</h2>
            <p>
              Build your future in Canada. Permanent residence offers long-term
              stability, allowing you to live, work, and study while enjoying the
              benefits of Canadian society and pathways to citizenship.
            </p>
          </Reveal>

          <div className="svc-grid">
            {permanentServices.map((service, i) => (
              <ServiceCard key={service.id} {...service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Citizenship */}
      <section className="svc-stage" id="citizenship">
        <div className="wrap">
          <Reveal className="svc-stage__head" as="header">
            <span className="svc-stage__label">Stage Three</span>
            <h2>Citizenship &amp; Other Services</h2>
            <p>
              Complete your journey and protect your status. From citizenship
              applications to resolving complex immigration matters, we provide
              comprehensive support for every stage of your Canadian experience.
            </p>
          </Reveal>

          {/* These entries have no detail pages, so they stay as a register
              rather than pretending to be links. */}
          <div className="svc-columns">
            <div className="svc-column">
              <h3 className="svc-column__title">Citizenship Services</h3>
              <ul className="svc-list">
                {citizenshipServices.map((service, i) => (
                  <Reveal as="li" key={service.id} delay={0.04 * i}>
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </Reveal>
                ))}
              </ul>
            </div>

            <div className="svc-column">
              <h3 className="svc-column__title">Specialized Support</h3>
              <ul className="svc-list">
                {otherServices.map((service, i) => (
                  <Reveal as="li" key={service.id} delay={0.04 * i}>
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
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
  index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  features,
  index = 0,
}) => (
  <Reveal as="article" className="svc-card" delay={0.05 * (index % 3)}>
    <Link to={`/services/${id}`} className="svc-card__hit">
      <h3 className="svc-card__title">{title}</h3>
      <p className="svc-card__desc">{description}</p>

      <ul className="svc-card__features">
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>

      <span className="svc-card__more">
        Learn More
        <i className="fas fa-arrow-right" aria-hidden="true" />
      </span>
    </Link>
  </Reveal>
);

const temporaryServices = [
  {
    id: "temporary-resident-visa",
    title: "Temporary Resident Visa",
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
    title: "Electronic Travel Authorization",
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
    title: "Parent & Grandparent Super Visa",
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
    title: "Visitor Record",
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
    title: "Temporary Resident Permit",
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
    title: "Study Permit",
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
    title: "Work Permits",
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
    title: "Family Class Sponsorship",
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
    title: "Economic Immigration",
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
    title: "Humanitarian & Compassionate",
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
    title: "Refugee Protection",
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
    title: "Citizenship by Naturalization",
    description:
      "For permanent residents meeting residency, language, and knowledge requirements.",
  },
  {
    id: "citizenship-descent",
    title: "Citizenship by Descent",
    description:
      "Proof of citizenship for individuals born outside Canada to Canadian parents.",
  },
  {
    id: "citizenship-minors",
    title: "Citizenship Applications for Minors",
    description: "Support for adults, minors, and special circumstances.",
  },
  {
    id: "citizenship-resumption-renunciation",
    title: "Resumption & Renunciation",
    description:
      "Guidance for regaining or voluntarily giving up Canadian citizenship.",
  },
];

const otherServices = [
  {
    id: "admissibility-issues",
    title: "Admissibility Issues",
    description:
      "Assistance with misrepresentation, non-compliance, criminality, or medical concerns.",
  },
  {
    id: "appeals-reviews",
    title: "Appeals & Reviews",
    description:
      "Support for immigration appeals, refugee appeals, and Federal Court reviews.",
  },
  {
    id: "enforcement-matters",
    title: "Enforcement Matters",
    description:
      "Guidance for removal orders, detention reviews, and compliance issues.",
  },
  {
    id: "strategic-advice",
    title: "Strategic Advice",
    description:
      "Case-specific consultations for complex immigration histories and planning.",
  },
];

export default Services;
