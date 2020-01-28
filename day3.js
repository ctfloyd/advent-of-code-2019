const fs = require('fs');
const readline = require('readline');

class Point {
    constructor(x, y) {
     pp   this.x = x;
        this.y = y;
    }

    equals(other) {
        return this.x == other.x && this.y == other.y;
    }
}

function computeIntersections(list1, list2) {
    let intersections = [];

    for(let xPosition of Object.keys(list1.x)) {
        if(!list2.x[xPosition]) continue;
        for(pointA of list1.x[xPosition]) {
            for(pointB of list2.x[xPosition]) {
                if(pointA.point.equals(pointB.point))
                    intersections.push({'point': pointA.point,
                                        'stepcount': pointA.stepcount + pointB.stepcount});
            }
        }
    }
    return intersections;
}

function manhattanDistance(origin, other) {
    return Math.abs(origin.x - other.x) + Math.abs(origin.y - other.y);
}

let OFFSETS = {
    'R': { 'x': 1, 'y': 0 },
    'D': { 'x': 0, 'y': -1 },
    'L': { 'x': -1, 'y': 0 },
    'U': { 'x': 0, 'y': 1}
}

function addPointsInDirection(points, direction, amount, startingInfo) {
   let point;
   let offset = OFFSETS[direction];
   let startingPoint = startingInfo.point;
   let startingStep = startingInfo.stepcount;
   for(let i = 1; i <= amount; i++) {
        point = new Point(startingPoint.x + i * offset.x, startingPoint.y + i * offset.y);
        let pointPosition = points.x[point.x];
        if(!pointPosition) {
            points.x[point.x] = [];
            pointPosition = points.x[point.x];
        }
        let stepCount = startingStep + i;
        pointPosition.push({'point': point, 'stepcount': stepCount});
    }
    return {'point': point, 'stepcount': startingStep + amount};
}

function addWiresAndGetIntersections(inputAsList) {
    let wire1info = {'point': new Point(0, 0), 'stepcount': 0};
    let wire2info = {'point': new Point(0, 0), 'stepcount': 0};
    let wire1Points = { 'x': {} };
    let wire2Points = { 'x': {} };
    for(direction of inputAsList[0]) {
        let dir = direction[0];
        let amount = Number(direction.substring(1, direction.length + 1));
        wire1info = addPointsInDirection(wire1Points,
                                           dir,
                                           amount,
                                           {'point': wire1info.point, 'stepcount': wire1info.stepcount});
    }
    for(direction of inputAsList[1]) {
        let dir = direction[0];
        let amount = Number(direction.substring(1, direction.length + 1));
        wire2info = addPointsInDirection(wire2Points,
                                         dir,
                                         amount,
                                         {'point': wire2info.point, 'stepcount': wire2info.stepcount});
    }
    let intersections = computeIntersections(wire1Points, wire2Points);
    return intersections;
}

function solve1(inputAsList) {
    let intersections = addWiresAndGetIntersections(inputAsList);
    let distances = [];
    for(let point of intersections) {
       distances.push(manhattanDistance(new Point(0, 0), point.point));
    }
    return Math.min(...distances);
}

function solve2(inputAsList) {
    let intersections = addWiresAndGetIntersections(inputAsList);
    let steps = [];
    for(let point of intersections) {
        steps.push(point.stepcount);
    }
    return Math.min(...steps);
}

const readInterface = readline.createInterface({
    input: fs.createReadStream('day3input.txt'),
    console: false
});

let inputAsList = [];

readInterface.on('line', function(line) {
    line = line.split(',');
    inputAsList.push(line);
});

readInterface.on('close', function() {
    console.log(solve1(inputAsList));
    console.log(solve2(inputAsList));
});
