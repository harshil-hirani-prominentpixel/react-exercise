import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { readLocal, writeLocal } from "../utils/storage";
import type { Blog, User } from "../types";
import "../styles/addblog.css";
import type { JSX } from "react";


const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(String(reader.result));
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });
};

const AddBlog = (): JSX.Element => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const current = readLocal<User | null>("currentUser", null);
  const authorName = current
    ? `${current.firstName} ${current.lastName}`
    : "Guest";

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    const next: Record<string, string> = {};

    if (!title.trim()) next.title = "Title is a required field";
    if (!description.trim())
      next.description = "Description is a required field";
    if (!imageFile) next.image = "Image is a required field";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    let imageData: string | undefined;
    if (imageFile) {
      imageData = await fileToDataUrl(imageFile);
    }

    const blogs = readLocal<Blog[]>("blogs", []);
    const newBlog: Blog = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      author: authorName,
      createdAt: new Date().toISOString(),
      image: imageData,
    };

    writeLocal<Blog[]>("blogs", [...blogs, newBlog]);

    setTitle("");
    setDescription("");
    setImageFile(null);

    navigate("/blogs");
  };

  return (
    <div className='container content'>
      <h2>Publish New Blog</h2>
      <form className='add-blog-form' onSubmit={handleSubmit}>
        <label>Blog Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Enter blog title'
        />
        {errors.title && <small className='err'>{errors.title}</small>}

        <div className='grid-2'>
          <div>
            <label>Upload Image</label>
            <input
              type='file'
              accept='image/*'
              onChange={(e) =>
                setImageFile(e.target.files ? e.target.files[0] : null)
              }
            />
            {errors.image && <small className='err'>{errors.image}</small>}
          </div>

          <div>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
            />
            {errors.description && (
              <small className='err'>{errors.description}</small>
            )}
          </div>
        </div>

        <label>Author</label>
        <input value={authorName} readOnly />

        <button className='btn-cta' type='submit'>
          Publish
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
