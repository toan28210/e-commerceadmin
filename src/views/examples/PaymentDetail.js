import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Col,
  Row,
} from "reactstrap";

// core components
import UserHeader from "components/Headers/UserHeader.js";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";

const UserDetail = ({ match }) => {
  const cookies = new Cookies();

  const [data, setData] = useState({});

  useEffect(async () => {
    console.log(match.params);
    const { idPayment } = match.params;
    const result = await axios.get(
      "http://192.53.114.191:3001/api/payment/" + idPayment,
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    console.log(result.data);
    setData(result.data);
  }, []);

  return (
    <>
      {" "}
      {console.log(data.data)}
      {data.data ? (
        <>
          <div
            className="header d-flex align-items-center"
            style={{
              minHeight: "80px",
              backgroundSize: "cover",
              backgroundPosition: "center top",
            }}
          />
          <span className="mask bg-gradient-default opacity-8" />
          <Container
            className="mt-10 align-center"
            style={{ marginLeft: "17%", width: "92%" }}
            fluid
          >
            <Row>
              <Col className="order-xl-1" xl="8">
                <Card className="bg-secondary shadow">
                  <CardHeader className="bg-white border-0">Payment detail</CardHeader>
                  <CardBody>
                    <Form>
                      <UserInfo idUser={data.data.extraData} />
                      {/* {console.log(data.data.extraData)} */}
                      <h6 className="heading-small text-muted mb-4">
                        Payment Inormation
                      </h6>
                      <hr className="my-4" />
                      <div className="pl-lg-4">
                        <Row>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-city"
                              >
                                Order Id
                              </label>
                              <Input
                                className="form-control-alternative"
                                Value={data.data.orderId}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="6">
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Amount
                              </label>
                              <Input
                                className="form-control-alternative"
                                Value={data.data.amount}
                              />
                            </FormGroup>
                          </Col>
          
                        </Row>
                        <Row>
                          <Col >
                            <FormGroup>
                              <label
                                className="form-control-label"
                                htmlFor="input-country"
                              >
                                Message
                              </label>
                              <Input
                                className="form-control-alternative"
                                Value={data.data.message}
                              />
                            </FormGroup>
                          </Col>
                        </Row>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

function UserInfo({ idUser }) {
  console.log(idUser);
  const cookies = new Cookies();

  const [data, setData] = useState({ user: [] });

  useEffect(async () => {
    const result = await axios.get(
      "http://192.53.114.191:3001/api/user/" + idUser + "/info",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    console.log(result.data.user);
    setData(result.data);
  }, []);
  return (
    <>
      {data.user ? (
        <>
          <h6 className="heading-small text-muted mb-4">User information</h6>
          <hr className="my-4" />
          <div className="pl-lg-4">
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-first-name"
                  >
                    Email
                  </label>
                  <Input
                    className="form-control-alternative"
                    Value={data.user.email}
                    id="input-first-name"
                    placeholder="First name"
                    type="text"
                  />
                  {console.log(data)}
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-last-name"
                  >
                    User name
                  </label>
                  <Input
                    className="form-control-alternative"
                    Value={data.user.username}
                    id="input-last-name"
                    placeholder="Last name"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
          <div className="pl-lg-4">
            <Row>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="input-city">
                    Role
                  </label>
                  <Input
                    className="form-control-alternative"
                    value={data.user.role}
                    id="input-city"
                    placeholder="City"
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col lg="6">
                <FormGroup>
                  <label className="form-control-label" htmlFor="input-country">
                    Coins
                  </label>
                  <Input
                    className="form-control-alternative"
                    value={data.user.coins}
                    id="input-country"
                    placeholder="Country"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
export default UserDetail;
