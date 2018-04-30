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
  
  var w = 700;
  var h = 600;
  var padding = {
    top: 20,
    bottom: 45,
    left: 40,
    right: 100
  };
  
  var svg = d3.select("#chart")
    .attr("width", w)
    .attr("height", h);
  
  var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
  
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
    })
    .on("mouseover", function(d, i) {
      div.transition()		
        .duration(0)		
        .style("opacity", 1);	
      div.html("<p><strong>" + 
          d.Name +
          " : " +
          d.Nationality +
          "</strong><br>Year: " +
          d.Year +
          "<br>Time : " +
          d.Time +
          "<br>Ranking : " +
          d.Place +
          "</p><p>" +
          d.Doping     
        )
        .style("left", (d3.event.pageX + 5) + "px")
        .style("top", (d3.event.pageY - 80) + "px")
    })
    .on("mouseout", function(d) {		
      div.transition()		
        .duration(500)		
        .style("opacity", 0);	
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
    .attr("class", "labelsmall")
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
          ((w / 2) - (padding.left + padding.right)) +
          "," +
          (h - 5) +
          ")"
         );
  
  //key
  svg.append("circle")
    .attr("cx", w - (padding.right * 2))
    .attr("cy", h / 2)
    .attr("r", 5)
    .attr("fill", "red");
  svg.append("circle")
    .attr("cx", w - (padding.right * 2))
    .attr("cy", (h/2) + 20)
    .attr("r", 5)
    .attr("fill", "black");
  //add text
  svg.append("text")
    .text("Riders with doping allegations")
    .attr("class", "labelsmall")
    .attr("transform", "translate(" +
            (w - (padding.right * 2) + 10) +
            "," +
            ((h / 2) + 4) +
            ")"
         );
  svg.append("text")
    .text("Riders without doping allegations")
    .attr("class", "labelsmall")
    .attr("transform", "translate(" +
            (w - (padding.right * 2) + 10) +
            "," +
            ((h / 2) + 24) +
            ")"
         );
  
});