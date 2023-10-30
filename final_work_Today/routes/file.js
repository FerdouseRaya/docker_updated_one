const express = require("express");
const routes = express();
const { MulterError } = require("multer");

const upload = require("../config/file");
const FileController = require("../controller/fileController");


routes.post("/upload-file", upload.single("file_to_upload"), FileController.uploadFile);
routes.get("/get/:filepath", FileController.getFile);

module.exports = routes;