import axios from "axios";

// Environment variables
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const API_URL = import.meta.env.VITE_STRAPI_API_URL || import.meta.env.VITE_BASE_URL;

// Create axios instance with CORS-friendly configuration
const axiosClient = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`,
    "Accept": "application/json"
    // Removed 'X-Requested-With' as it was causing CORS issues
  },
  withCredentials: true
});

// Request interceptor
axiosClient.interceptors.request.use(config => {
  console.debug(`[API] ${config.method?.toUpperCase()} to ${config.url}`);
  return config;
}, error => {
  console.error("[API] Request error:", error);
  return Promise.reject(error);
});

// Response interceptor
axiosClient.interceptors.response.use(
  response => response,
  error => {
    const errorInfo = {
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
      error: error.response?.data,
      headers: error.request?.headers
    };
    
    console.error("[API] Error:", errorInfo);
    
    if (error.response?.status === 401) {
      console.error("[API] Authentication error - check your API token");
    }
    
    if (error.code === "ERR_NETWORK") {
      console.error("[API] Network error - check CORS configuration");
    }
    
    return Promise.reject(error);
  }
);

const api = {
  async CreateNewResume(data) {
    try {
      const response = await axiosClient.post("/user-resumes", { data });
      return response.data;
    } catch (error) {
      console.error("Create resume failed:", error);
      throw error;
    }
  },

  async GetUserResumes(userEmail) {
    try {
      const response = await axiosClient.get("/user-resumes", {
        params: {
          "filters[userEmail][$eq]": userEmail,
          "populate": "*"
        }
      });
      return response.data;
    } catch (error) {
      console.error("Get resumes failed:", error);
      throw error;
    }
  },

  async UpdateResumeDetail(id, data) {
    try {
      const response = await axiosClient.put(`/user-resumes/${id}`, { data });
      return response.data;
    } catch (error) {
      console.error("Update resume failed:", error);
      throw error;
    }
  },

  async GetResumeById(id) {
    try {
      const response = await axiosClient.get(`/user-resumes/${id}`, {
        params: { "populate": "*" }
      });
      return response.data;
    } catch (error) {
      console.error("Get resume failed:", error);
      throw error;
    }
  },

  async DeleteResumeById(id) {
    try {
      const response = await axiosClient.delete(`/user-resumes/${id}`);
      return response.data;
    } catch (error) {
      console.error("Delete resume failed:", error);
      throw error;
    }
  }
};

export default api;


// import axios from "axios";

// const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
// const API_URL = import.meta.env.VITE_STRAPI_API_URL || import.meta.env.VITE_BASE_URL;

// const axiosClient = axios.create({
//     baseURL: `${API_URL}/api`,
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${API_KEY}`
//     }
// });

// // Add response interceptor to handle errors
// axiosClient.interceptors.response.use(
//     response => response,
//     error => {
//         console.error('API Error:', error.response?.data || error.message);
//         return Promise.reject(error);
//     }
// );

// const CreateNewResume = (data) => axiosClient.post('/user-resumes', data);

// const GetUserResumes = (userEmail) => axiosClient.get('/user-resumes', {
//     params: {
//         'filters[userEmail][$eq]': userEmail,
//         'populate': '*'
//     }
// });

// const UpdateResumeDetail = (id, data) => axiosClient.put(`/user-resumes/${id}`, data);

// const GetResumeById = (id) => axiosClient.get(`/user-resumes/${id}`, {
//     params: { 'populate': '*' }
// });

// const DeleteResumeById = (id) => axiosClient.delete(`/user-resumes/${id}`);

// export default {
//     CreateNewResume,
//     GetUserResumes,
//     UpdateResumeDetail,
//     GetResumeById,
//     DeleteResumeById
// };

// import axios from "axios";

// const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

// // const axiosClient = axios.create({
// //     baseURL: 'http://localhost:1337/api/',
// //     headers: {
// //         'Content-Type': 'application/json',
// //         'Authorization': `Bearer ${API_KEY}`
// //     }
// // })

// const axiosClient = axios.create({
//     baseURL: import.meta.env.VITE_BASE_URL+"/api/",
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${API_KEY}`
//     }
// })

// const CreateNewResume = (data) => axiosClient.post('/user-resumes', data);

// const GetUserResumes = (userEmail) => axiosClient.get('/user-resumes?filters[userEmail][$eq]=' + userEmail);

// const UpdateResumeDetail = (id, data) => axiosClient.put('/user-resumes/' + id, data)

// const GetResumeById = (id) => axiosClient.get('/user-resumes/' + id + "?populate=*")

// const DeleteResumeById = (id) => axiosClient.delete('/user-resumes/' + id)
// 4
// export default {
//     CreateNewResume,
//     GetUserResumes,
//     UpdateResumeDetail,
//     GetResumeById,
//     DeleteResumeById
// }
