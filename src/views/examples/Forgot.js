
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
import NewPass from "./NewPass";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/img/brand/shopee-logo-1589778324075-1477812832.jpg';
import { BASE_URL } from "config/networkConfigs";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [nextStep, setStep] = useState(false);
  const history = useNavigate();

  async function sendCode(email) {
    return axios.post(
      `${BASE_URL}/sendmailForget`,
      { email: email }
    );
  }
  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      const user = await sendCode(email);
      console.log(email);
      console.log(user.data.email);
      if (user.data.email === email) {
        setStep(true);
        alert("Please check your email to receive a new password.")
      } else {
        if(user.data.email !== email)
        setErrEmail("Please enter email!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {nextStep ? (
        <NewPass email={email} />
      ) : (
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
              <div className="text-center text-muted mb-4">
                <small>Enter your valid email to reset password!</small>
              </div>
        
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="e.social@example.com"
                      type="email"
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                      autoComplete="new-email"
                    />
                  </InputGroup>
                  {errEmail != "" ? (
                  <div style={{fontFamily: 'roboto'}} className="error text-danger text-center">{errEmail}</div>
                ) : (
                  ""
                )}
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
      )}
    </>
  );
};

export default Forgot;
