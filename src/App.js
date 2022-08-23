import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Navbar, Sidebar, Footer} from "./components";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  AboutPage,
  ProductsPage,
  SingleProductPage,
  CartPage,
  CheckoutPage,
  PrivateRoute,
  ErrorPage,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <Navbar />
      </header>
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="about" element={<AboutPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/:id" element={<SingleProductPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route
            path="checkout"
            element={
              <PrivateRoute>
                <CheckoutPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
