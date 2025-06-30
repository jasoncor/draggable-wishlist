import axios from "axios";

export interface Book {
  id: string;
  author: string;
  title: string;
  publisherSummary: string;
  imageUrl: string;
  isHidden: boolean;
}

export const getBooks = async (): Promise<Book[]> => {
  const response = await axios.get<Book[]>("/wishlist/books.json");
  return response.data;
};
