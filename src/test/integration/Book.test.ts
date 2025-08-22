import prisma from "../../config/prisma.config";
import BookService from "../../modules/Book/Book.service";

/*
- IMPORTANT: We use a separate database for testing to ensure the main database remains unaffected.
*/

/*
helpers:

- afterEach => runs after each individual test.
- beforeEach => runs before each individual test.
- afterAll => runs once after all tests in a file.
- beforeAll => runs once before all tests in a file.
*/

beforeEach(async () => {
  // ensure database is clean before each test
  await prisma.book.deleteMany();
});

afterAll(async () => {
  // clean database after all tests finish
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

describe("createBook", () => {
  it("should create book with title Java", async () => {
    await BookService.createBook({ title: "Java" });

    const books = await prisma.book.findMany();
    expect(books.length).toBe(1);
    expect(books[0]).toMatchObject({ title: "Java" });
  });
});
