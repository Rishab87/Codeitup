import axios from "axios"

export const axiosInstance = axios.create({
    withCredentials:true,
    headers:{
        'Content-Type': 'application/json',
    }
});

export const apiConnector = (method:string , url:string , bodyData:object , headers:object , params:object)=>{
    return axiosInstance({
        method,
        url,
        data: bodyData? bodyData: null,
        headers: headers,
        params: params? params: null,
    })
}