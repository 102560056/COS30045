function init() {
    var w = 500;
    var h = 300;
    var unemployment_data;
    var LGA_data;

    var projection = d3.geoMercator()
        .center([145, -36.5])
        .translate([w / 2, h / 2])
        .scale(2450);

    var color = d3.scaleQuantize()
        .range([
            "rgb(242,240,247)",
            "rgb(203,201,226)",
            "rgb(158,154,200)",
            "rgb(117,107,177)",
            "rgb(84,39,143)"
        ])


    var path = d3.geoPath()
        .projection(projection);

    var svg = d3.select("body")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("fill", "grey");

    Promise.all([
        d3.csv("../VIC_LGA_unemployment.csv"),
        d3.json("../LGA_VIC.json"),
        d3.csv("../VIC_city.csv")
    ]).then(function ([unemployment_data, LGA_data, city_data]) {
        // console.log(unemployment_data)
        // console.log(LGA_data)

        color.domain([
            d3.min(unemployment_data, function (d) { return d.unemployed; }),
            d3.max(unemployment_data, function (d) { return d.unemployed; })
        ]);

        for (var i = 0; i < unemployment_data.length; i++) {
            LGA = (unemployment_data[i].LGA)
            unemployedValue = (unemployment_data[i].unemployed)
            for (var j = 0; j < LGA_data.features.length; j++) {
                if (LGA === LGA_data.features[j].properties.LGA_name) {
                    LGA_data.features[j].properties.value = unemployedValue;
                    break;
                }
            }
        }

        svg.selectAll("path")
            .data(LGA_data.features)
            .enter()
            .append("path")
            .attr("fill", function (d) {
                return color(d.properties.value);
            })
            .attr("d", path);

        svg.selectAll("circle")
            .data(city_data)
            .enter()
            .append("circle")
            .attr("fill", "red")
            .attr("r", 2)
            .attr("cx", function (d) {
                return projection([d.lon, d.lat])[0];
            })
            .attr("cy", function (d) {
                return projection([d.lon, d.lat])[1];
            })
    });
}

window.onload = init;