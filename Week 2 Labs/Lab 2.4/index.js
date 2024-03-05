function init() {
    var w = 500;
    var h = 100;
    var padding = 1


    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // var dataset = [30,5,26,23,9]
    d3.csv("data.csv").then(function (dataset) {
        BarChart(dataset);
    });

    function BarChart(dataset) {
        svg.selectAll()
            .data(dataset)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
                return i * (w / dataset.length);
            })
            .attr("y", function (d) {
                return h - d.wombats
            })
            .attr("width", function () {
                return w / dataset.length - padding
            })
            .attr("height", function (d) {
                return d.wombats
            })
            .attr("fill", function (d, i) {
                // return "color:rgb("+0+0+i+")"
                return `hsl(0,100%,${d.wombats}%)`
            })
    }
}
window.onload = init;