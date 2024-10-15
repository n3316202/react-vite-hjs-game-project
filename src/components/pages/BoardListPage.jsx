import React, { useEffect, useState } from "react";
import boardService from "../../services/BoardService";

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
    boardService.getPagingList().then((response) => {
      console.log(response);
    });
  };

  return <div>게시판 실행</div>;
};

export default BoardListPage;
