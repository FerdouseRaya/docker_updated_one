const multer = require("multer");
const fileTypes = require("../constants/fileTypes");
const path = require("path");

//prepare the final multer upload object or multer configuration

const upload = multer({
  //setting the file size
  limits: {
    fileSize: 536870912 * 2, // it's set to 512 MB (536870912 bytes)*2= 1024MB
  },

  //cb= callback
  //Now configure where and how uploaded files will be stored on the server
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (file) {
        cb(null, "./server");
      } else {
        req.file.error = "No file was found";
        cb("No file was found", null);
      }
    },
    filename: (req, file, cb) => {
      if (file) {
        cb(null, Date.now() + "_" + file.originalname); //File Information: originalname( Name of the file on the user's computer)
      } else {
        cb("No file was found", null);
      }
    },
  }),

  //Function "fileFilter": Function to control which files are accepted
  fileFilter: (req, file, cb) => {
    if (file) {
      const extension = path.extname(file.originalname);
      req.file_extension = extension;
      if (fileTypes.includes(extension)) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    } else {
      cb("No file found", false);
    }
  },
});

module.exports = upload;
