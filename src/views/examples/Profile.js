import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
import Avatar from "@mui/material/Avatar";
import { BASE_URL } from "config/networkConfigs";
const Profile = () => {
  const cookies = new Cookies();
  const [data, setData] = useState({ user: [] });
  useEffect(async () => {
    const id = cookies.get("id");
    const result = await axios.get(
      `${BASE_URL}/user/info`,
      {
        headers: {
          Authorization: "Bearer " + cookies.get("accessToken"),
        },
      }
    );
    console.log(result.data.user);
    setData(result.data);
  }, []);

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid style={{ width: "40%" }}>
        <div className="pl-lg-4">
          <Row>
            <Col className="">
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
                <br></br><br></br><br></br>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  <div className="d-flex justify-content-between"></div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <div className="text-center">
                    <h3>{data.user.username}</h3>
                    <div className="h5 font-weight-300">{data.user.email}</div>

                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Solution Manager - Magic team
                    </div>
                  </div>
                </CardBody>

                {/* Address */}
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Profile;
