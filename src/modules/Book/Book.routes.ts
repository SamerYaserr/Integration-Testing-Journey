const express = require("express");

const {
  getBooks,
  getBook,
  deleteBook,
  updateBook,
  createBook,
} = require("./Book.controller");

const router = express.Router();

router.route("/").get(getBooks).post(createBook);

router.route("/:id").get(getBook).put(updateBook).delete(deleteBook);

export default router;
