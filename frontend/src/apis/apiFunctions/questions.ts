import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import { questionEndpoints } from "../apiEndpoints";


export const getQuestionsByPage = async (page: string) => {
    try{

        const response = await apiConnector("POST" , questionEndpoints.getQuestionsByPage , {page} , {} , {});
        console.log(response);
        
        if(response.status === 500){
            throw new Error(response.data.message);
        } 
            
        
        return response.data.data;

    } catch(error){
        console.log((error as Error).message);
    }
}

export const getQuestionsById = async (id: string) => {
    try{
        console.log(questionEndpoints.getQuestionsById + id);
        
        const response = await apiConnector("POST" , questionEndpoints.getQuestionsById + id  , {} , {} , {id});
        console.log(response);
        
        if(response.status === 500){
            throw new Error(response.data.message);
        } 
            
        
        return response.data.data;

    } catch(error){
        console.log((error as Error).message);
    }
}

export const getQuestionsByFilter = async (tag: string ,  difficulty: string ,  search: string ) => {
    try{

        const response = await apiConnector("POST" , questionEndpoints.getQuestionsByFilter , {search , tag , difficulty} , {} , {});

        if(response.status === 500){
            throw new Error(response.data.message);
        }

        return response.data.data;

    } catch(error){
        console.log((error as Error).message);
        toast((error as Error).message);
    }
}