import axios from "axios";

// Enhanced environment validation
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY?.trim();
const API_URL = (import.meta.env.VITE_STRAPI_API_URL || import.meta.env.VITE_BASE_URL)?.replace(/\/+$/, "");

if (!API_KEY) {
  console.error("❌ VITE_STRAPI_API_KEY is missing or empty");
  throw new Error("API key is required");
}

if (!API_URL) {
  console.error("❌ API base URL is missing");
  throw new Error("API base URL is required");
}

console.log("ℹ️ API Base URL:", API_URL);
console.log("ℹ️ API Key Present:", !!API_KEY);

// Configure axios instance
const axiosClient = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`,
    "Accept": "application/json"
  },
  withCredentials: false // Disable if not using cookies
});

// Enhanced request logging
axiosClient.interceptors.request.use(config => {
  console.groupCollapsed(`⇨ ${config.method?.toUpperCase()} ${config.url}`);
  console.log("Headers:", { 
    Authorization: config.headers.Authorization ? "Present" : "Missing",
    ...config.headers 
  });
  console.groupEnd();
  return config;
});

// Enhanced error handling
axiosClient.interceptors.response.use(
  response => {
    console.log(`⇦ ${response.status} ${response.config.url}`);
    return response;
  },
  error => {
    const errorData = {
      status: error.response?.status,
      method: error.config?.method,
      url: error.config?.url,
      error: error.response?.data?.error || error.message,
      headers: {
        sent: error.config?.headers,
        received: error.response?.headers
      }
    };

    console.group("❌ API Error");
    console.error("Details:", errorData);
    
    if (error.response?.status === 401) {
      console.error("Authentication Failed. Possible causes:");
      console.error("- Expired or invalid API token");
      console.error("- Incorrect token permissions");
      console.error("- Token not properly included in request");
      
      // Dispatch global auth error event
      window.dispatchEvent(new CustomEvent("strapi-auth-error", {
        detail: errorData
      }));
    }
    console.groupEnd();

    return Promise.reject(error);
  }
);

// API Methods with enhanced validation
const api = {
  async healthCheck() {
    const response = await axiosClient.get("/_health");
    return response.data;
  },

  async CreateNewResume(data) {
    try {
      console.log("Creating resume with data:", data);
      const response = await axiosClient.post("/user-resumes", { data });
      return response.data;
    } catch (error) {
      console.error("Resume creation failed. Server responded with:", error.response?.data);
      throw new Error("Failed to create resume. Please check your permissions.");
    }
  },

  // Other methods remain the same pattern
  // ...
};

// Verify initial connection
api.healthCheck()
  .then(() => console.log("✅ Successfully connected to Strapi API"))
  .catch(err => console.error("❌ Initial connection failed:", err));

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
