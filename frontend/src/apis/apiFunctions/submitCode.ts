import { apiConnector } from "../apiConnector";
import { submissionEndpoints } from "../apiEndpoints";


export const submitProblem = async (code: string , language:string , questionId:string , userCode:string | null) => {
    try{
        const response = await apiConnector("POST" , submissionEndpoints.submitCode , {code , language , questionId , userCode} , {} , {});
        console.log(response);
        
        if(response.status === 500){
            throw new Error(response.data);
        } 
            
        
        return response.data.data;

    } catch(error){
        console.log((error as Error));
    }
}

export const getSubmissionsForQuestion = async (questionId:string ) => {
    try{
        const response = await apiConnector("POST" , submissionEndpoints.getUserSubmissionsByQuestion , {questionId} , {} , {});
        console.log(response);
        
        if(!response.data.success){
            throw new Error(response.data);
        } 
        
        return response.data.data;

    } catch(error){
        console.log((error as Error));
    }
}