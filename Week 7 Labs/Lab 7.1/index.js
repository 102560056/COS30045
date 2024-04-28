function init() {
    var w = 600;
    var h = 300;
    var padding = 60
    var dataset;
    var line;

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    svg.append("path")
        .datum(dataset)
        .attr("class", "line")
        .attr("d", line);

    d3.csv("Unemployment_78-95.csv", (function (d) {
        return {
            date: new Date(+d.year, (+d.month - 1)),
            number: parseFloat(+d.number)
        }
    })).then(function (data) {
        var dataset = data;
        lineChart(dataset);
    });

    function lineChart(dataset) {
        // Checking CSV Load
        // console.table(dataset, ["date", "number"]);

        var xScale = d3.scaleTime()
            .domain([
                d3.min(dataset, function (d) { return d.date; }),
                d3.max(dataset, function (d) { return d.date; })
            ])
            .range([0, w]);

        var yScale = d3.scaleLinear()
            .domain([
                0,
                d3.max(dataset, function (d) { return d.number; })
            ])
            .range([h, 0]);

        line = d3.line()
            .x(function (d) { return xScale(d.date); })
            .y(function (d) { return yScale(d.number); })

        area = d3.area()
            .x(function (d) { return xScale(d.date); })
            .y0(function () { return yScale.range()[0] - padding; })
            .y1(function (d) { return yScale(d.number); })

        svg.append("path")
            .datum(dataset)
            // .attr("class", "line")
            .attr("class", "area")
            .attr("transform", `translate(${padding},0)`)
            // .attr("d", line)
            .attr("d", area);


        var xAxis = d3.axisBottom().scale(xScale);
        svg.append("g").call(xAxis)
            .attr("transform", `translate(${padding},${h - padding})`)

        var yAxis = d3.axisLeft().scale(yScale);
        svg.append("g").call(yAxis)
            .attr("transform", `translate(${padding},${-padding})`)

        svg.append("line")
            //Start
            .attr("x1", padding)
            .attr("y1", yScale(500000))
            //End
            .attr("x2", w)
            .attr("y2", yScale(500000))
            //style
            .style("stroke", "red")
            .style("stroke-dasharray", ("3, 3"));

        svg.append("text")
            .attr("class", "half-label")
            .attr("x", padding + 10)
            .attr("y", yScale(500000) - 10)
            .text("Half a million unemployed");
    }


}

window.onload = init;