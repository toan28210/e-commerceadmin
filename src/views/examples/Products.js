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
import { BASE_URL } from "config/networkConfigs";
import { PRODUCTS_BASE_URL } from "config/networkConfigs";
import PagingListItem from "components/Pagings/PaginListItem";
import ProductModel from "components/Models/ProductModel";
import {   IconButton } from "@mui/material";
import Button from 'react-bootstrap/Button';
const Products = () => {
  const [remoteData,setRemoteData] = useState({ products: [] })
  const [data, setData] = useState({ products: [] });
  const [currentProduct,setCurrentProduct] = useState({});
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const [data1, setData1] = useState({ payments: [] });
  const [next, setNext] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [page,setPage] = useState(0);
  const [searchResults, setSearchResults] = useState([]);
  const [isEdit,setIsEdit] = useState(false);
  const cookies = new Cookies();
  const RECORD_PER_PAGE = 15;

  function handleCreate(){
    handleOpen();
    setCurrentProduct();
    setIsEdit(false);
  }
  function handleEdit(product){
    handleOpen();
    setCurrentProduct(product);
    setIsEdit(true);

  }
  async function handleDelete(id){
    try {
      const result = await axios.delete(
        `${PRODUCTS_BASE_URL}/${id}`,
        {
          headers: {
            Authorization: "Bearer " + cookies.get("accessToken"),
          },
        }
      );
      loadProducts();
    } catch (error) {

    }
  }
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
  async function loadProducts() {
    try {
      const result = await axios(
        PRODUCTS_BASE_URL,
        {
          headers: {
            Authorization: "Bearer " + cookies.get("accessToken"),
          },
        }
      );
      setRemoteData({ products: [...result.data]});
      setData({products:paging(page,result.data)})
    } catch (error) {

    }
  }
  useEffect(() => {
    loadProducts();

  }, []);

  // useEffect(async () => {
  //   const result = await axios.get(
  //     `${BASE_URL}/posts?offset=2`,
  //     {
  //       headers: {
  //         Authorization: "Bearer " + cookies.get("accessToken"),
  //       },
  //     }
  //   );
  //   setData1(result.data);
  //   console.log(result.data);
  // }, []);

  const onToggle = (id) => {
    console.log(id);
    axios.post(
      `${BASE_URL}/product/id/block`,
      null,
      {
        headers: {
          Authorization: "Bearer " + cookies.get("accessToken"),
        },
      }
    );
  };
  useEffect(()=>{
    setData({products:paging(page)})
  },[page])

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // useEffect(() => {
  //   const results = data.posts.filter(({ content }) =>
  //     content.toLowerCase().includes(searchTerm)
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
                    <h3 className="text-white mb-0">Products</h3>
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
                    <Button onClick={handleCreate} className="mr-3" variant="primary">Add Product</Button>
                      <ProductModel product ={currentProduct} open={open} handleClose={handleClose} isEdit={isEdit}/>
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
                      Action
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      ID
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Title
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Categories
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Price
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Color
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Des
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      In Stock
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Image
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Size
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Sold
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Rating
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Like
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Review Score
                    </th>
                    <th scope="col" style={{ fontSize: "13px" }}>
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {next
                    ?searchTerm
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
                      ))} */}
                  {
                    data && data.products && data.products.length >0 ? data.products.map((item) => (
                      <Render item={item} key={item.id} onToggle={onToggle} handleDelete={handleDelete} handleEdit={handleEdit} />
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
                      <PagingListItem totalRecords = {remoteData.products.length} recordPerPage = {RECORD_PER_PAGE} currentPage={page} action={setPage}/>
                      <PaginationItem className={page+1 >= (remoteData.products.length/RECORD_PER_PAGE) ? "disabled" :""} >
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

function Render({ item, onToggle,handleEdit,handleDelete }) {
  // const [toggle, setToggle] = useState(!item.blocked);
  const vidRef = useRef(null);
  const handlePlayVideo = () => {
    vidRef.current.play();
  };
  return (
    <tr>
      <td scope="row">
        <IconButton key={"eidt"+item._id} className="fa fa-edit" color="warning" onClick={()=>{handleEdit(item)}} />
        <IconButton key={"delete"+item._id} className="fa fa-trash" color="error"  onClick={()=>{handleDelete(item._id)}} /> 
      </td>
      <td scope="row">
        <span className="mb-0 text-sm">{item._id}</span>
      </td>
      <td scope="row" >
        <span className="mb-0 text-sm" >{item.title}</span>
      </td>
      <td scope="row">
        <span className="mb-0 text-sm">{item.categories.length ? item.categories.join(", ") : ""}</span>
      </td>
      <td scope="row">
        <span className="mb-0 text-sm">{item.price}</span>
      </td>
      <td scope="row">
        <span className="mb-0 text-sm">{item.color.length ? item.color.join(", ") : ""}</span>
      </td>
      <td scope="row">
        <span className="mb-0 text-sm">{item.desc}</span>
      </td>
      <td scope="row">
        <span className="mb-0 text-sm">{item.inSock ? "YES" : "NO"}</span>
      </td>
      <td>
        <p>
          <Image.PreviewGroup>
            <Image src={item.img} alt="Shoppe" border="0" width={"150px"} />
          </Image.PreviewGroup>
        </p>
      </td>
      <td scope="row">
        <span className="mb-0 text-sm">{item.size.length ? item.size.join(", ") : ""}</span>
      </td>
      <td scope="row">
        <span className="mb-0 text-sm">{item.sold}</span>
      </td>
      <td scope="row">
        <span className="mb-0 text-sm">{item.rating}</span>
      </td>
      <td scope="row">
        <span className="mb-0 text-sm">{item.like}</span>
      </td>
      <td scope="row">
        <span className="mb-0 text-sm">{item.reviewscore.toFixed(2)}/5.0</span>
      </td>
      <td scope="row" >
        <span className="mb-0 text-sm">{new Date(item.createdAt).toLocaleDateString("en-US")}</span>
      </td>
    </tr>
  );
}




export default Products;
