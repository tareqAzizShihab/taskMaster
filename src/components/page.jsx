import { useState } from "react";
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
