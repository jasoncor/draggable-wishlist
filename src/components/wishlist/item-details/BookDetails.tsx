import type { Book } from "../../../api/books";

interface BookDetailsProps {
  book: Book;
}

const BookDetails = (props: BookDetailsProps) => {
  return (
    <div data-testid="book-details">
      <div className="w-full max-w-[480px] aspect-square relative">
        <img
          src={props.book.imageUrl}
          alt={props.book.title}
          className="h-full"
        />
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 text-white min-w-0 flex flex-col items-start justify-start">
          <h2 className="xl:text-6xl text-2xl lg:text-3xl font-bold mb-1 w-[200px] lg:w-[300px] xl:w-[500px]">
            {props.book.title}
          </h2>
          <span className="font-bold drop-shadow-lg inline-block xl:w-[400px] xl:text-lg w-[200px] text-base text-gray-500">
            {props.book.author}
          </span>
        </div>
      </div>
      <div className="mt-8">
        <h3 className="mb-4 text-gray-500 font-bold text-xl">
          Publisher&apos;s Summary
        </h3>
        <p className="w-[90%] text-white text-lg whitespace-pre-line">
          {props.book.publisherSummary}
        </p>
      </div>
    </div>
  );
};

export default BookDetails;
