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
import ToggleButton from "react-toggle-button";
import { Avatar } from "@mui/material";

const UserDetail = (props) => {
  const cookies = new Cookies();
  const { idUser } = useParams();
  const [data, setData] = useState({ user: [] });

  useEffect(async () => {
    console.log(idUser);
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

  // const onToggle = (id) => {
  //   console.log(id);
  //   return axios.post(
  //     "https://web-be-brmc9.ondigitalocean.app/api/user/" + id + "/block",
  //     null,
  //     {
  //       headers: {
  //         Authorization: "Bearer " + cookies.get("token"),
  //       },
  //     }
  //   );
  // };

  return (
    <>
      {/* <UserHeader /> */}
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" +
            require("../../assets/img/theme/profile-cover.jpg").default +
            ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row style={{ width: "600px" }}>
            <Col lg="7" md="10">
              <h3 className="display-4  text-white">
                This is {data.user.username}.
              </h3>
              <p className="text-white mt-0 mb-5">
                You can see this user's details through the information below.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        style={{ width: "165px", height: "160px" }}
                        className="rounded-circle center"
                        src={data.user.avatar}
                      />
                    </a>
                  </div>
                </Col>
              </Row>

              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between"></div>
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      <div>
                        <span className="heading">
                          {/* {data.user.follower === null?"0":"data.user.follower.length"} */}
                          0</span>
                        <span className="description">Follower</span>
                      </div>
                      <div>
                        <span className="heading">
                          {/* {data.user.following === null?"0":"data.user.following.length"} */}
                        0</span>
                        <span className="description">Following</span>
                      </div>
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {data.user.username}
                    {/* <span className="font-weight-light">, 27</span> */}
                  </h3>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Detail User</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
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
                          />
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
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Phone number
                          </label>
                          <Input
                            className="form-control-alternative"
                            Value={data.user.phone}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Joined
                          </label>
                          <Input
                            className="form-control-alternative"
                            Value={new Date(
                              data.user.createdAt
                            ).toLocaleDateString("en-US")}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Number of subjects
                          </label>
                          <Input
                            className="form-control-alternative"
                            Value={data.user.subjects.length}
                          />
                        </FormGroup>
                      </Col>
                    </Row> */}
                  </div>
                  {/* Address */}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserDetail;
