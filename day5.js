const fs = require('fs');
const readline = require('readline');

let OPCODES = {
    '1': 4,
    '2': 4,
    '3': 2,
    '4': 2,
    '5': 3,
    '6': 3,
    '7': 4,
    '8': 4,
    '99': 0
};

let callAmount = 0;
function getInput() {
    let order = [1, 5];
    return order[callAmount++];
}


function doOpCode(opCode, imm1, imm2, imm3, idx, memory) {
    let storeLocation;
    let paramOne;
    let paramTwo;
    if(imm1) {
        paramOne = idx + 1;
    } else {
        paramOne = memory[idx + 1];
    }
    if(imm2) {
        paramTwo = idx + 2;
    } else {
        paramTwo = memory[idx + 2];
    }
    if(imm3) {
        storeLocation = memory[idx + 3];
    } else {
        storeLocation = memory[idx + 3];
    }
    switch(opCode) {
        case 1:
            memory[storeLocation] = memory[paramOne] + memory[paramTwo];
            break;
        case 2:
            memory[storeLocation] = memory[paramOne] * memory[paramTwo];
            break;
        case 3:
            // prompt for input
            memory[memory[idx + 1]] = getInput();
            break;
        case 4:
            console.log(memory[paramOne]);
            break;
        case 5:
            if(memory[paramOne] != 0) idx = memory[paramTwo] - 3;
            break;
        case 6:
            if(memory[paramOne] == 0) idx = memory[paramTwo] - 3;
            break;
        case 7:
            if(memory[paramOne] < memory[paramTwo])
                memory[storeLocation] = 1;
            else
                memory[storeLocation] = 0;
            break;
        case 8:
            if(memory[paramOne] == memory[paramTwo])
                memory[storeLocation] = 1;
            else
                memory[storeLocation] = 0;
            break;
        case 99:
            return -1;
            break;
    }
    return idx + OPCODES[opCode];
}

function runComputer(memory) {
    let i = 0;
    while(i >= 0) {
        let instruction = memory[i].toString();
        let modes = [false, false, false];
        let end = instruction.length;
        let opCode = Number(instruction.substring(end - 2, end));
        for(let i = end - 2; i >= 0; i--) {
            if(instruction[i] == 1)
                modes[end - 3 - i] = true;
        }
        i = doOpCode(opCode, modes[0], modes[1], modes[2], i, memory);
    }
    return memory;
}

function solve1(inputAsList) {
    return runComputer(inputAsList);
}

function solve2(inputAsList) {
    return runComputer(inputAsList);
}

const readInterface = readline.createInterface({
    input: fs.createReadStream('day5input.txt'),
    console: false
});

let inputAsList = [];

readInterface.on('line', function(line) {
    line = line.split(',').map(x => Number(x));
    inputAsList = line;
});

readInterface.on('close', function() {
      solve1(Array.from(inputAsList));
      solve2(Array.from(inputAsList));
});
