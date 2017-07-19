const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        if (!file.originalname.match(/\.(png|jpeg|jpg|wav|tif|gif)$/)) {
            const err = new Error();
            err.code = 'filetype';
            return cb(err);
        }

        return cb(null, file.fieldname + '-' + Date.now());
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
