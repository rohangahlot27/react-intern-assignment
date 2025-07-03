import Tabs from "./components/Tabs";
import Toolbar from "./components/Toolbar";
import Spreadsheet from "./components/Spreadsheet";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans text-sm">
      <Tabs />
      <Toolbar />
      <Spreadsheet />
    </div>
  );
}

export default App;
