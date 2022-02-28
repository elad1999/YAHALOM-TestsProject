const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = './data/jsonAsDb.json';

class DbQuestionsRepo {
    async getAllQuestions(){
        const data = JSON.parse(await readFile(jsonFileName));
        return data;
    }
    async addQuestion(question){

    }
    async editQuestion(question){
        
    }
}

module.exports = new DbQuestionsRepo();