import React from "react";
import EyeIcon from "../../icons/EyeIcon";
import EyeHiddenIcon from "../../icons/EyeHiddenIcon";
import RemoveIcon from "../../icons/RemoveIcon";

interface WishlistItemProps {
  children: React.ReactNode;
  isHidden?: boolean;
}

export const WishlistItem = ({ isHidden, children }: WishlistItemProps) => {
  const handleRemove = () => {
    // TODO: Implement remove functionality
  };

  const background = isHidden
    ? "#ef8774"
    : "linear-gradient(85.5deg, #eb5a52 1.03%, #f7cd98 101.63%)";

  return (
    <div
      className={`flex gap-4 w-[full] rounded-lg p-4 shadow-md ${isHidden ? "opacity-50" : "opacity-100"} transition-all duration-200 hover:shadow-lg`}
      style={{
        background,
      }}
    >
      {isHidden ? (
        <EyeHiddenIcon className="mt-4" height={20} width={20} />
      ) : (
        <EyeIcon className="mt-4" height={20} width={20} />
      )}
      <div className="w-[60%] flex flex-col">{children}</div>
      {/* <button className="ml-auto" onClick={handleRemove}> */}
      <RemoveIcon className="ml-auto mr-2 mt-5" height={14} width={14} />
      {/* </button> */}
    </div>
  );
};
