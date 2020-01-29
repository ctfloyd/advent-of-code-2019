const fs = require('fs');
const readline = require('readline');

function doDigtsIncrease(number) {
    if(typeof number == Number) {
        number = String(number);
    }
    let maxValue = 0;
    for(let i = 0; i < number.length; i++) {
        if(Number(number[i]) >= maxValue) {
            maxValue = Number(number[i]);
        } else {
            return false;
        }
    }
    return true;
}

function correctLength(number) {
    return String(number).length == 6;
}

function hasAdjacentDigits(number) {
    if(typeof number == Number) {
        number = String(number);
    }
    for(let i = 1; i <= number.length; i++) {
        if(number[i - 1] == number[i]) {
            return true;
        }
        continue;
    }
}

function checkCriteria(number) {
    return correctLength(number) && hasAdjacentDigits(number) && doDigitsIncrease(number);
}

function solve1(lowerRange, upperRange) {
    let count = 0;
    for(let i = lowerRange; i <= upperRange; i++) {
        if(checkCriteria(i)) count++;
    }
    return count;
}

function solve2(inputAsList) {
}

console.log(solve1(136818, 685979));

