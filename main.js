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

var s = 0;
var maxSki = 0;
var maxLevel = 0;

while(routes[s]) {
    checkRoutes(routes[s]);
    s++;
}

// maxSki = routes[s - 1].length;

console.log("Routes: ");
console.log(routes);
console.log("Max length: " + maxSki);
console.log("Max level: " + maxLevel);

function checkRoutes(initialRoute) {

    cardPoints = [
        {direction: "East", r: 0, c: 1},
        {direction: "South", r: 1, c: 0},
        {direction: "West", r: 0, c: -1},
        {direction: "North", r: -1, c: 0}
    ];

    lastPoint = initialRoute[initialRoute.length - 1];

    for(k = 0; k < cardPoints.length; k++) {
        var newPoint = {};
        if(newAltitude = ski(lastPoint["r"], lastPoint["c"], cardPoints[k]["direction"])) {
            if(newAltitude < lastPoint["alt"]) {
                newPoint["r"] = lastPoint["r"] + cardPoints[k]["r"];
                newPoint["c"] = lastPoint["c"] + cardPoints[k]["c"];
                newPoint["alt"] = parseInt(newAltitude);
                console.log(lastPoint["alt"] + " to " + cardPoints[k]["direction"] + " " + newPoint["alt"]);
                var newRoute = initialRoute.concat();
                newRoute.push(newPoint);
                routes.push(newRoute);
                if(newRoute.length > maxSki) {maxSki = newRoute.length}
                if(initialRoute[0]["alt"] - newAltitude > maxLevel) {maxLevel = initialRoute[0]["alt"] - newAltitude}
                // console.log(lastPoint);
                // console.log(newPoint);
                // console.log(initialRoute);
                // console.log(newRoute);
                // checkRoutes(newRoute);
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