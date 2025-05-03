import { useReducer } from "react";
import { TMOContext } from "./context";
const initialState = {
  isOpen: false,
  openFrom: "",
  dataToFill: false,
};

function taskModalReducer(options, action) {
  switch (action.type) {
    case "open":
      return {
        ...options,
        isOpen: true,
        openFrom: action?.payload?.openFrom,
        dataToFill: action?.payload?.dataToFill
          ? action.payload.dataToFill
          : false,
      };
    case "close":
      return {
        ...options,
        isOpen: false,
        dataToFill: false,
      };
    default:
      return options;
  }
}

export default function TMOProvider({ children }) {
  const [options, dispatch] = useReducer(taskModalReducer, initialState);

  function openTaskModal(openFrom, dataToFill = false) {
    dispatch({
      type: "open",
      payload: {
        openFrom,
        dataToFill,
      },
    });
  }

  function closeTaskModal() {
    dispatch({ type: "close" });
  }

  return (
    <TMOContext.Provider value={{ options, openTaskModal, closeTaskModal }}>
      {children}
    </TMOContext.Provider>
  );
}
