import axios from 'axios';

const apiUrl = 'http://localhost:3001'; // Ensure this matches your server
const tokenKey = 'authToken';

const authService = {
  async register(user) {
    try {
      const response = await axios.post(`${apiUrl}/register`, user);
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async login(credentials) {
    try {
      const response = await axios.post(`${apiUrl}/login`, credentials);
      if (response.data.token) {
        this.setToken(response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  logout() {
    this.clearToken();
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  getToken() {
    return localStorage.getItem(tokenKey);
  },

  setToken(token) {
    localStorage.setItem(tokenKey, token);
  },

  clearToken() {
    localStorage.removeItem(tokenKey);
  },

  async getProducts() {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
    },
};




export default authService;
