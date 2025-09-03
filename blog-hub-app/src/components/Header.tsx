import { NavLink } from "react-router-dom";
import ProfileDropdown from "./ProfileDropDown";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");

  return (
    <header>
      <h2>Blog Hub</h2>
      <nav>
        <NavLink to='/'>Home</NavLink>
        <NavLink to='/blogs'>Blogs</NavLink>
        <NavLink to='/about'>About Us</NavLink>
        {!user && <NavLink to='/login'>Login</NavLink>}
        {!user && <NavLink to='/signup'>Sign Up</NavLink>}
      </nav>
      <div>
        {user ? (
          <>
            <span>
              Hello, {user.firstName} {user.lastName}
            </span>
            <ProfileDropdown />
          </>
        ) : null}
      </div>
    </header>
  );
}
