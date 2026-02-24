import React from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import "./BlogPost.css";

const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <div className="blog-post-not-found">
        <h1>Article Not Found</h1>
        <p>The blog post you're looking for doesn't exist.</p>
        <Link to="/blogs" className="back-to-blogs-btn">
          Back to Blogs
        </Link>
      </div>
    );
  }

  // Better content formatting with section detection
  const formatContent = (content: string) => {
    const sections = content.split("\n\n");
    return sections.map((block, index) => {
      // Check if it's a heading (all caps or ends with colon)
      if (block.match(/^[A-Z\s]{5,}$/) || block.match(/^[A-Z][a-z]+:/)) {
        return (
          <h2 key={index} className="blog-post-section-heading">
            {block.replace(":", "")}
          </h2>
        );
      }
      // Check for bullet points
      if (block.includes("•")) {
        const items = block
          .split("\n")
          .filter((item) => item.trim().startsWith("•"));
        return (
          <ul key={index} className="blog-post-list">
            {items.map((item, i) => (
              <li key={i}>{item.trim().substring(1).trim()}</li>
            ))}
          </ul>
        );
      }
      // Regular paragraph
      return (
        <p key={index} className="blog-post-paragraph">
          {block}
        </p>
      );
    });
  };

  return (
    <div className="blog-post-page">
      <article className="blog-post-container">
        <div className="blog-post-category">MONDAY IMMIGRATION WATCH</div>
        <h1 className="blog-post-title">{post.title}</h1>
        <div className="blog-post-byline">
          <span className="blog-post-author">By {post.author}</span>
          <span className="blog-post-date">{post.date}</span>
        </div>

        <div className="blog-post-content">{formatContent(post.content)}</div>

        <div className="blog-post-footer">
          <p className="blog-post-conclusion">
            — Appiah Bonsu is a Regulated Canadian Immigration Consultant
            (RCIC-IRB - L3) with over a decade of experience in immigration
            research and consulting.
          </p>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
