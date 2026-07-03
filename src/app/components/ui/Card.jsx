export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
        hover:shadow-lg
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}