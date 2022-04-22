import { Outlet } from 'react-router-dom';
import Navbar from '../components/auth/navbar';
import styles from './styles/layout.scss';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="main-container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;