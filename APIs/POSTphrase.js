const API_URL = "https://api-python-ia-67ts.onrender.com/to-do"; // Asegúrate de incluir 'http://' o 'https://'

export const createTask = (taskText) => {
  return new Promise((resolve, reject) => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ id: taskText }) // Envía el texto de la tarea como ID
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al crear la tarea");
      }
      return response.json(); // Convierte la respuesta a JSON
    })
    .then(data => {
      resolve(data); // Resuelve con la respuesta en JSON
    })
    .catch(error => {
      reject(error); // Rechaza la promesa si hay un error
    });
  });
};
