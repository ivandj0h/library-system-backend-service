import mock from "mock-fs";
import { v4 as uuidv4 } from "uuid";
import { BookServiceImpl } from "@/services/bookServiceImpl";
import { BookDTO } from "@/interfaces/bookDTO";

describe("BookServiceImpl", () => {
  let bookService: BookServiceImpl;

  const book1Id = uuidv4();
  const book2Id = uuidv4();

  beforeEach(() => {
    bookService = new BookServiceImpl();

    mock({
      "data/db.json": JSON.stringify([
        {
          id: book1Id,
          name: "Book 1",
          author: "Author 1",
          publishedYear: 2020,
        },
        {
          id: book2Id,
          name: "Book 2",
          author: "Author 2",
          publishedYear: 2021,
        },
      ]),
    });
  });

  afterEach(() => {
    mock.restore();
  });

  test("should get all books", async () => {
    const books = await bookService.getBooks();
    expect(books).toHaveLength(2);
  });

  test("should get book by ID", async () => {
    const book = await bookService.getBookById(book1Id);
    expect(book).toBeDefined();
    expect(book?.name).toBe("Book 1");
  });

  test("should add a new book", async () => {
    const newBook: BookDTO = {
      name: "New Book",
      author: "New Author",
      publishedYear: 2023,
    };

    const addedBook = await bookService.addBook(newBook);
    expect(addedBook).toHaveProperty("name", "New Book");
  });

  test("should not add a book with existing name", async () => {
    const duplicateBook: BookDTO = {
      name: "Book 1",
      author: "Author 1",
      publishedYear: 2023,
    };

    const result = await bookService.addBook(duplicateBook);
    expect(result).toBe("Book with the same name already exists");
  });

  test("should update an existing book", async () => {
    const updatedBook: BookDTO = {
      name: "Updated Book 1",
      author: "Updated Author 1",
      publishedYear: 2025,
    };

    const result = await bookService.updateBook(book1Id, updatedBook);
    expect(result).toBeDefined();
    expect(result?.name).toBe("Updated Book 1");
  });

  test("should delete a book", async () => {
    await bookService.deleteBook(book1Id);
    const books = await bookService.getBooks();
    expect(books).toHaveLength(1);
  });
});
