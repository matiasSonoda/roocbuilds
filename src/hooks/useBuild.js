import { useState, useEffect } from 'react';
import { fetchBuildById } from '../service/buildService.js';

export const useBuild = (id) => {
  const [buildDetails, setBuildDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchBuildById(id)
      .then((data) => {
        setBuildDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Retornamos un objeto con los 3 estados para que la UI los consuma
  return { buildDetails, loading, error };
};