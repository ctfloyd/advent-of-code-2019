const fs = require('fs');
const readline = require('readline');


function solve1(inputAsList) {
}

function solve2(inputAsList) {
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
