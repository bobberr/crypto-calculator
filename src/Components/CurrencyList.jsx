import React from "react";
import axios from "axios";

class CurrencyList extends React.Component {
  state = { rates: [] };
  getRatesHandler = async e => {
    if (!e.target.value) {
      return;
    } else {
      const apiResult = await axios.get(
        `https://api.coinmarketcap.com/v2/ticker/?convert=${
          e.target.value
        }&limit=6&structure=array`
      );
      this.setState({
        rates: apiResult.data.data
      });
    }
  };
  render() {
    const rates = this.state.rates.map(rate => {
      return (
        <li className="currency-list__list-item" key={rate.id}>
          <span className="currency-list__list-item-name">{rate.name}</span>
          <span className="currency-list__list-item-price">
            {rate.quotes[this.currencyName.value].price}
          </span>
        </li>
      );
    });
    console.log(this.state);
    return (
      <div className="currency-list">
        <select
          onChange={this.getRatesHandler}
          ref={ref => {
            this.currencyName = ref;
          }}
          name="Currency name"
          className="currency-list__select"
        >
          <option value="" className="currency-list__select-option">
            Select currency
          </option>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="RUB">RUB</option>
        </select>
        <ul className="currency-list__list">{rates}</ul>
      </div>
    );
  }
}

export default CurrencyList;
