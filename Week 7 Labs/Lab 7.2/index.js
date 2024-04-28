function init() {
    var w = 300;
    var h = 300;
    var outerRadius = w / 2;
    // var innerRadius = 0;
    var innerRadius = 100;
    var dataset = [1, 2, 3, 4, 5];

    var colour = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    var arc = d3.arc()
        .outerRadius(outerRadius)
        .innerRadius(innerRadius);

    var pie = d3.pie();

    var arcs = svg.selectAll("g.arc")
        .data(pie(dataset))
        .enter()
        .append("g")
        .attr("class", "arc")
        .attr("transform", `translate(${outerRadius},${outerRadius})`);

    arcs.append("path")
        .attr("fill", function (d, i) {
            return colour(i);
        })
        .attr("d", function (d, i) {
            return arc(d, i);
        });

    arcs.append("text")
        .text(function (d) {
            return d.value;
        })
        .attr("transform", function (d) {
            return `translate(${arc.centroid(d)})`;
        });

}

window.onload = init;