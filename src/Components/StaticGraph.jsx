import React from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import subDays from "date-fns/sub_days";
import format from "date-fns/format";
import subMonths from "date-fns/sub_months";
import subYears from "date-fns/sub_years";

class StaticGraph extends React.Component {
  state = {
    labels: [],
    data: []
  };
  changeDuration = async e => {
    const result = [];
    const data = [];
    const currentDate = format(new Date(), "YYYY-MM-DD");
    switch (e.target.value) {
      case "day": {
        const apiResult = await axios.get(
          "https://min-api.cryptocompare.com/data/histohour?fsym=BTC&tsym=USD&limit=24"
        );
        apiResult.data.Data.map(item => {
          const time = new Date(item.time * 1000);
          const hour = time.getHours();
          result.push(hour + ":00");
          data.push(item.close);
          return null;
        });
        this.setState({ labels: result, data });
        break;
      }
      case "week": {
        const pastDate = format(subDays(new Date(), 7), "YYYY-MM-DD");
        const apiResult = await axios.get(
          `https://api.coindesk.com/v1/bpi/historical/close.json?start=${pastDate}&end=${currentDate}`
        );
        for (let key in apiResult.data.bpi) {
          result.push(key);
          data.push(apiResult.data.bpi[key]);
        }
        this.setState({ labels: result, data });
        break;
      }
      case "month": {
        const pastDate = format(subMonths(currentDate, 1), "YYYY-MM-DD");
        const apiResult = await axios.get(
          `https://api.coindesk.com/v1/bpi/historical/close.json?start=${pastDate}&end=${currentDate}`
        );
        for (let key in apiResult.data.bpi) {
          result.push(key);
          data.push(apiResult.data.bpi[key]);
        }
        this.setState({ labels: result, data });
        break;
      }
      case "year": {
        const pastDate = format(subYears(currentDate, 1), "YYYY-MM-DD");
        const apiResult = await axios.get(
          `https://api.coindesk.com/v1/bpi/historical/close.json?start=${pastDate}&end=${currentDate}`
        );
        for (let key in apiResult.data.bpi) {
          result.push(key);
          data.push(apiResult.data.bpi[key]);
        }
        this.setState({ labels: result, data });
        break;
      }
      default: {
        return;
      }
    }
  };
  render() {
    const data = {
      labels: this.state.labels,
      datasets: [
        {
          label: "Currency price",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.data
        }
      ]
    };

    return (
      <div className="static-graph">
        <h3>Bitcoin dynamic by period</h3>
        <select
          name=""
          onChange={this.changeDuration}
          className="static-graph__select"
        >
          <option value="">Select period</option>
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        <Line data={data} />
      </div>
    );
  }
}

export default StaticGraph;
