import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Wishlist } from "./Wishlist";
import * as useBooksModule from "../../hooks/useBooks";
import "@testing-library/jest-dom";

// Mock child components
vi.mock("../common", () => ({
  Spinner: () => <div data-testid="spinner" />,
}));
vi.mock("./list-item/BookListItem", () => ({
  default: ({ book, isHidden }: any) => (
    <div data-testid={`book-list-item-${book.id}`}>
      {book.title} {isHidden ? "(hidden)" : ""}
    </div>
  ),
}));
vi.mock("../reset-button/ResetButton", () => ({
  default: ({ onClick }: any) => (
    <button data-testid="reset-btn" onClick={onClick}>
      Reset
    </button>
  ),
}));
vi.mock("../item-details/BookDetails", () => ({
  default: ({ book }: any) => (
    <div data-testid="book-details">{book.title}</div>
  ),
}));
vi.mock("../common/draggable-item/DraggableItem", () => ({
  default: ({ children, ...props }: any) => (
    <div data-testid="draggable-item" {...props}>
      {children}
    </div>
  ),
}));
vi.mock("../common/droppable-list/DroppableList", () => ({
  default: ({ children, ...props }: any) => (
    <div data-testid="droppable-list" {...props}>
      {children}
    </div>
  ),
}));
vi.mock("../common/separator/Separator", () => ({
  default: ({ text }: any) => <div data-testid="separator">{text}</div>,
}));
vi.mock("./header/WishlistHeader", () => ({
  WishlistHeader: ({ tagText }: any) => (
    <div data-testid="wishlist-header">{tagText}</div>
  ),
}));

const mockBooks = [
  {
    id: "1",
    author: "Author 1",
    title: "Book 1",
    publisherSummary: "Summary 1",
    imageUrl: "url1",
    isHidden: false,
  },
  {
    id: "2",
    author: "Author 2",
    title: "Book 2",
    publisherSummary: "Summary 2",
    imageUrl: "url2",
    isHidden: true,
  },
];

describe("Wishlist", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders spinner while loading", () => {
    vi.spyOn(useBooksModule, "useBooks").mockReturnValue({
      data: undefined,
      isPending: true,
      error: null,
      refetch: vi.fn(),
    } as any);

    render(<Wishlist />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders error message on error", () => {
    vi.spyOn(useBooksModule, "useBooks").mockReturnValue({
      data: undefined,
      isPending: false,
      error: { message: "Error" },
      refetch: vi.fn(),
    } as any);

    render(<Wishlist />);
    expect(screen.getByText(/Error loading wishlist/i)).toBeInTheDocument();
    expect(
      screen.getByText(/An unexpected error occurred/i)
    ).toBeInTheDocument();
  });

  it("renders empty message if no data", () => {
    vi.spyOn(useBooksModule, "useBooks").mockReturnValue({
      data: [],
      isPending: false,
      error: null,
      refetch: vi.fn(),
    } as any);

    render(<Wishlist />);
    expect(screen.getByText(/No wishlist found/i)).toBeInTheDocument();
  });

  it("renders wishlist and hidden list items", () => {
    vi.spyOn(useBooksModule, "useBooks").mockReturnValue({
      data: mockBooks,
      isPending: false,
      error: null,
      refetch: vi.fn(),
    } as any);

    render(<Wishlist />);
    expect(screen.getByTestId("wishlist-header")).toHaveTextContent("Books");
    expect(screen.getByTestId("separator")).toHaveTextContent("Hidden list");
    expect(screen.getByTestId("book-list-item-1")).toHaveTextContent("Book 1");
    expect(screen.getByTestId("book-list-item-2")).toHaveTextContent(
      "Book 2 (hidden)"
    );
  });

  it("shows book details on hover", async () => {
    vi.spyOn(useBooksModule, "useBooks").mockReturnValue({
      data: mockBooks,
      isPending: false,
      error: null,
      refetch: vi.fn(),
    } as any);

    render(<Wishlist />);
    const bookItem = screen.getByTestId("book-list-item-1");
    fireEvent.mouseEnter(bookItem);
    await waitFor(() =>
      expect(screen.getByTestId("book-details")).toHaveTextContent("Book 1")
    );
    fireEvent.mouseLeave(bookItem);
    await waitFor(() =>
      expect(screen.queryByTestId("book-details")).not.toBeInTheDocument()
    );
  });

  it("calls refetch and resets books on reset button click", async () => {
    const refetch = vi.fn().mockResolvedValue({ data: mockBooks });
    vi.spyOn(useBooksModule, "useBooks").mockReturnValue({
      data: mockBooks,
      isPending: false,
      error: null,
      refetch,
    } as any);

    render(<Wishlist />);
    const resetBtn = screen.getByTestId("reset-btn");
    fireEvent.click(resetBtn);
    await waitFor(() => expect(refetch).toHaveBeenCalled());
  });
});
