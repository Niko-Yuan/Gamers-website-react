import axios from "axios";

// const API_URL = "http://localhost:8080/api/auth/";
const API_URL = "https://gamers-server.onrender.com/api/auth/";

const register = (username, email, password, roles) => {
  return axios
    .post(API_URL + "signup", {
      username,
      email,
      password,
      roles,
    }).then((response) => {
      console.log("Success:", response.data);
    })
    .catch((error) => {
      console.log("Error:", error);
      if (error.response) {
        console.log("Data:", error.response.data);
        console.log("Status:", error.response.status);
        console.log("Headers:", error.response.headers);
      } else if (error.request) {
        console.log("Request:", error.request);
      } else {
        console.log("General Error:", error.message);
      }
    });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
