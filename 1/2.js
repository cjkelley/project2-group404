function title(svg, title) {

    svg.selectAll("title_text")
        .data([title])
        .enter()
        .append("text")
        .attr("x", 10)
        .attr("y", 15)
        .style("font-family", "sans-serif")
        .style("font-size", "16px")
        .style("color", "Black")
        .text(function (d) {
            return d;
        });
}

var data = [{
    "Word": "Hello",
    "Awesomeness": 2000
                }, {
    "Word": "World",
    "Awesomeness": 3000
                }];


var svg02 = dimple.newSvg("#enrollmentLabel", 800, 600);
svg02.attr("id", "svg02");
title(svg02, "scatter matrix")
var chart = new dimple.chart(svg02, data);
chart.addCategoryAxis("x", "Word");
chart.addMeasureAxis("y", "Awesomeness");
chart.addSeries(null, dimple.plot.pipe);
chart.draw();
