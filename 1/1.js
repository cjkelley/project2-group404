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


var svg01 = dimple.newSvg("#genderLabel", 800, 600);
svg01.attr("id", "svg01");
title(svg01, "scatter matrix")
var chart = new dimple.chart(svg01, data);
chart.addCategoryAxis("x", "Word");
chart.addMeasureAxis("y", "Awesomeness");
chart.addSeries(null, dimple.plot.bar);
chart.draw();

var svg02 = dimple.newSvg("#enrollmentLabel", 800, 600);
svg02.attr("id", "svg02");
title(svg02, "scatter matrix")
var chart = new dimple.chart(svg02, data);
chart.addCategoryAxis("x", "Word");
chart.addMeasureAxis("y", "Awesomeness");
chart.addSeries(null, dimple.plot.pipe);
chart.draw();
