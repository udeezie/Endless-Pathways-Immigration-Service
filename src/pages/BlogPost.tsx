import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts } from "../data/blogPosts";
import BlogCover from "../components/BlogCover";
import "./BlogPost.scss";

const estimateReadTime = (content: string) =>
  Math.max(1, Math.round(content.trim().split(/\s+/).length / 200));

const ENDS_SENTENCE = /[.!?]["')\]]?$/;

const splitLines = (block: string) =>
  block
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

/**
 * Turns an authored post into structured markup.
 *
 * The posts are written as plain prose with no markup, so their structure is
 * implied by shape and has to be inferred. Without this every article renders
 * as one long run of identical paragraphs — lists read as run-on sentences and
 * headings are indistinguishable from body copy.
 *
 * The shapes, in the order they are tested:
 *   - a block wrapped in ** ** , or written in full caps, is a heading
 *   - a bullet block (•) is a list
 *   - a multi-line block whose lines carry no sentence-ending punctuation is a
 *     list; this is how most of the posts write theirs
 *   - a line ending in a colon introduces a list whose items were authored as
 *     separate blocks, so those get collected up
 *   - a short standalone line with no closing punctuation is a heading
 *   - anything else is a paragraph
 */
const formatContent = (content: string): React.ReactNode[] => {
  const isListBlock = (b: string) => {
    const ls = splitLines(b);
    return ls.length > 1 && ls.every((l) => l.length <= 90 && !ENDS_SENTENCE.test(l));
  };

  const isListItem = (b: string) =>
    !b.includes("\n") &&
    b.length <= 100 &&
    !ENDS_SENTENCE.test(b) &&
    !b.endsWith(":");

  const isHeading = (b: string) =>
    !b.includes("\n") &&
    b.length <= 80 &&
    !ENDS_SENTENCE.test(b) &&
    !b.endsWith(":") &&
    /^[A-Z0-9]/.test(b);

  const blocks = content
    .split("\n\n")
    .map((b) => b.trim())
    .filter(Boolean);

  const nodes: React.ReactNode[] = [];

  const pushHeading = (text: string, key: React.Key) =>
    nodes.push(
      <h2 key={key} className="blog-post-section-heading">
        {text}
      </h2>,
    );

  const pushList = (items: string[], key: React.Key) =>
    nodes.push(
      <ul key={key} className="blog-post-list">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>,
    );

  const pushParagraph = (text: string, key: React.Key) => {
    // Bold runs are the only inline markup the posts use.
    const html = text.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    nodes.push(
      <p
        key={key}
        className="blog-post-paragraph"
        dangerouslySetInnerHTML={{ __html: html }}
      />,
    );
  };

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    if (/^\*\*.+\*\*$/.test(block)) {
      pushHeading(block.slice(2, -2), i);
      continue;
    }

    if (/^[A-Z\s]{5,}$/.test(block)) {
      pushHeading(block, i);
      continue;
    }

    if (block.includes("•")) {
      pushList(
        splitLines(block)
          .filter((l) => l.startsWith("•"))
          .map((l) => l.slice(1).trim()),
        `bullet-${i}`,
      );
      continue;
    }

    if (isListBlock(block)) {
      pushList(splitLines(block), `list-${i}`);
      continue;
    }

    if (block.endsWith(":")) {
      pushParagraph(block, i);

      const items: string[] = [];
      while (i + 1 < blocks.length && isListItem(blocks[i + 1])) {
        items.push(blocks[++i]);
      }

      // One trailing line is more likely a stray sentence than a list.
      if (items.length >= 2) pushList(items, `after-${i}`);
      else items.forEach((item, n) => pushParagraph(item, `${i}-${n}`));
      continue;
    }

    if (isHeading(block)) {
      pushHeading(block, i);
      continue;
    }

    pushParagraph(splitLines(block).join(" "), i);
  }

  return nodes;
};

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
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

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

  const readTime = estimateReadTime(post.content);
  const relatedPosts = [...blogPosts]
    .filter((p) => p.id !== post.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

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
          <Link to="/blogs" className="breadcrumb-link">
            Insights
          </Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">{post.title}</span>
        </div>

        <article className="blog-post-container" ref={articleRef}>
          <div className="blog-post-featured-image">
            <BlogCover variant={post.cover} />
          </div>

          <div className="blog-post-category">MONDAY IMMIGRATION WATCH</div>
          <h1 className="blog-post-title">{post.title}</h1>

          <div className="blog-post-byline">
            <div className="blog-post-author-with-avatar">
              {/* The name is printed right beside this, so the initials are
                  decorative and carry no tooltip of their own. */}
              <span className="blog-post-author-avatar" aria-hidden="true">
                {getInitials(post.author)}
              </span>
              <span className="blog-post-author">{post.author}</span>
            </div>
            <span className="blog-post-date">{post.date}</span>
            <span className="blog-post-read-time">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 6v6l4 2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {readTime} min read
            </span>
          </div>

          <div className="blog-post-content">{formatContent(post.content)}</div>

          <div className="blog-post-footer">
            <div className="blog-post-author-card">
              <span className="author-card-avatar" aria-hidden="true">
                {getInitials(post.author)}
              </span>
              <div className="author-card-info">
                <span className="author-card-label">Written by</span>
                <span className="author-card-name">{post.author}</span>
                <p className="author-card-bio">
                  Regulated Canadian Immigration Consultant
                  (RCIC-IRB&nbsp;&ndash;&nbsp;L3) with over a decade of
                  experience in immigration research and consulting.
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
                <Link
                  to={`/blogs/${rp.id}`}
                  key={rp.id}
                  className="blog-related-card"
                >
                  <div className="blog-related-image">
                    <BlogCover variant={rp.cover} />
                  </div>
                  <div className="blog-related-body">
                    <span className="blog-related-date">{rp.date}</span>
                    <h3 className="blog-related-title">{rp.title}</h3>
                    <span className="blog-related-cta">
                      Read article
                      <svg
                        width="16"
                        height="16"
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
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPost;
