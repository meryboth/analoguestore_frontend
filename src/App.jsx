import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Chat from './pages/Chat';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import NewProduct from './pages/NewProduct';
import Orders from './pages/Orders';
import Users from './pages/Users';
import PurchaseConfirmation from './pages/PurchaseConfirmation'; // Componente para confirmación de compra
import ProductDetail from './pages/ProductDetail';
import ProtectedRoute from './components/ProtectedRoute';
import GithubCallback from './pages/GithubCallback';
import ForgotPassword from './pages/ForgotPassword';
import ValidateCode from './pages/ValidateCode';
import NewPassword from './pages/NewPassword';
import ConfirmationEmailSent from './pages/ConfirmationEmailSent';
import ConfirmationNewPassword from './pages/ConfirmationNewPassword';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/chat' element={<Chat />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/product/:id' element={<ProductDetail />} />
        <Route
          path='/purchase-confirmation'
          element={<PurchaseConfirmation />}
        />
        <Route path='/github-callback' element={<GithubCallback />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/validate-code' element={<ValidateCode />} />
        <Route path='/new-password' element={<NewPassword />} />
        <Route path='/confirm-email-sent' element={<ConfirmationEmailSent />} />
        <Route
          path='/confirmation-new-password'
          element={<ConfirmationNewPassword />}
        />
        {/* Ruta protegida solo para premium y admin */}
        <Route
          path='/new-product'
          element={
            <ProtectedRoute roles={['premium', 'admin']}>
              <NewProduct />
            </ProtectedRoute>
          }
        />
        {/* Rutas protegidas solo para admin */}
        <Route
          path='/orders'
          element={
            <ProtectedRoute roles={['admin']}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/users'
          element={
            <ProtectedRoute roles={['admin']}>
              <Users />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
