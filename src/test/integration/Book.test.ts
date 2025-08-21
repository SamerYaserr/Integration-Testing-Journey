import prisma from "../../config/prisma.config";
import BookService from "../../modules/Book/Book.service";

/*
helpers:

- afterEach => runs after each individual test.
- beforeEach => runs before each individual test.
- afterAll => runs once after all tests in a file.
- beforeAll => runs once before all tests in a file.
*/

beforeEach(async () => {
  await prisma.book.deleteMany();
});

afterAll(async () => {
  await prisma.book.deleteMany();
});

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
    expect(books[0]).toMatchObject({ title: "Book1" });
    expect(books[1]).toMatchObject({ title: "Book2" });
  });
});
