import React, { useEffect, useState } from "react";
import boardService from "../../services/BoardService";
import { Navigate } from "react-router-dom";

const BoardUpdatePage = () => {
  const initBoardState = {
    bname: "",
    btitle: "",
    bcontent: "",
  };

  const [board, setBoard] = useState(initBoardState);

  //redirect를 위한 처리

  const [submitted, setSubmitted] = useState(false);

  //처음 랜더링 하고, 한번만 타라
  //useEffect(() => {
  //  saveBoard();
  //}, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBoard({ ...board, [name]: value });
  };

  const saveBoard = () => {
    let data = {
      bname: board.bname,
      btitle: board.btitle,
      bcontent: board.bcontent,
    };

    console.log(data);

    boardService
      .write(data)
      .then((respose) => {
        console.log(respose);
        setSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
      });

    /* axios 글 저장 */
  };

  return submitted ? (
    <Navigate to={{ pathname: "/boards" }} />
  ) : (
    <div>
      <div className="container mt-3">
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center mt-3">업데이트도 할수 있어요</h3>
              <div className="card-body">
                <div className="form-group">
                  <label> Type </label>
                  <select placeholder="type" className="form-control">
                    <option value="1">자유게시판</option>
                    {/* <option value="2">질문과 답변</option> */}
                  </select>
                </div>
                <div className="form-group mt-3">
                  <label> Name </label>
                  <input
                    type="text"
                    placeholder="이름을 넣으시오"
                    name="bname"
                    className="form-control"
                    value={board.bname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3">
                  <label> Title </label>
                  <input
                    placeholder="제목을 넣으시오."
                    name="btitle"
                    className="form-control"
                    value={board.btitle}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group mt-3 mb-3">
                  <label> Content </label>

                  <textarea
                    placeholder="내용을 적으시오"
                    name="bcontent"
                    className="form-control"
                    value={board.bcontent}
                    onChange={handleInputChange}
                    rows="10"
                  />
                </div>
                <button className="btn btn-success" onClick={saveBoard}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardUpdatePage;
