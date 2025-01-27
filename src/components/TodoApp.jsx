// src/components/TodoApp.jsx
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Form from "./Form";
import TaskCard from "./TaskCard";
import "./TodoApp.css";  // Archivo CSS opcional para estilos adicionales
import { createTask } from "../../APIs/POSTphrase";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);
  
  const addTask = async (newTask) => {
    try {
      const response = await createTask(newTask); // Llama a createTask
      const taskWithId = {
        id: response.quote,
        text: newTask,
        phrase: response.frase // Asegúrate de que `phrase` sea un string y no un objeto
      };
      setTasks((prevTasks) => [...prevTasks, taskWithId]);
    } catch (error) {
      console.error("No se pudo agregar la tarea:", error);
    }
  };

  const removeTask = (idToRemove) => {
    const newTasks = tasks.filter((task) => task.id !== idToRemove);
    setTasks(newTasks);
  };

  return (
    <div className="w-full max-w-screen-md mx-auto">
      <Form addTask={addTask} />
      <div className="mt-4">
        <AnimatePresence>
          <div className="grid grid-cols-1 gap-0.5">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                layout
                transition={{ duration: 0.4 }}
              >
                <TaskCard 
                  task={task.text}
                  phrase = {task.phrase}
                  removeTask={() => removeTask(task.id)} 
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
