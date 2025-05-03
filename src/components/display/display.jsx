import { useContext } from "react";
import { displayContext } from "../../context";
import TMOProvider from "../../takModalController";
import convertDate from "../../useFunc";
import Header from "./header";
import TaskContainer from "./task container/taskContainer";
export default function Display() {
  const { dataToDisplay, setDataToDisplay } = useContext(displayContext);

  return (
    <div className="flex-1 overflow-auto">
      <div className="max-w-4xl mx-auto p-8">
        <TMOProvider>
          <Header
            description={dataToDisplay.projectDescription}
            projectDue={
              dataToDisplay.projectName === "Inbox"
                ? ""
                : convertDate(dataToDisplay.projectDueDate)
            }
          />
          <TaskContainer props={{ dataToDisplay, setDataToDisplay }} />
        </TMOProvider>
      </div>
    </div>
  );
}
