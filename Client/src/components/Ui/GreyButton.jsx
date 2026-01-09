function GreyButton({ children, className, onClick, type }) {
  return (
    <button
      className={`h-9 border-black/8 text-black/70 bg-white border-1 rounded-lg cursor-pointer hover:bg-black/7 ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default GreyButton;
