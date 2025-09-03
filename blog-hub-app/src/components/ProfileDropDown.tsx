import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

const ProfileDropdown = (): React.JSX.Element => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = (): void => {
    logout();
    navigate("/login");
  };

  return (
    <div className='profile-dropdown' onMouseLeave={() => setOpen(false)}>
      <button className='dropdown-btn' onClick={() => setOpen((s) => !s)}>
        ☰
      </button>

      {open && (
        <div className='dropdown-menu'>
          <Link
            to='/add-blog'
            className='dropdown-item'
            onClick={() => setOpen(false)}
          >
            Add Blog
          </Link>
          <Link
            to='/my-blogs'
            className='dropdown-item'
            onClick={() => setOpen(false)}
          >
            My Blogs
          </Link>
          <button className='dropdown-item' onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
