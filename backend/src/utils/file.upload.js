import multer from "multer";
import fs  from 'fs';
import path  from 'path';
import { createError } from "./helper.js";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/assets/uploads/');
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    cb(null,`${timestamp} - ${file.originalname}`);
  },
});

export const uploadFile = (
  fileSize,
  allowedExtensions,
  required = false,
) => {
  const fileFilter = function (req, file, cb) {
    if(required == true && (!file || !file.originalname)){
       cb(('File Is Required'), false);
    }
    const extension = file.originalname
      .substring(file.originalname.lastIndexOf("."))
      .toLowerCase();
    if (!allowedExtensions.includes(extension)) {
       cb(('Invalid File Type'), false);
    }
    if (file.size > fileSize) {
      req.fileValidationError = "File size limit exceeded!";
       cb(("File size limit exceeded!"), false);
    }
    cb(null, true);
  };

  const upload = multer({ storage: storage, 
    fileFilter: fileFilter, });
  return upload
};

export const fileHandling = (req, res, err, next) => {
  if (err) {
      createError(res, {
        statusCode: 500,
        message: err.message,
      }, next)
  }
  const files = req.files;
  for (let prop in files) {
    if (files[prop]) {
      let field = files[prop];   
      for (let fileProp in field) {
        let file = field[fileProp]
        if(file && file.filename){
          let {filename, fieldname} = file;
          req.body[fieldname] = filename ;
        }
      }
    }
  }

  next()
}

export const unlinkFile = (fileName, res, next, folderName = 'uploads') => {
  if(fileName){
    const filePath = path.join(process.cwd(), 'src', 'assets', folderName, fileName);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err)
      }
      else{
        console.log(fileName + ' Deleted')
      }
    });
  }
}