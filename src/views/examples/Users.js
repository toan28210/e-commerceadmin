import {
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Row,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Container,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Col,
} from "reactstrap";

import { Link } from "react-router-dom";
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Cookies from "universal-cookie";
import ToggleButton from "react-toggle-button";
import Avatar from "@mui/material/Avatar";
import dateFormat from "dateformat";
import { USERS_BASE_URL } from "config/networkConfigs";
import PagingListItem from "components/Pagings/PaginListItem";

const Users = () => {
  const [data, setData] = useState({ users: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [data1, setData1] = useState({ payments: [] });
  const [next, setNext] = useState(false);
  const [remoteData,setRemoteData] = useState({ users: [] });
  const [page,setPage] = useState(0);
  const cookies = new Cookies();
  function paging(numberOfPage,source = []){
    source = source && source.length > 0?source:remoteData.products;
    if(!source.length >0){
      return []
    }
    const maxIndex = source.length;
    const recordPerPage = 15;
    const currentLastIndex = numberOfPage * recordPerPage;
    const lastIndex = (currentLastIndex+recordPerPage)<maxIndex?(currentLastIndex+recordPerPage):maxIndex
    if(recordPerPage >= maxIndex ){
      return source;
    }
    if(currentLastIndex > maxIndex ){
      return [];
    }
    return source.slice(currentLastIndex,lastIndex)
  }
  useEffect( () => {
    async function loadUsers(){
      try{
        const result = await axios(
          USERS_BASE_URL,
          {
            headers: {
              Authorization: "Bearer " + cookies.get("accessToken"),
            },
          }
        );
        setRemoteData({ users: [...result.data]});
        setData({ users:paging(page,result.data)});

      }catch{
          console.log("error");
      }
    }
    loadUsers();
  }, []);

  // useEffect(async () => {
  //   try{
  //     const result = await axios.get(
  //       USERS_BASE_URL+"?offset=2",
  //       {
  //         headers: {
  //           Authorization: "Bearer " + cookies.get("accessToken"),
  //         },
  //       }
  //     );
  //     setData1(result.data);
  //     console.log(result.data);
  //   }catch{

  //   }
    
  // }, []);

  const onToggle = (id) => {
    console.log(id);
    return axios.post(
      `${USERS_BASE_URL}/id/block` ,
      null,
      {
        headers: {
          Authorization: "Bearer " + cookies.get("accessToken"),
        },
      }
    );
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // useEffect(() => {
  //   const results = data.users.filter(({ username }) =>
  //     username.toLowerCase().includes(searchTerm)
  //   );
  //   setSearchResults(results);
  // }, [searchTerm]);

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
                    <h3 className="text-white mb-0">Users</h3>
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
                id="table-to-xls"
                className="align-items-center table-dark table-flush"
                responsive
                // toolbar={{'PdfExport'}}
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Active
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Avatar
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Name
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Email
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Permission
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Created at
                    </th>
                  </tr>
                </thead>
                <tbody>
                {
                    data && data.users && data.users.length ? data.users.map((item) => (
                      <Render item={item} key={item.id} onToggle={onToggle} />
                    )) : <tr scope="row"> <td> Data is empty </td>  </tr>
                  }
                </tbody>
              </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                  <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className={page == 0 ? "disabled" :""}>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => setPage(page-1)}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PagingListItem totalRecords = {remoteData.users.length} recordPerPage = {15} currentPage={page} action={setPage}/>
                      <PaginationItem className={page+1 >= (remoteData.users.length/15) ? "disabled" :""} >
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => setPage(page+1)}
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
        <Avatar alt="..." src={item.avatar} />
      </th>
      <td>{item.username}</td>
      <td>{item.email}</td>
      <td>{item.isAdmin?"Admin":"Normal user"}</td>
      <td>{new Date(item.createdAt).toLocaleDateString("en-US")}</td>
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
            <DropdownItem href={"/admin/user/" + item._id + "/info"} onClick={(e) => e.preventDefault()}>
              <Link
                to={"/admin/user/" + item._id + "/info"}
                className="edit-link"
              >
                <i className="fas fa-eye" /> View detail
              </Link>
            </DropdownItem>
            {/* <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              <Link
                to={"/admin/user/" + item.id + "/info"}
                className="edit-link"
              >
                <i className="fas fa-edit" /> Edit
              </Link>
            </DropdownItem> */}
            {/* <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
              Something else here
            </DropdownItem> */}
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
    </tr>
  );
}

export default Users;
