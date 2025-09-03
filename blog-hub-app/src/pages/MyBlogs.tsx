import { useEffect, useState } from "react";
import type { Blog, User } from "../types";
import { readLocal } from "../utils/storage";
import type { JSX } from "react";


const MyBlogs = (): JSX.Element => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [author, setAuthor] = useState<string>("");

  useEffect(() => {
    const user = readLocal<User | null>("currentUser", null);
    const allBlogs = readLocal<Blog[]>("blogs", []);
    if (user) {
      const fullName = `${user.firstName} ${user.lastName}`;
      setAuthor(fullName);
      setBlogs(allBlogs.filter((b) => b.author === fullName).reverse());
    } else {
      setBlogs([]);
    }
  }, []);

  return (
    <div className='container content'>
      <h2>My Blogs {author && `— by ${author}`}</h2>
      {blogs.length === 0 ? (
        <p>You have not published any blogs yet. Start by creating one!</p>
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

export default MyBlogs;
