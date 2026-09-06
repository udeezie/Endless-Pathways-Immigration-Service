import React from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import "./About.scss";

const SCOPE = [
  "Temporary residence applications (study permits, work permits, visitor visas)",
  "Permanent residence pathways (economic, family, and humanitarian streams)",
  "Refugee claimant support",
  "Citizenship applications",
  "Compliance reviews and post-decision support",
  "Representation before Immigration, Refugees and Citizenship Canada (IRCC) and other authorized bodies",
  "Settlement-related guidance, document review, and procedural advice",
  "Immigration education through consultations, workshops, and informational resources",
];

const About: React.FC = () => {
  return (
    <div className="about">
      {/* Masthead */}
      {/* The claim and its proof together: the credential sentence, then the
          regulator's badges and the public register link. */}
      <header className="ab-mast">
        <Reveal className="wrap ab-mast__inner">
          <h1 className="ab-mast__title">
            Welcome to Endless Pathways Immigration Services
          </h1>

          <p className="ab-mast__lede">
            My name is Appiah Bonsu, a Regulated Canadian Immigration Consultant
            (RCIC-IRB - L3) in good standing with the College of Immigration and
            Citizenship Consultants (CICC).
          </p>

          <div className="ab-verify">
            <div className="ab-verify__badges">
              <img
                src="/cc.png"
                alt="College of Immigration and Citizenship Consultants"
                onError={(e) => (e.currentTarget.style.display = "none")}
                loading="lazy"
              />
              <img
                src="/ca.png"
                alt="RCIC Badge"
                onError={(e) => (e.currentTarget.style.display = "none")}
                loading="lazy"
              />
            </div>

            <div className="ab-verify__text">
              <p className="ab-verify__label">
                Independently verify my credentials:
              </p>
              <a
                href="https://register.college-ic.ca/Public-Register-EN/Licensee/Profile.aspx?ID=53912"
                target="_blank"
                rel="noopener noreferrer"
                className="ab-verify__link"
                aria-label="Verify my RCIC status on CICC website"
              >
                <span>Verify my status on the CICC Register</span>
                <i
                  className="fas fa-arrow-up-right-from-square"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </Reveal>
      </header>

      {/* Profile */}
      {/* Story first, in the markup as well as on screen. The portrait column
          now holds only the photograph and its caption, so it is shorter than
          the prose and the sticky behaviour has somewhere to travel. */}
      <section className="ab-profile">
        <div className="wrap ab-profile__wrap">
          <div className="ab-story">
            <Reveal>
              <p className="ab-story__open">
                Like many of the clients I now serve, my journey to Canada began
                as an immigrant. I first arrived as an international student,
                navigating the same complex systems, uncertainty, and high
                stakes decisions that so many newcomers face. That lived
                experience continues to shape both my professional practice and
                my commitment to ethical, client centered immigration services.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <p>
                I hold a Master's degree in Critical Sociology from Brock
                University (Ontario) and have spent over a decade working as a
                Research Manager and researcher, leading and contributing to
                multiple projects focused on the lived experiences of immigrants
                in Canada. One finding appeared again and again across this
                work: immigrants often struggle to understand, maintain, and
                secure their legal status due to the complexity of Canada's
                immigration system.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <p className="ab-story__pull">
                That insight, grounded in research and real lives, is what led
                to the creation of Endless Pathways Immigration Services.
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <p>
                At Endless Pathways Immigration Services, we are a team of
                immigrants, professionals, and educators who know firsthand what
                it means to build a new life in Canada. Our clients are never
                just file numbers. We offer ethical, comprehensive, and
                personalized immigration services that reflect the complexity of
                your goals and the care they deserve.
              </p>
            </Reveal>
          </div>

          <Reveal className="ab-profile__aside" variant="scale">
            <figure className="ab-portrait">
              <div className="ab-portrait__frame">
                <img
                  src="/appiah.jpg"
                  alt="Appiah Bonsu - Regulated Canadian Immigration Consultant"
                  loading="eager"
                />
              </div>
              <figcaption className="ab-portrait__plate">
                <span className="ab-portrait__name">Appiah Bonsu</span>
                <span className="ab-portrait__role">
                  Regulated Canadian Immigration Consultant
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="ab-approach">
        <div className="wrap">
          <Reveal className="sec-head" as="header">
            <h2>Our Approach</h2>
            <p>
              Endless Pathways Immigration Services operates as a professional
              immigration consulting firm, providing advisory and authorized
              representation services in full compliance with federal and
              provincial regulations. We support clients through every stage of
              the immigration process, including:
            </p>
          </Reveal>

          <ul className="ab-scope">
            {SCOPE.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                className="ab-scope__item"
                delay={0.03 * i}
              >
                {item}
              </Reveal>
            ))}
          </ul>

          {/* Regulatory scope, set as a formal notice rather than body copy. */}
          <Reveal className="ab-notice" as="div">
            <p>
              All services are delivered in accordance with professional ethics,
              regulatory standards, and the CICC Code of Conduct. We do not
              engage in unlawful recruitment, employment placement, or any
              activities outside the authorized scope of immigration consulting.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      {/* The values paragraph and the closing statement used to be two separate
          sections of about one paragraph each, which made the page trail off.
          They are one thought, so they are now one section. */}
      <section className="ab-close">
        <div className="wrap ab-close__inner">
          <Reveal className="sec-head" as="header">
            <h2>More Than a File Number</h2>
          </Reveal>

          <Reveal className="ab-close__body" delay={0.05}>
            <p>
              At Endless Pathways Immigration Services, clients are never
              treated as just applications or case numbers. We understand that
              immigration decisions affect families, futures, and identities.
              Our work is guided by care, accuracy, transparency, and respect,
              values shaped by both professional training and lived experience.
            </p>

            <blockquote className="ab-close__statement">
              Wherever you are in your journey of planning, applying,
              responding to a decision, or rebuilding after a setback, we are
              here to help you move forward with clarity, confidence, and
              integrity.
            </blockquote>

            <Link
              to="/book-consultation"
              className="btn btn--gold"
              aria-label="Book a consultation"
            >
              Book Consultation
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default About;
