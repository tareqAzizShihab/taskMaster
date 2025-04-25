import { useContext, useEffect, useState } from "react";
import { mainDataContext, TMOContext } from "../../../context";
import convertDate from "../../../useFunc";
export default function Task({ data, updateDisplay }) {
  const { openTaskModal } = useContext(TMOContext);
  const { mainData, setMainData } = useContext(mainDataContext);
  const [taskData, setTaskData] = useState(data);

  function getProjectName(currentTask) {
    const currentProject = mainData
      .slice()
      .filter(
        (project) =>
          project.tasks.slice().filter((task) => task.id === currentTask.id)[0]
            ?.id === currentTask.id
      );
    return currentProject[0].projectName;
  }

  useEffect(() => setTaskData(data), [data]);

  const updateDone = (updatedData) => {
    const newMainData = mainData.slice().map((project) => {
      if (project.projectName === getProjectName(taskData)) {
        return {
          ...project,
          tasks: project.tasks
            .slice()
            .map((task) => (task.id === updatedData.id ? updatedData : task)),
        };
      } else {
        return project;
      }
    });
    setMainData(newMainData);
  };

  function handleDelete(deleteData) {
    const newMainData = mainData.slice().map((project) => {
      if (project.projectName === getProjectName(deleteData)) {
        return {
          ...project,
          tasks: project.tasks
            .slice()
            .filter((task) => task.id !== deleteData.id),
        };
      } else {
        return project;
      }
    });
    setMainData(newMainData);
    updateDisplay((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((task) => task.id !== deleteData.id),
    }));
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300">
      <div className="flex items-start">
        <input
          type="checkbox"
          checked={taskData.taskDone}
          onChange={() => {
            setTaskData((prev) => ({ ...prev, taskDone: !prev.taskDone }));
            updateDone({ ...taskData, taskDone: !taskData.taskDone });
          }}
          className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <div className="ml-3 flex-1">
          <h3 className="text-gray-800 font-medium">{taskData.taskName}</h3>
          <p className="text-gray-500 mt-1">{taskData.taskDescription}</p>
          <p className="text-green-500 text-sm mt-2">
            {convertDate(taskData.taskDueDate)}
          </p>
        </div>
        <div className="text-gray-300 flex gap-2 *:cursor-pointer">
          <button
            onClick={() => {
              openTaskModal(getProjectName(taskData), taskData);
            }}
            className="hover:text-blue-600"
          >
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button
            onClick={() => {
              handleDelete(taskData);
            }}
            className="hover:text-red-600"
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
      {/* sub Task */}
      {/* <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:border-blue-300">
        <div className="flex items-start">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div className="ml-3 flex-1">
            <h3 className="text-gray-800 font-medium">
              Complete project proposal
            </h3>
            <p className="text-gray-500 text-sm mt-1">Due tomorrow</p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
