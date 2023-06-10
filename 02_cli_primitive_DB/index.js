import inquirer from 'inquirer';
import * as fs from 'fs';

const createNewUser =  (name, gender, age) => {

    if(fs.existsSync('./DB.txt')) {
        let users = [];

        const data = fs.readFileSync('./DB.txt', 'utf8');

        if(data !== '') {
            users = JSON.parse(data);
        }

        users.push({name, gender, age});

        fs.writeFile('./DB.txt', JSON.stringify(users), (err) => {if(err) throw err;});
    } else {

        fs.writeFile('./DB.txt', '', (err) => {
            if(err) throw err;
        })

        createNewUser(name, gender, age);
    }
    


}

const printAll = () => {

    let users = []
    
    const data = fs.readFileSync('./DB.txt');

    if(data !== '') {
       users = JSON.parse(data);
    }

    console.log(users)

}

const findUserByName = (name) => {
    let data = fs.readFileSync('./DB.txt');
        
    if(data !== '') {
        let users = JSON.parse(data);

        let searchResult = users.find(user => user.name.toLowerCase() === name.toLowerCase());
        if(!searchResult) {
            return "User does not exist"
       }
       console.log(`User ${searchResult.name} was found!`);
       return console.log(JSON.stringify(searchResult));
    }

    return console.log('Database is empty')
}

const ask = () => {

    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: "Enter the user's name. To cancel press ENTER:"
    }).then( async answers => {
        let name = answers.name;
        let gender;
        let age;

        if(name === "") {
            // continue to find function
            await inquirer.prompt({
                type: 'confirm',
                name: 'confirm',
                message: "Would you like to search the values in DB?"
            }).then(async answer => {

                if(answer.confirm === true) {
                    printAll();

                    await inquirer.prompt({
                        type: 'input',
                        name: 'searchName',
                        message: "Enter the user's name you wanna find in DB:"
                    }).then(search => {
                        //search
                        findUserByName(search.searchName);
                    })
                }
            })  
        } else {
            // Create new user
            await inquirer.prompt({
                type: 'list',
                name: 'gender',
                message: "Choose your Gender:",
                choices: ['Male', 'Female']
            }).then(answer => {
                gender = answer.gender;
            })

            await inquirer.prompt({
                type: 'input',
                name: 'age',
                message: "Enter your age:"
            }).then(answer => {
                age = answer.age;
                createNewUser(name, gender, age);
            })

            ask();
        }
    })

}


ask();