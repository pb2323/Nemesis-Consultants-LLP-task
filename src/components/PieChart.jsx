import React, { Component, createRef } from "react";
import axios from "axios";
import * as d3 from "d3";

class PieChart extends Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.createPie = d3
      .pie()
      .value((d) => d)
      .sort(null);
    this.createArc = d3.arc().innerRadius(0).outerRadius(200);
    this.colors = d3
      .scaleOrdinal()
      .domain([0, 22])
      .range(["red", "blue", "green", "orange", "violet", "pink"]);
    this.format = d3.format(".2f");
    this.state = {
      dataSet1: [],
      dataSet2: [],
    };
  }
  componentDidMount() {
    const data = axios("https://api.github.com/repositories/19438/issues");
    let dataArray = [];
    const app = this;
    data
      .then(function (result) {
        dataArray = result.data;
        let dataSet1 = [];
        let dataSet2 = [];
        for (let j in dataArray) {
          const title = dataArray[j].title;
          const comments = dataArray[j].comments;
          if (comments !== 0) {
            dataSet1.push(comments);
            dataSet2.push(title);
          }
        }
        app.setState({ dataSet1: dataSet1, dataSet2: dataSet2 });
      })
      .catch(function (err) {
        console.error(err);
      });
  }
  componentDidUpdate() {
    const svg = d3.select(this.ref.current);
    const data = this.createPie(this.state.dataSet1);
    for (let i in data) {
      data[i].title = this.state.dataSet2[i];
    }
    // console.log(data);
    svg.attr("class", "chart").attr("width", 700).attr("height", 600);
    const group = svg.append("g").attr("transform", "translate(350,350)");
    const groupWithEnter = group.selectAll("g.arc").data(data).enter();
    const path = groupWithEnter.append("g").attr("class", "arc");

    path
      .append("path")
      .attr("class", "arc")
      .attr("d", this.createArc)
      .attr("fill", (d, i) => this.colors(i))
      .append("title")
      .text((d) => d.title);
    path
      .append("text")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("transform", (d) => `translate(${this.createArc.centroid(d)})`)
      .style("fill", "white")
      .style("font-size", 10)
      .text((d) => {
        return d.data;
      });
    // svg.selectAll("g.arc").on("mouseenter", function () {
    //   console.log(this);
    //   // this.transition().style("background-color", "blue");
    // });
  }
  render() {
    if (this.state.dataSet1.length !== 0)
      return (
        <>
          <h1 style={{ textAlign: "center", marginTop: "5%" }}>
            Hi Micky, Have a good day :)
          </h1>
          <svg ref={this.ref} />
          <p>Hover over arc to view issue detail</p>
        </>
      );
    else return <h1>Loading..</h1>;
  }
}

export default PieChart;
