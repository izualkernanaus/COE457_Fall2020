const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG)$/)) {
        req.fileValidationError = 'Only jpeg files are allowed!';
        return cb(new Error('Only jpeg files are allowed!'), false);
    }
    cb(null, true);
};
exports.imageFilter = imageFilter;