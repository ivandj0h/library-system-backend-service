interface BookDTO {
  id?: string | null | undefined;
  title: string;
  author: string;
  description: string;
  year: number;
  page: number;
  publisher: string;
}

export { BookDTO };
