import { useEffect, useState } from "react";
import type { Blog } from "../types";
import { readLocal } from "../utils/storage";
import "../styles/my-blog.css";

const Blogs = (): React.JSX.Element => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setBlogs(readLocal<Blog[]>("blogs", []).slice().reverse());
  }, []);

  return (
    <div className='my-blogs-card'>
      <h2>All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs yet — create the first one!</p>
      ) : (
        <div className='blogs-grid'>
          {blogs.map((b) => (
            <article key={b.id} className='blog-card'>
              {b.image && (
                <img src={b.image} alt={b.title} className='blog-image' />
              )}
              <div className='blog-meta'>
                <h3>{b.title}</h3>
                <small>
                  {new Date(b.createdAt).toLocaleString()} • {b.author}
                </small>
              </div>
              <p className='blog-desc'>{b.description}</p>
              <button className='read-more-btn'>Read More</button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
