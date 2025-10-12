import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Home from './pages/home';
import AllProductsPage from './pages/allProductsPage';
import PcBuilderPage from './pages/pcBuilder';
import ProductDescriptionPage from './pages/productDescriptionPage';
import { BuildProvider } from './contexts/buildContext';
import CartPage from './pages/cartPage';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/authPage';
import RouteGroup from './components/routeGroup';
import ScrollToTop from './components/scrollToTop';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <ScrollToTop></ScrollToTop>    
      <BuildProvider>
        <Navbar />
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/LoginPage" element={<AuthPage />} />
          <Route path="/AllProductsPage" element={<AllProductsPage />} />
          <Route path="Product/:id" element={<ProductDescriptionPage />} />
          {/* Protected Routes Group - All routes here require authentication */}
          <Route 
            path="/*" 
            element={
              <RouteGroup allowedRoles={["user", "admin"]}>
                <Routes>
                  <Route path="PCBuilderPage" element={<PcBuilderPage />} />
                  <Route path="CartPage" element={<CartPage />} />
                </Routes>
              </RouteGroup>
            } 
          />
          
          {/* Admin Only Routes Group */}
          <Route 
            path="/Admin/*" 
            element={
              <RouteGroup allowedRoles={["admin"]}>
                <Routes>
                  <Route path="Dashboard" element={<AdminPage />} />
                </Routes>
              </RouteGroup>
            } 
          />
        </Routes>
      </BuildProvider>
    </BrowserRouter>
  )
}

export default App