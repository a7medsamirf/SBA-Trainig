interface BurgerMenuProps {
  onClick: () => void;
  toggle: boolean;
}

export const BurgerMenu = ({ onClick, toggle }: BurgerMenuProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5 group"
    >
      <span
        className={`h-0.5 w-6 bg-[#8C9EC5] rounded transition-transform ${
          toggle ? "rotate-45 translate-y-2.5" : ""
        }`}
      />
      <span
        className={`h-0.5 w-6 bg-[#8C9EC5] rounded transition-opacity ${
          toggle ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`h-0.5 w-6 bg-[#8C9EC5] rounded transition-transform ${
          toggle ? "-rotate-45 -translate-y-2.5" : ""
        }`}
      />
    </button>
  );
};
