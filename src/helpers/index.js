//para funcion de getFullImageUrl
import api from "@/api/api";

//funcion para obtener la ruta de una imagen formateada
export const getFullImageUrl = (relativePath) => {
    if (relativePath) {
      return `${api.defaults.baseURL}${relativePath.replace(/\\/g, "/")}`;
    } else {
      return "/img/sin_img.png";
    }
};

export const getFullNewsImageUrl = (relativePath) => {
  if (relativePath) {
    // Reemplazar todas las ocurrencias redundantes de '/api/' y '/files/' seguidas de sí mismas
    let cleanedPath = relativePath.replace(/(\/api\/)+/g, "/").replace(/(\/files\/)+/g, "/files/");
    
    // Asegurarse de que la ruta no comienza con '/api/' nuevamente después de la limpieza
    if (cleanedPath.startsWith('/api/')) {
      cleanedPath = cleanedPath.replace('/api/', '/');
    }

    // Concatenar la URL base con la ruta limpia
    return `${api.defaults.baseURL}${cleanedPath.replace(/\\/g, "/")}`;
  } else {
    return "/img/sin_img.png";
  }
};

