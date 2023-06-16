import * as fs from 'fs';

// Later I'll implement that task with promise based methods. It will be faster.
// Another solution to the problem will be in the same repository in another file

const uniqueValues = () => {
    let data = "";
    let dataCol
    for(let i = 0; i < 20; i++) {
        dataCol = fs.readFileSync(`./data/out${i}.txt`)
        data += dataCol
    }
    let arr = data.split('\n');
    let uniqueArray = new Set(arr);

    return uniqueArray.size;
}

const existInAllFiles = () => {
    let dataCol
    let map = new Map();

    for(let i = 0; i < 20; i++) {
        dataCol = fs.readFileSync(`./data/out${i}.txt`).toString();

        let arr = dataCol.split('\n');
        let set = new Set(arr);

        set.forEach(el => {
            if(!map.has(el)) {
                map.set(el, 1);
            } else {
                let counter = map.get(el) + 1;
                map.set(el, counter);
            }
        });
    }

    let usernamesCounter = 0;
    for( const [key, value] of map) {
        if(value === 20) {
            usernamesCounter++;
        }
    }

    return usernamesCounter;

}

const existInAtLeastTen = () => {
    let dataCol;
    let map = new Map();

    for(let i = 0; i < 20; i++) {
        dataCol = fs.readFileSync(`./data/out${i}.txt`).toString();

        let arr = dataCol.split('\n');
        let set = new Set(arr);

        set.forEach(el => {
            if(!map.has(el)) {
                map.set(el, 1);
            } else {
                let counter = map.get(el) + 1;
                map.set(el, counter);
            }
        });
    }

    let usernamesCounter = 0;
    for( const [key, value] of map) {
        if(value >= 10) {
            usernamesCounter++;
        }
    }

    return usernamesCounter;
}

let start = Date.now();
const unique = uniqueValues();
let end = Date.now();
console.log('uniqueValues: ', unique);
console.log('time elapsed:', end - start, 'ms');

start = Date.now();
let allFiles = existInAllFiles();
end = Date.now();
console.log('existInAllFiles: ', allFiles)
console.log('time elapsed:', end - start, 'ms');

start = Date.now();
let tenFiles = existInAtLeastTen();
end = Date.now();
console.log('existInAtLeastTen', tenFiles);
console.log('time elapsed:', end - start, 'ms');
