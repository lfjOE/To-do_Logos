import { MdDelete } from "react-icons/md";
import { useState } from "react";

export default function TaskCard({ task, removeTask, phrase }) {
  const [isVisible, setIsVisible] = useState(true);

  const handleRemove = () => {
    setIsVisible(false); // Cambia el estado a invisible
    setTimeout(removeTask, 300); // Llama a la función removeTask después de 300 ms (la duración de la animación)
  };

  return (
    <div className={`bg-[#222020] p-4 rounded-lg shadow-lg mb-4 shadow-black flex justify-between items-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <span className="w-11/12">
      <h3 className="text-white overflow-wrap break-words w-full">{task}</h3>
      <h2 className="text-gray-400 w-full">Lorem Ipsum Dolor</h2>
      </span>
      
      <button
        className="transition-transform transform hover:scale-110 hover:shadow-lg"
        onClick={handleRemove}
      >
        <MdDelete 
          className="text-white transition-colors duration-300 hover:text-red-500" 
          size={30} 
        />
      </button>
    </div>
  );
}
