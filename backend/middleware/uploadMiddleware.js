const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "expense-tracker/profiles",
        allowedFormats: ["jpeg", "png", "jpg"],
    },
});

const fileFilter = (req , file , cb) => {
    const allowedTypes = ['image/jpeg' , 'image/png' , 'image/jpg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error("Only .jpeg , .jpg , .png formats are allowed") , false);
    }
};

const upload = multer({storage,fileFilter});

module.exports =upload;