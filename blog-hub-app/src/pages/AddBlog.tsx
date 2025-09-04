import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { readLocal, writeLocal } from "../utils/storage";
import type { Blog, User } from "../types";
import "../styles/addblog.css";

const fileToDataUrl = (file: File): Promise<string> =>
  new Promise((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => res(String(reader.result));
    reader.onerror = rej;
    reader.readAsDataURL(file);
  });

const AddBlog = (): React.JSX.Element => {
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
    if (imageFile) imageData = await fileToDataUrl(imageFile);

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
    navigate("/blogs");
  };

  return (
    <div className='container py-4'>
      <h2 className='mb-3'>Publish New Blog</h2>

      <form className='card p-3 shadow-sm' onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Blog Title</label>
          <input
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter blog title'
          />
          {errors.title && (
            <div className='invalid-feedback d-block'>{errors.title}</div>
          )}
        </div>

        <div className='row g-3'>
          <div className='col-md-5'>
            <label className='form-label'>Upload Image</label>
            <input
              className={`form-control ${errors.image ? "is-invalid" : ""}`}
              type='file'
              accept='image/*'
              onChange={(e) =>
                setImageFile(e.target.files ? e.target.files[0] : null)
              }
            />
            {errors.image && (
              <div className='invalid-feedback d-block'>{errors.image}</div>
            )}
          </div>

          <div className='col-md-7'>
            <label className='form-label'>Description</label>
            <textarea
              className={`form-control ${
                errors.description ? "is-invalid" : ""
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={8}
            />
            {errors.description && (
              <div className='invalid-feedback d-block'>
                {errors.description}
              </div>
            )}
          </div>
        </div>

        <div className='mt-3'>
          <label className='form-label'>Author</label>
          <input className='form-control' value={authorName} readOnly />
        </div>

        <button className='btn btn-primary mt-3' type='submit'>
          Publish
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
