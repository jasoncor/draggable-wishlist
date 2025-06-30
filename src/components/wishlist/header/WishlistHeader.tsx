interface WishlistHeaderProps {
  tagText: string;
}

export const WishlistHeader = ({ tagText }: WishlistHeaderProps) => {
  return (
    <div className="flex flex-col mb-12">
      <span className="text-xl font-bold text-gray-500">Shopping</span>
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-gray-500">Wish list</h1>
        <div className="ml-auto px-4 flex items-center text-peach-500 font-bold bg-white rounded-md py-1">
          {tagText}
        </div>
      </div>
    </div>
  );
};
