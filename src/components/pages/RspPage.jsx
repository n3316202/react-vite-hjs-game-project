import React, { useState } from "react";
import RspCard from "./../rsp/RspCard";

const RspPage = () => {
  const [players, setPlayers] = useState([
    {
      id: 1,
      usename: "당신",
      arrRsp: ["가위", "바위", "보"],
      img: "https://taegon.kim/wp-content/uploads/2018/05/image-5.png",
    },
    {
      id: 2,
      usename: "심판",
      arrRsp: [],
      img: "https://taegon.kim/wp-content/uploads/2018/05/image-5.png",
    },
    {
      id: 3,
      usename: "컴퓨터",
      arrRsp: ["랜덤생성"],
      img: "https://taegon.kim/wp-content/uploads/2018/05/image-5.png",
    },
  ]);

  return (
    <main>
      <div className="container mt-5">
        <div className="row">
          <RspCard player={players[0]}></RspCard>
        </div>
      </div>
    </main>
  );
};

export default RspPage;
