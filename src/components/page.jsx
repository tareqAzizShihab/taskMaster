import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { displayContext, mainDataContext } from "../context";
import ProjectControlProvider from "../projectModalController";
import Display from "./display/display";
import Sidebar from "./sidebar/sidebar";

export default function Page() {
  const [mainData, setMainData] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState({
    id: "abc",
    projectName: "Inbox",
    projectDescription: "All unsorted tasks",
    tasks: mainData.map((project) => project.tasks).flat(),
  });

  useEffect(() => {
    const pName = dataToDisplay.projectName;
    if (pName !== "Inbox" && pName !== "Today") {
      const newDataToDisplay = mainData
        .slice()
        .filter((project) => project.projectName === pName);
      console.log(newDataToDisplay);

      setDataToDisplay(() =>
        newDataToDisplay.length
          ? newDataToDisplay[0]
          : {
              id: "abc",
              projectName: "Inbox",
              projectDescription: "All unsorted tasks",
              tasks: mainData.map((project) => project.tasks).flat(),
            }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainData]);
  return (
    <div className="flex h-full">
      <mainDataContext.Provider value={{ mainData, setMainData }}>
        <displayContext.Provider value={{ dataToDisplay, setDataToDisplay }}>
          <ProjectControlProvider>
            <Sidebar />
            <Display />
          </ProjectControlProvider>
        </displayContext.Provider>
      </mainDataContext.Provider>
    </div>
  );
}
