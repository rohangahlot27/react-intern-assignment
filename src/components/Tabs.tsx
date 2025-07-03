const Tabs = () => {
  const tabs = ["All", "Active", "Archived"];

  return (
    <div className="flex gap-2 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300 text-sm font-medium"
          onClick={() => console.log(`Clicked: ${tab}`)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
