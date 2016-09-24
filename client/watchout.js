var svg = d3.select('body').append('svg')
        .attr('width', 750)
        .attr('height', 500)
        .style('background', 'black');

var source = [];
var counter = 0;
var score = 0;
var highscore = 0;

var scoreToInput = undefined;

for (var i = 0; i < 30; i++) {
  source.push({x: 700 * Math.random() + 25, y: 450 * Math.random() + 25});
}

var throttle = function(func, wait) {
  var cancall = true;
  var changeCancall = function() {
    cancall = true;
  };
  return function () {
    if (cancall) {
      func();
      cancall = false;
      setTimeout(changeCancall, wait);
    }
  };   
};

var startSetCollision = setInterval(function(){ checkCollision()}, 50);
var stopSetCollision = function() {clearInterval(startSetCollision)};

var throttleCount = throttle(function() {
  counter++;
  startSetCollision();
  
}, 1000);


var protagonist = [{x: 375, y: 250}];

var checkCollision = function() {
  var locations = d3.select('svg').selectAll('image');
  // var protagLoc = {protagonist[0].x : protagonist[0].y}; 
  for ( var i = 0; i < source.length; i++) {
    var thisLocation = locations._groups[0][i];
    if (Math.sqrt(Math.pow((thisLocation.x.animVal.value + 10 - protagonist[0].x), 2) + 
      Math.pow((thisLocation.y.animVal.value + 10 - protagonist[0].y), 2)) < 20) {
      // debugger;
      scoreToInput = d3.select('body').select('.current').select('span').text();
      throttleCount();
      d3.select('body').select('.collisions').select('span').text(counter);
      score = 0;
      d3.select('body').select('.current').select('span').text(score);
      stopSetCollision();
      
    }
  }
};

var changeScore = function() {
  d3.select('body').select('.current').select('span').text(score);
  score += 10;
};

svg.selectAll('circle')
  .data(protagonist)
  .enter().append('circle')
  .attr('cx', function(d) { return d.x; })
  .attr('cy', function(d) { return d.y; })
  .attr('r', 10)
  .style('fill', 'green')
  .call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

function dragstarted(d) {
  d3.select(this).raise().classed("active", true);
}

function dragged(d) {
  d3.select(this)
  .attr("cx", d.x = d3.event.x < 10 ? 10 : d3.event.x > 740 ? 740 : d3.event.x)
  .attr("cy", d.y = d3.event.y < 10 ? 10 : d3.event.y > 490 ? 490 : d3.event.y);
    
}

function dragended(d) {
  d3.select(this).classed("active", false);
}



function update(data) {

  d3.select('svg').selectAll('image')
  .data(data).transition().duration(1000)
    .attr('xlink:href', 'asteroid.png')
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; })
    .attr('width', 20)
    .attr('height', 20);

  d3.select('svg').selectAll('image')
  .data(data)
  .enter().append('image')
    .attr('xlink:href', 'asteroid.png')
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; })
    .attr('width', 20)
    .attr('height', 20);
};


setInterval(function() { 
  for (var i = 0; i < source.length; i++) {
    source[i].x = 700 * Math.random() + 25;
    source[i].y = 450 * Math.random() + 25;
  }; 
  update(source); 
  }, 2000);


update(source);



startSetCollision();

setInterval(changeScore, 50);





