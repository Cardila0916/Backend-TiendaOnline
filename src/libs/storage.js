import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, './src/storage/imgs');
    },
    filename: function (req, file, cd) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cd(null,`${file.fieldname}-${uniqueSuffix}.png`);
    }
});

const upload = multer({storage});

export default upload;