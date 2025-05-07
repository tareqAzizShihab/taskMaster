import { useContext } from "react";
import {
  displayContext,
  mainDataContext,
  projectModalControlContext,
} from "../../context";
import convertDate from "../../useFunc";
import AddProjectModal from "../addProjectModal";

export default function Projects() {
  const { mainData, setMainData } = useContext(mainDataContext);
  const { setDataToDisplay, dataToDisplay } = useContext(displayContext);
  const { projectModalOptions, setProjectModalOptions } = useContext(
    projectModalControlContext
  );

  function handleRemove(data) {
    const newData = mainData
      .slice()
      .filter((project) => project.id !== data.id);
    //setMainData(newData);
    setMainData(newData);
  }

  return (
    <div className="pt-4 mt-4 border-t border-gray-200">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
        Projects
      </h3>
      {mainData.map((project) => {
        const isActive = dataToDisplay.projectName === project.projectName;

        return (
          <div
            key={project.id}
            className={`w-full rounded-md flex justify-between items-center group ${
              isActive ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
            }`}
          >
            <button
              onClick={() => setDataToDisplay(project)}
              className={`text-left pl-3 py-2 flex-1 flex items-center relative ${
                isActive && "font-semibold"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full inline-block mr-3 ${
                  isActive ? "bg-blue-600" : "bg-gray-400"
                }`}
              ></span>
              {project.projectName}
              <p
                className={`absolute -bottom-[2px] left-1/2 transform -translate-x-1/2 text-xs opacity-0 ${
                  isActive ? "opacity-100" : "group-hover:opacity-100"
                }`}
              >
                {project.projectDueDate && convertDate(project.projectDueDate)}
              </p>
            </button>

            {/* Action buttons - always show when active, show on hover when inactive */}
            <div
              className={`pr-3 flex gap-2 *:cursor-pointer  ${
                isActive
                  ? "opacity-100"
                  : "opacity-0 text-gray-400 group-hover:opacity-100"
              } transition-opacity duration-200`}
            >
              <button
                onClick={() =>
                  setProjectModalOptions((prev) => ({
                    ...prev,
                    isOpen: true,
                    dataToFill: project,
                  }))
                }
                className="hover:text-blue-600"
              >
                <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button
                onClick={() => handleRemove(project)}
                className="hover:text-red-600"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        );
      })}

      <button
        onClick={() =>
          setProjectModalOptions((prev) => ({
            ...prev,
            isOpen: true,
            dataToFill: false,
          }))
        }
        className="w-full text-left px-4 py-2 rounded-md hover:bg-gray-100"
      >
        <i className="fas fa-plus mr-3 text-gray-400"></i> Add Project
      </button>

      <AddProjectModal options={projectModalOptions} />
    </div>
  );
}
