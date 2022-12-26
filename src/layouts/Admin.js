import React from "react";
import { useLocation, Route, Routes, Navigate } from "react-router-dom";
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
const cookie = cookies.get("token");
const Admin = (props) => {
  const mainContent = React.useRef(null);
  const location = useLocation();
  const history = useNavigate();
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainContent.current.scrollTop = 0;
  }, [location]);

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        console.log(prop.layout + prop.path);
        return (
          <Route
            path={prop.layout + prop.path}
            element={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

  return (
    <>
      { (!cookie) ? (
        window.location.replace("/auth/login")
      ) : (
        <div>
          <Sidebar
            {...props}
            routes={routes}
            logo={{
              innerLink: "/admin/index",
              imgSrc: require("../assets/img/brand/argon-react.png").default,
              imgAlt: "...",
            }}
          />

          <div className="main-content" ref={mainContent}>
            <AdminNavbar
              {...props}
              brandText={getBrandText(props.location.pathname)}
            />
            <Routes>
              {getRoutes(routes)}
              <Route
                path="/"
                element={<Navigate to="/admin/index" replace />}
              />
            </Routes>
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
