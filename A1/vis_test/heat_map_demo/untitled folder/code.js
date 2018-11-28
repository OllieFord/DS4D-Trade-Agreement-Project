d3.json("testdata.json", function(data) {
  var svg = d3.select('body').append('svg')
    .attr('height', 500).attr('width', 500);

  var bht = 37.5;

  var colors = ['#0c2c84', '#225ea8', '#1d91c0', '#41b6c4',
                  '#7fcdbb', '#c7eab4', '#ffff88'];

  colors = colors.reverse();
  var f = d3.scale.quantize().domain([0, 600]).range(colors);

  svg.selectAll('rect').data(data)
    .enter().append('rect')
    .attr('height', bht).attr('width', bht)
    .attr('x', function(d){return (d.indexi-1)*bht;})
    .attr('y', function(d){return (d.indexj-1)*bht;})
    .attr('stroke', 'black')
    .attr('fill', function(d){return f(d.val);});

  mm = Math.ceil(f.invertExtent('#41b6c4')[0]);

  svg.selectAll('text').data(data)
    .enter().append('text')
    .attr('x', function(d){return (d.indexi-1)*bht+20;})
    .attr('y', function(d){return (d.indexj-1)*bht+20;})
    .attr('fill', function(d){return (d.val < mm)?'black':'white';})
    .attr('text-anchor', 'middle')
    .text(function(d){return d.val;});
});