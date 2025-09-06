import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import "../styles/navbar.css";

const ProfileDropdown = (): React.JSX.Element => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();

    document.dispatchEvent(new Event("authChange"));
    navigate("/login");
  };

  return (
    <div className='position-relative'>
      <button
        type='button'
        className='btn btn-light border rounded-3'
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
      >
        ☰
      </button>

      {open && (
        <div
          className='dropdown-menu show end-0 mt-2 shadow-sm'
          style={{ position: "absolute" }}
          onMouseLeave={() => setOpen(false)}
        >
          <Link
            to='/add-blog'
            className='dropdown-item text-success'
            onClick={() => setOpen(false)}
          >
            Add Blog
          </Link>
          <Link
            to='/my-blogs'
            className='dropdown-item text-success'
            onClick={() => setOpen(false)}
          >
            My Blogs
          </Link>
          <button className='dropdown-item text-danger' onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
