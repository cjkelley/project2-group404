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

var svg03 = dimple.newSvg("#section3", 800, 600);
svg03.attr("id", "svg03");
title(svg03, "scatter matrix")
var chart = new dimple.chart(svg03, data);
chart.addCategoryAxis("x", "Word");
chart.addMeasureAxis("y", "Awesomeness");
chart.addSeries(null, dimple.plot.line);
chart.draw();
