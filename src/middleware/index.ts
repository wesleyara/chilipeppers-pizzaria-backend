import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

import dotenv from "dotenv";
dotenv.config();

const s3 = new S3Client({
  region: process.env.AWSREGION as string,
  credentials: {
    secretAccessKey: process.env.AWSSECRET_KEY as string,
    accessKeyId: process.env.AWSACCESS_KEY as string,
  },
});

export const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWSBUCKET as string,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      const type = file.mimetype.split("/")[1];

      cb(
        null,
        `${file.fieldname}-time${
          Date.now() + Number((Math.random() * 10).toString().replace(".", ""))
        }.${type}`,
      );
    },
  }),
});
