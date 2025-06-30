interface SeparatorProps {
  text?: string;
}

const Separator = ({ text }: SeparatorProps) => {
  return (
    <div className="flex items-center">
      <div className="bg-gray-500 h-[2px] flex-grow"></div>
      {text && (
        <div className="text-gray-500 font-bold min-w-fit ml-6 mr-6">
          {text}
        </div>
      )}
      <div className="bg-gray-500 flex-grow h-[2px]"></div>
    </div>
  );
};

export default Separator;
