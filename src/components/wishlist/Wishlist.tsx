import { Spinner } from "../common/spinner/Spinner";
import { useBooks } from "../../hooks/useBooks";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import BookListItem from "./list-item/BookListItem";
import ResetButton from "./reset-button/ResetButton";
import BookDetails from "./item-details/BookDetails";
import DraggableItem from "../common/draggable-item/DraggableItem";
import DroppableList from "../common/droppable-list/DroppableList";
import Separator from "../common/separator/Separator";
import { WishlistHeader } from "./header/WishlistHeader";

interface WishlistFormValues {
  books: {
    id: string;
    author: string;
    title: string;
    publisherSummary: string;
    imageUrl: string;
    isHidden: boolean;
  }[];
}

export const Wishlist = () => {
  const { data: initialData, isPending, error, refetch } = useBooks();
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [hoveredBookId, setHoveredBookId] = useState<string | null>();

  const { watch, setValue, getValues, handleSubmit } =
    useForm<WishlistFormValues>({
      defaultValues: {
        books: [],
      },
    });

  const currentBooks = getValues("books");

  const data = watch("books");

  useEffect(() => {
    if (initialData) {
      setValue("books", initialData);
    }
  }, [initialData, setValue]);

  const handleReset = async () => {
    const result = await refetch();
    if (result.data) {
      setValue("books", result.data);
    }
  };

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-500 text-red-500 rounded-lg px-6 py-4 shadow-md text-center max-w-md mx-auto mt-12">
        <div className="text-xl font-semibold mb-2">Error loading wishlist</div>
        <div>An unexpected error occurred. Please try again.</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-gray-500 font-semibold">No wishlist found.</div>
      </div>
    );
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeId = active.id as string;
    const overId = over.id as string;

    const draggedBookIndex = currentBooks.findIndex(
      (book) => book.id === activeId
    );
    const draggedBook = currentBooks[draggedBookIndex];
    const isSourceHidden = draggedBook.isHidden;

    if (overId === "wishList" || overId === "hiddenList") {
      const newIsHidden = overId === "hiddenList";

      if (isSourceHidden !== newIsHidden) {
        // Only update if we're actually changing lists
        const draggedBookCopy = { ...draggedBook };
        draggedBookCopy.isHidden = newIsHidden;

        // Create a new array without the dragged book
        const newBooks = [
          ...currentBooks.slice(0, draggedBookIndex),
          ...currentBooks.slice(draggedBookIndex + 1),
        ];

        // Find the first item of the target list
        const targetListStartIndex = newBooks.findIndex(
          (book) => book.isHidden === newIsHidden
        );

        // Insert the dragged book at the beginning of the target list
        if (targetListStartIndex === -1) {
          // If target list is empty, just add the book
          newBooks.push(draggedBookCopy);
        } else {
          newBooks.splice(targetListStartIndex, 0, draggedBookCopy);
        }

        // Update the form state with the new order
        setValue("books", newBooks);
      }
    }

    setActiveId(null);
  };

  const onSubmit = (values: WishlistFormValues) => {
    // TODO: Handle form submission when needed
    console.log("Form submitted with values:", values);
  };

  const wishListItems = data.filter((book) => !book.isHidden);
  const hiddenItems = data.filter((book) => book.isHidden);
  const activeBook = activeId
    ? data.find((book) => book.id === activeId)
    : null;
  const hoveredBook = hoveredBookId
    ? data.find((book) => book.id === hoveredBookId)
    : null;

  return (
    <main className="h-screen w-full bg-black flex md:justify-start xl:justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-8 py-8 px-6 max-w-[1400px]"
      >
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex-1 max-w-[32%] flex flex-col gap-8 border-2 rounded-2xl bg-red-500 py-12 px-8 min-w-[400px]">
            <WishlistHeader tagText="Books" />
            <DroppableList id="wishList">
              {wishListItems.map((book) => (
                <DraggableItem
                  key={book.id}
                  id={book.id}
                  onMouseEnter={() => setHoveredBookId(book.id)}
                  onMouseLeave={() => setHoveredBookId(null)}
                >
                  <BookListItem book={book} isHidden={false} />
                </DraggableItem>
              ))}
            </DroppableList>
            <Separator text="Hidden list" />
            <DroppableList id="hiddenList">
              {hiddenItems.map((book) => (
                <DraggableItem
                  key={book.id}
                  id={book.id}
                  onMouseEnter={() => setHoveredBookId(book.id)}
                  onMouseLeave={() => setHoveredBookId(null)}
                >
                  <BookListItem book={book} isHidden />
                </DraggableItem>
              ))}
            </DroppableList>
            <DragOverlay>
              {activeBook ? (
                <BookListItem
                  book={activeBook}
                  isHidden={activeBook.isHidden}
                />
              ) : null}
            </DragOverlay>
            <div className="mt-auto">
              <ResetButton onClick={handleReset} />
            </div>
          </div>
        </DndContext>
        <aside
          className={`flex-1 py-16 flex justify-center border-2 rounded-2xl bg-red-500 min-h-[500px] lg:w-[600px] xl:w-[900px] min-w-[300px] px-8 ${hoveredBook ? "opacity-100" : "opacity-0"}`}
          aria-hidden={!hoveredBook}
          aria-live="polite"
        >
          {hoveredBook && <BookDetails book={hoveredBook} />}
        </aside>
      </form>
    </main>
  );
};
