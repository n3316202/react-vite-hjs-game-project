import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";
import LegoReactComponentPagingnation from "../board/LegoReactComponentPagingnation";


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

const LegoListPage = () => {
  
  const REQUEST_URL = 'https://sample.bmaster.kro.kr/contacts'

  let initPaging = {
    // ✔ 화면에 보여질 페이지 그룹
    // ✔ 화면에 보여질 첫번째 페이지
    // ✔ 화면에 보여질 마지막 페이지
    // ✔ 총 페이지 수
    startPage: 1,
    endPage: 10,
    total: 0,
    prev: false,
    next: false,
    pageNum: 1,
    amount: 10, //고정
  };

  const [boards, setBoards] = useState([]);
  const [paging, setPaging] = useState(initPaging);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log("use Effective 실행");
    initBoards();
  }, []);

  const initBoards = (pageno = "1", pagesize = "10") => {
    setSearchParams(REQUEST_URL);

    searchParams.set("pageno", pageno);
    searchParams.set("pagesize", pagesize);
    setSearchParams(searchParams);
    
    console.log(searchParams.toString())
    
    let url = REQUEST_URL +  searchParams.toString();
    
    console.log(url)

    axios
      .get(url)
      .then((response) => {
        console.log(response);
        setBoards(response.data.contacts);

        initPaging.pageNum = response.data.pageno;
        initPaging.total = response.data.totalcount;
        initPaging.endPage = initPaging.total / response.data.pagesize;
        initPaging.startPage = 1; //endPage - 9;

        setPaging(initPaging);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteBoard = (e) => {
    const { name, value } = e.target;
    console.log(name + "::" + value);

    setBoards(boards.filter((board) => board.no !== value));
  };

  const onClickPaging = (e) => {
    e.preventDefault(); // 기존에 링크 동작을 하지 말아라
    console.log(e.target.text);
    initBoards(e.target.text);
  };

  return (
    <div className="container mt-3">
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">게시판</h1>
        <p className="mb-4">
          DataTables is a third party plugin that is used to generate the demo
          table below. For more information about DataTables, please visit the{" "}
          <a target="_blank" href="https://datatables.net">
            official DataTables documentation
          </a>
          .
        </p>

        {/* <!-- DataTales Example --> */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              DataTables Example
            </h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr>
                    <th>번호</th>
                    <th>이름</th>
                    <th>전화번호</th>
                    <th>주소</th>
                    <th>사진</th>
                    <th className="text-center">삭제</th>
                  </tr>
                </thead>

                <tbody>
                  {boards &&
                    boards.map((board) => (
                      <tr key={board.no}>
                        <td>{board.no}</td>
                        <td>{board.name}</td>
                        <td>{board.tel}</td>

                        <td>{board.address}</td>
                        <td>
                          <img src={board.photo} alt="" />
                        </td>
                        <td className="text-center">
                          <button
                            className="btn btn-success"
                            value={board.no}
                            onClick={deleteBoard}
                          >
                            삭제
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* 페이징           */}
            {paging != null ? (
              <LegoReactComponentPagingnation
                paging={paging}
                onClickPaging={onClickPaging}
              ></LegoReactComponentPagingnation>
            ) : null}

            <hr />
          </div>
        </div>
      </div>
    </div>
    // <!-- /.container-fluid -->);
  );
};

export default LegoListPage;
