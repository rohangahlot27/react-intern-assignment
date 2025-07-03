const Toolbar = () => {
  return (
    <div className="bg-white border rounded p-2 flex justify-between items-center shadow-sm mb-4">
      <div className="flex gap-2">
        <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded" onClick={() => console.log('New row')}>
          + New Row
        </button>
        <button className="text-sm bg-gray-100 px-3 py-1 rounded" onClick={() => console.log('Filter')}>
          Filter
        </button>
      </div>
      <div className="text-xs text-gray-500">Spreadsheet Prototype</div>
    </div>
  );
};

export default Toolbar;
