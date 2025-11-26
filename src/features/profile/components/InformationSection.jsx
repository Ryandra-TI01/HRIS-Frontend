export default function InformationSection({ title, items }) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 border shadow">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, idx) => (
          <div key={idx}>
            <p className="text-sm text-neutral-500">{item.label}</p>
            <p className="text-base text-neutral-900 dark:text-neutral-200">
              {item.value || "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
