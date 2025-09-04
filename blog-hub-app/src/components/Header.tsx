import { NavLink, Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropDown";
import { getCurrentUser } from "../utils/auth";
import "../styles/navbar.css";

export default function Header() {
  const user = getCurrentUser();

  return (
    <header className='site-header sticky-top bg-white border-bottom'>
      <nav className='navbar navbar-expand-lg container'>
        <Link className='navbar-brand fw-bold text-primary' to='/'>
          Blog Hub
        </Link>

        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#mainNav'
          aria-controls='mainNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon' />
        </button>

        <div className='collapse navbar-collapse' id='mainNav'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <NavLink
                to='/'
                end
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/blogs'
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                Blogs
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink
                to='/about'
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
              >
                About Us
              </NavLink>
            </li>
          </ul>

          {!user ? (
            <div className='d-flex gap-2'>
              <NavLink to='/login' className='btn btn-outline-primary'>
                Login
              </NavLink>
              <NavLink to='/signup' className='btn btn-primary'>
                Sign Up
              </NavLink>
            </div>
          ) : (
            <div className='d-flex align-items-center gap-3'>
              <span className='text-muted'>
                Hello,{" "}
                <strong>
                  {user.firstName} {user.lastName}
                </strong>
              </span>
              <ProfileDropdown />
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
