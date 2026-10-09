import { IMAGE_UPLOAD_ENDPOINT } from './buildFormConstants';

export async function uploadBuildImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(IMAGE_UPLOAD_ENDPOINT, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`No se pudo subir la imagen (HTTP ${response.status}).`);
  }

  const data = await response.json();
  if (typeof data.publicUrl !== 'string' || data.publicUrl.length === 0) {
    throw new Error('El servidor no devolvió una URL válida para la imagen.');
  }

  return data.publicUrl;
}
