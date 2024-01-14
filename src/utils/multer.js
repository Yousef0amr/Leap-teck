const multer = require('multer')

const filesValidation = {
    image: /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP|jfif)$/,
    video: /\.(mp4|avi|flv|wmv|mov|mpeg|3gp|jfif)$/,
    all: /\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP|mp4|avi|flv|wmv|mov|mpeg|3gp|jfif)$/
}
Object.freeze(filesValidation)

const multerConfig = (allowedFiles = filesValidation.image) => {

    const storage = multer.diskStorage({})
    const fileFilter = (req, file, cb) => {
        if (!file.originalname.match(allowedFiles)) {
            cb("error in upload", false)
        } else {
            cb(null, true)
        }
    }

    const uploads = multer({
        limits: {
            fileSize: 20 * 1024 * 1024 // 20MB
        }, fileFilter, storage
    })
    return uploads
}


module.exports = {
    multerConfig,
    filesValidation
}