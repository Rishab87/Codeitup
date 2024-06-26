import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apiEndpoints";

export const usernameAvailable = async (username: string) => {
    try{

        const response = await apiConnector("POST" , profileEndpoints.checkUsername , {username} , {} , {});

        if(response.status === 500){
            throw new Error(response.data);
        }
        console.log(response);
        
        return response.data.success;

    } catch(error){
        console.log(error);
        return -1;
    }
}

export const getUserByUsername = async (username: string) => {
    try{

        const response = await apiConnector("POST" , profileEndpoints.getUserByUsername , {username} , {} , {});

        if(!response.data.success){
            throw new Error(response.data);
        }

        return response.data.data;

    } catch(error){
        console.log(error);
    }
}

export const updateProfilePicture = async (image: any , setNewUser: Function) => {
    try{
        console.log(image);
        toast("Uploading");
        const response = await apiConnector("POST" , profileEndpoints.uploadImage , {profileImage:image} , {"Content-Type": "multipart/form-data"} , {});

        if(!response.data.success){
            throw new Error(response.data);
        }
        setNewUser(response.data.data);
        toast("Image Uploaded");
        return response.data.data;

    } catch(error){
        console.log(error);
        toast("Error Uploading Image");
    }
}

export const updateProfile = async (data: any , setNewUser: Function) => {
    try{
        toast("Updating Profile");
        const response = await apiConnector("POST" , profileEndpoints.updateProfile ,  data, {} , {});

        if(!response.data.success){
            throw new Error(response.data);
        }
        setNewUser(response.data.data);
        toast("Profile Updated");
        console.log(response.data.data);
        
        return response.data.data;


    } catch(error){
        console.log(error);
        toast("Error Updating Profile");
    }
}

export const updateUsername = async (username: string , setNewUser:Function ,router:any) => {
    try{
        toast("Updating Username");
        const response = await apiConnector("POST" , profileEndpoints.updateUsername , {username} , {} , {});

        if(!response.data.success){
            throw new Error(response.data);
        }
        toast("Username Updated");
        setNewUser(response.data.data);
        router.push(`/u/${username}`);
        return response.data.data;

    } catch(error){
        console.log(error);
        toast("Error Updating Username");
    }
}

export const updateSocials = async (socials: any , setNewUser: Function) => {
    try{
        toast("Updating Socials");
        const response = await apiConnector("POST" , profileEndpoints.updateSocials , {socials: socials} , {} , {});

        if(!response.data.success){
            throw new Error(response.data);
        }
        setNewUser(response.data.data);
        toast("Socials Updated");
        return response.data.data;

    } catch(error){
        console.log(error);
        toast((error as Error)?.response?.data?.message);
    }
}