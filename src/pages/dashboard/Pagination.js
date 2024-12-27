
import ReactPaginate from "react-paginate";
import "./pagination.css"
import Form from 'react-bootstrap/Form';



export default function PaginatedItems({ data,limit,setPage,setLimit,total }) {
 const pageCount=Math.ceil(total/limit)
   

  return (
    <div className="d-flex justify-content-end">
      {/* <input type="number" onChange={(e)=>setLimit(e.target.value)}/> */}
      <Form.Select onChange={(e)=>{setLimit(e.target.value);}} size={'sm'} style={{width:"fit-content"}}>
      
      <option isValid={false}>select limit</option>
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="10">10</option>
    </Form.Select>
      <div>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">>"
        onPageChange={(e)=>setPage(e.selected+1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex align-items-center justify-content-end"
        pageLinkClassName="pagination-tag-anchor mx-2 text-secondary  rounded-circle "
        activeLinkClassName="bg-primary text-white"
      />
      </div>
    </div>
  );
}
