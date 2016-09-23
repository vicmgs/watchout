var svg = d3.select('body').append('svg')
        .attr('width', 760)
        .attr('height', 500)
        .style('background', 'red');

var source = [];

for (var i = 0; i < 30; i++) {
  source.push({x: 740 * Math.random() + 10, y: 480 * Math.random() + 10});
}



function update(data) {

  d3.select('svg').selectAll('circle')
  .data(data).transition().duration(1000).attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 7);

  d3.select('svg').selectAll('circle')
  .data(data)
  .enter().append('circle')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 7)
    .attr('fill', 'url(lib/asteroid.png)');
  
  
};


setInterval(function() { 
  for (var i = 0; i < source.length; i++) {
      source[i].x = 740 * Math.random() + 10;
      source[i].y = 480 * Math.random() + 10; 
  }; 
  update(source); 
  }, 2000);


update(source);

// var changeCoor = function() {
//   source.forEach(function(src) {
//     src.x = 
//     src.y = 
//   });
//   return source;
// };

