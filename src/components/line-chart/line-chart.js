import {h} from 'preact';
/** @jsx h */
import {useRef, useEffect, useCallback} from 'preact/hooks';
import * as d3 from 'd3';
import './line-chart.css';

export default function LineChart(props) {
  
  const {color, type, setSelectedCurrentDay} = props;
  const svgEl = useRef(null);
  const {data} = props;

  const margin = {top: 20, right: 10, bottom: 30, left: 60};
  const height = 270;
  const width = window.outerWidth - 32;

  const renderChart = useCallback(() => {
    if (data.length === 0) {
      return;
    }
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d[type])])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const x = d3
      .scaleUtc()
      .domain(d3.extent(data, d => d[0]))
      .range([margin.left, width - margin.right]);
     
    const yAxis = g => {
      return g
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select('.domain').remove());
    };
    const xAxis = g =>
      g
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(
          d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0),
            //.tickFormat(d3.timeFormat('%d %b')),
        )
        .attr('stroke', 'rgba(0,0,0,0.1)');
      
    const line = d3
      .line()
      .defined(d => !isNaN(d[type]))
      .x(d => x(d[0]))
      .y(d => y(d[type]));

    const chart = function() {
      const svg = d3.select(svgEl.current);
      svg.selectAll('*').remove();

      svg
        .append('g')
        .call(xAxis)
        .attr('class', 'xmain');

      svg
        .append('g')
        .call(yAxis)
        .attr('class', 'ymain');

      svg
        .append('g')
        .attr('class', 'grid')
        .call(
          d3
            .axisLeft(y)
            .tickSize(margin.right + margin.left - width)
            .tickFormat(''),
        )
        .attr('transform', `translate(${margin.left},0)`)
        .attr('stroke', 'rgba(0,0,0,0.1)')
        .call(g => g.select('.domain').remove());

      if (type === 1) {
        svg
          .append('path')
          .datum(data)
          .attr('fill', 'none')
          .attr('stroke', color.text)
          .attr('stroke-width', 3.5)
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('d', line);
      }

      if (type === 2) {
        const effectiveWidth = (width - margin.left - margin.right) / data.length - 1;
        svg
          .selectAll('.bar')
          .data(data)
          .enter()
          .append('rect')
          .attr('stroke', color.bg)
          .attr('fill', color.text)
          .attr('class', 'bar')
          .attr('x', function(d) {
            return x(d[0]);
          })
          .attr('y', function(d) {
            return y(d[2]);
          })
          .attr('width', effectiveWidth)
          .attr('transform', `translate(${-effectiveWidth},0)`)
          .attr('height', function(d) {
            return height - y(d[2]) - margin.bottom;
          });
      }

      function mouseMove() {
        const xm = d3.mouse(this)[0];
        const date = x.invert(xm);
        const bisectDate = d3.bisector(d => d[0]).left;
        const i = bisectDate(data, date, 1);
        setSelectedCurrentDay(i - data.length - 1);
      }

      function mouseOut() {
        setSelectedCurrentDay(-1);
      }

      svg
        .on('mousemove', mouseMove)
        .on('touchmove', mouseMove)
        .on('mouseout', mouseOut)
        .on('touchend', mouseOut);
    };

    chart();
  }, [props.data, type]);

  useEffect(() => {
    renderChart();
  }, [props.data, renderChart]);

  return <svg width={width} height={height} ref={svgEl} />;
}
