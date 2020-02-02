const fs = require('fs');
const readline = require('readline');

function walkOrbit(orbit, orbits) {
    let count = 0;
    if(!orbits[orbit]) return 0;
    for(let subOrbit of orbits[orbit]) {
        count += walkOrbit(subOrbit, orbits);
        count++;
    }
    return count;
}

function getAncestorsHelper(orbit, orbits, ancestors) {
    if(orbit == 'COM') return ancestors;
    for(let key of Object.keys(orbits)) {
        if(orbits[key].indexOf(orbit) > -1) {
            ancestors.push(key);
            getAncestorsHelper(key, orbits, ancestors);
        }
    }
    return ancestors;
}

function getAncestors(orbit, orbits) {
    return getAncestorsHelper(orbit, orbits, []);
}

function solve1(inputAsList) {
    let orbits = {};

    for(let line of inputAsList) {
        let orbit = line.split(')');
        if(!orbits[orbit[0]])
            orbits[orbit[0]] = [];
        orbits[orbit[0]].push(orbit[1]);
    }

    let count = 0;
    for(let orbit of Object.keys(orbits)) {
        count += walkOrbit(orbit, orbits);
    }

    return count;
}

function solve2(inputAsList) {
    let orbits = {};

    for(let line of inputAsList) {
        let orbit = line.split(')');
        if(!orbits[orbit[0]])
            orbits[orbit[0]] = [];
        orbits[orbit[0]].push(orbit[1]);
    }
    let youAncestors = getAncestors('YOU', orbits).reverse();
    let sanAncestors = getAncestors('SAN', orbits).reverse();
    let commonAncestors = youAncestors.filter(x => sanAncestors.includes(x));
    let distances = commonAncestors.map(x => [
                        ...youAncestors.slice(youAncestors.indexOf(x)),
                        ...sanAncestors.slice(sanAncestors.indexOf(x) + 1)
                    ]);
    return Math.min(...distances.map(x => x.length -1 ));
}

const readInterface = readline.createInterface({
    input: fs.createReadStream('day6input.txt'),
    console: false
});

let inputAsList = [];

readInterface.on('line', function(line) {
    inputAsList.push(line);
});

readInterface.on('close', function() {
    console.log(solve1(inputAsList));
    console.log(solve2(inputAsList));
});
