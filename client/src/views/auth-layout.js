import { Outlet } from 'react-router-dom';
import Navbar from '../components/auth/navbar';
import Footer from '../components/non-auth/footer';
import './styles/layout.scss';
import BgImage from '../assests/backgrounds/form-rot.svg';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <img className='background-image' src={BgImage} alt="background" />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;