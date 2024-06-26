import { getServerSession } from "next-auth";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apiEndpoints";
import { setToken, setUser } from "@/redux-toolkit/slices/auth";
import { toast } from "sonner"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

//add toast
export const login = async(data: object , dispatch: any , router: any)=>{
    try{

        toast("Logging in");
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
        toast("Sending OTP");
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

export const signup = async(data:any , router:any , dispatch:any)=>{
    try{

        const response = await apiConnector("POST" , authEndpoints.signup , data , {} , {});

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast("Singed Up Successfully");
        dispatch(setUser(null));
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
            console.log(error);
        }
    
}

export const googleLogin = async(dispatch: any)=>{

    
    try {
            const res = await fetch('/api/get-server-session' , {
                method: "GET"
            })  
            const userInfo = await res.json();
            console.log(userInfo);
            const response = await apiConnector("POST" , authEndpoints.nextAuth , userInfo.data , {} , {});
    
            console.log(response);
            
            if (response.data.success) {
                dispatch(setToken(response.data.token));
                dispatch(setUser(response.data.data));
            } else {
                throw new Error(response.data.message);
            }
    } catch (error) {
            console.log(error);
            toast("Can't login");
    }
}

export const changePassword = async(data: any)=>{
    try{
        toast("Changing password");
        const response = await apiConnector("POST" , authEndpoints.changePassword , data , {} , {});

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast("Password changed successfully");

    } catch(error){
        console.log(error);
        toast((error as Error)?.response?.data?.message);
    }
}

export const forgotPasswordToken = async(email: string)=>{
    try{
        toast("Sending email");
        const response = await apiConnector("POST" , authEndpoints.forgotPasswordToken , {email} , {} , {});

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast("Email sent");

    } catch(error){
        console.log(error);
        toast((error as Error)?.response?.data?.message);
    }
}

export const forgotPassword = async(data: any , dispatch:any , router: any)=>{
    try{
        toast("Changing password");
        const response = await apiConnector("POST" , authEndpoints.forgotPassword , data , {} , {});

        if(!response.data.success){
            throw new Error(response.data.message);
        }

        toast("Password changed successfully");
        removeCookie();
        dispatch(setUser(null));
        dispatch(setToken(null));
        router.push('/login');

    } catch(error){
        console.log(error);
        if((error as Error)?.response?.data?.message)
            toast((error as Error)?.response?.data?.message);
        else
            toast("Internal server error");
    }
}