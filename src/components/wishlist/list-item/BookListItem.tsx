import { WishlistItem } from "./WishlistItem";
import type { Book } from "../../../api/books";

interface BookListItemProps {
  book: Book;
  isHidden: boolean;
}

const BookListItem = (props: BookListItemProps) => {
  return (
    <WishlistItem isHidden={props.isHidden}>
      <span
        className={`text-gray-500 font-bold text-xl mb-0.5 ${props.isHidden ? "line-through" : ""}`}
      >
        {props.book.title}
      </span>
      <span
        className={`text-gray-500 text-xs font-bold ${props.isHidden ? "line-through" : ""}`}
      >
        {props.book.author}
      </span>
    </WishlistItem>
  );
};

export default BookListItem;
