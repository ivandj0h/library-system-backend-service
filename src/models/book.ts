class Book {
  public id: string;
  public title: string;
  public author: string;
  public publishedYear: number;

  constructor(id: string, name: string, author: string, publishedYear: number) {
    this.id = id;
    this.title = name;
    this.author = author;
    this.publishedYear = publishedYear;
  }
}

export { Book };
