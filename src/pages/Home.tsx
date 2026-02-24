import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, ...options },
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return { ref, isInView };
};

const Home: React.FC = () => {
  const [showMore, setShowMore] = useState(false);
  const toggleMoreInsights = () => setShowMore(!showMore);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContentRef = useInView();
  const imageRef = useInView();
  const welcomeRef = useInView();
  const verifySectionRef = useInView();
  const badgesRef = useInView();
  const contentRefs = [
    useInView(),
    useInView(),
    useInView(),
    useInView(),
    useInView(),
  ];
  const learnMoreBtnRef = useInView();
  const expandableRef = useInView();
  const whyChooseTitleRef = useInView();
  const benefitRefs = [
    useInView(),
    useInView(),
    useInView(),
    useInView(),
    useInView(),
    useInView(),
  ];
  const servicesTitleRef = useInView();
  const serviceCardRefs = [useInView(), useInView(), useInView()];
  const processTitleRef = useInView();
  const processCardRefs = [
    useInView(),
    useInView(),
    useInView(),
    useInView(),
    useInView(),
  ];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  const processSteps = [
    {
      step: 1,
      title: "In‑Depth Consultation",
      description:
        "Meet with us to discuss your case in detail. We analyse your situation, answer your questions, and outline the most effective strategy. Our consultation fee is clearly communicated upfront.",
      buttonText: "Book Now",
      buttonLink: "/book-consultation",
      icon: "fa-solid fa-comments",
    },
    {
      step: 2,
      title: "Document Guidance",
      description:
        "Once you retain our services, we provide a customised document checklist and step‑by‑step guidance. We ensure you gather the right evidence and complete all forms accurately.",
      buttonText: "Retainer Info",
      buttonLink: "/services",
      icon: "fa-solid fa-file-lines",
    },
    {
      step: 3,
      title: "Final Review",
      description:
        "Before submission, we conduct a thorough audit of your entire application. We verify that every document is current, consistent, and meets IRCC requirements.",
      buttonText: "Review Process",
      buttonLink: "/services",
      icon: "fa-solid fa-magnifying-glass",
    },
    {
      step: 4,
      title: "Submission & Letter",
      description:
        "We submit your complete application along with a professionally drafted explanatory letter. Our regulated consultant's letter helps visa officers process your case efficiently and correctly.",
      buttonText: "See Submission",
      buttonLink: "#",
      icon: "fa-solid fa-envelope",
    },
    {
      step: 5,
      title: "Ongoing Support",
      description:
        "Our relationship doesn't end at submission. We monitor your application, provide regular updates, and liaise with IRCC on your behalf whenever necessary.",
      buttonText: "Support Details",
      buttonLink: "/contact",
      icon: "fa-solid fa-headset",
    },
  ];

  return (
    <div className="home-container">
      <div className="background-pattern"></div>

      <div className="video-hero-section">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="hero-video"
        >
          <source src="/canada.mp4" type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
        <div
          className={`video-content ${videoContentRef.isInView ? "in-view" : ""}`}
          ref={videoContentRef.ref as React.RefObject<HTMLDivElement>}
        >
          <h1 className="hero-title">
            Where Your Canadian Immigration Journey Finds Clarity
          </h1>
          <Link to="/book-consultation" className="hero-btn styled-btn">
            Book Consultation
          </Link>
        </div>
      </div>

      <div className="home-content">
        <div
          className={`image-section fade-in ${imageRef.isInView ? "in-view" : ""}`}
          ref={imageRef.ref as React.RefObject<HTMLDivElement>}
        >
          <img
            src="/appiah.jpg"
            alt="Appiah Bonsu - Regulated Canadian Immigration Consultant"
            className="appiah-image"
          />
        </div>

        <div className="text-section">
          <div className="welcome-section">
            <h2
              className={`welcome-title slide-up ${welcomeRef.isInView ? "in-view" : ""}`}
              ref={welcomeRef.ref as React.RefObject<HTMLHeadingElement>}
            >
              Welcome to Endless Pathways Immigration Services
            </h2>

            <div className="content-block">
              <p
                className={`fade-in ${contentRefs[0].isInView ? "in-view" : ""}`}
                ref={
                  contentRefs[0].ref as React.RefObject<HTMLParagraphElement>
                }
              >
                My name is Appiah Bonsu, a Regulated Canadian Immigration
                Consultant (<strong>RCIC-IRB - L3</strong>) in good standing
                with the College of Immigration and Citizenship Consultants
                (CICC).
              </p>

              <div
                className={`verify-section slide-up ${verifySectionRef.isInView ? "in-view" : ""}`}
                ref={verifySectionRef.ref as React.RefObject<HTMLDivElement>}
              >
                <a
                  href="https://college-ic.ca/protecting-the-public/find-an-immigration-consultant"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="verify-link"
                >
                  Verify my status
                </a>

                <div className="downward-arrow">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div
                  className={`accreditation-badges fade-in ${badgesRef.isInView ? "in-view" : ""}`}
                  ref={badgesRef.ref as React.RefObject<HTMLDivElement>}
                >
                  <img
                    src="/cc.png"
                    alt="College of Immigration and Citizenship Consultants – Regulated Member"
                    className="cicc-logo"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                  <img
                    src="/ca.png"
                    alt="Regulated Canadian Immigration Consultant – Immigration and Refugee Board"
                    className="rcic-badge"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              </div>

              <p
                className={`fade-in ${contentRefs[1].isInView ? "in-view" : ""}`}
                ref={
                  contentRefs[1].ref as React.RefObject<HTMLParagraphElement>
                }
              >
                Like many of the clients I now serve, my journey to Canada began
                as an immigrant. I first arrived as an international student,
                navigating the same complex systems, uncertainty, and
                high‑stakes decisions that so many newcomers face. That lived
                experience continues to shape both my professional practice and
                my commitment to ethical, client‑centered immigration services.
              </p>

              <p
                className={`fade-in ${contentRefs[2].isInView ? "in-view" : ""}`}
                ref={
                  contentRefs[2].ref as React.RefObject<HTMLParagraphElement>
                }
              >
                I hold a Master's degree in Critical Sociology from Brock
                University (Ontario) and have spent over a decade working as a
                Research Manager and researcher, leading and contributing to
                multiple projects focused on the lived experiences of immigrants
                in Canada. One finding appeared again and again across this
                work: immigrants often struggle to understand, maintain, and
                secure their legal status due to the complexity of Canada's
                immigration system.
              </p>

              <p
                className={`fade-in ${contentRefs[3].isInView ? "in-view" : ""}`}
                ref={
                  contentRefs[3].ref as React.RefObject<HTMLParagraphElement>
                }
              >
                That insight grounded in research and real lives, is what led to
                the creation of Endless Pathways Immigration Services.
              </p>

              <p
                className={`fade-in ${contentRefs[4].isInView ? "in-view" : ""}`}
                ref={
                  contentRefs[4].ref as React.RefObject<HTMLParagraphElement>
                }
              >
                At Endless Pathways Immigration Services, we are a team of
                immigrants, professionals, and educators who know firsthand what
                it means to build a new life in Canada. Our clients are never
                just file numbers. We offer ethical, comprehensive, and
                personalized immigration services that reflect the complexity of
                your goals and the care they deserve.
              </p>
            </div>
          </div>

          <div
            className={`insights-button-container fade-in ${learnMoreBtnRef.isInView ? "in-view" : ""}`}
            ref={learnMoreBtnRef.ref as React.RefObject<HTMLDivElement>}
          >
            <button onClick={toggleMoreInsights} className="styled-btn">
              {showMore ? "Show Less" : "Learn More"}
            </button>
          </div>

          {showMore && (
            <div
              className={`expandable-content slide-up ${expandableRef.isInView ? "in-view" : ""}`}
              ref={expandableRef.ref as React.RefObject<HTMLDivElement>}
            >
              <div className="approach-section">
                <h3 className="section-subtitle">OUR APPROACH</h3>
                <div className="content-block">
                  <p>
                    Endless Pathways Immigration Services operates as a
                    professional immigration consulting firm, providing advisory
                    and authorized representation services in full compliance
                    with federal and provincial regulations. We support clients
                    through every stage of the immigration process, including:
                  </p>
                  <ul className="professional-list">
                    <li>
                      <i className="fas fa-passport list-icon"></i>
                      <span className="list-text">
                        Temporary residence applications (study permits, work
                        permits, visitor visas)
                      </span>
                    </li>
                    <li>
                      <i className="fas fa-house-chimney list-icon"></i>
                      <span className="list-text">
                        Permanent residence pathways (economic, family, and
                        humanitarian streams)
                      </span>
                    </li>
                    <li>
                      <i className="fas fa-hand-holding-heart list-icon"></i>
                      <span className="list-text">
                        Refugee claimant support
                      </span>
                    </li>
                    <li>
                      <i className="fas fa-leaf list-icon"></i>
                      <span className="list-text">
                        Citizenship applications
                      </span>
                    </li>
                    <li>
                      <i className="fas fa-scale-balanced list-icon"></i>
                      <span className="list-text">
                        Compliance reviews and post-decision support
                      </span>
                    </li>
                    <li>
                      <i className="fas fa-gavel list-icon"></i>
                      <span className="list-text">
                        Representation before Immigration, Refugees and
                        Citizenship Canada (IRCC) and other authorized bodies
                      </span>
                    </li>
                    <li>
                      <i className="fas fa-compass list-icon"></i>
                      <span className="list-text">
                        Settlement-related guidance, document review, and
                        procedural advice
                      </span>
                    </li>
                    <li>
                      <i className="fas fa-chalkboard-user list-icon"></i>
                      <span className="list-text">
                        Immigration education through consultations, workshops,
                        and informational resources
                      </span>
                    </li>
                  </ul>
                  <p>
                    All services are delivered in accordance with professional
                    ethics, regulatory standards, and the CICC Code of Conduct.
                    We do not engage in unlawful recruitment, employment
                    placement, or any activities outside the authorized scope of
                    immigration consulting.
                  </p>
                </div>
              </div>

              <div className="closing-section">
                <h3 className="section-subtitle">MORE THAN A FILE NUMBER</h3>
                <div className="content-block">
                  <p>
                    At Endless Pathways Immigration Services, clients are never
                    treated as just applications or case numbers. We understand
                    that immigration decisions affect families, futures, and
                    identities. Our work is guided by care, accuracy,
                    transparency, and respect values shaped by both professional
                    training and lived experience.
                  </p>
                  <p className="highlighted-text">
                    Wherever you are in your journey of planning, applying,
                    responding to a decision, or rebuilding after a setback, we
                    are here to help you move forward with clarity, confidence,
                    and integrity.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="why-choose-section">
        <h2
          className={`section-title slide-up ${whyChooseTitleRef.isInView ? "in-view" : ""}`}
          ref={whyChooseTitleRef.ref as React.RefObject<HTMLHeadingElement>}
        >
          WHY CHOOSE ENDLESS PATHWAYS IMMIGRATION SERVICES?
        </h2>
        <div className="benefits-grid">
          {benefitRefs.map((ref, index) => (
            <div
              key={index}
              className={`benefit-card fade-in ${ref.isInView ? "in-view" : ""}`}
              ref={ref.ref as React.RefObject<HTMLDivElement>}
            >
              <div className="benefit-icon-container">
                <i
                  className={`benefit-icon ${
                    index === 0
                      ? "fa-solid fa-certificate"
                      : index === 1
                        ? "fa-solid fa-graduation-cap"
                        : index === 2
                          ? "fa-solid fa-chart-line"
                          : index === 3
                            ? "fa-solid fa-umbrella"
                            : index === 4
                              ? "fa-solid fa-handshake"
                              : "fa-solid fa-trophy"
                  }`}
                ></i>
              </div>
              <h3>
                {index === 0 && "REGULATED & AUTHORIZED"}
                {index === 1 && "LIVED EXPERIENCE + ACADEMIC RIGOUR"}
                {index === 2 && "RESEARCH‑DRIVEN STRATEGY"}
                {index === 3 && "FULL‑SERVICE REPRESENTATION"}
                {index === 4 && "TRANSPARENT & ETHICAL"}
                {index === 5 && "PROVEN TRACK RECORD"}
              </h3>
              <p>
                {index === 0 &&
                  "Appiah Bonsu is a Regulated Canadian Immigration Consultant (RCIC‑IRB) in good standing with the College of Immigration and Citizenship Consultants (CICC). You are represented by a qualified professional bound by a strict code of ethics."}
                {index === 1 &&
                  "As a former international student, Appiah knows the system from the inside. Combined with a Master's degree in Critical Sociology and 10+ years of research on immigrant experiences, his advice is both empathetic and evidence‑based."}
                {index === 2 &&
                  "Our decade of research revealed a core truth: immigrants struggle because the system is too complex. We turn that insight into clear, proactive application strategies that anticipate officer concerns and reduce refusal rates."}
                {index === 3 &&
                  "From study permits and work visas to family sponsorship, refugee claims, and citizenship, we handle the entire immigration lifecycle. You never need to switch firms as your goals evolve."}
                {index === 4 &&
                  "Fixed fees, no hidden charges. We provide a clear written agreement before any work begins. Integrity is not optional – it is the foundation of our practice."}
                {index === 5 &&
                  "Over 500+ applications are filed across all immigration streams. While every case is unique, our methodical approach has earned the trust of clients from several countries."}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="services-overview-section">
        <h2
          className={`section-title slide-up ${servicesTitleRef.isInView ? "in-view" : ""}`}
          ref={servicesTitleRef.ref as React.RefObject<HTMLHeadingElement>}
        >
          OUR IMMIGRATION SERVICES
        </h2>
        <p className="services-intro">
          We offer comprehensive immigration solutions tailored to your unique
          journey. From temporary visas to permanent residence and citizenship,
          we're here to help you navigate every step.
        </p>

        <div className="services-category-grid">
          <div
            className={`service-category-card fade-in ${serviceCardRefs[0].isInView ? "in-view" : ""}`}
            ref={serviceCardRefs[0].ref as React.RefObject<HTMLDivElement>}
          >
            <div className="service-icon-wrapper">
              <i className="fas fa-plane-departure service-main-icon"></i>
            </div>
            <h3>TEMPORARY RESIDENCE</h3>
            <ul className="service-category-list">
              <li>
                <i className="fas fa-graduation-cap list-bullet-icon"></i> Study
                Permits
              </li>
              <li>
                <i className="fas fa-briefcase list-bullet-icon"></i> Work
                Permits
              </li>
              <li>
                <i className="fas fa-passport list-bullet-icon"></i> Visitor
                Visas (TRV)
              </li>
              <li>
                <i className="fas fa-family list-bullet-icon"></i> Super Visa
              </li>
              <li>
                <i className="fas fa-calendar list-bullet-icon"></i> Visitor
                Record
              </li>
              <li>
                <i className="fas fa-id-card list-bullet-icon"></i> Temporary
                Resident Permit
              </li>
              <li>
                <i className="fas fa-globe list-bullet-icon"></i> Electronic
                Travel Authorization (eTA)
              </li>
            </ul>
          </div>

          <div
            className={`service-category-card fade-in ${serviceCardRefs[1].isInView ? "in-view" : ""}`}
            ref={serviceCardRefs[1].ref as React.RefObject<HTMLDivElement>}
          >
            <div className="service-icon-wrapper">
              <i className="fas fa-house-chimney service-main-icon"></i>
            </div>
            <h3>PERMANENT RESIDENCE</h3>
            <ul className="service-category-list">
              <li>
                <i className="fas fa-people-arrows list-bullet-icon"></i> Family
                Sponsorship
              </li>
              <li>
                <i className="fas fa-chart-simple list-bullet-icon"></i>{" "}
                Economic Immigration
              </li>
              <li>
                <i className="fas fa-bolt list-bullet-icon"></i> Express Entry
              </li>
              <li>
                <i className="fas fa-map-pin list-bullet-icon"></i> Provincial
                Nominee Programs
              </li>
              <li>
                <i className="fas fa-heart list-bullet-icon"></i> Humanitarian &
                Compassionate
              </li>
              <li>
                <i className="fas fa-shield list-bullet-icon"></i> Refugee
                Protection
              </li>
            </ul>
          </div>

          <div
            className={`service-category-card fade-in ${serviceCardRefs[2].isInView ? "in-view" : ""}`}
            ref={serviceCardRefs[2].ref as React.RefObject<HTMLDivElement>}
          >
            <div className="service-icon-wrapper">
              <i className="fas fa-leaf service-main-icon"></i>
            </div>
            <h3>CITIZENSHIP & MORE</h3>
            <ul className="service-category-list">
              <li>
                <i className="fas fa-certificate list-bullet-icon"></i>{" "}
                Citizenship Applications
              </li>
              <li>
                <i className="fas fa-triangle-exclamation list-bullet-icon"></i>{" "}
                Admissibility Issues
              </li>
              <li>
                <i className="fas fa-scale-balanced list-bullet-icon"></i>{" "}
                Appeals & Reviews
              </li>
              <li>
                <i className="fas fa-clipboard-check list-bullet-icon"></i>{" "}
                Compliance Reviews
              </li>
              <li>
                <i className="fas fa-circle-exclamation list-bullet-icon"></i>{" "}
                Misrepresentation Concerns
              </li>
              <li>
                <i className="fas fa-lightbulb list-bullet-icon"></i> Strategic
                Advice
              </li>
            </ul>
          </div>
        </div>

        <div className="services-cta-container">
          <Link to="/services" className="styled-btn view-all-btn">
            VIEW ALL SERVICES <i className="fas fa-arrow-right btn-icon"></i>
          </Link>
        </div>
      </div>

      <div className="process-section">
        <h2
          className={`process-title slide-up ${processTitleRef.isInView ? "in-view" : ""}`}
          ref={processTitleRef.ref as React.RefObject<HTMLHeadingElement>}
        >
          APPLICATION PROCESS
        </h2>
        <div className="process-grid">
          {processSteps.map((step, idx) => (
            <div
              key={idx}
              className={`process-card slide-up ${processCardRefs[idx].isInView ? "in-view" : ""}`}
              ref={processCardRefs[idx].ref as React.RefObject<HTMLDivElement>}
            >
              <div className="process-card-header">
                <i className={`process-icon ${step.icon}`}></i>
                <div className="step-number">{step.step}</div>
              </div>
              <h3 className="step-title">{step.title.toUpperCase()}</h3>
              <p className="step-description">{step.description}</p>
              {idx === 0 ? (
                <Link to={step.buttonLink} className="process-btn styled-btn">
                  {step.buttonText.toUpperCase()}{" "}
                  <i className="fas fa-arrow-right btn-icon-small"></i>
                </Link>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
