import ResetIcon from "../../icons/ResetIcon";

interface ResetButtonProps {
  onClick: () => void;
}

const ResetButton = ({ onClick }: ResetButtonProps) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button
      className="cursor-pointer flex items-center"
      onClick={handleClick}
      data-testid="reset-btn"
    >
      <div
        className="rounded-2xl p-1"
        style={{
          background:
            "linear-gradient(85.5deg, #EB5A52 1.03%, #F7CD98 101.63%)",
        }}
      >
        <ResetIcon height={20} width={20} />
      </div>
      <span className="font-bold text-orange-500 ml-2">Reset</span>
    </button>
  );
};

export default ResetButton;
