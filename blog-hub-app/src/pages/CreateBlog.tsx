import { useState } from "react";
import type { Blog, User } from "../types";
import { readLocal, writeLocal } from "../utils/storage";

export default function CreateBlog() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const user = readLocal<User | null>("currentUser", null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const blogs = readLocal<Blog[]>("blogs", []);
    const newBlog: Blog = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      author: `${user.firstName} ${user.lastName}`,
      createdAt: new Date().toISOString(),
    };
    writeLocal<Blog[]>("blogs", [...blogs, newBlog]);
    setTitle("");
    setDescription("");
    alert("Blog published!");
  };

  return (
    <div className='form-container'>
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Description'
          required
        />
        <button type='submit'>Publish</button>
      </form>
    </div>
  );
}
