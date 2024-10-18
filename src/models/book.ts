class Book {
  public id: number;
  public name: string;
  public author: string;
  public publishedYear: number;

  constructor(id: number, name: string, author: string, publishedYear: number) {
    this.id = id;
    this.name = name;
    this.author = author;
    this.publishedYear = publishedYear;
  }
}

export { Book };
