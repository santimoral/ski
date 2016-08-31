/**
 * Created by smoral on 29/8/2016.
 */
var fs = require("fs");

// Synchronous read
var data = fs.readFileSync('map-1.txt');
var stream = data.toString();
var lines = stream.split("\n");

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

// console.log(map);

var s = 0;
var maxSki = 0;
var maxLevel = 0;

for(r = 0; r < height; r++) {
    for(c = 0; c < width; c++) {
        var route = [];
        var alt = parseInt(map[r][c]);
        route[0] = {r, c, alt};
        checkRoutes(route);
        // iterateRoutes();
    }
}

iterateRoutes();
console.log("Routes: " + (s - 1));
console.log("Max length: " + maxSki);
console.log("Max level: " + maxLevel);

function iterateRoutes() {
    while (routes[0]) {
        checkRoutes(routes[0]);
        routes.shift();
        s++;
        // console.log("Queue length: " + routes.length);
        // console.log(routes[0]);
    }
    return 0;
}

function checkRoutes(initialRoute) {

    cardPoints = [
        {direction: "East", r: 0, c: 1},
        {direction: "South", r: 1, c: 0},
        {direction: "West", r: 0, c: -1},
        {direction: "North", r: -1, c: 0}
    ];

    lastPoint = initialRoute[initialRoute.length - 1];
    initialAltitude = initialRoute[0]["alt"];

    for(k = 0; k < cardPoints.length; k++) {
        var newPoint = {};
        if(newAltitude = ski(lastPoint["r"], lastPoint["c"], cardPoints[k]["direction"])) {
            if(newAltitude < lastPoint["alt"]) {
                newPoint["r"] = lastPoint["r"] + cardPoints[k]["r"];
                newPoint["c"] = lastPoint["c"] + cardPoints[k]["c"];
                newPoint["alt"] = parseInt(newAltitude);
                // console.log(lastPoint["alt"] + " to " + cardPoints[k]["direction"] + " " + newPoint["alt"]);
                var newRoute = initialRoute.concat();
                newRoute.push(newPoint);
                routes.push(newRoute);
                if(newRoute.length > maxSki) {
                    maxLevel = 0;
                    maxSki = newRoute.length;
                    console.log("Length: " + maxSki + " Level: " + maxLevel);
                }
                if(initialAltitude - newAltitude > maxLevel) {
                    maxLevel = initialAltitude - newAltitude;
                    console.log("Length: " + maxSki + " Level: " + maxLevel);
                }
            }
        }
    }
    // var result = new iterateRoutes();
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

console.log("Program Ended");
