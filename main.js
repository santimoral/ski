/**
 * Created by smoral on 29/8/2016.
 */
var fs = require("fs");

// Synchronous read
var data = fs.readFileSync('map.txt');
var stream = data.toString();
var lines = stream.split("\r\n");

var words = lines[0].split(" ");
var width = words[0];
var height = words[1];

console.log("Width = " + width);
console.log("Height =  " + height);

var map = [];
var routes = [];

for(var i = 0; i < lines.length - 1; i++) {
    var lineNumber = i + 1;
    map[i] = lines[lineNumber].split(" ");
}

// transpose(map, width);

console.log(map);

for(r = 0; r < height; r++) {
    for(c = 0; c < width; c++) {
        var route = [];
        var alt = parseInt(map[r][c]);
        route[0] = {r, c, alt};
        checkRoutes(route);
    }
}

console.log("Routes: ");
console.log(routes);

function checkRoutes(route) {

    cardPoints = [
        {direction: "East", r: 0, c: 1},
        {direction: "South", r: 1, c: 0},
        {direction: "West", r: 0, c: -1},
        {direction: "North", r: -1, c: 0}
    ];

    lastPoint = route[route.length - 1];

    for(var k = 0; k < cardPoints.length; k++) {
        var newPoint = {};
        var count = 0;
        if(newAltitude = ski(lastPoint["r"], lastPoint["c"], cardPoints[k]["direction"])) {
            if(newAltitude < lastPoint["alt"]) {
                newPoint["r"] = lastPoint["r"] + cardPoints[k]["r"];
                newPoint["c"] = lastPoint["c"] + cardPoints[k]["c"];
                newPoint["alt"] = parseInt(newAltitude);
                console.log(lastPoint["alt"] + " to " + cardPoints[k]["direction"] + " " + newPoint["alt"]);
                var newRoute = [];
                newRoute[0] = lastPoint;
                newRoute.push(newPoint);
                routes.push(newRoute);
                checkRoutes(newRoute);
                console.log(newRoute);
            }
        }
    }
}

function ski(r, c, direction) {
    switch(direction) {
        case "East":
            if (c + 1 < width) {
                return map[r][c + 1];
            } else {
                return false;
            }
            break;
        case "South":
            if (r + 1 < height) {
                return map[r + 1][c];
            } else {
                return false;
            }
            break;
        case "West":
            if (c > 0) {
                return map[r][c - 1];
            } else {
                return false;
            }
            break;
        case "North":
            if (r > 0) {
                return map[r - 1][c];
            } else {
                return false;
            }
            break;
        default:
            return null;
    }
}

console.log("Program Ended")