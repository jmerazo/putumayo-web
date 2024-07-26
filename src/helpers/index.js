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