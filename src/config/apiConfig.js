const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
  builds: {
    getAll: `${API_BASE_URL}/builds`, // GET
    getOne: (id) => `${API_BASE_URL}/builds/${id}`, // GET
    create: `${API_BASE_URL}/builds`, // POST
    vote: (id) => `${API_BASE_URL}/builds/vote/${id}`, // PATCH
    delete: (id) => `${API_BASE_URL}/builds/${id}`, // DELETE
  },
  images: {
    saveImage: `${API_BASE_URL}/images`, // POST
  },
};
