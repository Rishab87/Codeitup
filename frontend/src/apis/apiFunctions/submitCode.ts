import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import { submissionEndpoints } from "../apiEndpoints";


export const submitProblem = async (code: string , language:string , questionId:string , userCode:string | null) => {
    try{
        const response = await apiConnector("POST" , submissionEndpoints.submitCode , {code , language , questionId , userCode} , {} , {});
        
        if(response.status === 500){
            throw new Error(response.data);
        } 
            
        
        return response.data.data;

    } catch(error){
        toast((error as Error).message);
    }
}

export const getSubmissionsForQuestion = async (questionId:string ) => {
    try{
        const response = await apiConnector("POST" , submissionEndpoints.getUserSubmissionsByQuestion , {questionId} , {} , {});
        
        if(!response.data.success){
            throw new Error(response.data);
        } 
        
        return response.data.data;

    } catch(error){
        toast((error as Error).message);
    }
}