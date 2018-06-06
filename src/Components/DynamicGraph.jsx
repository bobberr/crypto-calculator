import React from "react";
import { Line } from "react-chartjs-2";
import Websocket from "react-websocket";
import format from "date-fns/format";
import throttle from "lodash/throttle";

class DynamicGraph extends React.Component {
  state = {
    labels: [],
    data: []
  };
  handleData = data => {
    let result = JSON.parse(data);
    const time = format(new Date(result.timestampms), "YYYY-MM-DD HH:mm:ss");
    const price = result.events[0].price;
    const labelsCopy = [...this.state.labels];
    const dataCopy = [...this.state.data];
    if (this.state.labels.length !== 20 && this.state.data.length !== 20) {
      labelsCopy.push(time);
      dataCopy.push(price);
      this.setState({ labels: labelsCopy, data: dataCopy });
    } else {
      labelsCopy.shift();
      dataCopy.shift();
      labelsCopy.push(time);
      dataCopy.push(price);
      this.setState({ labels: labelsCopy, data: dataCopy });
    }
  };
  throttledUpdate = throttle(this.handleData, 5000);
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
      <div className="dynamic-graph">
        <h3 className="dynamic-graph__title">Current Bitcoin Dynamic</h3>
        <Line data={data} />
        <Websocket
          url="wss://api.gemini.com/v1/marketdata/btcusd"
          onMessage={this.throttledUpdate}
        />
      </div>
    );
  }
}

export default DynamicGraph;
