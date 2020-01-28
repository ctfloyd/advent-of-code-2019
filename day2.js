const fs = require('fs');
const readline = require('readline');

let OPCODES = {
    '1': 4,
    '2': 4,
    '99': 0
};

function doOpCode(opCode, idx, memory) {
    switch(opCode) {
        case 1:
            memory[memory[idx + 3]] = memory[memory[idx + 1]] + memory[memory[idx + 2]];
            break;
        case 2:
            memory[memory[idx + 3]] = memory[memory[idx + 1]] * memory[ memory[idx + 2]];
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
        i = doOpCode(memory[i], i, memory);
    }
    return memory;
}

function solve1(inputAsList) {
    inputAsList[1] = 12;
    inputAsList[2] = 2;
    return runComputer(inputAsList)[0];
}

function solve2(inputAsList) {
    for(let i = 0; i < 100; i++) {
        for(let j = 0; j < 100;j ++) {
            inputAsList[1] = i;
            inputAsList[2] = j;
            let output = runComputer(Array.from(inputAsList));
            if(output[0] == 19690720)
                return 100 * i + j;
        }
    }
}

const readInterface = readline.createInterface({
    input: fs.createReadStream('day2input.txt'),
    console: false
});

let inputAsList = [];

readInterface.on('line', function(line) {
    line = line.split(',').map(x => Number(x));
    inputAsList = line;
});

readInterface.on('close', function() {
    console.log(solve1(Array.from(inputAsList)));
    console.log(solve2(Array.from(inputAsList)));
});
