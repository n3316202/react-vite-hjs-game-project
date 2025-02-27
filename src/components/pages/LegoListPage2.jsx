import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";

// 프로젝트마다 용어는 달라질 수 있다
// offset -> start
// limit -> size

// 페이지네이션 구현
// 🧨🧨🧨 순서
// 접속 URL : "list?offset=10&limit=10"
// -> URL의 정보를 useSearchParams() 훅 이용해서 가져오고
// -> offset과 limit 변수에 값을 저장해줌
// -> fetch에 백엔드 API 호출하는 _start와 _limit의 값으로 위 두 변수 값을 넣어주고
// -> 불러온 값을 posts state에 저장한다.
// -> posts 데이터를 이용해서 map 리렌더링!!

const LegoListPage2 = () => {
  
  const [state, setState] = useState({
    contacts: [],
    limit: 10,
    activePage: 1,
    prev : function(){}, //< 표시시

  });

  //https://sample.bmaster.kro.kr/contacts?pageno=11&pagesize=10
  //https://sample.bmaster.kro.kr/contacts?pageno=1&pagesize=10
  useEffect(  () => {
    console.log(`${state.limit}`)
    console.log(typeof state.contacts)
    
    axios
      .get(
        `https://sample.bmaster.kro.kr/contacts?pageno=1&pagesize=${state.limit}`
      )
      .then((response) => {
        console.log(response)

        setState((prev) => ({
          ...prev,
          contacts: response.data.contacts
        }));
      })
      .catch((error) => console.log(error));
  }, [state.limit]);


  const handlePageChange = (pageNumber) => {

    console.log(pageNumber)    
    console.log(typeof pageNumber)
    
    setState((prev) => ({ ...prev, activePage: pageNumber }));

    axios
      .get(`https://sample.bmaster.kro.kr/contacts?pageno=${pageNumber}&pagesize=${state.limit}`)
      .then((res) => {
        console.log(res)

        setState((prev) => ({
          ...prev,
          contacts: res.data.contacts
        }));

      })
      .catch((error) => console.log(error));
  };

  //크게 3가지 부분으로 나눔
  //
  return (
    <>
      <div className="App">
        <h2 className="mt-5 px-4">React Bootstrap pagination example</h2>

        <ul className="list-group p-4">
          {state.contacts.map((item) => {
            return (
              <li key={item.no} className="list-group-item">
                <span className="font-weight-bold pr-2">{item.name}.</span>{" "}
                {item.tel}
              </li>
            );
          })}
        </ul>

        <Pagination className="px-4">
          {
           state.contacts.map((_, index) => {
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
  )
}

export default LegoListPage2;
