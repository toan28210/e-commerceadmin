
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate, Outlet } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";
import './i18n';

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "./layouts/Auth.js";
import Login from "views/examples/Login";
import Forgot from "views/examples/Forgot";
import NewPass from "views/examples/NewPass";
import Dashboard from "views/examples/Dashboard";
import Users from "views/examples/Users";
import Products from "views/examples/Products";
import Orders from "views/examples/Orders";
import UserDetail from "views/examples/UserDetail";
import AdminProfile from "views/examples/Profile";
import ProductDetail from "views/examples/ProductDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/admin/*" element={<AdminLayout/>} component={props => <AdminLayout {...props} />} >
        <Route path="index" element = {<Dashboard/>} />
        <Route path="users" element = {<Users key="users"/>} />
        <Route path="products" element = {<Products key="products-key"/>} />  
        <Route path="products/:productId" element = {<ProductDetail key="product-key"/>}/>
        <Route path="orders" element = {<Orders key="orderds-key" />} />
        <Route path="admin-profile" element = {<AdminProfile />} />
        <Route path="user" element = {<Outlet/>} >
           <Route path=":idUser/info" element={<UserDetail/> }/> 
          </Route>
      </Route>
      <Route path="/auth"  element={<AuthLayout/>} component={props => <AuthLayout {...props} />} >
        <Route path="login" element = {<Login/>} />
        <Route path="forgot" element = {<Forgot/> }/>   
        <Route path="newpass" element = {<NewPass/> }/>  
      </Route>
      
      <Route
        path="/"
        element={<Navigate to="/auth/login" />}
    />
    </Routes>
  </BrowserRouter>
);
