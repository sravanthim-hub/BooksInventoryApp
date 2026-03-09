import { faker } from "@faker-js/faker";
import { formatToYYYYMMDD } from "../utils/dateUtils";
import { BooksData } from "./DataModel/booksData";

export const books: BooksData[] = [
  {
    title: "The silent patient",
    author: "Alex",
    genre: "Fiction",
    publicationDate: formatToYYYYMMDD(new Date()),
    isbn: faker.book.series(),
    price: "10",
  },
  {
    title: "Automic habits",
    author: "Delia",
    genre: "Mystery",
    publicationDate: formatToYYYYMMDD(new Date()),
    isbn: faker.book.series(),
    price: "20",
  },
];
