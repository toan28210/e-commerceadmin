import {
  Card,
  CardHeader,
  Table,
  Row,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Container,
  Col,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import React from "react";
import ToggleButton from "react-toggle-button";
import Cookies from "universal-cookie";
import { Image } from "antd";
import "antd/dist/antd.css";

const Posts = () => {
  const [data, setData] = useState({ posts: [] });
  const [data1, setData1] = useState({ payments: [] });
  const [next, setNext] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const cookies = new Cookies();
  useEffect(async () => {
    const result = await axios(
      "http://192.53.114.191:3001/api/posts",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    setData(result.data);
    console.log(result.data);
  }, []);

  useEffect(async () => {
    const result = await axios.get(
      "http://192.53.114.191:3001/api/posts?offset=2",
      {
        headers: {
          Authorization: "Bearer " + cookies.get("token"),
        },
      }
    );
    setData1(result.data);
    console.log(result.data);
  }, []);

  const onToggle = (id) => {
    console.log(id);
    axios.post(
      "http://192.53.114.191:3001/api/post/" + id + "/block",
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
    const results = data.posts.filter(({ content }) =>
      content.toLowerCase().includes(searchTerm)
    );
    setSearchResults(results);
  }, [searchTerm]);

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
              <Row>
                <Col lg="6">
                  <CardHeader className="bg-transparent border-0">
                    <h3 className="text-white mb-0">Posts</h3>
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
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Visible
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Username
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Status
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Title
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Content
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Images
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Videos
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Created At
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Votes
                    </th>
                    {/* <th scope="col" style={{fontSize: '13px'}}>
                      <i className="ni ni-settings-gear-65"></i>
                    </th> */}
                  </tr>
                </thead>
                <tbody>
                  {next
                    ? searchTerm
                      ? searchResults.map((item, index) => (
                          <Render key={index} item={item} onToggle={onToggle} />
                        ))
                      : data1.posts.map((item) => (
                          <Render
                            item={item}
                            key={item.id}
                            onToggle={onToggle}
                          />
                        ))
                    : searchTerm
                    ? searchResults.map((item, index) => (
                        <Render key={index} item={item} onToggle={onToggle} />
                      ))
                    : data.posts.map((item) => (
                        <Render item={item} key={item.id} onToggle={onToggle} />
                      ))}
                </tbody>
              </Table>
              {data.posts.length >= 10 ? (
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
                      <PaginationItem className={!next ? "active" : ""}>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => {
                            setNext(false);
                          }}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className={next ? "active" : ""}>
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
              ) : (
                ""
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

function Render({ item, onToggle }) {
  const [toggle, setToggle] = useState(!item.blocked);
  const vidRef = useRef(null);
  const handlePlayVideo = () => {
    vidRef.current.play();
  };
  return (
    <tr>
      <th scope="row" key={item}>
        <ToggleButton
          value={toggle}
          onClick={() => {
            onToggle(item.id);
            setToggle(!toggle);
          }}
        />
        {toggle == !false ? <span>Active</span> : <span>Block</span>}
      </th>
      <th scope="row">
        <span className="mb-0 text-sm">{item.username}</span>
      </th>
      <td>
        {item.private == false ? <span>Public</span> : <span>Private</span>}
      </td>
      <th scope="row">
        <span className="mb-0 text-sm">{item.title}</span>
      </th>
      <td  style={{ width: 100 }}>{item.content}</td>
      <td>
        {item.images.map((ite) => (
          <p>
            <Image.PreviewGroup>
              <Image src={ite} alt="E-social" border="0" width={"150px"}>
                {console.log(ite)}
              </Image>
            </Image.PreviewGroup>
          </p>
        ))}
      </td>
      <td>
        {item.videos.map((ite) => (
          <p>
            <video ref={vidRef} controls width="150px">
              <source src={ite} border="0" />
            </video>
            {/* <button onClick={handlePlayVideo}>
                Play!
              </button> */}
          </p>
        ))}
      </td>
      <td>{new Date(item.createdAt).toLocaleDateString("en-US")}</td>
      <td>{item.votes}</td>
      {/* <td className="text-right">
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
            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              Delete
            </DropdownItem>
            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              Another action
            </DropdownItem>
            <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              Something else here
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td> */}
    </tr>
  );
}

export default Posts;
