import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Form from "./Form";
import TaskCard from "./TaskCard";
import "./TodoApp.css"; // Archivo CSS opcional para estilos adicionales
import { createTask } from "../../APIs/POSTphrase";

export default function TodoApp() {
  // Cargar tareas desde localStorage al inicio
  const loadTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return []; // Si no hay tareas guardadas, retornar un array vacío
  };

  const [tasks, setTasks] = useState(loadTasks);

  const saveTasks = (tasks) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const addTask = async (newTask) => {
    try {
      const response = await createTask(newTask); // Llama a createTask
      const taskWithId = {
        id: new Date().getTime(), // Usamos el timestamp como ID único
        text: newTask,
        phrase: response.quote + " - " + response.author,
        prev: null, // Sin tarea anterior al principio
        next: null, // Sin tarea siguiente al principio
      };

      // Si no hay tareas, es la primera tarea, solo agrega
      if (tasks.length === 0) {
        setTasks([taskWithId]);
      } else {
        // Si hay tareas, agregamos la nueva tarea al final de la lista
        const lastTask = tasks[tasks.length - 1];
        lastTask.next = taskWithId.id; // El último elemento apunta al nuevo
        taskWithId.prev = lastTask.id; // El nuevo apunta al último

        setTasks((prevTasks) => [...prevTasks, taskWithId]);
      }

      // Guardar en localStorage
      saveTasks([...tasks, taskWithId]);

    } catch (error) {
      console.error("No se pudo agregar la tarea:", error);
    }
  };

  const removeTask = (idToRemove) => {
    const taskIndex = tasks.findIndex((task) => task.id === idToRemove);
    if (taskIndex !== -1) {
      const newTasks = [...tasks];
      const taskToRemove = newTasks[taskIndex];

      // Actualizar las referencias de las tareas anterior y siguiente
      if (taskToRemove.prev) {
        const prevTask = newTasks.find((task) => task.id === taskToRemove.prev);
        if (prevTask) prevTask.next = taskToRemove.next;
      }

      if (taskToRemove.next) {
        const nextTask = newTasks.find((task) => task.id === taskToRemove.next);
        if (nextTask) nextTask.prev = taskToRemove.prev;
      }

      // Eliminar la tarea
      newTasks.splice(taskIndex, 1);

      // Guardar el estado actualizado en localStorage
      setTasks(newTasks);
      saveTasks(newTasks);
    }
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
