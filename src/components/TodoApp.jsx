import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Form from "./Form";
import TaskCard from "./TaskCard";
import "./TodoApp.css"; // Archivo CSS opcional para estilos adicionales
import { createTask } from "../../APIs/POSTphrase";

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);

  // Cargar las tareas desde localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      setTasks(storedTasks);
    }
  }, []);

  // Función para agregar una tarea
  const addTask = async (newTask) => {
    try {
      const response = await createTask(newTask); // Llama a la API para crear la tarea
      const taskWithPhrase = {
        text: newTask,
        phrase: response.quote + " - " + response.author, // Combinamos la frase
      };
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, taskWithPhrase];
        // Guardar las tareas actualizadas en localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        }
        return updatedTasks;
      });
    } catch (error) {
      console.error("No se pudo agregar la tarea:", error);
    }
  };

  // Función para eliminar una tarea
  const removeTask = (indexToRemove) => {
    const newTasks = tasks.filter((task, index) => index !== indexToRemove);
    setTasks(newTasks);
    // Guardar tareas actualizadas en localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("tasks", JSON.stringify(newTasks));
    }
  };

  return (
    <div className="w-full max-w-screen-md mx-auto">
      <Form addTask={addTask} /> {/* Componente para agregar tareas */}
      <div className="mt-4">
          <div className="grid grid-cols-1 gap-0.5">
            {tasks.map((task, index) => (

                <TaskCard
                  task={task.text}
                  phrase={task.phrase}
                  removeTask={() => removeTask(index)} // Llamamos a removeTask con el índice
                />
            ))}
          </div>
      </div>
    </div>
  );
}
