export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl hover:scale-[1.02]",

    secondary:
      "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",

    outline:
      "border border-green-600 text-green-600 hover:bg-green-50",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}