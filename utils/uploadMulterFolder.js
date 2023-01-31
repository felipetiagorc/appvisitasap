import multer from 'multer';
import path from 'path';
// import { randomBytes } from 'node:crypto';

let storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
    );
  },
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg' && ext !== '.pdf') {
      return callback(new Error('Apenas imagens e pdf'));
    }
    callback(null, true);
  }
});

const uploadMulterFolder = multer({
  storage: storageConfig,
  limits: {
    fieldNameSize: 60,
    fieldSize: 2048,
    files: 1,
    fileSize: 2 * 1024 * 1024
  }

  // preservePath: true,
});

export default uploadMulterFolder;
