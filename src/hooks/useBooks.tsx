import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../api/books";

export const useBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
    staleTime: 30 * 60 * 1000,
  });
};
