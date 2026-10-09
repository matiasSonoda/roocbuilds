import { ENDPOINTS } from '../config/apiConfig';
/*Aquí vive la comunicación con tu backend de Java.*/
export const fetchBuildById = async (id) => {
  // Nota: ENDPOINTS.builds.getOne debería ser una función que acepte el ID, ej: ENDPOINTS.builds.getOne(id)
  const response = await fetch(ENDPOINTS.builds.getOne(id));
  
  if (!response.ok) {
    throw new Error(`Error ${response.status}: The build could not be obtained.`);
  }
  
  return await response.json();
};