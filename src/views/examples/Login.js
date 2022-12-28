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
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/brand/shopee-logo-1589778324075-1477812832.jpg'
import { BASE_URL } from "config/networkConfigs";
// import Notification from "./Notification";

// import Forgot from "./Forgot";
// import Admin from "layouts/Admin";
const cookies = new Cookies();
const Login = () => {
  const [email, setemail] = useState("");
  const [nextStep, setStep] = useState(false);
  const [password, setPassword] = useState("");
  const [errName, setErrName] = useState("");
  const [errPass, setErrPass] = useState("");
  const navigate = useNavigate();

  async function loginUser(credentials) {
    return axios.post(
      `${BASE_URL}/auth/login`,
      credentials
    );
  }
  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      if (!email) {
        setErrName("You must enter email");
      } else {
        setErrName("");
      }

      if (!password) {
        setErrPass("You must enter password");
      } else {
        setErrPass("");
      }

      const user = await loginUser({ email, password });
      if (user.data.accessToken && user.data.isAdmin == true) {
        cookies.set("accessToken", user.data.accessToken, {path: "/"});
        cookies.set("id", user.data._id);
         navigate("/admin/index");
      } else {
        setErrName("Email or password incorrect!");
      }
    } catch (error) {
      console.log(error);
      setErrName("Email or password incorrect!");
    }
  };

  return (
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
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>

                  <Input
                    placeholder="Email"
                    type="email"
                    onChange={(e) => setemail(e.target.value)}
                    label="email"
                    autoComplete="new-email"
                  />
                </InputGroup>
                {errName != "" ? (
                  <div
                    style={{ fontFamily: "roboto" }}
                    className="error text-danger text-center"
                  >
                    {errName}
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
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
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
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  onClick={handleSubmit}
                  type="button"
                >
                  Sign in
                </Button>
                <div mt={3} mb={1} textAlign="center"></div>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a className="text-light" href="/auth/forgot">
              <small>Forgot password?</small>
            </a>
          </Col>
        </Row>
      </Col>
  );
};

export default Login;
