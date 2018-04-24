d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json", function(data){
  
  //create array for x axis
  var secondsBehind = []
  //y axis
  var rank = [];
  data.forEach(function(item) {
    secondsBehind.push(item.Seconds - data[0].Seconds);
    rank.push(item.Place);
  });
  
  console.log(rank);
  
  var w = 600;
  var padding = 40;
  
  var svg = d3.select("#chart")
    .attr("width", w)
    .attr("height", w);
  
  var yScale = d3.scaleLinear()
    .domain([d3.min(rank), d3.max(rank)])
    .range([padding, w - padding]);
  
  var xScale = d3.scaleLinear()
    .domain([d3.max(secondsBehind), d3.min(secondsBehind)])
    .range([padding, w - padding]);
  
  var yAxis = d3.axisLeft(yScale);
  var xAxis = d3.axisBottom(xScale);
  
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding + ",0)")
    .call(yAxis)
  
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (w - padding) + ")")
    .call(xAxis)
  
});