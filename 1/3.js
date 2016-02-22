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
/*
var data = [{
    "major": "Aerospace",
    "numStudents": 800
            }, {
    "major": "Agricultural",
    "numStudents": 221
            }, {
    "major": "Biological Systems",
    "numStudents": 97
            }, {
    "major": "Chemical",
    "numStudents": 824
            }, {
    "major": "Civil",
    "numStudents": 734
            }, {
    "major": "Computer",
    "numStudents": 725
            }, {
    "major": "Construction",
    "numStudents": 297
            }, {
    "major": "Electrical",
    "numStudents": 614
            }, {
    "major": "Engineering (Undecided)",
    "numStudents": 543
            }, {
    "major": "Industrial",
    "numStudents": 514
            }, {
    "major": "Materials",
    "numStudents": 266
            }, {
    "major": "Mechanical",
    "numStudents": 2047
            }, {
    "major": "Software",
    "numStudents": 227
    }];
*/
d3.csv("enrollment_stats.csv", function (data) {

            var svg03 = dimple.newSvg("#section3", 800, 600);
            svg03.attr("id", "svg03");
            title(svg03, "Major / Student")
            var myChart = new dimple.chart(svg03, data);
            myChart.setBounds(20, 20, 460, 360)
            myChart.addMeasureAxis("p", "numStudents");
            var ring = myChart.addSeries("major", dimple.plot.pie);
            ring.innerRadius = "50%";
            var myLegend = myChart.addLegend(500, 20, 90, 300, "left");
            myChart.draw();


            });
