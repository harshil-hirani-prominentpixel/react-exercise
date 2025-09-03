import { Link, NavLink } from "react-router-dom";
import ProfileDropdown from "./ProfileDropDown";
import { getCurrentUser } from "../utils/auth";
import "../styles/navbar.css";

const Navbar = (): React.JSX.Element => {
  const user = getCurrentUser();

  return (
    <header className='site-header'>
      <div className='container header-inner'>
        <div className='brand'>
          <Link to='/' className='brand-link'>
            MyBlog
          </Link>
        </div>

        <nav className='main-nav'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to='/blogs'
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Blogs
          </NavLink>
          <NavLink
            to='/about'
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            About Us
          </NavLink>
        </nav>

        <div className='header-right'>
          {!user ? (
            <>
              <Link to='/login' className='auth-link'>
                Login
              </Link>
              <Link to='/signup' className='auth-link'>
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <div className='greeting'>
                Welcome, <strong>{user.firstName}</strong>
              </div>
              <ProfileDropdown />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
