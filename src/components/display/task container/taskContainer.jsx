import Task from "./task";

export default function TaskContainer({
  props: { dataToDisplay, setDataToDisplay },
}) {
  return (
    <div className="space-y-3">
      {dataToDisplay.tasks.map((task) => (
        <Task key={task.id} data={task} updateDisplay={setDataToDisplay} />
      ))}
    </div>
  );
}
