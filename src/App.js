import React from "react";
import "./App.css";
import CurrencyList from "./Components/CurrencyList";
import CryptoCalculator from "./Components/CryptoCalculator";
import StaticGraph from "./Components/StaticGraph";
import DynamicGraph from "./Components/DynamicGraph";

const App = props => {
  return (
    <div className="wrapper">
      <CurrencyList />
      <CryptoCalculator />
      <StaticGraph />
      <DynamicGraph />
    </div>
  );
};

export default App;
