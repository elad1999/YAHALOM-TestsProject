const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);
const jsonFileName = "./data/jsonAsDb.json";
const testModel = require('../models/testModel')

class DbTestsRepo {
  async getAllTests() {
    const data = JSON.parse(await readFile(jsonFileName));
    return data;
  };

  async getAllTestsBySubject(subjectId) {
    const tmp = JSON.parse(await readFile(jsonFileName));
    let data;
    tmp.forEach(test => {
      if(test.subjectId === subjectId) data.push(test);
    });
    return data;
  };


  async addTest(test) {
    let data = JSON.parse(await readFile(jsonFileName));
    const bigggestId = Math.max.apply(
      Math,
      data.map((test) => test.Id)
    );
    testModel.Id = bigggestId + 1;
    testModel.Title = test.Title;
    testModel.Questions = test.Questions;

    data.push(testModel);
    await writeFile(jsonFileName, JSON.stringify(data));
    return testModel;
  }
}

module.exports = new DbTestsRepo();
