import { apiConnector } from "../apiConnector";


export const usernameAvailable = async (username: string) => {
    try{

        const response = await apiConnector("POST" , profi)

    } catch(error){
        console.log(error);
        return -1;
    }
}