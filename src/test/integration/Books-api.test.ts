import request from "supertest";

import prisma from "../../config/prisma.config";
import server from "../../server";
import { title } from "process";

beforeEach(async () => {
  await prisma.book.deleteMany();
});

afterAll(async () => {
  server.close();
  await prisma.book.deleteMany();
});

describe("getBook", () => {
  it("should return 200 and get book from db", async () => {
    const book = await prisma.book.create({ data: { title: "MyBook" } });
    const res = await request(server).get(`/api/books/${book.id}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch("book retrieved successfully");
    expect(res.body.data.book).toMatchObject({ title: "MyBook" });
  });

  it("should return 404 if book not found", async () => {
    const res = await request(server).get(
      `/api/books/43556608-4797-4416-b9b5-f1e6945107dd`
    );

    expect(res.status).toBe(404);
    expect(res.body.message).toMatch("404 not found");
  });
});

describe("updateBook", () => {
  it("should return 200 and get book from db", async () => {
    const book = await prisma.book.create({ data: { title: "MyBook" } });
    const res = await request(server)
      .put(`/api/books/${book.id}`)
      .send({ title: "MyBook Updated" });

    expect(res.status).toBe(200);
    expect(res.body.message).toMatch("book updated successfully");
    expect(res.body.data.book).toMatchObject({ title: "MyBook Updated" });
  });

  it("should return 404 if book not found", async () => {
    const res = await request(server)
      .put(`/api/books/43556608-4797-4416-b9b5-f1e6945107dd`)
      .send({ title: "MyBook Updated" });

    expect(res.status).toBe(404);
    expect(res.body.message).toMatch("404 not found");
  });
});
