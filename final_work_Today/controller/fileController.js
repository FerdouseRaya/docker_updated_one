const path = require("path");
const fileTypes = require("../constants/fileTypes");
const HTTP_STATUS = require("../constants/statusCode");
const { sendResponse } = require("../common/common");
const fs = require("fs");
const mime = require("mime");
// const mime = require("mime-types");
const BookModel = require("../model/books");

class FileController {
  async uploadFile(req, res) {
    try {
      const { bookId } = req.body;
      console.log(bookId);

      if (!fileTypes.includes(req.file_extension)) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Only .jpg, .png, .jpeg, .txt, .pdf"
        );
      }

      if (!req.file) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Failed to upload file"
        );
      }

      const uniqueFilename = Date.now() + "_" + req.file.originalname;
      const filePath = path.join(__dirname, "..", "server", uniqueFilename);

      fs.createReadStream(req.file.path).pipe(fs.createWriteStream(filePath));

      //check if the book exists or not
      const book = await BookModel.findOne({ _id: bookId });
      if (!book) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Book not found.");
      }

      book.descriptionFilePath = `${uniqueFilename}`;
      await book.save();

      return sendResponse(
        res,
        HTTP_STATUS.OK,
        "Successfully uploaded file",
        req.file
      );
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
    }
  }

  async getFile(req, res) {
    try {
      const { filepath } = req.params;
      console.log(filepath);
      const fullFilePath = path.join(__dirname, "..", "server", filepath);
      const exists = fs.existsSync(fullFilePath);

      if (!exists) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "File not found");
      }
      const contentType = mime.getType(path.extname(filepath));
      console.log(contentType);
      // Set the response headers for downloading the file.
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${path.basename(filepath)}`
      );
      res.setHeader("Content-Type", contentType);

      res.sendFile(fullFilePath);
      //   return res
      //     .status(200)
      //     .sendFile(path.join(__dirname, "..", "server", filepath));
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal server error"
      );
    }
  }
}

module.exports = new FileController();
