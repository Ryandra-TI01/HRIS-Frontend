export default function MainLayoutWrapper({ children }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm mt-4">
        {children}
    </div>
  );
}