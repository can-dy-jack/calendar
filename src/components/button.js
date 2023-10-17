export default function Button({ children }) {
  return (
    <button
      className={`
      h-9 w-full rounded-md
      bg-blue-600 text-white hover:bg-blue-500 active:bg-blue-700
      transition
      `}
    >
      {children}
    </button>
  );
}
