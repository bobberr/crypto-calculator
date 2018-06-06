import React from "react";
import "./App.css";
import CurrencyList from "./Components/CurrencyList";
import CryptoCalculator from "./Components/CryptoCalculator";

const App = props => {
  return (
    <div className="wrapper">
      <CurrencyList />
      <CryptoCalculator />
    </div>
  );
};

export default App;
