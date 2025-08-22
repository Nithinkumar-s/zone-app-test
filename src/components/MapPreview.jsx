export const MapPreview = ({ space }) => {
  return (
    <div className="flex flex-col rounded-lg border bg-white p-3 shadow-sm">
      <div className="aspect-[4/2] w-full rounded bg-gradient-to-br from-indigo-200 via-indigo-300 to-indigo-100 text-[10px] flex items-center justify-center text-indigo-700">Map Placeholder</div>
      <p className="mt-2 truncate text-[11px] font-medium text-gray-700" title={space.label}>{space.label}</p>
    </div>
  );
};
