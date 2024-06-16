import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apiEndpoints";


export const usernameAvailable = async (username: string) => {
    try{

        const response = await apiConnector("POST" , profileEndpoints.checkUsername , {username} , {} , {});

        if(response.status === 500){
            throw new Error(response.data);
        }

        return response.data.success;

    } catch(error){
        console.log(error);
        return -1;
    }
}