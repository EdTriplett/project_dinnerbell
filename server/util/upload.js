const AWS = require("aws-sdk");
AWS.config.setPromisesDependency(require("bluebird"));
const s3 = new AWS.S3();
const mime = require("mime");
const path = require("path");
const md5 = require("md5");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const Picture = require("../models/Picture");
const BUCKET = process.env.AWS_S3_BUCKET;

const FileUploader = {};

FileUploader.single = field => {
  return upload.single(field);
};

FileUploader.upload = async (file, pictured) => {
  const extension = mime.getExtension(file.mimetype);
  const filename = path.parse(file.name).name;
  const key = `${filename}-${md5(Date.now())}.${extension}`;
  const options = {
    Bucket: BUCKET,
    Key: key,
    Body: file.data
  };

  const data = await s3.upload(options).promise();
  return await Picture.create({
    url: data.Location,
    pictured,
    key
  });
};

FileUploader.remove = async key => {
  const options = {
    Bucket: BUCKET,
    Key: key
  };

  await s3.deleteObject(options).promise();
  await Photo.remove({ key });
};

module.exports = FileUploader;
