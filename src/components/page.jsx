import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { displayContext, mainDataContext } from "../context";
import Display from "./display/display";
import Sidebar from "./sidebar/sidebar";

export default function Page() {
  const [mainData, setMainData] = useState([
    {
      id: "abc-123",
      projectName: "First Project",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, rem.",
      projectDueDate:
        "Thu Apr 17 2025 00:00:00 GMT+0600 (Bangladesh Standard Time)",
      projectDone: false,
      tasks: [
        {
          id: "a-1",
          taskName: "Habijabi Kaj",
          taskDescription: "Lorem ipsum dolor sit amet consectetur.",
          taskDueDate:
            "Thu Apr 10 2025 00:00:00 GMT+0600 (Bangladesh Standard Time)",
          taskDone: false,
        },
        {
          id: "b-2",
          taskName: "Onek kaj Baki",
          taskDescription: "Lorem ipsum dolor sit amet consectetur.",
          taskDueDate:
            "Thu Apr 15 2025 00:00:00 GMT+0600 (Bangladesh Standard Time)",
          taskDone: false,
        },
      ],
    },
    {
      id: "def-456",
      projectName: "Second Project",
      projectDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, rem.",
      projectDueDate:
        "Thu May 01 2025 00:00:00 GMT+0600 (Bangladesh Standard Time)",
      projectDone: false,
      tasks: [
        {
          id: "d-4",
          taskName: "Olpo kaj Baki",
          taskDescription: "Lorem ipsum dolor sit amet consectetur.",
          taskDueDate:
            "Thu Apr 28 2025 00:00:00 GMT+0600 (Bangladesh Standard Time)",
          taskDone: false,
        },
      ],
    },
  ]);
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
          <Sidebar />
          <Display />
        </displayContext.Provider>
      </mainDataContext.Provider>
    </div>
  );
}
