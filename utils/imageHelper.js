const fs = require('fs');
const Binary = require('mongodb').Binary;

const getDefaultProfilePricture = () => {
    const newImg =
        fs.readFileSync(
            'public/uploads/default-profile.jpg');

    const image = {
        default: new Binary(newImg.toString('base64')),
    };

    return image;
};

const getNewProfilePicture = (req) => {
    const newImg = fs.readFileSync(req.file.path);

    const image = {
        contentType: req.file.mimetype,
        size: req.file.size,
        encoded: new Binary(newImg.toString('base64')),
    };

    return image;
};


module.exports = {
    getDefaultProfilePricture,
    getNewProfilePicture,
};
