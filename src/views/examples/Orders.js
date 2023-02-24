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
import ToggleButton from "react-toggle-button";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/Avatar";
import dateFormat from "dateformat";
import { headerAuthInterceptor } from 'config/headerIntercepter.js';
import { ORDERS_BASE_URL,BASE_URL } from "config/networkConfigs";
import PagingListItem from "components/Pagings/PaginListItem";
import { Link } from "react-router-dom";
import { PRODUCTS_BASE_URL } from "config/networkConfigs";

const Orders = () => {
  const [remoteData,setRemoteData] = useState({ orders: [] });
  const [data, setData] = useState({ orders: [] });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page,setPage] = useState(0);
  const [currentOrder,setCurrentOrder] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isEdit,setIsEdit] = useState(false);
  const RECORD_PER_PAGE = 15;

  function paging(numberOfPage,source = []){
    source = source && source.length > 0?source:remoteData.orders;
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
  async function loadOrders(){
    const result = await axios.get(
      `${ORDERS_BASE_URL}`,
      {
        headers: headerAuthInterceptor(),
      }
    );
    setRemoteData({ orders: [...result.data]});
    setData({orders:paging(page,result.data)});
  }
  useEffect( () => {
    try {
      loadOrders();
    } catch (error) {
      
    } 
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // React.useEffect(() => {
  //   const results = data.groups.filter(({ subject }) =>
  //     subject.toLowerCase().includes(searchTerm)
  //   );
  //   setSearchResults(results);
  // }, [searchTerm]);

  // useEffect(async () => {
  //   const result = await axios.get(
  //     "`${BASE_URL}/groups?offset=2",
  //     {
  //       headers: {
  //         headers: headerAuthInterceptor(),
  //       },
  //     }
  //   );
  //   setData1(result.data);
  //   console.log(result.data.groups);
  // }, []);
  function handleCreate(){
    handleOpen();
    setCurrentOrder({});
    setIsEdit(false);
  }
  function handleEdit(product){
    handleOpen();
    setCurrentOrder(product);
    setIsEdit(true);

  }
  async function handleDelete(id){
    try {
      const result = await axios.delete(
        `${ORDERS_BASE_URL}/${id}`,
        {
          headers: {
            Authorization: headerAuthInterceptor(),
          },
        }
      );
      loadOrders();
    } catch (error) {

    }
  }
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
                      <h3 className="text-white mb-0">Orders</h3>
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
                      Status
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Amount
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Address
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Product
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      User Id
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
                    {  data && data.orders && data.orders.length >0 ? data.orders.map((item) => (
                      <Render item={item} key={item.id}  handleDelete={handleDelete} handleEdit={handleEdit} />
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
                      <PagingListItem totalRecords = {remoteData.orders.length} recordPerPage = {RECORD_PER_PAGE} currentPage={page} action={setPage}/>
                      <PaginationItem className={page+1 >= (remoteData.orders.length/RECORD_PER_PAGE) ? "disabled" :""} >
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
  const {products,userId} = item;
  return (
    <tr>
      <td>
      {item.status}
      </td>
      <td>
        {item.amount}
      </td>
      <td scope="row">
        <span className="mb-0 text-sm">{item.address?`${item.address.addressStreet}, ${item.address.address}`:""}</span>
      </td>
      <td>{products?products.map((e)=><p><span>Quantity:{e.quantity};</span> <Link to={`/admin/products/${e.productId}`}>ProductID:{e.productId} </Link> </p>):""}</td>
      <td>{userId?<p><Link to={`/admin/user/${userId}/info`}>userId: {userId}</Link> </p>:""}</td>
      <td>{new Date(item.createdAt).toLocaleDateString("en-US")}</td>
    </tr>
  );
}

export default Orders;
