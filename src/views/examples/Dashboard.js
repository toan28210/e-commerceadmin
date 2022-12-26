import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Pie, Bar, Doughnut } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import Header from "components/Headers/Header.js";

const Dashboard = (props) => {
  const cookies = new Cookies();
  const [Group, setGroup] = useState({ groups: [] });
  const [Payment, setPayment] = useState({ payments: [] });
  const [PaymentOut, setPaymentOut] = useState({ payments: [] });
  const [dateRange, setDateRange] = useState([]);
  const [amount, setAmount] = useState(0);
  const [amount1, setAmount1] = useState(0);
  const [dataChart, setDataChart] = useState([]);

  console.log("amount", amount);

  const data = {
    labels: Group.groups.map((o) => o.group_name),

    datasets: [
      {
        label: "Users",
        fill: false,
        lineTension: 0.0,
        backgroundColor: "#c45850",
        borderColor: "rgb(41, 33, 116,0.5)",
        pointHitRadius: 20,
        data: Group.groups.map((o) => parseFloat(o.user_id.length)),
      },
    ],
  };
  const data1 = {
    labels: Group.groups.map((o) => o.group_name),

    datasets: [
      {
        label: "Users",
        fill: false,
        lineTension: 0.0,
        backgroundColor: [
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
          "#F473B9",
          "#F4FCD9",
          "#C5D8A4",
          "#BB9981",
          "#534340",
          "#3e95cd",
          "#1B1A17",
          "#F0A500",
          "#E45826",
          "#E6D5B8",
        ],
        borderColor: "rgb(41, 33, 116,0.5)",
        pointHitRadius: 20,
        data: Group.groups.map((o) => parseFloat(o.posts.length)),
      },
    ],
  };

  async function getGroups() {
    return await axios.get(
      "http://192.53.114.191:3001/api/groups?offset=1&limit=50",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
  }
  async function getPaymentOut() {
    return await axios.get(
      "http://192.53.114.191:3001/api/paymentOuts",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
  }
  async function getPayment() {
    return await axios.get(
      "http://192.53.114.191:3001/api/payments",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
  }
  useEffect(async () => {
    const groups = (await getGroups()).data;
    setGroup(groups);

    const payment = (await getPayment()).data.payments;
    setPayment(payment);

    const paymentOuts = (await getPaymentOut()).data.payments;
    setPaymentOut(paymentOuts);

    const arrRange = payment.map((v) =>
      new Date(v.createdAt).toLocaleDateString("en-US")
    );
    let dateArray = [];
    arrRange.map((v, i, arr) => {
      if (!dateArray.includes(v)) dateArray.push(v);
    });
    setDateRange(dateArray);

    const dataChart = dateArray.map((v) => {
      const arrayAmount = payment
        .filter(
          (item) => new Date(item.createdAt).toLocaleDateString("en-US") == v
        )
        .map((value) => Number(value.amount));

      const sumPayment = arrayAmount.reduce((prev, current) => prev + current);
      const arrayAmountOut = paymentOuts
        .filter(
          (item) => new Date(item.createdAt).toLocaleDateString("en-US") == v
        )
        .map((value) => Number(value.amount));
      const sumPaymentOut = arrayAmountOut.reduce(
        (prev, current) => prev + current,
        0
      );
      return { in: sumPayment, out: sumPaymentOut };
    });
    setDataChart(dataChart);
  }, []);

  const deviceSaleData = {
    labels: dateRange.map((item) => item),

    datasets: [
      {
        label: "Income",
        data: dataChart.map((o) => o.in),
        backgroundColor: "#a461d8",
        borderColor: "#a461d8",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Outcome",
        data: dataChart.map((o) => o.out),
        // dataChart.map((o) => o.out),
        backgroundColor: "#fc5a5a",
        borderColor: "#fc5a5a",
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  return (
    <>
      <Header />
      {/* Page content */}
      {console.log(Group)}
      {!Group ? (
        <div>Loading</div>
      ) : (
        <>
          <Container className="mt--7" fluid>
            <Row className="mt-5">
              <Col className="mb-5 mb-xl-0">
                <Card className="bg-gradient-default shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-light ls-1 mb-1">
                          Overview
                        </h6>
                        <h3 className="text-white mb-0">
                          Statistics of depositCoins and withdraw money every day.
                        </h3>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      <Bar
                        height={10}
                        options={{
                          maintainAspectRatio: false,
                        }}
                        data={deviceSaleData}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="8">
                <Card className="bg-gradient-default shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-light ls-1 mb-1">
                          Overview
                        </h6>
                        <h3 className="text-white mb-0">
                          Statistics of the number of users in each group.
                        </h3>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      <Bar
                        height={10}
                        options={{
                          maintainAspectRatio: false,
                        }}
                        data={data}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col xl="4">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                          Performance
                        </h6>
                        <h3 className="mb-0">
                          Statistics of the number of posts in each group.
                        </h3>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      <Doughnut
                        height={1}
                        options={{
                          maintainAspectRatio: false,
                        }}
                        data={data1}
                      />
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            {/* <Row className="mt-5">
              <Col className="mb-5 mb-xl-0" xl="8">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Page visits</h3>
                      </div>
                      <div className="col text-right">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          See all
                        </Button>
                      </div>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
              <Col xl="4">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <Row className="align-items-center">
                      <div className="col">
                        <h3 className="mb-0">Social traffic</h3>
                      </div>
                      <div className="col text-right">
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          size="sm"
                        >
                          See all
                        </Button>
                      </div>
                    </Row>
                  </CardHeader>
                </Card>
              </Col>
            </Row> */}
          </Container>
        </>
      )}
    </>
  );
};

export default Dashboard;
