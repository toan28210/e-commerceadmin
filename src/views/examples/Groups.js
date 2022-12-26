import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Row,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Input,
  InputGroup,
  Container,
  Col,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
import ToggleButton from "react-toggle-button";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/Avatar";
import dateFormat from "dateformat";

const Groups = () => {
  const cookies = new Cookies();
  const [data, setData] = useState({ groups: [] });
  const [data1, setData1] = useState({ groups: [] });
  const [next, setNext] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(async () => {
    const result = await axios.get(
      "http://192.53.114.191:3001/api/groups",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    setData(result.data);
    console.log(result.data.groups);
  }, []);

  const onToggle = (id) => {
    console.log(id);
    return axios.post(
      "https://web-be-brmc9.ondigitalocean.app/api/group/" + id + "/block",
      null,
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  React.useEffect(() => {
    const results = data.groups.filter(({ subject }) =>
      subject.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

  useEffect(async () => {
    const result = await axios.get(
      "http://192.53.114.191:3001/api/groups?offset=2",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    setData1(result.data);
    console.log(result.data.groups);
  }, []);

  return (
    <div>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}

        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <Row>
                  <Col lg="6">
                    <CardHeader className="bg-transparent border-0">
                      <h3 className="text-white mb-0">Groups</h3>
                    </CardHeader>
                  </Col>
                  <Col lg="6">
                    <FormGroup className="mb-0">
                      <InputGroup
                        className="input-group-alternative"
                        style={{
                          width: "75%",
                          marginTop: "10px",
                          marginLeft: "20%",
                        }}
                      >
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fas fa-search" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Search"
                          type="text"
                          value={searchTerm}
                          onChange={handleChange}
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark ">
                  <tr>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Visible
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Avatar
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Group Name
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Status
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Subject
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Number of users
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Number of posts
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Created At
                    </th>
                    {/* <th scope="col" style={{ fontSize: "13px" }}>
                      <i className="ni ni-settings-gear-65"></i>
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {next? (searchTerm
                      ? searchResults.map((item, index) => (
                          <Render key={index} item={item} onToggle={onToggle} />
                        ))
                      : data1.groups.map((item) => (
                          <Render
                            item={item}
                            key={item.id}
                            onToggle={onToggle}
                          />
                        ))
                  ): (searchTerm
                    ? searchResults.map((item, index) => (
                        <Render key={index} item={item} onToggle={onToggle} />
                      ))
                    : data.groups.map((item) => (
                        <Render item={item} key={item.id} onToggle={onToggle} />
                      )))}
                </tbody>
              </Table>
              <CardFooter className="py-4">
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
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

function Render({ item, onToggle }) {
  const [toggle, setToggle] = useState(!item.blocked);
  return (
    <tr>
      <th>
        <ToggleButton
          value={toggle}
          onClick={() => {
            onToggle(item.id);
            setToggle(!toggle);
          }}
        />
        {toggle == !false ? <span>Active</span> : <span>Block</span>}
      </th>
      <td>
        <Avatar alt="..." src={item.avatar} />
      </td>
      <td scope="row">
        <span className="mb-0 text-sm">{item.group_name}</span>
      </td>
      <td>
        {item.private == false ? <span>Public</span> : <span>Private</span>}
      </td>
      <td>{item.subject}</td>
      <td>
        {item.user_id.length}
        {/* {
          (item.user_id.length === 0 ? (
            "0"
          ) : (
            <AvatarGroup total={item.user_id.length}>
              {item.user_id.map((ite) => (
                <Avatar/>
              ))}
            </AvatarGroup>
          ))
        } */}
      </td>
      <td>{item.posts.length}</td>
      <td>{new Date(item.createdAt).toLocaleDateString("en-US")}</td>
    </tr>
  );
}

export default Groups;
