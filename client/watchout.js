var svg = d3.select('body').select('.board').append('svg')
        .attr('width', 750)
        .attr('height', 500)
        .style('background', 'black');

var source = [];
var counter = 0;
var score = 0;
var highscore = 0;
var numAsteroids = 10;

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

var protagonist = [{x: 375, y: 250}];

for (var i = 0; i < numAsteroids; i++) {
  source.push({x: 800 * Math.random() - 50, y: 550 * Math.random() - 50});
}

var addAsteroids = function(numAsteroids) {
  for (var i = 0; i < numAsteroids; i++) {
    source.push({x: 800 * Math.random() - 50, y: 550 * Math.random() - 50});  
  }
  update(source);
};

var resetAsteroids = function() {
  source = [];
  for (var i = 0; i < 10; i++) {
    source.push({x: 800 * Math.random() - 50, y: 550 * Math.random() - 50});  
  }
  update(source);
};

var throttleCount = throttle(function() {
  counter++;
}, 250);

var min = 1000; 

var checkCollision = function() {
  score += 10;
  d3.select('body').select('.current').select('span').text(score);

  if (score === min) {
    addAsteroids(numAsteroids);
    min += 1000;
  }

  var locations = d3.select('svg').selectAll('image');
  // var protagLoc = {protagonist[0].x : protagonist[0].y};
  for ( var i = 0; i < source.length; i++) {
    var thisLocation = locations._groups[0][i];
    if (Math.sqrt(Math.pow((thisLocation.x.animVal.value + 25 - protagonist[0].x), 2) +
      Math.pow((thisLocation.y.animVal.value + 25 - protagonist[0].y), 2)) < 35) {
        throttleCount();
        d3.select('body').select('.collisions').select('span').text(counter);
        var temp = score;
        score = 0;
        min = 1000;
        resetAsteroids();
        d3.select('body').select('.current').select('span').text(score);
        if (temp > highscore) {
          highscore = temp;
          d3.select('body').select('.highscore').select('span').text(highscore);
        }
        
      }

  }
}


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
    .attr('width', 50)
    .attr('height', 50);

  d3.select('svg').selectAll('image')
  .data(data)
  .attr('fill-opacity', 0)
  .enter().append('image')
    .transition().duration(2000)
    .attr('fill-opacity', 1)
    .attr('xlink:href', 'asteroid.png')
    .attr('x', function(d) { return d.x; })
    .attr('y', function(d) { return d.y; })
    .attr('width', 50)
    .attr('height', 50);

  d3.select('svg').selectAll('image')
  .data(data)
  .exit()
    .remove();

};


setInterval(function() {
  for (var i = 0; i < source.length; i++) {
    source[i].x = 800 * Math.random() - 50;
    source[i].y = 550 * Math.random() - 50;
  };
  update(source);
  }, 2000);


update(source);

setInterval(checkCollision, 50);
