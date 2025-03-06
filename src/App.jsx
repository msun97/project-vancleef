import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home';
import NotFiles from './pages/notfile';
import ProductInquiry from './pages/productinquiry/ProductInquiry';
const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/productinquiry' element={<ProductInquiry />} />
                    </Route>
                    <Route path='*' element={<NotFiles />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
