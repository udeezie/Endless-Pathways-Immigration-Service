import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Reveal from "../components/Reveal";
import { blogPosts } from "../data/blogPosts";
import { responsiveImage } from "../utils/images";
import "./Home.scss";

const estimateReadTime = (content: string) =>
  Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));

const REASONS = [
  {
    title: "Regulated & Authorized",
    body: "Appiah Bonsu is a Regulated Canadian Immigration Consultant (RCIC IRB) in good standing with the College of Immigration and Citizenship Consultants (CICC). When you work with us, you are represented by a qualified professional bound by a strict code of ethics.",
  },
  {
    title: "Lived Experience + Academic Rigour",
    body: "As a former international student, Appiah understands the immigration system from the inside. Combined with a Master's degree in Critical Sociology and more than 10 years of research on immigrant experiences, his advice is both empathetic and evidence based.",
  },
  {
    title: "Research-Driven Strategy",
    body: "Over a decade of research revealed a core truth: many immigrants struggle because the system is complex. We turn that insight into clear, proactive application strategies that anticipate officer concerns and help reduce refusal risks.",
  },
  {
    title: "Full-Service Representation",
    body: "From study permits and work visas to family sponsorship, refugee claims, and citizenship, we support clients throughout the entire immigration lifecycle. As your goals evolve, you will not need to switch firms.",
  },
  {
    title: "Transparent & Ethical",
    body: "Fixed fees with no hidden charges. We provide a clear written agreement before any work begins. Integrity is not optional. It is the foundation of our practice.",
  },
  {
    title: "Demonstrated Success",
    body: "We have supported numerous applications across multiple immigration streams. While every case is unique, our methodical approach has earned the trust of clients from around the world.",
  },
];

const SERVICE_GROUPS = [
  {
    title: "Temporary Residence",
    items: [
      "Study Permits",
      "Work Permits",
      "Visitor Visas (TRV)",
      "Super Visa",
      "Visitor Record",
      "Temporary Resident Permit",
      "Electronic Travel Authorization (eTA)",
    ],
  },
  {
    title: "Permanent Residence",
    items: [
      "Family Sponsorship",
      "Economic Immigration",
      "Express Entry",
      "Provincial Nominee Programs",
      "Humanitarian & Compassionate",
      "Refugee Protection",
    ],
  },
  {
    title: "Citizenship & More",
    items: [
      "Citizenship Applications",
      "Admissibility Issues",
      "Appeals & Reviews",
      "Compliance Reviews",
      "Misrepresentation Concerns",
      "Strategic Advice",
    ],
  },
];

const PROCESS_STEPS = [
  {
    title: "In-Depth Consultation",
    description:
      "Meet with us to discuss your case in detail. We analyse your situation, answer your questions, and outline the most effective strategy. Our consultation fee is clearly communicated upfront.",
    buttonText: "Book Now",
    buttonLink: "/book-consultation",
  },
  {
    title: "Document Guidance",
    description:
      "Once you retain our services, we provide a customised document checklist and step-by-step guidance. We ensure you gather the right evidence and complete all forms accurately.",
    buttonText: "View Services",
    buttonLink: "/services",
  },
  {
    title: "Final Review",
    description:
      "Before submission, we conduct a thorough audit of your entire application. We verify that every document is current, consistent, and meets IRCC requirements.",
    buttonText: "Our Process",
    buttonLink: "/services",
  },
  {
    title: "Submission & Letter",
    description:
      "We submit your complete application along with a professionally drafted explanatory letter. Our regulated consultant's letter helps visa officers process your case efficiently and correctly.",
    buttonText: "Learn More",
    buttonLink: "/services",
  },
  {
    title: "Ongoing Support",
    description:
      "Our relationship doesn't end at submission. We monitor your application, provide regular updates, and liaise with IRCC on your behalf whenever necessary.",
    buttonText: "Contact Us",
    buttonLink: "/contact",
  },
];

const FAQS = [
  {
    q: "What makes Endless Pathways different from other immigration consultants?",
    a: "Our founder's personal journey as an immigrant, combined with academic research (Master's in Critical Sociology) and professional regulation (RCIC-IRB), gives us unique insight. We treat clients as people, not file numbers, and our decade of research on immigrant experiences informs every application strategy.",
  },
  {
    q: "How do I know which immigration program is right for me?",
    a: "We assess your profile during our in-depth consultation: education, work experience, language ability, family connections, and long-term goals. From there, we recommend the strongest pathway whether it's Express Entry, a Provincial Nominee Program, a work permit, or family sponsorship.",
  },
  {
    q: "What are your fees and how does billing work?",
    a: "We believe in complete transparency. All fees are discussed upfront during your consultation, and we provide a clear written agreement before any work begins. There are no hidden charges. Our fixed-fee structure means you know exactly what to expect.",
  },
  {
    q: "How long does the immigration process take?",
    a: "Processing times vary significantly by program and individual circumstances. Express Entry: 6 months; Family Sponsorship: 12–24 months; Study Permits: 8–15 weeks; Work Permits: 3–5 months. We provide realistic timelines based on current IRCC data and keep you updated throughout.",
  },
  {
    q: "What happens if my application is refused?",
    a: "A refusal is not the end of the road. We analyze the reasons, identify options (appeal, judicial review, reapplication with stronger evidence, or alternative pathways), and guide you through the best course of action. Many clients succeed on their second attempt with proper representation.",
  },
];

// Page

const Home: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const scriptId = "elfsight-platform-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://elfsightcdn.com/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const latestPost = useMemo(
    () =>
      blogPosts.reduce(
        (latest, post) =>
          new Date(post.date) > new Date(latest.date) ? post : latest,
        blogPosts[0],
      ),
    [],
  );

  const recentPosts = useMemo(
    () =>
      [...blogPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 3),
    [],
  );

  return (
    <div className="home">
      {/* Opening */}
      {/* No hero. The page opens on the headline, the promise, the two actions
          and the regulatory standing — everything a visitor needs in the first
          screen, with nothing staged around it. */}
      <section className="opening">
        <div className="wrap opening__inner">
          <Reveal className="opening__type" variant="mask">
            <h1 className="opening__title">
              Where Your Canadian Immigration Journey Finds <em>Clarity</em>
            </h1>
          </Reveal>

          <Reveal className="opening__body" delay={0.08}>
            <p className="opening__text">
              At Endless Pathways Immigration Services, we are a team of
              immigrants, professionals, and educators who know firsthand what
              it means to build a new life in Canada. Our clients are never just
              file numbers. We offer ethical, comprehensive, and personalized
              immigration services that reflect the complexity of your goals and
              the care they deserve.
            </p>

            <div className="opening__actions">
              <Link
                to="/book-consultation"
                className="btn btn--gold"
                aria-label="Book a consultation"
              >
                Book Consultation
              </Link>
              <Link to="/about" className="btn">
                Learn More
              </Link>
            </div>
          </Reveal>
        </div>

        <Reveal className="opening__cred" variant="fade" delay={0.16}>
          <div className="wrap opening__credInner">
            <div className="opening__credBadges">
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

            <div className="opening__credText">
              <span>College of Immigration and Citizenship Consultants</span>
              <span className="opening__credReg">RCIC Number: R1053912</span>
            </div>

            <a
              href="https://register.college-ic.ca/Public-Register-EN/Licensee/Profile.aspx?ID=53912"
              target="_blank"
              rel="noopener noreferrer"
              className="opening__credVerify"
              aria-label="Verify my RCIC status on CICC website"
            >
              <span>Verify my status on the CICC Register</span>
              <i className="fas fa-arrow-up-right-from-square" aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <div className="wrap">
          <Reveal className="sec-head sec-head--center" as="header">
            <h2>Our Immigration Services</h2>
            <p>
              We offer comprehensive immigration solutions tailored to your
              unique journey. From temporary visas to permanent residence and
              citizenship, we're here to help you navigate every step.
            </p>
          </Reveal>

          <div className="services__grid">
            {SERVICE_GROUPS.map((group, i) => (
              <Reveal
                as="article"
                key={group.title}
                className="svc"
                delay={0.08 * i}
              >
                <h3 className="svc__title">{group.title}</h3>
                <ul className="svc__list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal className="services__cta">
            <Link
              to="/services"
              className="btn"
              aria-label="View all immigration services"
            >
              View All Services
              <i className="fas fa-arrow-right btn-icon" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="process" id="process">
        <div className="wrap">
          <Reveal className="sec-head" as="header">
            <h2>Application Process</h2>
          </Reveal>

          <div className="process__rail">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal
                as="article"
                key={step.title}
                className="step"
                delay={0.06 * i}
              >
                <div className="step__marker" aria-hidden="true">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__body">{step.description}</p>
                <Link
                  to={step.buttonLink}
                  className="step__link"
                  aria-label={step.buttonText}
                >
                  {step.buttonText}
                  <i className="fas fa-arrow-right" aria-hidden="true" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="reasons" id="why">
        <div className="wrap">
          <Reveal className="sec-head sec-head--center" as="header">
            <h2>Why Choose Endless Pathways Immigration Services?</h2>
          </Reveal>

          <ol className="reasons__list">
            {REASONS.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                className="reason"
                delay={0.04 * (i % 2)}
              >
                <h3 className="reason__title">{item.title}</h3>
                <p className="reason__body">{item.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews" id="reviews">
        <div className="wrap">
          <Reveal className="sec-head sec-head--center" as="header">
            <h2>
              Real Clients, Real Results – Clients Who Trusted Endless Pathways
              Immigration Services
            </h2>
          </Reveal>

          <Reveal className="reviews__frame">
            <div
              className="elfsight-app-f58d9626-b2a6-48ca-9a96-40c89f7f8f31"
              data-elfsight-app-lazy
            />
          </Reveal>

          <Reveal className="reviews__cta">
            <a
              href="https://www.google.com/maps/place/?q=place_id:ChIJY-EBXtHf1IkReDCiRTx5LEE"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              View All Reviews on Google
              <i
                className="fas fa-arrow-up-right-from-square btn-icon"
                aria-hidden="true"
              />
            </a>
          </Reveal>
        </div>
      </section>

      {/* Journal */}
      <section className="journal" id="journal">
        <div className="wrap">
          <Reveal className="sec-head" as="header">
            <h2>Monday Immigration Watch</h2>
            <p>
              Weekly insights, analysis, and strategies for your Canadian
              immigration journey
            </p>
          </Reveal>

          <div className="journal__grid">
            {recentPosts.map((post, i) => (
              <Reveal
                as="article"
                key={post.id}
                className="entry"
                variant="scale"
                delay={0.06 * i}
              >
                <Link to={`/blogs/${post.id}`} className="entry__hit">
                  <div className="entry__figure">
                    {post.image && (
                      <img
                        {...responsiveImage(post.image)}
                        sizes="(max-width: 900px) 100vw, 380px"
                        alt=""
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                    {post.id === latestPost.id && (
                      <span className="entry__new">NEW</span>
                    )}
                  </div>

                  <div className="entry__body">
                    <div className="entry__meta">
                      <time dateTime={post.date}>{post.date}</time>
                      <span className="entry__dot" aria-hidden="true" />
                      <span>{estimateReadTime(post.content)} min read</span>
                    </div>

                    <h3 className="entry__title">{post.title}</h3>
                    <p className="entry__excerpt">{post.excerpt}</p>

                    <div className="entry__foot">
                      <span className="entry__author">By {post.author}</span>
                      <span className="entry__more">
                        Read Article
                        <i className="fas fa-arrow-right" aria-hidden="true" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal className="journal__cta">
            <Link to="/blogs" className="btn">
              View All Articles
              <i className="fas fa-arrow-right btn-icon" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" id="faq">
        <div className="wrap faq__wrap">
          <Reveal className="sec-head sec-head--center" as="header">
            <h2>Frequently Asked Questions</h2>
          </Reveal>

          <div className="faq__list">
            {FAQS.map((faq, i) => {
              const open = openFaq === i;
              return (
                <Reveal
                  key={faq.q}
                  className={`qa ${open ? "is-open" : ""}`}
                  delay={0.04 * i}
                >
                  <h3>
                    <button
                      className="qa__q"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-btn-${i}`}
                      type="button"
                    >
                      <span className="qa__text">{faq.q}</span>
                      <span className="qa__sign" aria-hidden="true" />
                    </button>
                  </h3>

                  <div
                    className="qa__panel"
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                  >
                    <div className="qa__panelInner">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
