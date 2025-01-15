import React, { useState } from "react";
import CharacterManager from "./components/CharacterManager";
import WeeklyBossManager from "./components/WeeklyBossManager";
import CrystalCalculator from "./components/CrystalCalculator";
import RandomJobPicker from "./components/RandomJobPicker";
import "./App.css";

const App = () => {
  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <div className="container">
      <CharacterManager />
      <WeeklyBossManager updateTotalPrice={setTotalPrice} />
      <CrystalCalculator totalPrice={totalPrice} />
      <RandomJobPicker />
    </div>
  );
};

export default App;
