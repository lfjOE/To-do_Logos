const API_URL = "44.233.151.27/to-do";

export const createTask = (taskText) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", API_URL, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response); // Resuelve con la respuesta en JSON
          } catch (error) {
            reject(new Error("Error al analizar la respuesta JSON"));
          }
        } else {
          reject(new Error("Error al crear la tarea"));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Error de red o CORS"));
    };

    // Envía el texto de la tarea como ID
    xhr.send(JSON.stringify({ id: taskText }));
  });
};
