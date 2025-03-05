import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <h1>Header</h1>
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
};

export default Layout;
