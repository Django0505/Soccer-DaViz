$(document).ready(function(){

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 760 - margin.left - margin.right,
    height = 350 - margin.top - margin.bottom;

var x0 = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var x1 = d3.scale.ordinal();

var y = d3.scale.linear()
    .range([height, 0]);

var color = d3.scale.ordinal()
    .range(["#2D4337", "#2B091A", "#681421", "#A33947", "#E5CF06"]);

var xAxis = d3.svg.axis()
    .scale(x0)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format("d"));
 
// Attempt at adding hover tip
var tip = d3.tip() 
  	    .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
              return "<strong style='color:red'>Name:</strong> <span style='color:white'>" + d.name + "</span>" + "<br>" + "<strong style='color:red'>Team:</strong> <span style='color:white'>" + d.team + "</span>" + "<br>" + "<strong style='color:red'>Total:</strong> <span style='color:white'>" + d.hisStat + "</span>" + "<br>" + "<center><img class='facePic' src='"+ d.picURL + "'/></center>" ;
             })

var svg = d3.select("#svg").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")"); 

//calling tip
svg.call(tip);


d3.json("data2.json", function(error, data) { 
 
var player1 = data[0]; 
var attr = _.keys(player1.statistics[0]); 
//
var availablestats = _.keys(player1.statistics['0']); 

var playerNames = []; 

data.forEach(function(d){
playerNames.push(d.name);
}) 

var attributes = _.map(availablestats, function(a){return {
      attribute: a,
}}); 

_.each(attributes, function(attribute){
  var values = _.map(data, function(player){
    return {
      name : player.name,
      hisStat : player.statistics['0'][attribute.attribute],
      team : player.team, 
      picURL : player.picURL
    }; 
  });
  attribute.values = values;
});

console.log(attributes);

var maxY = [] 

attributes.forEach(function(d){
  d.values.forEach(function(d){
    maxY.push(d.hisStat)
  })
}) 

console.log(maxY)

  
  x0.domain(attributes.map(function(d) { return d.attribute; }));
  x1.domain(playerNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(maxY)]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);
  
  // create y-axis line
  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Units");
  
  // create the groupings
  var state = svg.selectAll(".state")
      .data(attributes)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x0(d.attribute) + ",0)"; });
  
  //bring the data to the groupings
  state.selectAll("rect") 
        .data(function(d){return d.values})
      .enter().append("rect") 
        .attr("class","bars") 
	.attr("id", function(d){return d.name})
        .attr("width", x1.rangeBand())
        .attr("x", function(d) { return x1(d.name); })
        .attr("y", function(d) { return y(d.hisStat); })
        .attr("height", function(d) { return height - y(d.hisStat); })
        .style("fill", function(d) { return color(d.name);})
  	.on('mouseover', tip.show)
        .on('mouseout', tip.hide);

  var legend = svg.selectAll(".legend")
      .data(playerNames.slice())
    .enter().append("g") 
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect") 
      .attr("id", function(d){return d})
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; }); 

}); 




d3.select("#slider")
  .on('change',function(){ 
  	var gameWeek = this.value.toString(); 
  	console.log(gameWeek) 
  	console.log(typeof gameWeek) 
        $("#yearBox").html("<h3 class='gameText'> Game week: "+this.value+"</h3>") 


  function Update(){
  
  console.log("clicked!!");

  d3.json("data2.json", function(error, data) {

  var playerNames = []; 

  data.forEach(function(d){
    playerNames.push(d.name);
  }) 
  
  var player1 = data[0]; 
  
  var attr = _.keys(player1.statistics[0]); 

  var availablestats = _.keys(player1.statistics[gameWeek]);   

  var attributes = _.map(availablestats, function(a){return {
      attribute: a,
}}); 

_.each(attributes, function(attribute){
  var values = _.map(data, function(player){

    return {
      name : player.name,
      hisStat : player.statistics[gameWeek][attribute.attribute],
      team : player.team, 
      picURL : player.picURL
    }; 
  });
  attribute.values = values;
});

  console.log(attributes);

  var maxY = [] 

  attributes.forEach(function(d){
     d.values.forEach(function(d){
       maxY.push(d.hisStat)
    })
  }) 

 

  x0.domain(attributes.map(function(d) { return d.attribute; }));
  x1.domain(playerNames).rangeRoundBands([0, x0.rangeBand()]);
  y.domain([0, d3.max(maxY)]);
  
   svg.selectAll("g.y.axis") 
        .transition() 
        .duration(1000)
        .call(yAxis);

   svg.selectAll("g.x.axis") 
        .transition() 
        .duration(1000)
        .call(xAxis);


   var state = svg.selectAll(".g")
            .data(attributes) 



  state.selectAll(".bars") 
  .data(function(d){return d.values})
  .transition() 
  .attr("y", function(d) { return y(d.hisStat); })
  .attr("height", function(d) { return height - y(d.hisStat); })
  .duration(1000)



});
  
};

         
Update();

});

});
