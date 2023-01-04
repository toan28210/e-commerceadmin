
import Index from "views/Index.js";
import Login from "./views/examples/Login";
import Profile from "views/examples/Profile.js";
import Forgot from "views/examples/Forgot.js";
import NewPass from "views/examples/NewPass.js";
import Users from "views/examples/Users.js";
import Products from "views/examples/Products.js";
import Orders from "views/examples/Orders.js";
import UserDetail from "views/examples/UserDetail.js";
import Payments from "views/examples/Payments.js";
import PaymentOuts from "views/examples/PaymentOuts.js"
import PaymentOutDetail from "views/examples/PaymentOutDetail";
import Dashboard from "views/examples/Dashboard";
import ProductDetail from "views/examples/ProductDetail";

var routes = [
  // {
  //   path: "/index",
  //   name: "Dashboard",
  //   icon: "ni ni-tv-2 text-primary",
  //   component: Index,
  //   layout: "/admin",
  // },
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: "ni ni-single-02 text-brown",
    component: Users,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    icon: "ni ni-album-2 text-green",
    component: Products,
    layout: "/admin",
  },
  {
    path: "/orders",
    name: "Orders",
    icon: "ni ni-folder-17 text-blue",
    component: Orders,
    layout: "/admin",
  },
  // {
  //   path: "/payments",
  //   name: "Deposit",
  //   icon: "ni ni-money-coins text-orange",
  //   component: Payments,
  //   layout: "/admin",
  // },
  // {
  //   path: "/payments-out",
  //   name: "Withdraw money",
  //   icon: "ni ni-money-coins text-yellow",
  //   component: PaymentOuts,
  //   layout: "/admin",
  // },
  {
    path: "/admin-profile",
    name: "Admin Profile",
    icon: "ni ni-single-02 text-pink",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/forgot",
    name: "Forgot",
    icon: "ni ni-key-25 text-info",
    component: Forgot,
    layout: "/auth",
  },
  {
    path: "/newpass",
    name: "NewPass",
    icon: "ni ni-key-25 text-info",
    component: NewPass,
    layout: "/auth",
  },
  {
    path: "/user/:idUser/info",
    exact: true,
    component: ({ match }) => <UserDetail match={match} />,
    layout: "/admin",
  },
  {
    path: "/products/:id",
    exact: true,
    component: ({ match }) => <ProductDetail />,
    layout: "/admin",
  },
  {
    path: "/withdraw/:idPaymentOut",
    exact: true,
    component: ({ match }) => <PaymentOutDetail match={match} />,
    layout: "/admin",
  },
];
export default routes;
