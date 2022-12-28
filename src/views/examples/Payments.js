import {
  Card,
  CardFooter,
  Table,
  Row,
  Pagination,
  PaginationItem,
  PaginationLink,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Container
} from "reactstrap";

import { Link } from "react-router-dom";
import Header from "components/Headers/Header.js";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import {NumberFormatBase} from 'react-number-format';
import { PAYMENTS_BASE_URL } from "config/networkConfigs";
const Payments = () => {
  const [data, setData] = useState({ payments: [] });
  const [data1, setData1] = useState({ payments: [] });
  const [next, setNext] = useState(false);
  const cookies = new Cookies();
  useEffect(async () => {
    async function loadPayments(){
      const result = await axios.get(
        PAYMENTS_BASE_URL,
        {
          headers: {
            Authorization: "Bearer " + cookies.get("accessToken"),
          },
        }
      );
      setData(result.data);
      console.log(result.data.payments);

    }
    loadPayments();
  }, []);

  useEffect(async () => {
    const result = await axios.get(
      `${PAYMENTS_BASE_URL}?offset=2`,
      {
        headers: {
          Authorization: "Bearer " + cookies.get("accessToken"),
        },
      }
    );
    setData1(result.data);
    console.log(result.data);
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}

        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Deposit</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Order Id
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Amount
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Message
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      User Name
                    </th>
                    <th scope="col" style={{ fontSize: "13px"}}>
                      <i className="ni ni-settings-gear-65"></i>
                    </th>
                  </tr>
                </thead>
                <tbody>{!next?(data.payments.map((item) => (
                    <tr>
                      <th scope="row">
                        {item.orderId}
                      </th>
                      <td>
                      <NumberFormatBase value={item.amount} displayType={'text'} thousandSeparator={true}/> VND</td>
                      <td>{item.message}</td>
                      <td>{item.username}</td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <Link
                                to={"/admin/payment/" + item.id}
                                className="edit-link"
                              >
                                <i className="fas fa-eye" /> View detail
                              </Link>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))):(data1.payments.map((item) => (
                    <tr>
                      <th scope="row">
                        {item.orderId}
                      </th>
                      <td>
                      <NumberFormatBase value={item.amount} displayType={'text'} thousandSeparator={true}/> VND</td>
                      <td>{item.message}</td>
                      <td>{item.username}</td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => e.preventDefault()}
                            >
                              <Link
                                to={"/admin/payment/" + item.id}
                                className="edit-link"
                              >
                                <i className="fas fa-eye" /> View detail
                              </Link>
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  )))}
                  
                </tbody>
              </Table>
              {data.payments.length>10?(<CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className={!next?"active":""}>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => { setNext(false);}}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className={next?"active":""}>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => {
                          setNext(true);
                        }}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.nextPage()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>):("")}
              
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Payments;
