const API_URL = "https://api-python-ia-67ts.onrender.com/to-do"; // URL de la API

// Crear una nueva tarea
export const createTask = (taskText) => {
  return new Promise((resolve, reject) => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: taskText }),  // Enviar el texto de la tarea
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al crear la tarea");
      }
      return response.json();
    })
    .then((data) => {
      resolve(data);  // Devuelve la respuesta de la API
    })
    .catch((error) => {
      reject(error);  // Si hay un error, rechaza la promesa
    });
  });
};

// Obtener todas las tareas desde la API
export const getTasksFromApi = () => {
  return new Promise((resolve, reject) => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las tareas");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);  // Devuelve las tareas obtenidas
      })
      .catch((error) => {
        reject(error);  // Si hay un error, rechaza la promesa
      });
  });
};
