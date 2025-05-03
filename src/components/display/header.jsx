import { useContext } from "react";
import {
  displayContext,
  mainDataContext,
  projectModalControlContext,
  TMOContext,
} from "../../context";
import AddTaskModal from "../addTaskModal";
export default function Header({ description, projectDue }) {
  const name = useContext(displayContext).dataToDisplay.projectName;
  const hasProject = useContext(mainDataContext).mainData.length > 0;

  const { setProjectModalOptions } = useContext(projectModalControlContext);
  const { options, openTaskModal } = useContext(TMOContext);

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <div className="flex items-end gap-2">
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <p
            className={`font-semibold ${!projectDue && "hidden"} text-gray-600`}
          >{`Due: ${projectDue}`}</p>
        </div>

        <p className="text-gray-500">{description}</p>
      </div>
      {hasProject ? (
        <button
          onClick={() => openTaskModal(name)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <i className="fas fa-plus mr-2"></i> Add Task
        </button>
      ) : (
        <button
          onClick={() =>
            setProjectModalOptions((prev) => ({
              ...prev,
              isOpen: true,
              dataToFill: "",
            }))
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <i className="fas fa-plus mr-2"></i> Add Project
        </button>
      )}

      {options.isOpen && <AddTaskModal />}
    </div>
  );
}
