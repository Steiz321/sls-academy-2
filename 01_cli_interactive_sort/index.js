const readline = require('readline');
const {
    stdin: input,
    stdout: output,
} = require('process');

// test string: cheese cake 65 water 7584 water apple 984 home 234 beer cookie

const rl = readline.createInterface({ input, output });

////////////

const takeWords = (arr) => {
    return arr.filter(el => isNaN(el))
} 

// 1
const wordsAlphabeticaly = (arr) => {
    let words = arr.filter(el => isNaN(el))

    return words.sort((a,b) => (a > b) ? 1 : -1);
}

// 2
const numbersFromSmallToBig = (arr) => {
    let numbers = arr.filter(el => !isNaN(el));

    return numbers.sort((a,b) => a-b);
}

// 3
const numbersFromBigToSmall = (arr) => {
    let numbers = arr.filter(el => !isNaN(el));

    return numbers.sort((a,b) => b-a);
}

// 4
const ascendingWords = (arr) => {
    let words = arr.filter(el => isNaN(el));

    return words.sort((a,b) => a.length - b.length);
}

// 5
const uniqueWords = (arr) => {
    let words = takeWords(arr);
    
    return uniqueValues(words);
}

// 6
const uniqueValues = (arr) => {
    let uniques = new Set(arr);

    return Array.from(uniques);
}


////////////

const makeChoices = (data) => {
    let stringData = data.toString().trim();

    let splittedData = stringData.split(' ');

    let inputArray = [];

    splittedData.map(el => {
        inputArray.push(el);
    })
    
    console.log('\nHow would you like to sort your values?')

    rl.question('1. Words from A to Z\n2. Numbers from smaller\n3. Numbers from bigger\n4. Words by quantity of letters\n5. Unique words\n6. Unique values\n\nSelect 1-6 and press ENTER or type exit: ', (choice) => {
        switch(choice) {
            case '1': {
                let words = wordsAlphabeticaly(inputArray);
                console.log(words);
                start();
                break;
            }
            case '2': {
                let nums = numbersFromSmallToBig(inputArray);
                console.log(nums);
                start();
                break;
            }
            case '3': {
                let nums = numbersFromBigToSmall(inputArray);
                console.log(nums);
                start();
                break;
            }
            case '4': {
                let words = ascendingWords(inputArray);
                console.log(words);
                start();
                break;
            }
            case '5': {
                let words = uniqueWords(inputArray);
                console.log(words);
                start();
                break;
            }
            case '6': {
                let values = uniqueValues(inputArray);
                console.log(values);
                start();
                break;
            }
            case 'exit': {
                rl.close();
                break;
            }
            default: {
                console.log('Invalid choice');
                makeChoices(data);
                break;
            }
        }
    });
}

const start = async () => {
    rl.question('Hello. Write 10 words or digits divided them in spaces: ', (data) => makeChoices(data));
}

rl.on('close', () => console.log('Good bye! Come back again!'))


start();