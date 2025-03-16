import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NotFiles from './pages/notfile';
import MyPage from './pages/mypage';
import Order from './pages/mypage/order';
import Recent from './pages/mypage/recent';
import Wishlist from './pages/mypage/wishtlist';
import Cart from './pages/mypage/cart';
import Profile from './pages/mypage/profile';
import Logout from './pages/mypage/logout';
import ProductInquiry from './pages/productinquiry';
import ProductListPage from './pages/ProductList';
import ProductDetailPage from './pages/productdetail';
import CustomerCenter from './pages/customercenter';
import CCInquiryForm from './pages/customercenter/components/CCInquiryForm';
import CCFaq from './pages/customercenter/components/CCFaq';
import CCNotice from './pages/customercenter/components/CCNotice';
import CCInquiry from './pages/customercenter/components/CCInquiry';
import Search from './pages/search';
import Purchase from './pages/purchase';
import ReservationPage from "./pages/reservation";
import ShoppingcartModal from "./components/purchase/ShoppingcartModal";
import SignupPage from "./pages/signup";
import Login from "./pages/login";
import MypostsPage from "./pages/mypage/myposts";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Kbrand from "./pages/kbrand";
import AboutPage from './pages/about';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='home' element={<Home />} />
                        <Route path='/about' element={<AboutPage />} />
                        <Route path="/kbrand" element={<Kbrand/>} />
                        <Route path='/productlist' element={<ProductListPage />} />
                        <Route path='/productdetail' element={<ProductDetailPage />} />
                        <Route path='/shoppingcartmodal' element={<ShoppingcartModal />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/signup' element={<SignupPage />} />
                        <Route path='/mypage' element={<MyPage />}>
                            <Route path='order' element={<Order />} />
                            <Route path='recent' element={<Recent />} />
                            <Route path='wishlist' element={<Wishlist />} />
                            <Route path='cart' element={<Cart />} />
                            <Route path='myposts' element={<MypostsPage />} />
                            <Route path='profile' element={<Profile />} />
                            <Route path='logout' element={<Logout />} />
                        </Route>
                        <Route path='/customers' element={<CustomerCenter />}>
                            <Route path='notice' element={<CCNotice />} />
                            <Route path='faq' element={<CCFaq />} />
                            <Route path='inquiry' element={<CCInquiry />} />
                            <Route path='inquiryform' element={<CCInquiryForm />} />
                        </Route>
                        <Route path='/:search'>
                            <Route index element={<Search />} />
                        </Route>
                        <Route path='/purchase' element={<Purchase />} />
                        <Route path='/reservation' element={<ReservationPage />} />
                    </Route>
                    <Route path='/productinquiry' element={<ProductInquiry />} />
                    <Route path='*' element={<NotFiles />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
