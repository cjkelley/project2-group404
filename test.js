var dataset1;
var height = 500;
var width = 1000;

var outerRadius = height / 2;
var innerRadius = height / 3;

var pie = d3.layout.pie()
    .value(function (d) {
        return d.numStudents
    });

//define color scale
var color = d3.scale.category20();

d3.csv("enrollment_stats.csv", function (data) {

    //format data as pie layout
    dataset1 = (pie(data));
    console.log(dataset1);
    generateChart();
    console.log(color.domain());
});

function generateChart() {

    //create svg canvas for chart
    svg1 = d3.select("#chart")
        .append("svg")
        .attr("height", height)
        .attr("width", width);


    //draw arc paths
    arc = d3.svg1.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    //set up arc groups
    var arcs = svg1.selectAll("g.arc")
        .data(dataset1)
        .enter()
        .append("g") //new group
        .attr("class", "arc")
        .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")"); //translate group to right place

    //draw arc paths
    var paths = arcs.append("path")
        .attr("fill", function (d, i) {
            return color(d.data.major);
        })
        .attr("d", arc); //define description for each path

    //add text labels
    arcs.append("text")
        .attr("transform", function (d) {
            return "translate(" + arc.centroid(d) + ")"; //place text in centroid of arc
        })
        .attr("text-anchor", "middle")
        .text(function (d) {
            return d.value; //make text label the number of students
        })
        .attr("fill", "white");

    buildLegend();

    addTooltips();


}

function buildLegend() {
    var legendRectSize = 18;
    var legendSpacing = 4;

    var legend = svg1.selectAll("g.legend")
        .data(color.domain())
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            var h = legendRectSize + legendSpacing;
            var offset = h * color.domain().length / 2;
            var horz = legendRectSize + 500;
            var vert = i * h + height / 4;
            return "translate(" + horz + "," + vert + ")";
        });


    //add colored square
    legend.append("rect")
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
        .style("fill", color)
        .style("stroke", color);
        //onclick handler for enabling/disabling major

    //add legend text
    legend.append('text')
        .attr("x", legendRectSize + legendSpacing)
        .attr("y", legendRectSize - legendSpacing)
        .text(function (d) {
            return d;
        });


}



function addTooltips() {
    var tooltip = d3.select("#chart")
        .append("div")
        .attr("class", "tooltip");

    tooltip.append("div")
        .attr("class", "label");

    tooltip.append("div")
        .attr("class", "percent");

    var paths = svg1.selectAll("path");

    paths.on('mouseover', function (d) {

        var pathSel = d3.select(this);

        //darken all other colors
        paths.attr("fill", function (d, i) {
            var rgb = d3.rgb(color(d.data.major));
            return rgb.darker(2.5);
        })

        //keep color of selected
        pathSel.attr("fill", function (d, i) {
            return color(d.data.major);
        })

        //sum up the number of students
        var total = d3.sum(dataset1.map(function (d) {
            return d.data.numStudents;
        }));
        //calculate the percentage
        var percent = Math.round(1000 * d.data.numStudents / total) / 10;
        //fill the tooltip
        tooltip.select('.label').html(d.data.major);
        tooltip.select('.percent').html(percent + '%');
        tooltip.style('display', 'block');
    });

    paths.on('mousemove', function (d) {
        tooltip.style('top', (d3.event.pageY - 40) + 'px')
            .style('left', (d3.event.pageX - 10) + 'px');
    });

    paths.on('mouseout', function () {
        tooltip.style('display', 'none');

        //reset colors
        paths.attr("fill", function (d, i) {
            return color(d.data.major);
        })
    });

}





var width = 600;
var height = 400;
var margin = {
    top: 30,
    right: 25,
    bottom: 80,
    left: 50
};


//set scales
var xScale = d3.scale.ordinal()
    .rangeRoundBands([margin.left, width], 0.05);
var yScale = d3.scale.linear()
    .rangeRound([height - margin.top, 0]);
var color = d3.scale.ordinal()
    .range(["violet", "royalblue"]);

//create svg
var svg2 = d3.select("body").selectAll("#gender")
    .append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.bottom + margin.top);

var dataset2 = null;

//define axes
var xAxis = d3.svg2.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg2.axis()
    .scale(yScale)
    .orient("left");

//import CSV and build dataset
d3.csv("gender_stats.csv", function (data) {

    //assign a color to each gender
    color.domain(d3.keys(data[0]).filter(function (key) {
        return key !== 'major';
    }));

    //build data
    data.forEach(function (d) {
        var y0 = 0;
        d.genders = color.domain().map(function (gender) { //add a gender object to each data point
            return {
                gender: gender,
                y0: y0, //initial y
                y1: y0 += +d[gender] //height
            };
        });
        d.total = d.genders[d.genders.length - 1].y1; //total height
    });

    //sort descending by total enrollment
    data.sort(function (a, b) {
        return b.total - a.total;
    });

    //set x domain based on majors
    xScale.domain(data.map(function (d) {
        return d.major;
    }));
    //set y domain on max value in data
    yScale.domain([0, d3.max(data, function (d) {
        return d.total;
    })]);

    dataset2 = data;

    console.log(dataset2);

    generateGraph();

});


function generateGraph() {

    //major groups
    var major = svg2.selectAll("g.major")
        .data(dataset2)
        .enter()
        .append("g")
        .attr("class", "major")
        .attr("transform", function (d) {
            return "translate(" + xScale(d.major) + ",0)";
        });

    //rectangles
    major.selectAll("rect")
        .data(function (d) {
            return d.genders;
        })
        .enter()
        .append("rect")
        .attr("width", xScale.rangeBand())
        .attr("y", function (d) {
            return yScale(d.y1);
        })
        .attr("height", function (d) {
            return yScale(d.y0) - yScale(d.y1);
        })
        .attr("fill", function (d) {
            return color(d.gender)
        });

    //x-axis
    svg2.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0, " + (height - 25) + ")")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-10px")
        .attr("dy", "-5px")
        .attr("transform", "rotate(-90)");

    //y-axis
    svg2.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(yAxis);

}

//functions for sorting dataset and then updating graph

function sortFemalePercent() {
    dataset2.sort(function (a, b) {
        return (+b.female / b.total) - +(a.female / a.total);
    });

    console.log(dataset2);
    updateGraph(1500);
}

function sortMalePercent() {
    dataset2.sort(function (a, b) {
        return (+b.male / b.total) - +(a.male / a.total);
    });

    console.log(dataset2);
    updateGraph(1500);
}

function sortMale() {
    dataset2.sort(function (a, b) {
        return +b.male - +a.male;
    });

    console.log(dataset2);
    updateGraph(1500);
}

function sortFemale() {
    dataset2.sort(function (a, b) {
        return +b.female - +a.female;
    });

    console.log(dataset2);
    updateGraph(1500);
}

//function for updating a graph given a transtion duration

function updateGraph(duration) {

    //set x domain based on majors
    xScale.domain(dataset2.map(function (d) {
        return d.major;
    }));
    //set y domain on max value in data
    yScale.domain([0, d3.max(dataset2, function (d) {
        return d.total;
    })]);

    var majors = svg2.selectAll(".major");
    //perform changes

    majors.data(dataset2); //rebind data

    majors.selectAll("rect") //redraw rectangles
        .data(function (d) {
            return d.genders;
        })
        .transition()
        .duration(duration)
        .attr("width", xScale.rangeBand())
        .attr("y", function (d) {
            return yScale(d.y1);
        })
        .attr("height", function (d) {
            return yScale(d.y0) - yScale(d.y1);
        })
        .attr("fill", function (d) {
            return color(d.gender)
        });

    //relabel x-axis
    svg2.selectAll("g.x-axis")
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-10px")
        .attr("dy", "-5px")
        .attr("transform", "rotate(-90)");

}
