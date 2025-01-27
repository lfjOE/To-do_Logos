import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Form from "./Form";
import TaskCard from "./TaskCard";
import "./TodoApp.css"; // Archivo CSS opcional para estilos adicionales
import { createTask } from "../../APIs/POSTphrase";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      setTasks(storedTasks);
    }
  }, []);

  const addTask = async (newTask) => {
    try {
      const response = await createTask(newTask); // Llama a la API para crear la tarea
      const taskWithPhrase = {
        text: newTask,
        phrase: response.quote + " - " + response.author, // Combinamos la frase
      };
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, taskWithPhrase];
        if (typeof window !== "undefined") {
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        }
        return updatedTasks;
      });
    } catch (error) {
      console.error("No se pudo agregar la tarea:", error);
    }
  };

  const removeTask = (indexToRemove) => {
    const newTasks = tasks.filter((task, index) => index !== indexToRemove);
    setTasks(newTasks);
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    }
  };

  return (
    <div className="w-full max-w-screen-md mx-auto">
      <Form addTask={addTask} /> {/* Componente para agregar tareas */}
      <div className="mt-4">
        <AnimatePresence>
          <div className="grid grid-cols-1 gap-0.5">
            {tasks.map((task, index) => (
              <motion.div
                key={index} // Usamos el índice como key
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                layout // Aquí añadimos la propiedad layout
                transition={{ duration: 0.4 }}
              >
                <TaskCard
                  task={task.text}
                  phrase={task.phrase}
                  removeTask={() => removeTask(index)} // Llamamos a removeTask con el índice
                />
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
