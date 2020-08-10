import d3 from 'd3';

const height = 500;
const width = 500;

const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1);



