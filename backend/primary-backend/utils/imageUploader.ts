import {v2 as cloudinary} from 'cloudinary';

export const uploadImageToCloudinary = async(file:any , folder:string|undefined , height?:number , quality?:string)=>{
    const options: { folder: string | undefined; height?: number; quality?: string; resource_type?: "image" | "video" | "raw" | "auto" } = { folder };
    if(height){
        options.height = height;
    }
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";

    return cloudinary.uploader.upload(file.tempFilePath , options);
}