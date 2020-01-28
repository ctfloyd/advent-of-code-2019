const fs = require('fs');
const readline = require('readline');

function calculateMass(mass) {
    return Math.floor(mass / 3) - 2;
}

function calculateMassRec(mass) {
    let cost = calculateMass(mass);
    if(cost <= 0)
        return 0;
    else {
        return cost + calculateMassRec(cost);
    }
}

const sumArrayReducer = (accumulator, currentValue) => accumulator + currentValue;

function solve1(inputAsList) {
    return inputAsList.map(x => calculateMass(x)).reduce(sumArrayReducer);
}

function solve2(inputAsList) {
    return inputAsList.map(x => calculateMassRec(x)).reduce(sumArrayReducer);
}

const readInterface = readline.createInterface({
    input: fs.createReadStream('day1input.txt'),
    console: false
});

let inputAsList = [];

readInterface.on('line', function(line) {
    inputAsList.push(Number(line));
});

readInterface.on('close', function() {
    console.log(solve1(inputAsList));
    console.log(solve2(inputAsList));
});
