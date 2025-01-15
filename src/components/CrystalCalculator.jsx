import React from "react";

const CrystalCalculator = ({ totalPrice }) => {
  return (
    <div className="crystal-calculator">
      <h2>총 결정석 가격</h2>
      <p>{totalPrice.toLocaleString()} 메소</p>
    </div>
  );
};

export default CrystalCalculator;
