const db = require('../DAL/db.testsRepo');

class TestsController {
    getAllTests(){
        return db.getAllTests();
    }
    getSubjects(){
        return db.getAllSubjects();
    }
    // getTestsBySubject(subjectId){
    //     return db.getAllTestsBySubject(subjectId);
    // }
    addTest(test){
        return db.addTest(test);
    }
    getAllQuestions(){
        return db.getAllQuestions();
    }
} 

module.exports = new TestsController();