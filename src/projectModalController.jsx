import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { projectModalControlContext } from "./context";

export default function ProjectControlProvider({ children }) {
  const handleProjectModal = () =>
    setProjectModalOptions((prev) => ({ ...prev, isOpen: !prev.isOpen }));
  const [projectModalOptions, setProjectModalOptions] = useState({
    isOpen: false,
    handleProjectModal,
    dataToFill: "",
  });
  return (
    <projectModalControlContext.Provider
      value={{ setProjectModalOptions, projectModalOptions }}
    >
      {children}
    </projectModalControlContext.Provider>
  );
}
