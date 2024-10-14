import React, { useState } from "react";
import RspCard from "./../rsp/RspCard";

const RspPage = () => {
  const [players, setPlayers] = useState([
    {
      id: 1,
      username: "당신",
      arrRsp: ["가위", "바위", "보"],
      img: "https://taegon.kim/wp-content/uploads/2018/05/image-5.png",
    },
    {
      id: 2,
      username: "심판",
      arrRsp: [],
      img: "https://taegon.kim/wp-content/uploads/2018/05/image-5.png",
    },
    {
      id: 3,
      username: "컴퓨터",
      arrRsp: ["랜덤생성"],
      img: "https://taegon.kim/wp-content/uploads/2018/05/image-5.png",
    },
  ]);

  const handleClick = (e) => {
    console.log("클릭 하였습니다.");
  };

  return (
    <main>
      <div className="container mt-5">
        <div className="row">
          <RspCard player={players[0]} onClick={handleClick}></RspCard>
          <RspCard player={players[1]} onClick={handleClick}></RspCard>
          <RspCard player={players[2]} onClick={handleClick}></RspCard>
        </div>
      </div>
    </main>
  );
};

export default RspPage;
