import { Outlet } from 'react-router-dom';
import Navbar from '../components/auth/navbar';
import styles from './styles/layout.scss';
import BgImage from '../assests/backgrounds/form-rot.svg';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <img className='background-image' src={BgImage} alt="background" />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;