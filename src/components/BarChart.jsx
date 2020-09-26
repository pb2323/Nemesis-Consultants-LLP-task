import React from "react";
import axios from "axios";
import * as d3 from "d3";
class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSet: [],
    };
  }

  componentDidMount = () => {
    const data = axios("https://api.github.com/repositories/19438/issues");
    let dataArray = [];
    const app = this;
    data
      .then(function (result) {
        dataArray = result.data;
        for (let j in dataArray) {
          const time = dataArray[j].updated_at;
          const comments = dataArray[j].comments;
          dataArray[j] = { time: time, comments: comments };
        }
        app.setState({ dataSet: dataArray });
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  componentDidUpdate() {
    let dataArray = this.state.dataSet;
    let dict = {};
    for (let i in dataArray) {
      if (dataArray[i].comments === 0) continue;
      if (dict[dataArray[i].time])
        dict[dataArray[i].time] += dataArray[i].comments;
      else dict[dataArray[i].time] = dataArray[i].comments;
    }
    const dataset = [];
    for (let i in dict) dataset.push({ updated_at: i, comments: dict[i] });
    const w = 1200;
    const h = 300;
    const svg = d3
      .select(this.refs.chart)
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .attr("class", "bar");
    svg
      .selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .attr("fill", "navy")
      .attr("class", "sBar")
      .attr("x", (d, i) => i * 50)
      .attr("y", (d, i) => {
        return h - 20 * d.comments;
      })
      .attr("width", 40)
      .attr("height", (d, i) => 20 * d.comments)
      .append("title")
      .text((d) => d.updated_at);

    svg
      .selectAll("text")
      .data(dataset)
      .enter()
      .append("text")
      .style("font-size", 18)
      .attr("fill", "red")
      .attr("x", (d, i) => i * 50)
      .attr("y", (d, i) => h - 20 * d.comments - 3)
      .text((d) => d.comments);
  }
  render() {
    const styles = {
      container: {
        display: "grid",
        justifyItems: "center",
      },
    };
    if (this.state.dataSet.length !== 0)
      return (
        <>
          <div ref="chart" style={styles.container}>
            <h1 style={{ textAlign: "center" }}>Hi John, Have a good day :)</h1>
          </div>
          <div>
            <p>x-axis - updated-At</p>
            <p>y-axis - comments</p>
            <p>Hover to see x-axis values</p>
          </div>
        </>
      );
    else return <h1>Loading...</h1>;
  }
}
export default BarChart;
