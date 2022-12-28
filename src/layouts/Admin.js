import React from "react";
import { useLocation, Route, Routes, Navigate, Outlet } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Cookies from "universal-cookie";
import routes from "../routes";
import Login from "views/examples/Login.js";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();
const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const history = useNavigate();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  return (
    <>
      { (!cookies.get("accessToken")) ? (
        window.location.replace("/auth/login")
      ) : (
        <div>
          <Sidebar
            {...props}
            routes={routes}
            logo={{
              innerLink: "/admin/index",
              imgSrc: require("../assets/img/brand/shopee-logo-1589778324075-1477812832.jpg"),
              imgAlt: "...",
            }}
          />

          <div className="main-content" ref={mainContent}>
            <AdminNavbar
              {...props}
            />
            <Outlet/>
            <Container fluid>
              <AdminFooter />
            </Container>
          </div>
        </div>
      )} 
    </>
  );
};

export default Admin;
