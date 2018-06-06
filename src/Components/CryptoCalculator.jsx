import React from "react";
import axios from "axios";

class CryptoCalculator extends React.Component {
  state = {
    amount: 0,
    currencyForChange: "Bitcoin",
    resultCurrency: "USD",
    resultValue: 0,
    apiResult: []
  };
  componentWillMount = async () => {
    const apiResult = await axios.get(
      "https://api.coinmarketcap.com/v2/ticker/?limit=6&structure=array"
    );
    this.setState({ apiResult: apiResult.data.data });
  };
  changeHandler = (value, e) => {
    this.setState({ [value]: e.target.value });
  };
  exchangeHandler = async e => {
    e.preventDefault();
    const currencyId = this.state.apiResult.filter(currency => {
      return currency.name === this.state.currencyForChange;
    })[0].id;
    const apiResult = await axios.get(
      `https://api.coinmarketcap.com/v2/ticker/${currencyId}/?convert=${
        this.state.resultCurrency
      }`
    );
    const resultAmount =
      apiResult.data.data.quotes[this.state.resultCurrency].price *
      this.state.amount;
    this.setState({
      resultValue: resultAmount.toFixed(3)
    });
  };

  render() {
    const currencyOptions = this.state.apiResult.map(currency => {
      return (
        <option key={currency.id} value={currency.name}>
          {currency.name}
        </option>
      );
    });
    return (
      <div className="calculator">
        <h3 className="calculator__header">
          Cryptocurrency Converte Calculator
        </h3>
        <form className="calculator__form">
          <input
            type="number"
            value={this.state.amount}
            onChange={this.changeHandler.bind(null, "amount")}
            className="calculator__input calculator-value"
          />
          <div className="flex-wrapper">
            <select
              name="Currency for exchange"
              onChange={this.changeHandler.bind(null, "currencyForChange")}
              ref={ref => {
                this.currencyForChange = ref;
              }}
              className="calculator__input"
            >
              {currencyOptions}
            </select>
            <button
              type="submit"
              onClick={this.exchangeHandler}
              className="calculator__exchange-button"
            >
              Exchange
            </button>
            <select
              name="Result currency"
              onChange={this.changeHandler.bind(null, "resultCurrency")}
              className="calculator__input"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="RUB">RUB</option>
            </select>
          </div>
          <div className="flex-wrapper">
            <span className="calculator__currency-name">
              {this.state.amount} {this.state.currencyForChange}
            </span>
            <span className="calculator__currency-name">
              {this.state.resultValue} {this.state.resultCurrency}
            </span>
          </div>
        </form>
      </div>
    );
  }
}

export default CryptoCalculator;
