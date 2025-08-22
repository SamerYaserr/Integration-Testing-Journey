import { RequestHandler } from "express";

import BookService from "./Book.service";

export const getBooks: RequestHandler = async (req, res) => {
  try {
    const books = await BookService.getBooks();
    return res.json({
      message: "books retrieved successfully",
      data: { books },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "failed to get books" });
  }
};

export const getBook: RequestHandler = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookService.getBook(bookId);

    if (!book) {
      return res.status(404).json({ message: "404 not found" });
    }

    return res.json({
      message: "book retrieved successfully",
      data: { book },
    });
  } catch (error) {
    return res.status(500).json({ message: "failed to get book" });
  }
};

export const createBook: RequestHandler = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    if (!title) {
      return res
        .status(400)
        .json({ message: "400 invalid request, title is required" });
    }
    const book = await BookService.createBook({ title, description, price });
    return res.status(201).json({
      message: "book created successfully",
      data: { book },
    });
  } catch (error) {
    return res.status(500).json({ message: "failed to create book" });
  }
};

export const updateBook: RequestHandler = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookService.getBook(bookId);

    if (!book) {
      return res.status(404).json({ message: "404 not found" });
    }

    const { title, description, price } = req.body;
    const updatedBook = await BookService.updateBook(book, {
      title,
      description,
      price,
    });
    return res.json({
      message: "book updated successfully",
      data: { book: updatedBook },
    });
  } catch (error) {
    return res.status(500).json({ message: "failed to update book" });
  }
};

export const deleteBook: RequestHandler = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await BookService.getBook(bookId);

    if (!book) {
      return res.status(404).json({ message: "404 not found" });
    }
    await BookService.deleteBook(book);
    return res.json({
      message: "book deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: "failed to delete book" });
  }
};
