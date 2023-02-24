
  import PagingItem from "./PagingItem";

function PagingListItem({totalRecords,recordPerPage = 15,currentPage,action} ){
    if(totalRecords == 0 ) return <> </>
    const lastPage = (totalRecords%recordPerPage==0)? totalRecords/recordPerPage: totalRecords/recordPerPage+1;
    console.log(lastPage);
    if(lastPage < 10){
      return range(1,Math.floor(lastPage)).map(n=><PagingItem currentPage={currentPage+1} nextPage = {n}  action={action} />)
    }else{
      return [...range(1,9),Math.floor(lastPage)].map(n=><PagingItem currentPage={currentPage+1} nextPage = {n} action={action} />)
    }
  }
  function range(_start_, _end_) {
    return (new Array(_end_ - _start_ + 1)).fill(undefined).map((_, k) =>k + _start_);
    }

export default PagingListItem;