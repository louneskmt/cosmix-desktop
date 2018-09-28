const linePos = -350;
const height = 1000;
const width = height;

$(document).ready(function(){
    var svg = Snap("svg.graph");

    var yAxis = svg.line(linePos, 0, linePos, height);
    var xAxis = svg.line(0, height-linePos, width, height-linePos);
    var g_lines = svg.group(xAxis,yAxis); // Groupe d'éléments contenant les deux axes
    g_lines.attr({
        stroke: "#604C8D",
        "stroke-width": 2
    });
});