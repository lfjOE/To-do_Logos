import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Form from "./Form";
import TaskCard from "./TaskCard";
import "./TodoApp.css";
import { createTask, getTasksFromApi } from "../../APIs/POSTphrase";  // Asegúrate de que esta función existe

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Obtener las tareas desde la API al cargar el componente
    const loadTasks = async () => {
      try {
        const response = await getTasksFromApi();  // Obtén las tareas desde la API
        setTasks(response);  // Asigna las tareas a tu estado
      } catch (error) {
        console.error("Error al cargar las tareas:", error);
      }
    };

    loadTasks();
  }, []);  // El array vacío asegura que esto solo se ejecute una vez cuando el componente se monte

  const addTask = async (newTask) => {
    try {
      const response = await createTask(newTask);
      const taskWithId = {
        id: response.id,
        text: newTask,
        phrase: response.quote + " - " + response.author,
      };
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, taskWithId];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    } catch (error) {
      console.error("No se pudo agregar la tarea:", error);
    }
  };

  const removeTask = (idToRemove) => {
    const newTasks = tasks.filter((task) => task.id !== idToRemove);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));
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
                  phrase={task.phrase}
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
