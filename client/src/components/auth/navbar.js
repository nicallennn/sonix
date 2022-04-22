import styles from '../non-auth/styles/navbar.scss';
import { Link } from 'react-router-dom';
import { logoutUser } from '../../services/userAPI';
import { useDispatch } from 'react-redux';
import { logout } from '../../state/actions';

const Navbar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="nav-inner-wrapper">
        <Link to="/dashboard" className='link'>
          <h1 className='logo'>sonix</h1>
        </Link>

        <ul className="nav-links">
          <li className='nav-link' >
            <Link to="/search" className='link' >Search</Link>
          </li>

          <li className='nav-link'>
            <Link to="/profile" className='link' >Profile</Link>
          </li>

          <li className='nav-link' onClick={handleLogout}>
            <Link to="/dashboard" className='link' >Logout</Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;