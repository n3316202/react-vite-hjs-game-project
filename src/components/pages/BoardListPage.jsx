import React, { useEffect, useState } from "react";
import boardService from "../../services/BoardService";
import { Link } from "react-router-dom";

const BoardListPage = () => {
  const [boards, setBoards] = useState([]);

  // 정리하면 아래와 같다.

  // useEffect(() => {
  //   // 매 렌더링마다 실행
  // });

  // useEffect(() => {
  //   // 컴포넌트가 처음 렌더링된 실행
  // }, []);

  // useEffect(() => {
  //   // 컴포넌트가 처음 렌더링된 이후 실행
  //   // a나 b가 변경되어 컴포넌트가 재렌더링된 이후 실행
  // }, [a, b]);

  useEffect(() => {
    console.log("use Effective 실행");
    initBoards();
  }, []);

  const initBoards = () => {
    boardService
      .getPagingList()
      .then((response) => {
        console.log(response);
        setBoards(response.data.boards);
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
                    <th>제목</th>
                    <th>날짜</th>
                    <th>히트</th>
                    <th className="text-center">삭제</th>
                  </tr>
                </thead>

                <tbody>
                  {boards &&
                    boards.map((board) => (
                      <tr key={board.bid}>
                        <td>{board.bid}</td>
                        <td>{board.bname}</td>

                        <td>
                          <Link to={"/board/" + board.bid}>{board.btitle}</Link>
                        </td>

                        <td>{board.bdate}</td>
                        <td>{board.bhit}</td>
                        <td className="text-center">
                          <button
                            className="btn btn-success"
                            value={board.bid}
                            // onClick={deleteBoard}
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
            {/* <PaginationB5
            paging={paging}
            onClickPaging={onClickPaging}
          ></PaginationB5> */}
            <hr />
            <Link to="/boards/write">
              <button type="button" className="btn btn-primary">
                글쓰기
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    // <!-- /.container-fluid -->);
  );
};

export default BoardListPage;
