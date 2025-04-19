import "flatpickr/dist/themes/material_blue.css";
import { useContext, useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { displayContext, mainDataContext, TMOContext } from "../context";
export default function AddTaskModal() {
  const {
    options: { openFrom, isOpen, dataToFill },
    closeTaskModal,
  } = useContext(TMOContext);

  // eslint-disable-next-line no-unused-vars
  const { dataToDisplay, setDataToDisplay } = useContext(displayContext);
  const { mainData, setMainData } = useContext(mainDataContext);

  const [isNameErr, setIsNameErr] = useState(null);
  const [formData, setFormData] = useState({
    id: crypto.randomUUID(),
    taskName: "",
    taskDescription: "",
    taskDueDate: "",
    taskDone: false,
  });

  const [projectToAssign, setProjectToAssign] = useState();

  useEffect(() => {
    openFrom !== "Inbox" && setProjectToAssign(openFrom);
  }, [openFrom]);

  useEffect(() => {
    isOpen && dataToFill && setFormData(dataToFill);
    setIsNameErr(null);
  }, [isOpen, dataToFill]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleDueDate(dates) {
    setFormData((prev) => ({ ...prev, taskDueDate: dates[0] }));
  }

  const changeObj = {
    newProject: "",
    createTask: function () {
      const newMainData = mainData.slice().map((project) => {
        if (project.projectName === projectToAssign) {
          this.newProject = {
            ...project,
            tasks: [...project.tasks, formData],
          };
          return this.newProject;
        } else {
          return project;
        }
      });
      setMainData(newMainData);
    },
    saveTask: function () {
      const newMainData = mainData.slice().map((project) => {
        if (project.projectName === projectToAssign) {
          this.newProject = {
            ...project,
            tasks: project.tasks
              .slice()
              .map((task) => (task.id === formData.id ? formData : task)),
          };
          return this.newProject;
        } else {
          return project;
        }
      });
      setMainData(newMainData);
    },
  };

  function clearInput() {
    setFormData({
      taskName: "",
      taskDescription: "",
      taskDueDate: "",
      taskDone: false,
      id: "",
    });
    setProjectToAssign("");
  }

  return (
    <div
      id="taskModal"
      className={`fixed inset-0 backdrop-blur-sm items-center justify-center z-50 ${
        isOpen ? `flex` : `hidden`
      }`}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Add New Task
            </h3>
          </div>

          <form>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="taskName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Task Name
                </label>
                <input
                  onChange={handleInputChange}
                  name="taskName"
                  value={formData.taskName}
                  type="text"
                  id="taskName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What needs to be done?"
                  required
                />
                <p
                  className={`text-sm text-red-600 ${
                    isNameErr && !formData.taskName ? `block` : `hidden`
                  }`}
                >
                  You can't create a task without a name.
                </p>
              </div>

              <div>
                <label
                  htmlFor="taskDescription"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  onChange={handleInputChange}
                  name="taskDescription"
                  value={formData.taskDescription}
                  id="taskDescription"
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Add details..."
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="taskDueDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Due Date
                </label>
                <Flatpickr
                  value={formData.taskDueDate}
                  options={{
                    dateFormat: "Y-m-d",
                    minDate: "today",
                  }}
                  placeholder="yyyy-mm-dd"
                  onChange={handleDueDate}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {openFrom === "Inbox" ? (
                <div>
                  <label
                    htmlFor="taskProject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Project
                  </label>
                  <select
                    onChange={(e) => setProjectToAssign(e.target.value)}
                    id="taskProject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" sleceted="true">
                      No project
                    </option>
                    {mainData.slice().map((project) => (
                      <option key={project.id} value={project.projectName}>
                        {project.projectName}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="taskProject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Project
                  </label>
                  <input
                    value={openFrom}
                    id="taskProject"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                id="cancelTaskModal"
                onClick={() => {
                  clearInput();
                  closeTaskModal();
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={(event) => {
                  event.preventDefault();
                  if (formData.taskName) {
                    dataToFill ? changeObj.saveTask() : changeObj.createTask();
                    setDataToDisplay(changeObj.newProject);
                    clearInput();
                    closeTaskModal();
                  } else {
                    setIsNameErr(true);
                  }
                }}
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dataToFill ? "Save" : "Add Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
