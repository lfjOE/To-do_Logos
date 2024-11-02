// src/components/Form.jsx
import { useState } from "react";

export default function Form({ addTask }) {
  const [task, setTask] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar el envío del formulario
    if (task.trim()) { // Asegurarse de que la tarea no esté vacía
      addTask(task); // Llama a la función para agregar la tarea
      setTask(""); // Limpia el input
      setHasSubmitted(true); // Marca como enviado
    }
  };

  return (
    <form className="TodoForm bg-transparent w-full max-w-4xl" onSubmit={handleSubmit}>
      <input
        className="text-white bg-transparent border-gray-600 border-2 w-full p-3 rounded-md mb-4"
        type="text"
        id="task"
        placeholder="What do we have to do today?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        type="submit"
        id="sub-btn"
        className="bg-[#0e0d0d] text-white py-2 px-4 rounded-md w-full shadow-black shadow-md"
      >
        Add Task
      </button>
    </form>
  );
}
