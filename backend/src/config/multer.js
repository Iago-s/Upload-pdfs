const multer= require('multer');
const path = require('path');
const crypto = require('crypto');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const storageTypes = {
  local: multer.diskStorage({
    destination: (request, file, cb) => {
      cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
    },
    filename: (request, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) {
          cb(err);
        }
        
        file.key = `${hash.toString('hex')}-${file.originalname}`;
        
        cb(null, file.key);
      });
    }
  }),
  s3: multerS3({
    s3: new aws.S3(),
    bucket: 'uploadpdfs',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (request, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if(err) {
          cb(err);
        }

        file.key = `${hash.toString('hex')}-${file.originalname}`;

        cb(null, file.key);
      });
    }
  }),
}

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: storageTypes[process.env.STORAGE_TYPE],
  fileFilter: (request, file, cb) => { 
    if(file.mimetype != 'application/pdf') {
      cb(new Error('Formato de arquivo não permitido.'));
    } else {
      cb(null, true);
    }
  }
};