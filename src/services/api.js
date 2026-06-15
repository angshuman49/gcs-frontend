const BASE_API_URL = "https://gcs-backend-gnvd.onrender.com/api";

const api = async (endpoint, options = {}) => {
  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401 && refreshToken) {
    const refreshResponse = await fetch(`${BASE_API_URL}/auth/token/refresh/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken })
    });

    if (refreshResponse.ok) {
      const { access } = await refreshResponse.json();
      localStorage.setItem('access_token', access);

      headers['Authorization'] = `Bearer ${access}`;
      const retryResponse = await fetch(`${BASE_API_URL}${endpoint}`, {
        ...options,
        headers,
      });

      return retryResponse.json();
    }
  }
  
  return response.json();
}

export const apiPost = (endpoint, data) => {
  return api(endpoint, {
    method: 'POST',
    body: JSON.stringify(data)
  });
};

export const apiGet = (endpoint) => {
  return api(endpoint, { method: 'GET' });
};
