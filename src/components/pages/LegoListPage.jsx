import React, { useEffect, useState } from "react";
import boardService from "../../services/BoardService";
import { Link } from "react-router-dom";
import axios from "axios";
import LegoPagingnation from "../board/LegoPagingnation";

const LegoListPage = () => {
  const url = "https://sample.bmaster.kro.kr/contacts?pageno=1&pagesize=10";

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

  useEffect(() => {
    console.log("use Effective 실행");
    initBoards();
  }, []);

  const initBoards = () => {
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

    let url =
      "https://sample.bmaster.kro.kr/contacts?pageno=" +
      e.target.text +
      "&pagesize=10";
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
              <LegoPagingnation
                paging={paging}
                onClickPaging={onClickPaging}
              ></LegoPagingnation>
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
