const fs = require('fs');

const getDefaultProfilePricture = () => {
    const newImg =
        fs.readFileSync(
            'public/imgs/default-profile.jpg');

    const image = {
        default: newImg.toString('base64'),
    };

    return image;
};

const getNewProfilePicture = (req) => {
    const newImg = fs.readFileSync(req.file.path);

    const image = {
        contentType: req.file.mimetype,
        size: req.file.size,
        encoded: newImg.toString('base64'),
    };

    return image;
};


module.exports = {
    getDefaultProfilePricture,
    getNewProfilePicture,
};
