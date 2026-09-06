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
            {featuredPost.image && (
              <div className="blogs-featured-image">
                <img src={featuredPost.image} alt={featuredPost.title} />
              </div>
            )}
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
              <div className="blogs-grid">
                {otherPosts.map((post, idx) => (
                  <article
                    key={post.id}
                    className="blogs-card"
                    style={{ animationDelay: `${0.05 + idx * 0.05}s` }}
                  >
                    <div className="blogs-card-image">
                      {post.image ? (
                        <img
                          src={post.image}
                          alt={`Illustration for ${post.title}`}
                          loading="lazy"
                        />
                      ) : (
                        <div className="blogs-card-image-placeholder">
                          <span>Image coming soon</span>
                        </div>
                      )}
                    </div>
                    <div className="blogs-card-content">
                      <div className="blogs-card-meta">
                        <time dateTime={post.date} className="blogs-card-date">
                          {post.date}
                        </time>
                        <span className="blogs-card-read-time">
                          {estimateReadTime(post.content)} min read
                        </span>
                      </div>

                      <h3 className="blogs-card-title">
                        <Link to={`/blogs/${post.id}`} className="blogs-card-link">
                          {post.title}
                        </Link>
                      </h3>

                      <p className="blogs-card-excerpt">{post.excerpt}</p>

                      <div className="blogs-card-footer">
                        <span className="blogs-card-author">By {post.author}</span>
                        <Link
                          to={`/blogs/${post.id}`}
                          className="blogs-read-more"
                          aria-label={`Read ${post.title}`}
                        >
                          <span>Read article</span>
                          <svg
                            className="blogs-read-more-icon"
                            width="20"
                            height="20"
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
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Blogs;
