
// import {
//     Badge,
//     Card,
//     CardHeader,
//     DropdownMenu,
//     DropdownItem,
//     UncontrolledDropdown,
//     DropdownToggle,
//     Table,
//     Container,
//     Row,
//   } from "reactstrap";
//   // core components
//   import Header from "components/Headers/Header.js";
//   import { useEffect, useState} from 'react';
//   import axios from "axios";
//   import React from "react";


//   const Videos = () => {
//     const [data, setData] = useState({ videos: [] });
  
//     useEffect(async () => {
//       const result = await axios(
//         '`${BASE_URL}/videos',
//       );
//       setData(result.data);
//       console.log(data.videos);
//     }, []);

//     // const onDelete = (id) => {
//     //     axios.delete(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData/${id}`)
//     //   }

//     return (
//       <div>
//         <Header />
//         {/* Page content */}
//         <Container className="mt--7" fluid>
//           {/* Table */}
  
//           {/* Dark table */}
//           <Row className="mt-5">
//             <div className="col">
//               <Card className="bg-default shadow">
//                 <CardHeader className="bg-transparent border-0">
//                   <h3 className="text-white mb-0">Card tables</h3>
//                 </CardHeader>
//                 <Table
//                   className="align-items-center table-dark table-flush"
//                   responsive
//                 >
//                   <thead className="thead-dark">
//                     <tr>
//                       <th scope="col">Content</th>
//                       <th scope="col">post_id</th>
//                       <th scope="col">user_id</th>
//                       <th scope="col">visible</th>
//                       <th scope="col">Create at</th>
//                       <th scope="col">Update at</th>
//                       <th scope="col" />
//                     </tr>
//                   </thead>
//                   <tbody>
//                   {data.videos.map((item) =>( 
//                     <tr>
//                       <th scope="row" key={item.id}>
//                         <span className="mb-0 text-sm">
//                            {item.content}
//                         </span>content
//                       </th>
//                       <td>{item.post_id}</td>
//                       <td>{item.user_id}</td>
                  
//                       <td>
//                       {item.visible}
//                       </td> 
//                       <td>
//                         {item.createdAt}
//                       </td>
//                       <td>
//                         {item.updatedAt}
//                       </td>
//                       <td className="text-right">
//                         <UncontrolledDropdown>
//                           <DropdownToggle
//                             className="btn-icon-only text-light"
//                             href="#pablo"
//                             role="button"
//                             size="sm"
//                             color=""
//                             onClick={(e) => e.preventDefault()}
//                           >
//                             <i className="fas fa-ellipsis-v" />
//                           </DropdownToggle>
//                           <DropdownMenu className="dropdown-menu-arrow" right>
//                             <DropdownItem
//                               href="#pablo"
                          
//                             >
//                               Delete
//                             </DropdownItem>
//                             <DropdownItem
//                               href="#pablo"
//                               onClick={(e) => e.preventDefault()}
//                             >
//                               Another action
//                             </DropdownItem>
//                             <DropdownItem
//                               href="#pablo"
//                               onClick={(e) => e.preventDefault()}
//                             >
//                               Something else here
//                             </DropdownItem>
//                           </DropdownMenu>
//                         </UncontrolledDropdown>
//                       </td>
//                     </tr>
//                     ))} 
//                   </tbody>
//                 </Table>
//               </Card>
//             </div>
//           </Row>
//         </Container>
//       </div>
//     );
//   };
  
//   export default Videos ;
  