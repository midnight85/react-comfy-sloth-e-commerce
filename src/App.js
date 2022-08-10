import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Navbar, Sidebar, Footer} from "./components";
import {
  Home,
  AboutPage,
  ProductsPage,
  SingleProductPage,
  CartPage,
  CheckoutPage,
  PrivateRoute,
  ErrorPage,
} from "./pages";

function App() {
  return <h1>Hello</h1>;
}

export default App;
