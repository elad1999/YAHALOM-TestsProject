import http from "./httpService";
const serverRouter = "/api/Tests/";


 export const getAllTests=async()=>{
        return await http.get(serverRouter + "getTests");
    };

    // async getTestsBySubjectId(subjectId: any){
    //     return await http.get(serverRouter + "getTestsBySubject", subjectId)
    // },

    export  const addTest=async(test)=>{
        return await http.post(serverRouter + "addTest", test)
    };

    export   const getAllSubjects=async()=>{
        return await http.get(serverRouter + "getSubjects")
    };
    export  const getTestModel=async()=>{
        return await http.get(serverRouter + "getTestModel")
    };
    export  const getAllQuestions=async()=>{
        return await http.get(serverRouter + "getQuestions");
    };
    

