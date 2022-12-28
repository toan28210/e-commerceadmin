import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from '../../assets/img/brand/shopee-logo-1589778324075-1477812832.jpg'

import { useNavigate } from "react-router-dom";

const NewPass = ({ email }) => {
  const [code, setCode] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [errCode, setErrCode] = useState("");
  const [errPass, setErrPass] = useState("");
  const [confirm, setconfirm] = useState("");
  const history = useNavigate();

  async function passwordWord(credentials) {
    return axios.post(
      "`${BASE_URL}/sendmailForget/confirm",
      credentials
    );
  }
  const handleSubmit = async () => {
    if (!code) {
      setErrCode("You must enter the code.");
    } else {
      setErrCode("");
    }
    if (!password) {
      setErrPass("You must enter a new password.");
    } else {
      setErrPass("");
    }
    try {
      const user = await passwordWord({ email, code, password, confirm });
      console.log(user.data.succes);
      if (
        user.data.success === true &&
        password === confirm &&
        password !== ""
      ) {
        console.log(user.data);
        alert("Logged in successfully!");
        history.push("/admin/index");
      } else {
        if (password !== confirm) {
          setError("New password and confirm password are not the same.");
        } else {
          setError("Code incorrect!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <img
                src={logo}
                alt="Shoppe"
                border="0"
                width={"200px"}
              ></img>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            {error != "" ? (
              <div
                style={{ fontFamily: "roboto" }}
                className="error text-danger text-center"
              >
                {error}
              </div>
            ) : (
              ""
            )}
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Code"
                    type="number"
                    onChange={(e) => setCode(e.target.value)}
                    label="Code"
                    autoComplete="new-code"
                  />
                </InputGroup>
                {errCode != "" ? (
                  <div
                    style={{ fontFamily: "roboto" }}
                    className="error text-danger text-center"
                  >
                    {errCode}
                  </div>
                ) : (
                  ""
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="New Password"
                    type="password"
                    onChange={(e) => setpassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </InputGroup>
                {errPass != "" ? (
                  <div
                    style={{ fontFamily: "roboto" }}
                    className="error text-danger text-center"
                  >
                    {errPass}
                  </div>
                ) : (
                  ""
                )}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    onChange={(e) => setconfirm(e.target.value)}
                    autoComplete="confirm-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  onClick={handleSubmit}
                  type="button"
                >
                  Change password
                </Button>
                <div mt={3} mb={1} textAlign="center"></div>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a className="text-light" href="/auth/login">
              <small>
                <i className="fas fa-arrow-left"></i> Back
              </small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default NewPass;
