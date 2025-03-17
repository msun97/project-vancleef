import { Outlet, useLocation } from 'react-router-dom';
import Header from './layout/Header';
import Footer from './layout/Footer';

const Layout = () => {
  const location = useLocation();
  const isHome =
    location.pathname === '/' ||
    location.pathname === '/home' ||
    location.pathname === '/kbrand';
  return (
    <>
      <Header />
      <Outlet />
      {!isHome && <Footer />}
    </>
  );
};

export default Layout;
