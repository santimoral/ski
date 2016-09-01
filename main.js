/**
 * Created by smoral on 29/8/2016.
 */
var fs = require("fs");

// Synchronous read
var data = fs.readFileSync('map-2.txt');
var stream = data.toString();
var lines = stream.split("\n");

var words = lines[0].split(" ");
var width = words[0];
var height = words[1];

console.log("Width = " + width);
console.log("Height =  " + height);

var map = [];
// var routes = [];

for(var i = 0; i < lines.length - 1; i++) {
    var lineNumber = i + 1;
    map[i] = lines[lineNumber].split(" ");
}

// console.log(map);

// var s = 0;
var maxLength = 0;
var maxDrop = 0;
var bestRoute = [];

for(r = 0; r < height; r++) {
    for(c = 0; c < width; c++) {
        var route = [];
        var alt = parseInt(map[r][c]);
        route[0] = {r, c, alt};
        checkRoutes(route);
    }
}

// iterateRoutes();

console.log("Best route: " + bestRoute);
console.log("Max length: " + maxLength);
console.log("Max level: " + maxDrop);

// function iterateRoutes() {
//     while (routes[0]) {
//         checkRoutes(routes[0]);
//         routes.shift();
//         s++;
//         // console.log("Queue length: " + routes.length);
//         // console.log(routes[0]);
//     }
//     return 0;
// }

function checkRoutes(selectedRoute) {

    cardPoints = [
        {direction: "East", r: 0, c: 1},
        {direction: "South", r: 1, c: 0},
        {direction: "West", r: 0, c: -1},
        {direction: "North", r: -1, c: 0}
    ];

    var initialRoute = selectedRoute;
    var lastPoint = initialRoute[initialRoute.length - 1];
    var initialAltitude = initialRoute[0]["alt"];

    for(var k = 0; k < cardPoints.length; k++) {
        var newPoint = {};
        var newAltitude = ski(lastPoint["r"], lastPoint["c"], cardPoints[k]["direction"]);
        // console.log(lastPoint["alt"] + " -> " + cardPoints[k]["direction"] + " -> " + newAltitude);
        if(newAltitude != false && newAltitude < lastPoint["alt"]) {
            newPoint["r"] = lastPoint["r"] + cardPoints[k]["r"];
            newPoint["c"] = lastPoint["c"] + cardPoints[k]["c"];
            newPoint["alt"] = parseInt(newAltitude);
            var newRoute = initialRoute.concat();
            newRoute.push(newPoint);
            // console.log(newRoute);
            if(newRoute.length > maxLength ) {
                maxLength = newRoute.length;
                maxDrop = initialAltitude - newAltitude;
                console.log("Length: " + maxLength + " Level reset: " + maxDrop);
                // console.log(newRoute);
            }
            if(initialAltitude - newAltitude > maxDrop) {
                maxDrop = initialAltitude - newAltitude;
                console.log("Length: " + maxLength + " Level: " + maxDrop);
            }
            checkRoutes(newRoute);
        } else {
            // console.log("End of route");
        }
    }
    return 0;
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
