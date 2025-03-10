import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import Layout from './components/Layout';
import Home from './pages/home';
import NotFiles from './pages/notfile';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="*" element={<NotFiles />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;