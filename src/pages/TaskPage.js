import React from "react";
import TaskList from "../components/Tasks/TaskList";
import AddTask from "../components/Tasks/AddTask";

const TaskPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen ">
      <AddTask />
      <TaskList />
    </div>
  );
};

export default TaskPage;
