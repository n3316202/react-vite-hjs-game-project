import React, { useState } from "react";
import LottoBall from "./../lotto/LottoBall";

const LottoPage = () => {
  const setNumbers = () => {
    const lottoSet = new Set();

    while (lottoSet.size < 6) {
      let num = Math.floor(Math.random() * 45) + 1;
      lottoSet.add(num);
    }

    console.log(lottoSet);
    return Array.from(lottoSet);
  };

  const [nums, setNums] = useState(setNumbers);

  return (
    <div className="container">
      <div className="row mt-sm-5">
        {nums && nums.map((num) => <LottoBall lottoNum={num}></LottoBall>)}
      </div>
    </div>
  );
};

export default LottoPage;
