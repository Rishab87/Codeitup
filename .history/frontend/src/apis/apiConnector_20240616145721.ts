import axios from "axios"

<<<<<<< HEAD
export const axiosInstance = axios.create({
    withCredentials:true,
    headers:{
        'Content-Type': 'application/json',
    }
});
=======
export const axiosInstance = axios.create({});
>>>>>>> 08d2792acebb2929a1d39e405bed66bb0f12d4ac

export const apiConnector = (method:string , url:string , bodyData:object , headers:object , params:object)=>{
    return axiosInstance({
        method,
        url,
        data: bodyData? bodyData: null,
        headers: headers,
        params: params? params: null,
    })
}