import prisma from "../../config/prisma";
import { ICreateBookBody, IUpdateBookBody, IBook } from "./Book.interface";

class BookService {
  async getBooks() {
    try {
      return await prisma.book.findMany();
    } catch (error) {
      console.log("failed to get books: " + error);
      throw error;
    }
  }

  async getBook(bookId: string) {
    try {
      if (!bookId) {
        throw new Error("bookId is not defined");
      }
      const book = await prisma.book.findUnique({
        where: { id: bookId },
      });

      if (!book) {
        console.log(`Book with id: ${bookId} does not exist`);
      }
      return book;
    } catch (error) {
      console.log("failed to get book: " + error);
      throw error;
    }
  }

  async createBook(body: ICreateBookBody) {
    try {
      return await prisma.book.create({ data: body });
    } catch (error) {
      console.log("failed to create book" + error);
      throw error;
    }
  }

  async updateBook(book: IBook, body: IUpdateBookBody) {
    try {
      return await prisma.book.update({
        where: {
          id: book.id,
        },
        data: body,
      });
    } catch (error) {
      console.log("failed to update book" + error);
      throw error;
    }
  }

  async deleteBook(book: IBook) {
    try {
      await prisma.book.delete({
        where: {
          id: book.id,
        },
      });
    } catch (error) {
      console.log("failed to delete book" + error);
      throw error;
    }
  }
}

export default new BookService();
