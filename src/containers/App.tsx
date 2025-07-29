import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from '../components/atoms/ScrollToTop';

import Home from '../pages/Home';
import Product from '../pages/Product';
import ProductDetailPage from "../pages/ProductDetailPage";
import Car from "../pages/Car";
import Notice from "../pages/Notice";
import ResourceLibrary from "../pages/ResourceLibrary";
import Community from "../pages/Community";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import Profile from "../pages/ProfilePage";

import NotFound from '../pages/NotFound';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Product />} />
                <Route path="/producto/:id" element={<ProductDetailPage />} />
                <Route path="/carrito" element={<Car />} />
                <Route path="/noticias" element={<Notice />} />
                <Route path="/bibliotecaRecursos" element={<ResourceLibrary />} />
                <Route path="/comunidad" element={<Community />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/perfil" element={<Profile />} />

                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
