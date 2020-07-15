const { Model, DataTypes } = require('sequelize');

const aws = require('aws-sdk');

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const s3 = new aws.S3();

class Pdf extends Model {
  static init(connection) {
    super.init({
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      size: DataTypes.INTEGER,
      key: DataTypes.STRING,
      url: DataTypes.STRING,
    }, {
      hooks: {
        beforeSave: (pdf) => {
          if(process.env.STORAGE_TYPE !== 's3') {
            pdf.url = `${process.env.PDF_URL}/files/${pdf.key}`
          }

          pdf.url = `https://upload.s3-sa-east-1.amazonaws.com/${pdf.key}`
        },
        beforeDestroy: (pdf) => {
          if(process.env.STORAGE_TYPE === 's3') {
            return s3.deleteObject({
              Bucket: process.env.BUCKET_NAME,
              Key: pdf.key,
            }).promise();
          } else {
            return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', pdf.key));
          }
        }
      },
      sequelize: connection
    });
  }
}

module.exports = Pdf;