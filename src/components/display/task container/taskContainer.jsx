import Task from "./task";

export default function TaskContainer({ tasks }) {
  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <Task key={task.id} data={task} />
      ))}
    </div>
  );
}
