import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home';
import NotFiles from './pages/notfile';
import MyPage from './pages/mypage';
import Order from './pages/mypage/order';
import Recent from './pages/mypage/recent';
import Wishlist from './pages/mypage/wishtlist';
import Cart from './pages/mypage/cart';
import Myposts from './pages/mypage/myposts';
import Profile from './pages/mypage/profile';
import Logout from './pages/mypage/logout';
import ProductInquiry from './pages/productinquiry';
import ProductListPage from './pages/ProductList';
import ProductDetailPage from './pages/productdetail';
import CustomerCenter from './pages/customercenter';
import TestYG from './pages/productdetail/TestYG';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="/productlist" element={<ProductListPage />} />
            <Route path="/testyg" element={<TestYG />} />
            <Route path="/productdetail" element={<ProductDetailPage />} />
            <Route path="/mypage" element={<MyPage />}>
              <Route path="order" element={<Order />} />
              <Route path="recent" element={<Recent />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="cart" element={<Cart />} />
              <Route path="myposts" element={<Myposts />} />
              <Route path="profile" element={<Profile />} />
              <Route path="logout" element={<Logout />} />
            </Route>
            <Route path="/customers" element={<CustomerCenter />}></Route>
          </Route>
          <Route path="/productinquiry" element={<ProductInquiry />} />
          <Route path="*" element={<NotFiles />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
