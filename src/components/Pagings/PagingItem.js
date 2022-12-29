import {
    PaginationItem,
    PaginationLink,
  } from "reactstrap";
  // core components
  import React from "react";
function PagingItem({currentPage,nextPage,action}){
    return  <PaginationItem className={nextPage==currentPage ? "active" : ""}>
    <PaginationLink
      href="#pablo"
      onClick={(e) => {
        action(nextPage-1)
      }}
    >
      {nextPage} <span className="sr-only">(current)</span>
    </PaginationLink>
  </PaginationItem>
  }
export default PagingItem;