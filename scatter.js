d3.json("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json", function(data){
  
  //create array for rider/time data
  var riders = []
  data.forEach(function(item) {
    riders.push([
      item.Seconds - data[0].Seconds,
      item.Place
    ])
  });
  //get fastest time
  var fastest = data[0].Seconds
  
  var w = 800;
  var h = 600;
  var padding = {
    top: 40,
    bottom: 40,
    left: 40,
    right: 90
  };
  
  var svg = d3.select("#chart")
    .attr("width", w)
    .attr("height", h);
  
  var yScale = d3.scaleLinear()
    .domain([d3.min(riders, function(d) {
      return d[1];
    }), d3.max(riders, function(d) {
      return d[1];
    }) + 1]) //prevents bottom label clashing with x axis
    .range([padding.top, h - padding.bottom]);
  
  var xScale = d3.scaleLinear()
    .domain([d3.max(riders, function(d) {
      return d[0];
    }), d3.min(riders, function(d) {
      return d[0];
    })])
    .range([padding.left, w - padding.right]);
  
  var yAxis = d3.axisLeft(yScale);
  var xAxis = d3.axisBottom(xScale);
  
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + padding.left + ",0)")
    .call(yAxis)
  
  svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(0," + (h - padding.bottom) + ")")
    .call(xAxis)
  
svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d){
      return xScale(d.Seconds - fastest);
    })
    .attr("cy", function(d){
      return yScale(d.Place);
    })
    .attr("r", 5)
    .attr("fill", function(d){
      if (d.Doping) {
        return "red";
      } else {
        return "black";
      }
    });
  
  //using forEach as enter() is not working on all data?
  //(see enter() function below)
  data.forEach(function(item){
    svg.append("text")
    .text(item.Name)
    .attr("x", function(){
      return xScale(item.Seconds - fastest);
    })
    .attr("y", function(){
      return yScale(item.Place);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("transform", "translate(10,3)")
  })

  /* 
  only displays approx last half the dataset
  saving for reference/future fix
  svg.selectAll("text")
    .data(data)
    .enter()
    .append("text")
    .text(function(d) {
      return d.Name;
    })
    .attr("x", function(d){
      return xScale(d.Seconds - fastest);
    })
    .attr("y", function(d){
      return yScale(d.Place);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("transform", "translate(10,3)")
    */
  
  //axis labels
  svg.append("text")
    .text("Ranking")
    .attr("class", "label")
    .attr("transform", "translate(" + 
          (padding.left + (padding.left / 2)) + 
          "," +
          (padding.top + (padding.left / 2)) + 
          ")"
         );
  
  svg.append("text")
    .text("Seconds behind fastest time")
    .attr("class", "label")
    .attr("transform", "translate(" +
          ((w / 2) - padding.left) +
          "," +
          ((h - padding.bottom) - (padding.bottom / 2)) +
          ")"
         );
});