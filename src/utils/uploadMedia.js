const wrap = require('express-async-wrapper')
const { v4: uuidv4 } = require('uuid');
const cloudnairy = require('./../config/cloudinary')
const uploadMedia = wrap(
    async (media, folder) => {
        const file = await cloudnairy.uploader.upload(
            media, {
            folder,
            public_id: uuidv4(),
            use_filename: true,
            unique_filename: true,
            resource_type: "auto"
        }
        )
        return file.public_id
    }
)


module.exports = uploadMedia