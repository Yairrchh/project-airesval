import { NextResponse } from "next/server"
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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