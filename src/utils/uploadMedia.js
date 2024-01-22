const wrap = require('express-async-wrapper')
const { v4: uuidv4 } = require('uuid');


const uploadMedia = wrap(
    async (media, path) => {
        const file = await cloudnairy.uploader.upload(
            media, {
            folder: path,
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