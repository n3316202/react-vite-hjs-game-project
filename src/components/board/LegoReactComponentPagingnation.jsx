import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';


//https://sample.bmaster.kro.kr/contacts?pageno=11&pagesize=10

//https://sample.bmaster.kro.kr/contacts?pageno=3&pagesize=5

// {
//   "pageno": 3,
//   "pagesize": 5,
//   "totalcount": 119,
//   "contacts": [
//   {
//   "no": "676215d6fc77aa0007f4d0a4",
//   "name": "aaa",
//   "tel": "010-1111-2222",
//   "address": "NY",
//   "photo": "https://sample.bmaster.kro.kr/photos/noimage"
//   },
//   {
//   "no": "67466ae002d77900079ad85e",
//   "name": "111",
//   "tel": "1223",
//   "address": "33",
//   "photo": "https://sample.bmaster.kro.kr/photos/noimage"
//   },
//   {
//   "no": "67466ab502d77900079ad85a",
//   "name": "222",
//   "tel": "333",
//   "address": "444",
//   "photo": "https://sample.bmaster.kro.kr/photos/noimage"
//   },
//   {
//   "no": "67466aad02d77900079ad856",
//   "name": "111",
//   "tel": "222",
//   "address": "333",
//   "photo": "https://sample.bmaster.kro.kr/photos/noimage"
//   },
//   {
//   "no": "67466aa402d77900079ad852",
//   "name": "111",
//   "tel": "222",
//   "address": "333",
//   "photo": "https://sample.bmaster.kro.kr/photos/noimage"
//   }
//   ]
//   }

{/* <Pagination
// 현제 보고있는 페이지 
    activePage={1}
// 한페이지에 출력할 아이템수
  itemsCountPerPage={5}
// 총 아이템수
  totalItemsCount={300}
// 표시할 페이지수
    pageRangeDisplayed={5}
// 함수
  onChange={handlePageChange}>
</Pagination> */}

const LegoReactComponentPagingnation = () => {
  
  


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
