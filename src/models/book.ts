class Book {
  public id: string;
  public title: string;
  public author: string;
  public description: string;
  public year: number;
  public page: number;
  public publisher: string;

  constructor(
    id: string | null | undefined,
    title: string,
    author: string,
    description: string,
    year: number,
    page: number,
    publisher: string
  ) {
    this.id = id ?? uuidv4();
    this.title = title;
    this.author = author;
    this.description = description;
    this.year = year;
    this.page = page;
    this.publisher = publisher;
  }
}

function uuidv4(): string {
  throw new Error("Function not implemented.");
}

export { Book };
