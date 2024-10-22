import React, { useEffect, useState } from "react";
import boardService from "../../services/BoardService";
import { Link } from "react-router-dom";
import Pagingnation from "../board/Pagingnation";
import axios from "axios";

const LegoListPage = () => {
  const url = "https://sample.bmaster.kro.kr/contacts?pageno=1&pagesize=10";
  const [boards, setBoards] = useState([]);

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
        console.log(response.data.contacts);
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
            <hr />
          </div>
        </div>
      </div>
    </div>
    // <!-- /.container-fluid -->);
  );
};

export default LegoListPage;
