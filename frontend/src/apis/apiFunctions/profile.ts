import { toast } from "sonner";
import { apiConnector } from "../apiConnector";
import { profileEndpoints } from "../apiEndpoints";
import { setToken, setUser } from "@/redux-toolkit/slices/auth";
import { removeCookie } from "./auth";

export const usernameAvailable = async (username: string) => {
    try{

        const response = await apiConnector("POST" , profileEndpoints.checkUsername , {username} , {} , {});

        if(response.status === 500){
            throw new Error(response.data);
        }

        return response.data.success;

    } catch(error){
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
        toast((error as any)?.response?.data?.message);
    }
}

export const deleteProfile = async (router:any , dispatch:any) => {
    try{
        toast("Deleting Profile");
        const response = await apiConnector("POST" , profileEndpoints.deleteProfile , {} , {} , {});

        if(!response.data.success){
            throw new Error(response.data);
        }
        toast("Profile Deleted");
        dispatch(setUser(null));
        dispatch(setToken(null));
        removeCookie();
        router.push('/');

    } catch(error){
        toast("Error Deleting Profile");
    }
}