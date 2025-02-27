import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';


//https://sample.bmaster.kro.kr/contacts?pageno=11&pagesize=10


const LegoReactComponentPagingnation = ({ paging, onClickPaging }) => {
  
  console.log(paging);

  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
};

export default LegoReactComponentPagingnation;
