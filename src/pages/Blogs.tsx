import React from "react";
import { Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import "./Blogs.css";

const Blogs: React.FC = () => {
  return (
    <div className="blogs-page">
      {/* Hero Section */}
      <section className="blogs-hero">
        <div className="blogs-hero-container">
          <h1 className="blogs-hero-title">
            <span className="blogs-hero-title-main">Monday Immigration Watch</span>
            <span className="blogs-hero-title-accent">Weekly insights, analysis, and strategies for your Canadian immigration journey</span>
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="blogs-main">
        <div className="blogs-container">
          {/* Articles Grid */}
          <div className="blogs-grid">
            {blogPosts.map((post) => (
              <article key={post.id} className="blogs-card">
                <div className="blogs-card-content">
                  {/* Metadata */}
                  <div className="blogs-card-meta">
                    <time dateTime={post.date} className="blogs-card-date">
                      {post.date}
                    </time>
                    <span className="blogs-card-category">Monday Immigration Watch</span>
                  </div>

                  {/* Title */}
                  <h3 className="blogs-card-title">
                    <Link to={`/blogs/${post.id}`} className="blogs-card-link">
                      {post.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="blogs-card-excerpt">{post.excerpt}</p>

                  {/* Author & Read More */}
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
      </main>
    </div>
  );
};

export default Blogs;