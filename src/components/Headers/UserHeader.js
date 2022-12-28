
import { Button, Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
import { BASE_URL } from "config/networkConfigs";
const UserHeader = () => {
  const cookies = new Cookies();
  const [data, setData] = useState({ user: [] });
  useEffect(async () => {
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
        
          <Row style ={{width:"1000px"}}>
            <Col lg="7" md="10">
              <h3 className="display-4  text-white">
                This is {data.user.username}.
              </h3>
              <p className="text-white mt-0 mb-5">
                This is your profile page. You can see the progress you've made
                with your work and manage your projects or assigned tasks.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
