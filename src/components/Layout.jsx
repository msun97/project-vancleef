import { Outlet } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
