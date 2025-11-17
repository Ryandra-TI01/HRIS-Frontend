
export default function PageHeader({ children }) {
  return (
    <h1 className="text-2xl font-semibold mb-6 mt-6 text-gray-800 dark:text-gray-100">
      {children}
    </h1>
  );
}
