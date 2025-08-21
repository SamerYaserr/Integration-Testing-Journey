import prisma from "../../config/prisma";
import BookService from "../../modules/Book/Book.service";

describe("getBooks", () => {
  it("should return empty array", async () => {
    const books = await BookService.getBooks();
    expect(books.length).toBe(0);
  });

  it("should return 2 books", async () => {
    await prisma.book.createMany({
      data: [
        {
          title: "Book1",
        },
        {
          title: "Book2",
        },
      ],
    });

    const books = await BookService.getBooks();
    expect(books.length).toBe(2);

    await prisma.book.deleteMany();
  });
});
