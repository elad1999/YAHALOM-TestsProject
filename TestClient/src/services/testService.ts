import http from "./httpService";

export interface Test {
    Id: Number;
    Title: String;
}

const serverRouter = "/api/Tests/";

const TestService = {
    async getAllTests(){
        return await http.get(serverRouter + "getTests");
    },

    // async getTestsBySubjectId(subjectId: any){
    //     return await http.get(serverRouter + "getTestsBySubject", subjectId)
    // },

    async addTest(test: any){
        return await http.post(serverRouter + "addTest", test)
    },

    async getAllSubjects(){
        return await http.get(serverRouter + "getSubjects")
    },
    async getTestModel(){
        return await http.get(serverRouter + "getTestModel")
    },
    async getAllQuestions(){
        return await http.get(serverRouter + "getQuestions");
    },
    
}

export default TestService;