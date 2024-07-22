import { NextResponse } from "next/server"
import {writeFile} from 'fs/promises'
import path from "path"
import { v2 as cloudinary } from 'cloudinary';

(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'daxqtnbtf', 
        api_key: '881968376997923', 
        api_secret: 'Q9JuZs2jENYwFl6GCtL9RczCIGQ' // Click 'View Credentials' below to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();

export async function POST(request) {
    const data = await request.formData()

    const image = Array.from(data.getAll("imageUpload"));

    if(!image) {
        return NextResponse.json("imagen no subida", { status: 400 })
    }


    const uploadPromises = image.map(async (image) => {


        const bytes = await image.arrayBuffer()
        const buffer = Buffer.from(bytes)
    
        // upload in a archive
    
        // const filepath = path.join(process.cwd(), "public", image.name)
        // console.log('filePath', filepath)
        // await writeFile(filepath, buffer)
    
        return new Promise((resolve, reject) => {
    
            cloudinary.uploader.upload_stream({}, (err, result) => {
                if (err) {
                    reject(err)
                }
    
                resolve(result);
            })
            .end(buffer)
        });
    })


    try {
        const responses = await Promise.all(uploadPromises);
        // Asumiendo que quieres devolver todas las URLs seguras de las imágenes subidas
        const urls = responses.map(response => response.secure_url);
        console.log('urls de las imagenes',urls);
        return NextResponse.json({message: "imagenes subidas", urls: urls});
    } catch (error) {
        console.error(error);
        return NextResponse.json("Error subiendo imágenes", { status: 500 });
    }
    // const response = await Promise.all(uploadPromises)

    // console.log(response)

    // return NextResponse.json({message: "imagen subida", url: response.secure_url})
}