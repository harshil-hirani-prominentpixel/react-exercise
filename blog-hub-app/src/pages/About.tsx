import type { JSX } from "react";

const About = (): JSX.Element => {
  return (
    <div className='container content'>
      <h2>About MyBlog</h2>
      <p>
        <strong>MyBlog</strong> is a lightweight blogging platform built with{" "}
        <em>React + TypeScript</em>. It is designed for creators who want a
        simple, clean, and modern way to share their thoughts, ideas, and
        stories with the world.
      </p>

      <p>
        Unlike traditional blogging platforms, MyBlog stores everything directly
        in your browser’s <code>localStorage</code>. This means you can
        prototype and publish your blogs instantly without the need for complex
        backend setups, hosting, or databases. Perfect for learners, hobby
        writers, or anyone who just wants to start writing fast 🚀.
      </p>

      <p>
        With MyBlog you can:
        <ul>
          <li>Create and publish blogs instantly.</li>
          <li>Upload images to make your posts more engaging.</li>
          <li>Manage your personal blogs under "My Blogs".</li>
          <li>Read all posts in the community under "Blogs".</li>
          <li>Enjoy a distraction-free, minimal design built for focus.</li>
        </ul>
      </p>

      <p>
        Our mission is to empower everyone to share knowledge and creativity
        without barriers. Whether you’re a student, a developer, a traveler, or
        simply someone with ideas, MyBlog gives you the tools to publish them in
        seconds.
      </p>
    </div>
  );
};

export default About;
