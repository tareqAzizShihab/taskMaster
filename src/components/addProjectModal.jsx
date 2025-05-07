import "flatpickr/dist/themes/material_blue.css";
import { useContext, useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import { displayContext, mainDataContext } from "../context";

export default function AddProjectModal({
  options: { isOpen, handleProjectModal, dataToFill },
}) {
  const [formData, setFormData] = useState({
    id: crypto.randomUUID(),
    projectName: "",
    projectDescription: "",
    projectDueDate: "",
    projectDone: false,
    tasks: [],
  });

  const [isNameErr, setIsNameErr] = useState(null);
  const { mainData, setMainData } = useContext(mainDataContext);
  const { setDataToDisplay } = useContext(displayContext);

  useEffect(() => {
    if (isOpen) {
      if (dataToFill) {
        setFormData(dataToFill);
      } else {
        setFormData({
          id: crypto.randomUUID(),
          projectName: "",
          projectDescription: "",
          projectDueDate: "",
          projectDone: false,
          tasks: [],
        });
      }
      setIsNameErr(null);
    }
  }, [isOpen, dataToFill]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleDueDate(dates) {
    setFormData((prev) => ({ ...prev, projectDueDate: dates[0] }));
  }

  function handleCreate(e) {
    e.preventDefault();
    if (formData.projectName) {
      function createProject() {
        setMainData((prev) => [...prev, formData]);
        setDataToDisplay(formData);
      }

      function saveProject() {
        const newData = mainData.map((project) => {
          if (project.id === dataToFill.id) {
            return formData;
          } else {
            return project;
          }
        });
        setMainData(newData);
      }

      dataToFill ? saveProject() : createProject();
      clearInput();
      handleProjectModal();
    } else {
      setIsNameErr(true);
    }
  }

  function clearInput() {
    setFormData({
      projectName: "",
      projectDescription: "",
      projectDueDate: "",
      projectDone: false,
      tasks: [],
      id: "",
    });
  }

  return (
    <div
      id="projectModal"
      className={`fixed inset-0 backdrop-blur-sm items-center justify-center z-50 ${
        isOpen ? `flex` : `hidden`
      }`}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Create Project
            </h3>
          </div>

          <form>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="projectName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Project Name
                </label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  onChange={(e) => handleInputChange(e)}
                  value={formData.projectName}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="My Awesome Project"
                  required
                />
                <p
                  className={`text-sm text-red-600 ${
                    isNameErr && !formData.projectName ? `block` : `hidden`
                  }`}
                >
                  You can't create a project without a name.
                </p>
              </div>

              <div>
                <label
                  htmlFor="projectDescription"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  rows="3"
                  onChange={(e) => handleInputChange(e)}
                  value={formData.projectDescription}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="What's this project about?"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="projectDueDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Target Date
                </label>
                <Flatpickr
                  options={{
                    dateFormat: "Y-m-d",
                    minDate: "today",
                  }}
                  placeholder="yyyy-dd-mm"
                  value={formData.projectDueDate}
                  onChange={handleDueDate}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {
                  clearInput();
                  handleProjectModal();
                }}
                type="button"
                id="cancelProjectModal"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {dataToFill ? "Save" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
