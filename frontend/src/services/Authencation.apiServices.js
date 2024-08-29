import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://your-api-base-url.com', // Replace with your actual base URL
  withCredentials: true, // This ensures cookies (like the refresh token) are sent with requests
});

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 (Unauthorized) and the request has not been retried yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const { data } = await api.post('/auth/refresh-token');
        
        // Save the new access token in a cookie or wherever necessary
        document.cookie = `accessToken=${data.accessToken}; path=/; secure; httpOnly`;

        // Update the Authorization header with the new token
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        
        // Retry the original request with the new access token
        return api(originalRequest);
      } catch (err) {
        console.error('Token refresh failed:', err);
        return Promise.reject(err);
      }
    }

    // Reject the promise if the error is not handled by the interceptor
    return Promise.reject(error);
  }
);

export default api;
