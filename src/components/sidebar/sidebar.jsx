import Header from "./header";
import Projects from "./projects";
import SortOption from "./sortOptions";

export default function Sidebar() {
  return (
    <div className="w-1/5 min-w-64 bg-white border-r border-gray-200 flex flex-col">
      <Header />

      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        <SortOption />
        <Projects />
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center">
            <span>TA</span>
          </div>
          <span className="ml-2 text-sm font-medium">Tareq Aziz</span>
        </div>
      </div>
    </div>
  );
}
