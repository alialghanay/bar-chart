import React from 'react';
import * as d3 from "d3";
import './bar.css';
import { transition } from 'd3';
export default class MyD3Component extends React.Component {
  constructor(props) {
    super(props);

    this.myReference = React.createRef();
  }

  componentDidMount() {
    this.update();
  }

  update() {
    const w = 1200;
    const h = 500;
    const padding = 50;
    
    const xScale = d3.scaleTime()
                     .domain([new Date(d3.min(this.props.data.data, (d) => d[0].substring(0, 4))), new Date(d3.max(this.props.data.data, (d) => d[0].substring(0, 4)))])
                     .range([padding, w - 60]);
    
    const yScale = d3.scaleLinear()
                     .domain([0, d3.max(this.props.data.data, (d) => d[1])])
                     .range([h - padding, padding]);


    let tooltip = d3.select('body')
                    .append('div')
                    .attr("id", "tooltip")
                    .style('visibility', 'hidden')
                    .style('width', 'auto')
                    .style('hight', 'auto');
                    
    const svg = d3.select(this.myReference.current)
                  .append('svg')
                  .attr('width', w)
                  .attr('height', h);
                svg.selectAll("rect")
                     .data(this.props.data.data.map(d => d))
                     .enter()
                     .append("rect")
                     .attr("x", (d, i) => padding + (i * 4))
                     .attr("y", (d, i) => (h - padding) - (d[1] / 45))
                     .attr("width", 2)
                     .attr("height", (d, i) => d[1] / 45)
                     .attr("class", "bar")
                     .attr('data-date', (d) => d[0])
                     .attr('data-gdp', (d) => d[1])
                     .on('mouseover', (d, i) => {
                       tooltip.transition()
                              .style('visibility', 'visible');
                       tooltip.text(`${i[0]}`);

                       document.querySelector('#tooltip').setAttribute('data-date', i[0]);
                     })
                     .on('mouseout', () => {
                       tooltip.transition()
                              .style('visibility', 'hidden')
                     });               
      
    const yAxis = d3.axisLeft(yScale);      
    const xAxis = d3.axisBottom(xScale);
          svg.append("g")
             .attr("transform", `translate(0, ${h - padding})`)
             .call(xAxis)
             .attr("id", "x-axis");
          svg.append("g")
             .attr("transform", `translate(${padding}, 0)`)
             .call(yAxis)
             .attr("id", "y-axis");
             svg.append("text")
             .attr("class", "x label")
             .attr("text-anchor", "end")
             .attr("x", w - padding)
             .attr("y", h - padding + 50)
             .text("Years");
             svg.append("text")
             .attr("class", "y label")
             .attr("text-anchor", "end")
             .attr("x",  0 - padding)
             .attr("y", padding + 25)
             .attr("transform", "rotate(-90)")
             .text("Gross Domestic Product");
  }
  

  render() {
    return (
      <div ref={this.myReference}>
      </div>
    );
  }
}