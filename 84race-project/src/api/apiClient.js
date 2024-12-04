import axios from 'axios';

// Tạo instance mới của Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api', // Địa chỉ gốc API của bạn
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`, // Thêm token từ localStorage
  },
});

// Thêm interceptor để cập nhật token trước mỗi request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Gắn lại token nếu có
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
