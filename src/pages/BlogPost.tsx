import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import "./BlogPost.scss";

const estimateReadTime = (content: string) =>
  Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === Number(id));
  const articleRef = useRef<HTMLElement>(null);
  const [readProgress, setReadProgress] = useState(0);

  useEffect(() => {
    const el = articleRef.current;
    const handleScroll = () => {
      if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrolled = Math.max(0, -top);
      const total = height - window.innerHeight;
      setReadProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getInitials = (name: string) =>
    name.split(" ").map((n) => n[0]).join("");

  if (!post) {
    return (
      <div className="blog-post-not-found">
        <h1>Article Not Found</h1>
        <p>The blog post you're looking for doesn't exist.</p>
        <Link to="/blogs" className="back-to-blogs-btn">Back to Blogs</Link>
      </div>
    );
  }

  const readTime = estimateReadTime(post.content);
  const relatedPosts = [...blogPosts]
    .filter((p) => p.id !== post.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const formatContent = (content: string) => {
    return content.split("\n\n").map((block, index) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      if (/^\*\*.+\*\*$/.test(trimmed)) {
        return (
          <h2 key={index} className="blog-post-section-heading">
            {trimmed.slice(2, -2)}
          </h2>
        );
      }

      if (trimmed.match(/^[A-Z\s]{5,}$/) || trimmed.match(/^[A-Z][a-z]+:/)) {
        return (
          <h2 key={index} className="blog-post-section-heading">
            {trimmed.replace(":", "")}
          </h2>
        );
      }

      if (trimmed.includes("•")) {
        const items = trimmed.split("\n").filter((item) => item.trim().startsWith("•"));
        return (
          <ul key={index} className="blog-post-list">
            {items.map((item, i) => (
              <li key={i}>{item.trim().substring(1).trim()}</li>
            ))}
          </ul>
        );
      }

      const html = trimmed.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
      return (
        <p
          key={index}
          className="blog-post-paragraph"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    });
  };

  return (
    <>
      <div
        className="blog-reading-progress"
        style={{ width: `${readProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      <div className="blog-post-page">
        <div className="blog-post-breadcrumb">
          <Link to="/blogs" className="breadcrumb-link">Insights</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{post.title}</span>
        </div>

        <article className="blog-post-container" ref={articleRef}>
          {post.image && (
            <div className="blog-post-featured-image">
              <img src={post.image} alt={post.title} />
            </div>
          )}

          <div className="blog-post-category">MONDAY IMMIGRATION WATCH</div>
          <h1 className="blog-post-title">{post.title}</h1>

          <div className="blog-post-byline">
            <div className="blog-post-author-with-avatar">
              <div className="blog-post-author-avatar">
                <div className="avatar">
                  <span>{getInitials(post.author)}</span>
                  <div className="tooltip">{post.author}</div>
                </div>
              </div>
              <span className="blog-post-author">{post.author}</span>
            </div>
            <span className="blog-post-date">{post.date}</span>
            <span className="blog-post-read-time">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              {readTime} min read
            </span>
          </div>

          <div className="blog-post-content">{formatContent(post.content)}</div>

          <div className="blog-post-footer">
            <div className="blog-post-author-card">
              <div className="author-card-avatar">
                <span>{getInitials(post.author)}</span>
              </div>
              <div className="author-card-info">
                <span className="author-card-label">Written by</span>
                <span className="author-card-name">{post.author}</span>
                <p className="author-card-bio">
                  Regulated Canadian Immigration Consultant (RCIC-IRB&nbsp;&ndash;&nbsp;L3) with over a decade of experience in immigration research and consulting.
                </p>
              </div>
            </div>
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <div className="blog-related">
            <h2 className="blog-related-heading">More Insights</h2>
            <div className="blog-related-grid">
              {relatedPosts.map((rp) => (
                <Link to={`/blogs/${rp.id}`} key={rp.id} className="blog-related-card">
                  {rp.image && (
                    <div className="blog-related-image">
                      <img src={rp.image} alt={rp.title} loading="lazy" />
                    </div>
                  )}
                  <div className="blog-related-body">
                    <span className="blog-related-date">{rp.date}</span>
                    <h3 className="blog-related-title">{rp.title}</h3>
                    <span className="blog-related-cta">
                      Read article
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPost;
