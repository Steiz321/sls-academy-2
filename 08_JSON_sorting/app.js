const urls = [
    'https://jsonbase.com/sls-team/json-793',
    'https://jsonbase.com/sls-team/json-955',
    'https://jsonbase.com/sls-team/json-231',
    'https://jsonbase.com/sls-team/json-931',
    'https://jsonbase.com/sls-team/json-934759834593475',
    'https://jsonbase.com/sls-team/json-93',
    'https://jsonbase.com/sls-team/json-342',
    'https://jsonbase.com/sls-team/json-770',
    'https://jsonbase.com/sls-team/json-491',
    'https://jsonbase.com/sls-team/json-281',
    'https://jsonbase.com/sls-team/json-718',
    'https://jsonbase.com/sls-team/json-310',
    'https://jsonbase.com/sls-team/json-806',
    'https://jsonbase.com/sls-team/json-469',
    'https://jsonbase.com/sls-team/json-258',
    'https://jsonbase.com/sls-team/json-516',
    'https://jsonbase.com/sls-team/json-79',
    'https://jsonbase.com/sls-team/json-706',
    'https://jsonbase.com/sls-team/json-521',
    'https://jsonbase.com/sls-team/json-350',
    'https://jsonbase.com/sls-team/json-64']

const fetchFile = async (url) => {
    let counter = 0;

    while (counter < 3) {
        try {
            let response = await fetch(url);
            return await response.json();
        } catch (err) {
            counter++;
        }
    }

    return null;
}

const searchIsDone = (obj) => {

    let keys = Object.keys(obj);

    if(keys.includes('isDone')) {
        return obj.isDone;
    } else {
        let values = Object.values(obj);
        for(let i = 0; i < values.length; i++) {
            if(typeof values[i] === 'object') {
                let val = searchIsDone(values[i]);
                if(val !== undefined) return val;
            }
        }
        return undefined;
    }
}

const start = async () => {
    let result = {
        True: 0,
        False: 0
    }

    for (const el of urls) {

        let data = await fetchFile(el);

        if(data !== null) {
            let res = searchIsDone(data);
            if(res !== undefined) {
                console.log(`[Success] ${el}: isDone - ${res}`);
                if(res === true) {
                    result.True += 1;
                } else {
                    result.False += 1;
                }
            } else {
                console.log(`[Failed] ${el}: Not found!`);
            }
        } else {
            console.log(`[Failed] ${el}: The endpoint is unavailable!`);
        }

    }

    console.log(`\n-------------------\nFound True values: ${result.True}\nFound False values: ${result.False}`);

}


start();
