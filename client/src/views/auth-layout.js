import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <h1>auth layout</h1>
      <Outlet />
    </>
  );
};

export default Layout;