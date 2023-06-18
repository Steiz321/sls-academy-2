import * as fs from 'fs';

const fetchData = async () => {
    let response = await fetch('https://jsonbase.com/sls-team/vacations');
    let data = await response.json();
    return data;
}

const newJSON = async () => {

    let data = await fetchData();

    let jsonData = [];
    let newObj = {}

    data.forEach(el => {

        const takeUser = jsonData.find(jsonEl => jsonEl.userName === el.user.name);

        if(takeUser) {
                takeUser.vacations.push({
                    startDate: el.startDate,
                    endDate: el.endDate,
                })
        } else {
            newObj = {
                userId: el.user._id,
                userName: el.user.name,
                vacations: [
                    {
                        startDate: el.startDate,
                        endDate: el.endDate,
                    }
                ]
            }
            jsonData.push(newObj);
        }
    })

    return jsonData;

}

const start = async () => {
    let result = await newJSON();
    let resData = JSON.stringify(result)
    fs.writeFileSync('./resultJSON.json', resData);
}

start();


