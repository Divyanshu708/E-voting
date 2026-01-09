function BlueButton({ children, className, onClick, type, disabled }) {
  return (
    <button
      className={`${className} h-9 bg-linear-to-tl  text-white/90 border-1 rounded-lg cursor-pointer hover:from-violet-900 hover:to-blue-900  `}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default BlueButton;
