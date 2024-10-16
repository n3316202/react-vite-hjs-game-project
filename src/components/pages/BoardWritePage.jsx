import React, { useState } from "react";
import boardService from "../../services/BoardService";

const BoardWritePage = () => {
  const initBoardState = {
    bname: "홍길동",
    btitle: "안녕하세요",
    bcontent: "안녕하세요",
  };

  const [board, setBoard] = useState(initBoardState);

  const saveBoard = () => {
    let data = {
      banme: board.bname,
      btitle: board.btitle,
      bcontent: board.bcontent,
    };

    boardService
      .write(data)
      .then((respose) => {
        console.log(respose);
      })
      .catch((error) => {
        console.log(error);
      });

    /* axios 글 저장 */
  };

  return <div>글작성</div>;
};

export default BoardWritePage;
