# Draggable Wishlist

A modern React + TypeScript + Vite application for managing wishlists with drag-and-drop functionality, built with:

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Hook Form](https://react-hook-form.com/)
- [DND Kit](https://dndkit.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Features

- Drag and drop items between wishlist and hidden list
- View detailed information for each item when hovering
- Accessible UI with keyboard navigation support and ARIA attributes
- Form state management with React Hook Form
- Smooth animations with CSS transitions
- Responsive design that works on various screen sizes

## Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Start the development server:**

   ```sh
   npm run dev
   ```

3. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173)

## Project Structure

```
src/
  api/                # API clients and mock data
  components/
    common/
      draggable-item/ # Draggable item components
      droppable-list/ # Droppable list components
      separator/      # UI separators
      spinner/        # Loading indicator
    WishList/
      header/         # Wishlist header components
      item-details/   # Detail view components
      list-item/      # Individual wishlist item components
      reset-button/   # Reset functionality
  hooks/              # Custom React hooks (e.g., useBooks)
  App.tsx             # App entry point
  main.tsx            # Vite entry point
```

## Accessibility Features

- Keyboard navigation support for list items
- ARIA live regions for announcing changes
- Focus management for better screen reader support
- Semantic HTML structure

## Customization

- **Styling:** Uses Tailwind CSS for streamlined styling
- **Item Types:** Can be extended to support different types of wishlist items
- **Data Source:** Currently uses mock data, but can be connected to an API

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run preview` – Preview production build
- `npm test` – Run tests

## License

MIT
