import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


export const UploadImage = async (file: File, folder: string) => {

    const buffer = await file.arrayBuffer();
    const bytes = Buffer.from(buffer);
    console.log(file, folder)

    return new Promise(async(resolve, reject) => {
        cloudinary.uploader.upload_stream({
            resource_type: "auto",
            folder: folder
        }, async (err, result) => {
            if (err) {
                reject(err.message);
            }
            resolve(result);
        }).end(bytes)
    })
}