// src/components/TodoApp.jsx
import { useState } from "react";
import Form from "./Form";
import TaskCard from "./TaskCard";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  return (
    <div className="w-full max-w-screen-md mx-auto">
      <Form addTask={addTask} />
      <div className="mt-4">
        <div className="grid grid-cols-1 gap-0.5">
            {tasks.map((task, index)=> (<TaskCard key={index} task={task}/>))}
        </div>
      </div>
    </div>
  );
}
