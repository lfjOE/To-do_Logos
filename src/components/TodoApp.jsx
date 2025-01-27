import { useState, useEffect } from "react";
import { createTask, getTasksFromApi } from "../../APIs/POSTphrase";  // Asumimos que getTasksFromApi obtiene las tareas de la API

export default function TodoApp() {
  const [tasks, setTasks] = useState([]);

  // Cargar las tareas del localStorage o de la API
  useEffect(() => {
    const loadTasks = async () => {
      if (typeof window !== "undefined") {
        // Primero intentamos obtener tareas desde localStorage
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        if (storedTasks.length > 0) {
          setTasks(storedTasks);
        } else {
          // Si no hay tareas en localStorage, obtenemos desde la API
          const tasksFromApi = await getTasksFromApi();
          setTasks(tasksFromApi);
          localStorage.setItem("tasks", JSON.stringify(tasksFromApi));  // Guardar las tareas en localStorage
        }
      }
    };

    loadTasks();
  }, []);

  // Agregar tarea
  const addTask = async (newTask) => {
    try {
      const response = await createTask(newTask);  // Llamamos a la API para crear una nueva tarea
      const taskWithId = {
        id: response.id,
        text: newTask,
        phrase: response.quote + " - " + response.author
      };
      
      // Actualizar estado y localStorage
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, taskWithId];
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    } catch (error) {
      console.error("No se pudo agregar la tarea:", error);
    }
  };

  // Eliminar tarea
  const removeTask = (idToRemove) => {
    const newTasks = tasks.filter((task) => task.id !== idToRemove);
    setTasks(newTasks);
    localStorage.setItem("tasks", JSON.stringify(newTasks));  // Actualizar localStorage
  };

  return (
    <div>
      <h1>Tareas</h1>
      <div>
        {/* Aquí puedes agregar un formulario para agregar tareas si lo deseas */}
        <button onClick={() => addTask("Nueva tarea")}>Agregar tarea</button>
      </div>

      <div>
        {tasks.map((task) => (
          <div key={task.id}>
            <p>{task.text}</p>
            <p>{task.phrase}</p>
            <button onClick={() => removeTask(task.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
}
