const db = require('../DAL/db.testsRepo');

class TestsController {
    getAllTests(){
        return db.getAllTests();
    }
    getTestsBySubject(subjectId){
        return db.getAllTestsBySubject(subjectId);
    }
    addTest(test){
        return db.addTest(test);
    }
} 

module.exports = new TestsController();