import { Link } from "react-router-dom";
import Pagination from 'react-bootstrap/Pagination';
import { useEffect, useState } from "react";
import axios from "axios";

//https://codesandbox.io/p/sandbox/react-bootstrap-pagination-example-tpgtb?file=%2Fsrc%2FApp.js

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

const LegoReactComponentPagingnation = ({paging}) => {
  console.log(paging);
  // 3가지를 고려 해야됨

  const [state, setState] = useState({
    data: [],
    limit: 10,
    activePage: 1
  });

  //https://sample.bmaster.kro.kr/contacts?pageno=11&pagesize=10
  useEffect(  () => {
    axios
      .get(
        `https://sample.bmaster.kro.kr/contacts?pageno=1&pagesize=${state.limit}`
      )
      .then((res) => {
        setState((prev) => ({
          ...prev,
          data: res.data
        }));
      })
      .catch((error) => console.log(error));
  }, [state.limit]);


  const handlePageChange = (pageNumber) => {
    setState((prev) => ({ ...prev, activePage: pageNumber }));

    axios
      .get(`https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&pagesize=${state.limit}`)
      .then((res) => {
        setState((prev) => ({
          ...prev,
          data: res.data
        }));
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
    <div className="App">
      <h2 className="mt-5 px-4">React Bootstrap pagination example</h2>

      <ul className="list-group p-4">
        {state && state.data.map((item) => {
          return (
            <li key={item.id} className="list-group-item">
              <span className="font-weight-bold pr-2">{item.id}.</span>{" "}
              {item.title}
            </li>
          );
        })}
      </ul>

      <Pagination className="px-4">
        {state && state.data.map((_, index) => {
          return (
            <Pagination.Item
              onClick={() => handlePageChange(index + 1)}
              key={index + 1}
              active={index + 1 === state.activePage}
            >
              {index + 1}
            </Pagination.Item>
          );
        })}
      </Pagination>
    </div>
    </>
  );

  // return (
  //   <Pagination>
  //     <Pagination.First />
  //     <Pagination.Prev />
  //     <Pagination.Item>{1}</Pagination.Item>
  //     <Pagination.Ellipsis />

  //     <Pagination.Item>{10}</Pagination.Item>
  //     <Pagination.Item>{11}</Pagination.Item>
  //     <Pagination.Item active>{12}</Pagination.Item>
  //     <Pagination.Item>{13}</Pagination.Item>
  //     <Pagination.Item disabled>{14}</Pagination.Item>

  //     <Pagination.Ellipsis />
  //     <Pagination.Item>{20}</Pagination.Item>
  //     <Pagination.Next />
  //     <Pagination.Last />
  //   </Pagination>
  // );
};

export default LegoReactComponentPagingnation;
