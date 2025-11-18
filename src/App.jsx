import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { Footer } from './components/Footer/Footer';
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer.jsx';
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer';
import { CartProvider } from './context/CartContext/CartProvider';
import { Cart } from './components/Cart/Cart';
import { ProductFormContainer } from './components/adminComponents/ProductFormContainer/ProductFormContainer';
import { MainLayout } from './layouts/MainLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { RutaProtegida } from './components/RutaProtegida/RutaProtegida';
import { Login } from './components/Login/Login';
import { AdminProductList } from './components/adminComponents/AdminProductList/AdminProductList';

function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<ItemListContainer titulo={"Bienvenidos a Estampida Disegn"} />} />
              <Route path="/category/:category" element={<ItemListContainer titulo={"Bienvenidos"} />} />
              <Route path="/detail/:id" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              {/* Login sigue siendo el index */}
              <Route index element={<Login />} />

              {/* RUTA 1: El listado de productos (Dashboard) */}
              <Route
                path="productos"
                element={
                  <RutaProtegida>
                    <AdminProductList />
                  </RutaProtegida>
                }
              />

              {/* RUTA 2: El formulario de alta (Al que lleva el botón) */}
              <Route
                path="alta-productos"
                element={
                  <RutaProtegida>
                    <ProductFormContainer />
                  </RutaProtegida>
                }
              />

              {/* RUTA 3: El formulario de edición (Futuro paso) */}
              <Route
                path="editar/:id"
                element={
                  <RutaProtegida>
                    <ProductFormContainer />
                  </RutaProtegida>
                }
              />
            </Route>
          </Routes>
          <Footer />
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
