const fs = require('fs');
const readline = require('readline');

function doDigitsIncrease(number) {
    if(typeof number == "number") {
        number = number.toString();
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
    return number.toString().length  == 6;
}

function hasAdjacentDigits(number) {
    if(typeof number == "number") {
        number = number.toString();
    }
    for(let i = 1; i <= number.length; i++) {
        if(number[i - 1] == number[i]) {
            return true;
        }
        continue;
    }
}

function hasAdjacentDigits2(number) {
    if(typeof number == 'number') {
        number = number.toString();
    }
    let runLength = 1;
    for(let i = 1; i <= number.length; i++) {
        if(number[i - 1] == number[i]) {
            runLength++;
        } else {
            if(runLength == 2) {
                return true;
            }
            runLength = 1;
        }
    }
    return false;
}

function checkCriteria(number) {
    return correctLength(number) && hasAdjacentDigits(number) && doDigitsIncrease(number);
}

function checkCriteriaTwo(number) {
    return correctLength(number) && hasAdjacentDigits2(number) && doDigitsIncrease(number);
}

function solve1(lowerRange, upperRange) {
    let count = 0;
    for(let i = lowerRange; i <= upperRange; i++) {
        if(checkCriteria(i)) count++;
    }
    return count;
}

function solve2(lowerRange, upperRange) {
    let count = 0;
    for(let i = lowerRange; i <= upperRange; i++) {
        if(checkCriteriaTwo(i)) count++;
    }
    return count;
}

console.log(solve1(136818, 685979));
console.log(solve2(136818, 685979));
