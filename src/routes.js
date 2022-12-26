
import Index from "views/Index.js";
import Login from "./views/examples/Login";
import Profile from "views/examples/Profile.js";
import Forgot from "views/examples/Forgot.js";
import NewPass from "views/examples/NewPass.js";
import Users from "views/examples/Users.js";
import Posts from "views/examples/Posts.js";
import Groups from "views/examples/Groups.js";
import UserDetail from "views/examples/UserDetail.js";
import Payments from "views/examples/Payments.js";
import PaymentDetail from "views/examples/PaymentDetail.js"
import PaymentOuts from "views/examples/PaymentOuts.js"
import PaymentOutDetail from "views/examples/PaymentOutDetail";
import Dashboard from "views/examples/Dashboard";

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
    path: "/posts",
    name: "Posts",
    icon: "ni ni-album-2 text-green",
    component: Posts,
    layout: "/admin",
  },
  {
    path: "/groups",
    name: "Groups",
    icon: "ni ni-folder-17 text-blue",
    component: Groups,
    layout: "/admin",
  },
  {
    path: "/payments",
    name: "Deposit",
    icon: "ni ni-money-coins text-orange",
    component: Payments,
    layout: "/admin",
  },
  {
    path: "/payments-out",
    name: "Withdraw money",
    icon: "ni ni-money-coins text-yellow",
    component: PaymentOuts,
    layout: "/admin",
  },
  {
    path: "/user-profile",
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
    path: "/payment/:idPayment",
    exact: true,
    component: ({ match }) => <PaymentDetail match={match} />,
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
