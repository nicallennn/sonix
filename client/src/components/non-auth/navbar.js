import styles from './styles/navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-inner-wrapper">
        <Link to="/" className='link'>
          <h1 className='logo'>sonix</h1>
        </Link>

        <ul className="nav-links">
          <li className='nav-link' >
            <Link to="/login" className='link' >Login</Link>
          </li>

          <li className='nav-link' >
            <Link to="/signup" className='link' >Signup</Link>
          </li>

          <li className='nav-link'>
            <Link to="/search" className='link' >Search</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;