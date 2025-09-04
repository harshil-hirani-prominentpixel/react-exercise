import { useEffect, useState } from "react";
import type { Blog } from "../types";
import { readLocal } from "../utils/storage";
import "../styles/blogs.css"; 

const Blogs = (): React.JSX.Element => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    setBlogs(readLocal<Blog[]>("blogs", []).slice().reverse());
  }, []);

  return (
    <div className='container content'>
      <h2>All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs yet — create the first one!</p>
      ) : (
        blogs.map((b) => (
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
          </article>
        ))
      )}
    </div>
  );
};

export default Blogs;
