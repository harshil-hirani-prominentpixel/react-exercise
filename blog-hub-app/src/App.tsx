import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import MyBlogs from "./pages/MyBlogs";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AddBlog from "./pages/AddBlog";

export default function App() {
  return (
    <>
      <Header />
      <main className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/my-blogs' element={<MyBlogs />} />
          <Route path='/add-blog' element={<AddBlog />} />
          <Route path='/about' element={<About />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </>
  );
}
