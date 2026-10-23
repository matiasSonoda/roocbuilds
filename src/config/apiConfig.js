const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINTS = {
  builds: {
    getAll: `${API_BASE_URL}/v1/builds`, // GET
    getOne: (id) => `${API_BASE_URL}/v1/builds/${id}`, // GET
    create: `${API_BASE_URL}/v1/builds`, // POST
    vote: (id) => `${API_BASE_URL}/v1/builds/vote/${id}`, // PATCH
    delete: (id) => `${API_BASE_URL}/v1/builds/${id}`, // DELETE
  },
  images: {
    saveImage: `${API_BASE_URL}/v1/images`, // POST
  },
};
