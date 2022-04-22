import styles from '../non-auth/styles/navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-inner-wrapper">
        <Link to="/dashboard" className='link'>
          <h1 className='logo'>sonix</h1>
        </Link>

        <ul className="nav-links">
          <li className='nav-link' >
            <Link to="/login" className='link' >Search</Link>
          </li>

          <li className='nav-link'>
            <Link to="/search" className='link' >Profile</Link>
          </li>

          <li className='nav-link'>
            <Link to="/search" className='link' >Logout</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;