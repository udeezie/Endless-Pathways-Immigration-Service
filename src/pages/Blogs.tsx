import React from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import "./Blogs.scss";

const estimateReadTime = (content: string) =>
  Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));

const Blogs: React.FC = () => {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const [featuredPost, ...otherPosts] = sorted;

  return (
    <div className="blogs-page">
      <section className="blogs-hero">
        <div className="blogs-hero-container">
          <h1 className="blogs-hero-title">
            <span className="blogs-hero-title-main">
              Monday Immigration{" "}
              <span className="watch-wrapper">
                Watch
                <span className="loader"></span>
              </span>
            </span>
            <span className="blogs-hero-title-accent">
              Weekly insights, analysis, and strategies for your Canadian
              immigration journey
            </span>
          </h1>
        </div>
      </section>

      <main className="blogs-main">
        <div className="blogs-container">
          <Link to={`/blogs/${featuredPost.id}`} className="blogs-featured">
            <div className="blogs-featured-content">
              <div className="blogs-featured-meta">
                <span className="blogs-card-new">LATEST</span>
                <time className="blogs-featured-date">{featuredPost.date}</time>
                <span className="blogs-card-read-time">
                  {estimateReadTime(featuredPost.content)} min read
                </span>
              </div>
              <h2 className="blogs-featured-title">{featuredPost.title}</h2>
              <p className="blogs-featured-excerpt">{featuredPost.excerpt}</p>
              <span className="blogs-featured-cta">
                Read article
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </Link>

          {otherPosts.length > 0 && (
            <div className="blogs-grid-section">
              <h2 className="blogs-grid-label">All Articles</h2>

              {/* A list, not a grid of cards. With no artwork to carry them,
                  seven boxes read as boxes with something missing; a broadsheet
                  index gets its rhythm from the date rail and the rules
                  between entries instead. */}
              <ol className="blogs-list">
                {otherPosts.map((post) => (
                  <li key={post.id} className="blogs-entry">
                    <Link to={`/blogs/${post.id}`} className="blogs-entry__hit">
                      <div className="blogs-entry__rail">
                        <time dateTime={post.date}>{post.date}</time>
                        <span>{estimateReadTime(post.content)} min read</span>
                      </div>

                      <div className="blogs-entry__body">
                        <h3 className="blogs-entry__title">{post.title}</h3>
                        <p className="blogs-entry__excerpt">{post.excerpt}</p>
                        <span className="blogs-entry__cta">
                          Read article
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 20 20"
                            fill="none"
                            aria-hidden="true"
                          >
                            <path
                              d="M7.5 15L12.5 10L7.5 5"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blogs;
