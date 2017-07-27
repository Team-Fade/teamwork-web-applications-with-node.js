const fs = require('fs');
const Binary = require('mongodb').Binary;

const getDefaultProfilePricture = () => {
    const newImg =
        fs.readFileSync(
            'public/uploads/default-profile.jpg');

    const image = {
        data: new Binary(newImg.toString('base64')),
    };

    return image;
};

const getDefaultEventPricture = () => {
    const newImg =
        fs.readFileSync(
            'public/uploads/default-event.jpg');

    const image = {
        data: new Binary(newImg.toString('base64')),
    };

    return image;
};

const setNewPicture = (req) => {
    const newImg = fs.readFileSync(req.file.path);

    const image = {
        data: new Binary(newImg.toString('base64')),
    };

    return image;
};


module.exports = {
    getDefaultProfilePricture,
    getDefaultEventPricture,
    setNewPicture,
};
