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

export async function createBuild(buildData) {
  const response = await fetch(ENDPOINTS.builds.create, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(buildData),
  });

  if (!response.ok) {
    throw new Error(
      `No se pudo publicar la build (HTTP ${response.status}).`
    );
  }
}