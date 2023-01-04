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
import { Image } from "antd";

// core components
import UserHeader from "components/Headers/UserHeader.js";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
import { USERS_BASE_URL, BASE_URL } from "config/networkConfigs";
import UserDetail from "./UserDetail";


const ProductDetail = ({ match }) => {
    const cookies = new Cookies();

    const [data, setData] = useState();
    const { productId } = useParams();

    async function fetchData() {
        try {
            const result = await axios.get(
                `${BASE_URL}/products/find/${productId}`,
                {
                    headers: {
                        Authorization: "Bearer " + cookies.get("accessToken"),
                    },
                }
            );
            setData(result.data);
        } catch (error) {

        }

    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            {data ? (
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
                                    <CardHeader className="bg-white border-0">Product detail</CardHeader>
                                    <CardBody>
                                        <Form>
                                            {/* {console.log(data.extraData)} */}
                                            <h6 className="heading-small text-muted mb-4">
                                                {data.title}
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
                                                                Title
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                Value={data.title}
                                                                readOnly
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-country"
                                                            >
                                                                Price
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                Value={data.price}
                                                                readOnly
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
                                                                Description
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                Value={data.desc}
                                                                readOnly
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-city"
                                                            >
                                                                Categories
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                Value={data.categories}
                                                                readOnly
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="6">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-country"
                                                            >
                                                                Sizes
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                Value={data.size.join(", ")}
                                                                readOnly
                                                            />
                                                        </FormGroup>
                                                    </Col>

                                                </Row>
                                                <Row>
                                                    <Col lg="3">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-city"
                                                            >
                                                                Sold
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                Value={data.sold}
                                                                readOnly
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="3">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-country"
                                                            >
                                                                Rating
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                Value={data.rating}
                                                                readOnly
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="3">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-country"
                                                            >
                                                                Like
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                Value={data.like}
                                                                readOnly
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col lg="3">
                                                        <FormGroup>
                                                            <label
                                                                className="form-control-label"
                                                                htmlFor="input-country"
                                                            >
                                                                Review Score
                                                            </label>
                                                            <Input
                                                                className="form-control-alternative"
                                                                Value={data.reviewscore}
                                                                readOnly
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col lg="12" className="center">
                                                            <Image.PreviewGroup>
                                                                <Image src={data.img} alt="Shoppe" border="0"  />
                                                            </Image.PreviewGroup>
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


export default ProductDetail;
