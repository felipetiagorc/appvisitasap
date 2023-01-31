import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

import { randomBytes } from 'node:crypto';

aws.config.update({
  secretAccessKey: process.env.SAP_AWS_SECRET_KEY,
  accessKeyId: process.env.SAP_AWS_ACCESS_KEY,
  region: process.env.SAP_AWS_REGION,
  bucket: process.env.SAP_AWS_BUCKET,
});

let s3 = new aws.S3({});

const uploadMulterS3 = multer({
  storage: multerS3({
    s3,
    bucket: process.env.SAP_AWS_BUCKET,
    acl: 'public-read',
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;
        cb(null, fileName);
      });
    },
  }),
});
export default uploadMulterS3;
