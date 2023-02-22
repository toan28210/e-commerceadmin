import { useState, useEffect } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Pie, Bar, Doughnut } from "react-chartjs-2";
import { ORDERS_BASE_URL } from "config/networkConfigs";
import { headerAuthInterceptor } from 'config/headerIntercepter.js';

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
  const [dailySalesData, setDailySalesData] = useState(null);
  const [orders, setOrdersData] = useState(
    {
      labels: [],
      datasets: [
        {
          label: 'Network error',
          data: [],
          fill: false,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.4)",
          borderWidth: 1,
        },
      ],
    }
  );

  const [chartData, setChartData] = useState( {
    labels: [],
    datasets: [
      {
        label: 'Network error',
        data: [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        borderWidth: 1,
      },
    ],
  });
  useEffect(() => {
    const fetchDailySalesData = async () => {
      try {
        const res = await axios.get(ORDERS_BASE_URL,{
          headers: headerAuthInterceptor(),
        });
        const orders = res.data;

        // Group orders by day and sum the amount for each day
        const dailySales = orders.reduce((acc, order) => {
          const date = new Date(order.createdAt).toLocaleDateString();
          if (!acc[date]) {
            acc[date] = order.amount;
          } else {
            acc[date] += order.amount;
          }
          return acc;
        }, {});
        const sortedOrders = orders.reduce((acc,order)=>{ 
          acc[order._id] = order.amount;
          return acc;
           },{});
        const recentOrders = Object.keys(sortedOrders)
          .slice(-7)
          .sort((a, b) => a - b);
        // Get the last 7 days
        const last7Days = Object.keys(dailySales)
          .slice(-7)
          .sort((a, b) => new Date(a) - new Date(b));
        const last7orders = {
          labels: recentOrders,
          datasets: [
            {
              label: 'Recent orders',
              data: recentOrders.map((day) =>  sortedOrders[day]|| 0),
              fill: false,
              borderColor: "rgba(75,192,192,1)",
              backgroundColor: "rgba(75,192,192,0.4)",
              borderWidth: 1,
            },
          ],
        }

        // Create the chart data
        const data = {
          labels: last7Days,
          datasets: [
            {
              label: "Daily Evenue",
              data: last7Days.map((day) => dailySales[day] || 0),
              fill: false,
              backgroundColor: [ 'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'],
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        };
        setOrdersData(last7orders);
        setDailySalesData(dailySales);
        setChartData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDailySalesData();
  }, []);


// Iterate over each order in the array
// orders.forEach(order => {
//     // Get the date of the order and format it to a human-readable string
//     const orderDate = new Date(order.createdAt);
//     const humanDate = orderDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
//     // If the map doesn't have an entry for the current day, set the sum to the current order's amount
//     // Otherwise, add the current order's amount to the existing sum for the day
//     if (!orderMap.has(humanDate)) {
//         orderMap.set(humanDate, order.amount);
//     } else {
//         orderMap.set(humanDate, orderMap.get(humanDate) + order.amount);
//     }
// });

// const last7Days = Array.from(orderMap.entries())
//     .slice(-7)
//     .map(entry => entry[1]);


  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  
  
  // const data = {
  //   labels: Order.groups.map((o) => o.group_name),
  //   datasets: [
  //     {
  //       label: "Users",
  //       fill: false,
  //       lineTension: 0.0,
  //       backgroundColor: "#c45850",
  //       borderColor: "rgb(41, 33, 116,0.5)",
  //       pointHitRadius: 20,
  //       data: Order.groups.map((o) => parseFloat(o.user_id.length)),
  //     },
  //   ],
  // };
  // const data1 = {
  //   labels: Order.groups.map((o) => o.group_name),

  //   datasets: [
  //     {
  //       label: "Users",
  //       fill: false,
  //       lineTension: 0.0,
  //       backgroundColor: [
  //         "#8e5ea2",
  //         "#3cba9f",
  //         "#e8c3b9",
  //         "#c45850",
  //         "#F473B9",
  //         "#F4FCD9",
  //         "#C5D8A4",
  //         "#BB9981",
  //         "#534340",
  //         "#3e95cd",
  //         "#1B1A17",
  //         "#F0A500",
  //         "#E45826",
  //         "#E6D5B8",
  //       ],
  //       borderColor: "rgb(41, 33, 116,0.5)",
  //       pointHitRadius: 20,
  //       data: Order.groups.map((o) => parseFloat(o.posts.length)),
  //     },
  //   ],
  // };

  // async function getGroups() {
  //   return await axios.get(
  //     "`${BASE_URL}/groups?offset=1&limit=50",
  //     {
  //       headers: {
  //         Authorization: "Bearer " + cookies.get("accessToken"),
  //       },
  //     }
  //   );
  // }
  // async function getPaymentOut() {
  //   return await axios.get(
  //     "`${BASE_URL}/paymentOuts",
  //     {
  //       headers: {
  //         Authorization: "Bearer " + cookies.get("accessToken"),
  //       },
  //     }
  //   );
  // }
  // async function getPayment() {
  //   return await axios.get(
  //     "`${BASE_URL}/payments",
  //     {
  //       headers: {
  //         Authorization: "Bearer " + cookies.get("accessToken"),
  //       },
  //     }
  //   );
  // }
  // useEffect(async () => {
    // const groups = (await getGroups()).data;
    // setGroup(groups);

    // const payment = (await getPayment()).data.payments;
    // setPayment(payment);

    // const paymentOuts = (await getPaymentOut()).data.payments;
    // setPaymentOut(paymentOuts);

    // const arrRange = payment.map((v) =>
      // new Date(v.createdAt).toLocaleDateString("en-US")
    // );
  //   let dateArray = [];
  //   arrRange.map((v, i, arr) => {
  //     if (!dateArray.includes(v)) dateArray.push(v);
  //   });
  //   setDateRange(dateArray);

  //   const dataChart = dateArray.map((v) => {
  //     const arrayAmount = payment
  //       .filter(
  //         (item) => new Date(item.createdAt).toLocaleDateString("en-US") == v
  //       )
  //       .map((value) => Number(value.amount));

  //     const sumPayment = arrayAmount.reduce((prev, current) => prev + current);
  //     const arrayAmountOut = paymentOuts
  //       .filter(
  //         (item) => new Date(item.createdAt).toLocaleDateString("en-US") == v
  //       )
  //       .map((value) => Number(value.amount));
  //     const sumPaymentOut = arrayAmountOut.reduce(
  //       (prev, current) => prev + current,
  //       0
  //     );
  //     return { in: sumPayment, out: sumPaymentOut };
  //   });
  //   setDataChart(dataChart);
  // }, []);

  // const deviceSaleData = {
  //   labels: dateRange.map((item) => item),

  //   datasets: [
  //     {
  //       label: "Income",
  //       data: dataChart.map((o) => o.in),
  //       backgroundColor: "#a461d8",
  //       borderColor: "#a461d8",
  //       borderWidth: 1,
  //       fill: false,
  //     },
  //     {
  //       label: "Outcome",
  //       data: dataChart.map((o) => o.out),
  //       // dataChart.map((o) => o.out),
  //       backgroundColor: "#fc5a5a",
  //       borderColor: "#fc5a5a",
  //       borderWidth: 1,
  //       fill: false,
  //     },
  //   ],
  // };
  return (
    <>
      <Header />
      {/* Page content */}
      {/* {console.log(Order)}
      {!Order ? (
        <div>Loading</div>
      ) :  */}
      (
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
                          Statistics of revenue for last 7 days
                        </h3>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    Chart
                    <div className="chart">
                      <Bar
                        height={10}
                        options={chartOptions}
                        data={chartData}
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
                          Current orders
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
                        data={orders}
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
                          Statistics of the number of posts in each order.
                        </h3>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    {/* Chart */}
                    <div className="chart">
                      {/* <Doughnut
                        height={1}
                        options={{
                          maintainAspectRatio: false,
                        }}
                        data={data1}
                      /> */}
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
      )
      {/* } */}
    </>
  );
};

export default Dashboard;
