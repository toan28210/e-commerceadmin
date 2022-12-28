
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import Cookies from "universal-cookie";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import {USERS_BASE_URL} from '../../config/networkConfigs';


const Header = () => {
  const [user, setUser] = useState({ users: [] });
  const [order, setOrder] = useState({ orders: [] });
  const [product, setProduct] = useState({ products: [] });

  const cookies = new Cookies();
  // useEffect(async () => {
  //   const result = await axios(
  //     USERS_BASE_URL,
  //     {
  //       headers: {
  //         Authorization: "Bearer " + cookies.get("accessToken"),
  //       },
  //     }
  //   );
  //   setUser(result.data);
  // }, []);

  // useEffect(async () => {
  //   const result = await axios.get(
  //     "`${BASE_URL}/groups?offset=1&limit=50",
  //     {
  //       headers: {
  //         Authorization: "Bearer " + cookies.get("accessToken"),
  //       },
  //     }
  //   );
  //   setOrder(result.data);
  // }, []);

  // useEffect(async () => {
  //   const result = await axios(
  //     "`${BASE_URL}/posts/admin",
  //     {
  //       headers: {
  //         Authorization: "Bearer " + cookies.get("accessToken"),
  //       },
  //     }
  //   );
  //   setProduct(result.data);
  // }, []);
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
             
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total Users
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{user.users.length}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                       
                          <i className="fas fa-users" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fa fa-arrow-up" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                  <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                         Total Orders
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {order.orders.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-chart-bar" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-danger mr-2">
                        <i className="fas fa-arrow-down" /> 3.48%
                      </span>{" "}
                      <span className="text-nowrap">Since last week</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                         Total Products
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{product.products.length}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                        <i className="fas fa-newspaper" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-warning mr-2">
                        <i className="fas fa-arrow-down" /> 1.10%
                      </span>{" "}
                      <span className="text-nowrap">Since yesterday</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                         Total Subjects
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{order.orders.length}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-folder" />
                        </div>
                      </Col>
                    </Row>
                    {/* <p className="mt-3 mb-0 text-muted text-sm">
                      <span className="text-success mr-2">
                        <i className="fas fa-arrow-up" /> 12%
                      </span>{" "}
                      <span className="text-nowrap">Since last month</span>
                    </p> */}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
