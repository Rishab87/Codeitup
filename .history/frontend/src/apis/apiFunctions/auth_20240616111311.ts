import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apiEndpoints";
import { setToken, setUser } from "@/redux-toolkit/slices/auth";
import {toast} from 'sonner'

//add toast
export const login = async(data: object , dispatch: any , router: any)=>{
    try{

        const response = await apiConnector("POST" , authEndpoints.login , data , {} , {});

        if(!(response.status == 200)){
            throw new Error(response.data.message);
        }

        dispatch(setToken(response.data.token));
        dispatch(setUser(response.data.data));

        router.back();

    } catch(error){
        console.log(error);
        toast((error as Error).message);
    }
}

export const sendotp = async(email:string , router:any)=>{
    try{

        const response = await apiConnector("POST" , authEndpoints.sendOtp , {email} , {}  , {});

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast("OTP sent");
        router.push('/otp');

    } catch(error){
        console.log(error);
        toast("Can't send OTP");
        
    }
}

export const signup = async(data:any , router:any)=>{
    try{

        const response = await apiConnector("POST" , authEndpoints.signup , data , {} , {});

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast("Singed Up Successfully");
        router.push('/login');

    } catch(error){
        console.log(error);
        toast((error as Error).message);
    }
}

export const removeCookie = async()=>{
    try{

        const response = await apiConnector("POST" , authEndpoints.expireCookie , {} , {} , {});

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast("Logged out successfully");

    } catch(error){
        console.log(error);
    }
}

export const cookieLogin = async(dispatch:any)=>{
        try{
            const response = await apiConnector("POST" , authEndpoints.cookieLogin , {} , {} , {});
            console.log(response);
            

            if(!response.data.success){
                throw new Error(response.data.message);
            }

            dispatch(setUser(response.data.data));
            dispatch(setToken(response.data.data.token));    

        } catch(error){
            removeCookie();
            console.log(error);
        }
    
}