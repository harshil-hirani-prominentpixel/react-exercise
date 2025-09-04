import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = (): React.JSX.Element => {
  return (
    <section className='home-hero'>
      <div className='container hero-inner'>
        <h1>
          😊 <span className='accent'>Welcome to MyBlog</span>
        </h1>
        <p className='lead'>
          A simple blogging platform where you can share your thoughts, ideas,
          and stories with the world.
        </p>

        <Link to='/add-blog' className='btn-primary'>
          Create Your First Blog
        </Link>

        <hr className='hero-divider' />

        <section className='about-blurb'>
          <h3>About MyBlog</h3>
          <p>
            MyBlog is built for creators who value simplicity and focus. With
            just a few clicks, you can publish your blog posts, attach images,
            and start sharing with your readers.
          </p>
          <p>
            Everything runs locally in your browser, making it lightweight,
            private, and perfect for quick prototyping or personal journaling.
          </p>
          <p>
            Whether you're jotting down daily thoughts, documenting your
            learning journey, or writing stories, MyBlog provides a clean and
            elegant space to express yourself.
          </p>
        </section>
      </div>
    </section>
  );
};

export default Home;
