import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar';
import Home from './pages/home';
import AllProductsPage from './pages/allProductsPage';
import PcBuilderPage from './pages/pcBuilder';
import ProductDescriptionPage from './pages/productDescriptionPage';
import { BuildProvider } from './contexts/buildContext';
import CartPage from './pages/cartPage';
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
        <BuildProvider>
          <Navbar></Navbar>
          <Routes>
            <Route path = "/">
              <Route index element={<Home></Home>}/>
              <Route path="AllProductsPage" element={<AllProductsPage></AllProductsPage>}/>
              <Route path="PCBuilderPage" element={<PcBuilderPage></PcBuilderPage>}/>
              <Route path="Product/:id" element={<ProductDescriptionPage></ProductDescriptionPage>}/>
              <Route path="CartPage" element={<CartPage></CartPage>}/>
            </Route> 
          </Routes>
        </BuildProvider>
    </BrowserRouter>
  )
}

export default App
