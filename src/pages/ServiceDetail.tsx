import React, { useEffect, useMemo, useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { serviceDetails, FACTS_VERIFIED } from "../data/serviceDetails";
import Reveal from "../components/Reveal";
import EligibilityCheck from "../components/EligibilityCheck";
import CtaBlock from "../components/CtaBlock";
import { useScrollSpy, slugify } from "../hooks/useScrollSpy";
import "./ServiceDetail.scss";

// Sections whose list is a set of requirements the reader can hold themselves
// against, rather than explanatory prose.
const REQUIREMENTS_HEADING = /eligib|requirement|who can|qualify/i;

const FAQItem: React.FC<{ q: string; a: string; index: number }> = ({
  q,
  a,
  index,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`sd-qa ${open ? "is-open" : ""}`}>
      <h3>
        <button
          className="sd-qa__q"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={`sd-faq-${index}`}
          id={`sd-faq-btn-${index}`}
          type="button"
        >
          <span className="sd-qa__text">{q}</span>
          <span className="sd-qa__sign" aria-hidden="true" />
        </button>
      </h3>
      <div
        className="sd-qa__panel"
        id={`sd-faq-${index}`}
        role="region"
        aria-labelledby={`sd-faq-btn-${index}`}
      >
        <div className="sd-qa__panelInner">
          <p>{a}</p>
        </div>
      </div>
    </div>
  );
};

const ServiceDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const service = serviceId ? serviceDetails[serviceId] : undefined;

  useEffect(() => {
    if (!service) return;

    document.title = `${service.title} | Endless Pathways Immigration Services`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", service.heroText);
    } else {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      meta.setAttribute("content", service.heroText);
      document.head.appendChild(meta);
    }

    return () => {
      document.title = "Endless Pathways Immigration Services";
    };
  }, [service]);

  // Derived from the headings this page renders, so the rail can never drift
  // out of sync with the document. Computed before the early return below:
  // hooks must run in the same order on every render, and `service` is
  // undefined for an unknown slug.
  const toc = useMemo(() => {
    if (!service) return [] as { id: string; label: string }[];

    return [
      ...service.sections.map((sec) => ({
        id: slugify(sec.heading),
        label: sec.heading,
      })),
      ...(service.comparisonTable
        ? [
            {
              id: slugify(service.comparisonTable.title),
              label: service.comparisonTable.title,
            },
          ]
        : []),
      ...(service.refusalReasons?.length
        ? [{ id: "common-refusal-reasons", label: "Common Refusal Reasons" }]
        : []),
      { id: "how-we-can-help", label: "How We Can Help" },
      ...(service.faqs?.length
        ? [
            {
              id: "frequently-asked-questions",
              label: "Frequently Asked Questions",
            },
          ]
        : []),
    ];
  }, [service]);

  const tocIds = useMemo(() => toc.map((t) => t.id), [toc]);
  const activeId = useScrollSpy(tocIds);

  if (!service) return <Navigate to="/services" replace />;

  const refusals = service.refusalReasons ?? [];

  return (
    <article className="sd">
      {/* Masthead — a reference page opens on its title, not a photograph. */}
      <header className="sd-mast">
        <div className="wrap">
          <nav className="sd-crumb" aria-label="Breadcrumb">
            <Link to="/services">Services</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{service.title}</span>
          </nav>

          <h1 className="sd-mast__title">{service.title}</h1>
          <p className="sd-mast__lede">{service.heroText}</p>

          {service.hookParagraph && (
            <p className="sd-mast__hook">{service.hookParagraph}</p>
          )}
        </div>
      </header>

      <div className="wrap sd-body">
        <div className="sd-main">
          {service.policyAlert && (
            <Reveal className="sd-notice" as="div">
              <div className="sd-notice__head">
                <span className="sd-notice__badge">Policy Update</span>
                <span className="sd-notice__date">
                  {service.policyAlert.effectiveDate}
                </span>
              </div>
              <h2 className="sd-notice__title">{service.policyAlert.title}</h2>
              <p>{service.policyAlert.description}</p>
            </Reveal>
          )}

          {service.sections.map((section, idx) => {
            // A requirements section gets its first list rendered as something
            // the reader can tick off rather than a static run of bullets. Same
            // copy either way — only the presentation differs.
            const isRequirements = REQUIREMENTS_HEADING.test(section.heading);
            const firstList = section.content.findIndex((c) => Array.isArray(c));

            return (
              <Reveal
                as="section"
                key={idx}
                className="sd-section"
                id={slugify(section.heading)}
              >
                <h2>{section.heading}</h2>
                {section.content.map((item, i) =>
                  typeof item === "string" ? (
                    <p key={i} dangerouslySetInnerHTML={{ __html: item }} />
                  ) : isRequirements && i === firstList ? (
                    <EligibilityCheck key={i} items={item} />
                  ) : (
                    <ul key={i} className="sd-bullets">
                      {item.map((li, j) => (
                        <li key={j} dangerouslySetInnerHTML={{ __html: li }} />
                      ))}
                    </ul>
                  ),
                )}
              </Reveal>
            );
          })}

          {service.comparisonTable && (
            <Reveal
              as="section"
              className="sd-section"
              id={slugify(service.comparisonTable.title)}
            >
              <h2>{service.comparisonTable.title}</h2>
              {/* The table keeps a 520px minimum and scrolls sideways on
                  phones. tabIndex makes that scroll reachable by keyboard,
                  which an overflow container does not get on its own. */}
              <div
                className="sd-tableWrap"
                role="region"
                aria-label={service.comparisonTable.title}
                tabIndex={0}
              >
                <table className="sd-table">
                  <thead>
                    <tr>
                      {service.comparisonTable.headers.map((h, i) => (
                        <th key={i}>{h}</th>
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
            </Reveal>
          )}

          {/* Refusal reasons paired with their fix. Each row reads left to
              right as problem then remedy, which is the whole point of the
              section — so the two halves are set side by side and colour-coded
              rather than stacked in one undifferentiated block. */}
          {refusals.length > 0 && (
            <Reveal
              as="section"
              className="sd-section"
              id="common-refusal-reasons"
            >
              <h2>Common Refusal Reasons &amp; How We Help</h2>

              <ul className="sd-refusals">
                {refusals.map((item, i) => (
                  <li key={i} className="sd-refusal">
                    <div className="sd-refusal__side sd-refusal__side--risk">
                      <span className="sd-refusal__mark" aria-hidden="true">
                        <svg viewBox="0 0 16 16">
                          <path d="M4 4l8 8M12 4l-8 8" />
                        </svg>
                      </span>
                      <p>{item.reason}</p>
                    </div>

                    <div className="sd-refusal__side sd-refusal__side--fix">
                      <span className="sd-refusal__mark" aria-hidden="true">
                        <svg viewBox="0 0 16 16">
                          <path d="M3.5 8.5l3 3 6-7" />
                        </svg>
                      </span>
                      <p>{item.solution}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal as="section" className="sd-help" id="how-we-can-help">
            <h2>How We Can Help</h2>
            <p className="sd-help__intro">{service.howWeHelp.intro}</p>

            {service.howWeHelp.points && (
              <ul className="sd-help__list">
                {service.howWeHelp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            )}

          </Reveal>

          {/* Outside the card on purpose. Inside it — whether loose or as a
              band across its base — the action read as part of the card rather
              than as the page asking for something. */}
          <CtaBlock label={service.howWeHelp.ctaText}>
            {service.howWeHelp.intro}
          </CtaBlock>

          {service.faqs && service.faqs.length > 0 && (
            <Reveal
              as="section"
              className="sd-section"
              id="frequently-asked-questions"
            >
              <h2>Frequently Asked Questions</h2>
              <div className="sd-faqs">
                {service.faqs.map((faq, i) => (
                  <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
                ))}
              </div>
            </Reveal>
          )}
        </div>

        {/* The rail turns a 6,000px reference document into something you can
            navigate. Labels come from the headings the page renders, so it is
            always an accurate map of what is actually below. */}
        <aside className="sd-aside">
          <div className="sd-aside__inner">
            <nav className="sd-toc" aria-label="On this page">
              <ul>
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={`sd-toc__link ${
                        activeId === item.id ? "is-active" : ""
                      }`}
                      aria-current={activeId === item.id ? "true" : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(item.id)
                          ?.scrollIntoView({ block: "start" });
                        // Reflect the jump in the URL without a router navigation.
                        window.history.replaceState(null, "", `#${item.id}`);
                      }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {service.processingTime && (
              <div className="sd-facts">
                <h2 className="sd-facts__title">Processing Times</h2>
                <dl className="sd-facts__list">
                  {service.processingTime.insideCanada && (
                    <div>
                      <dt>Inside Canada</dt>
                      <dd>{service.processingTime.insideCanada}</dd>
                    </div>
                  )}
                  {service.processingTime.outsideCanada && (
                    <div>
                      <dt>Outside Canada</dt>
                      <dd>{service.processingTime.outsideCanada}</dd>
                    </div>
                  )}
                </dl>
                {service.processingTime.note && (
                  <p className="sd-facts__note">{service.processingTime.note}</p>
                )}
                <p className="sd-facts__verified">
                  Checked against IRCC in {FACTS_VERIFIED}
                </p>
              </div>
            )}

            {service.feeBreakdown && (
              <div className="sd-facts">
                <h2 className="sd-facts__title">Government Fees</h2>
                <dl className="sd-fees">
                  {service.feeBreakdown.items.map((item, i) => (
                    <div key={i}>
                      <dt>{item.description}</dt>
                      <dd>{item.amount}</dd>
                    </div>
                  ))}
                  <div className="sd-fees__total">
                    <dt>Total</dt>
                    <dd>{service.feeBreakdown.total}</dd>
                  </div>
                </dl>
                <p className="sd-facts__verified">
                  Government fees only. Checked against IRCC in {FACTS_VERIFIED}
                </p>
              </div>
            )}
          </div>
        </aside>
      </div>

      {service.relatedServices && service.relatedServices.length > 0 && (
        <section className="sd-related">
          <div className="wrap">
            <h2 className="sd-related__title">Related Services</h2>
            <div className="sd-related__grid">
              {service.relatedServices
                .filter((id) => serviceDetails[id])
                .map((id, i) => {
                  const related = serviceDetails[id];
                  return (
                    <Reveal
                      as="article"
                      key={id}
                      className="sd-relCard"
                      delay={0.05 * i}
                    >
                      <Link to={`/services/${id}`}>
                        <h3>{related.title}</h3>
                        <p>{related.heroText}</p>
                        <span className="sd-relCard__more">
                          Learn more
                          <i className="fas fa-arrow-right" aria-hidden="true" />
                        </span>
                      </Link>
                    </Reveal>
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </article>
  );
};

export default ServiceDetail;
