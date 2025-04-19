import { useContext, useEffect } from "react";
import { displayContext, mainDataContext } from "../../context";
import convertDate from "../../useFunc";
export default function SortOption() {
  const { dataToDisplay, setDataToDisplay } = useContext(displayContext);
  const mainData = useContext(mainDataContext).mainData;

  useEffect(() => {
    if (dataToDisplay.projectName === "Inbox") {
      setDataToDisplay({
        projectName: "Inbox",
        projectDescription: "All unsorted tasks",
        tasks: mainData.map((project) => project.tasks).flat(),
      });
    }
  }, [mainData, dataToDisplay.projectName, setDataToDisplay]);

  return (
    <div>
      <button
        onClick={() =>
          setDataToDisplay({
            projectName: "Inbox",
            projectDescription: "All unsorted tasks",
            tasks: mainData.map((project) => project.tasks).flat(),
          })
        }
        className={`w-full text-left px-4 py-2 rounded-md ${
          dataToDisplay.projectName === "Inbox"
            ? `bg-blue-100 text-blue-600`
            : `hover:bg-gray-100`
        }`}
      >
        <i className="fas fa-inbox mr-3"></i> Inbox
      </button>
      <button
        onClick={() => {
          setDataToDisplay({
            projectName: "Today",
            projectDescription: "All todays tasks",
            tasks: mainData
              .slice()
              .map((project) => {
                const taskToReturn = project.tasks
                  .slice()
                  .filter(
                    (task) =>
                      convertDate(task.taskDueDate) === convertDate(new Date())
                  );
                return taskToReturn;
              })
              .flat(),
          });
        }}
        className={`w-full text-left px-4 py-2 rounded-md ${
          dataToDisplay.projectName === "Today"
            ? `bg-blue-100 text-blue-600`
            : `hover:bg-gray-100`
        }`}
      >
        <i className="far fa-calendar-alt mr-3"></i> Today
      </button>
    </div>
  );
}
