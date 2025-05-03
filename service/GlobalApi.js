import axios from "axios";

// Validate environment variables on startup
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const API_URL = import.meta.env.VITE_STRAPI_API_URL || import.meta.env.VITE_BASE_URL;

if (!API_KEY) console.error("VITE_STRAPI_API_KEY is missing in environment variables");
if (!API_URL) console.error("Both VITE_STRAPI_API_URL and VITE_BASE_URL are missing");

// Create axios instance with enhanced configuration
const axiosClient = axios.create({
  baseURL: `${API_URL.replace(/\/+$/, "")}/api`, // Remove any trailing slashes
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`,
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  }
});

// Request interceptor for logging and auth header verification
axiosClient.interceptors.request.use(
  (config) => {
    console.debug(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    
    if (!config.headers.Authorization) {
      console.warn("No Authorization header present in request");
      config.headers.Authorization = `Bearer ${API_KEY}`;
    }
    
    return config;
  },
  (error) => {
    console.error("[API] Request Error:", error);
    return Promise.reject(error);
  }
);

// Enhanced response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    console.debug(`[API] ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    const errorDetails = {
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
      headers: error.config?.headers,
      errorData: error.response?.data,
      timestamp: new Date().toISOString()
    };

    console.error("[API] Error Details:", errorDetails);

    // Handle specific error cases
    if (error.response?.status === 401) {
      console.error("[API] Authentication failed - Verify your API token is valid and has proper permissions");
      window.dispatchEvent(new CustomEvent("api-auth-error", { detail: errorDetails }));
    }

    // Create enriched error object
    const apiError = new Error(error.response?.data?.error?.message || "API request failed");
    apiError.details = errorDetails;
    apiError.status = error.response?.status;
    
    return Promise.reject(apiError);
  }
);

// API methods with enhanced error handling
const api = {
  /**
   * Create a new resume
   * @param {Object} data - Resume data
   * @returns {Promise} 
   */
  async CreateNewResume(data) {
    try {
      const response = await axiosClient.post("/user-resumes", { data });
      return response.data;
    } catch (error) {
      console.error("Failed to create resume:", error.details);
      throw error;
    }
  },

  /**
   * Get resumes by user email
   * @param {string} userEmail 
   * @returns {Promise}
   */
  async GetUserResumes(userEmail) {
    try {
      const response = await axiosClient.get("/user-resumes", {
        params: {
          "filters[userEmail][$eq]": userEmail,
          "populate": "*",
          "publicationState": "live"
        }
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch resumes:", error.details);
      throw error;
    }
  },

  /**
   * Update resume details
   * @param {string} id - Resume ID
   * @param {Object} data - Update data
   * @returns {Promise}
   */
  async UpdateResumeDetail(id, data) {
    try {
      const response = await axiosClient.put(`/user-resumes/${id}`, { data });
      return response.data;
    } catch (error) {
      console.error(`Failed to update resume ${id}:`, error.details);
      throw error;
    }
  },

  /**
   * Get resume by ID
   * @param {string} id - Resume ID 
   * @returns {Promise}
   */
  async GetResumeById(id) {
    try {
      const response = await axiosClient.get(`/user-resumes/${id}`, {
        params: {
          "populate": "*",
          "publicationState": "live"
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch resume ${id}:`, error.details);
      throw error;
    }
  },

  /**
   * Delete resume by ID
   * @param {string} id - Resume ID
   * @returns {Promise} 
   */
  async DeleteResumeById(id) {
    try {
      const response = await axiosClient.delete(`/user-resumes/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to delete resume ${id}:`, error.details);
      throw error;
    }
  },

  /**
   * Check API health status
   * @returns {Promise}
   */
  async CheckAPIHealth() {
    try {
      const response = await axiosClient.get("/_health");
      return response.data;
    } catch (error) {
      console.error("API health check failed:", error.details);
      throw error;
    }
  }
};

// Log initialization
console.log("[API] Initialized with configuration:", {
  baseURL: axiosClient.defaults.baseURL,
  timeout: axiosClient.defaults.timeout,
  headers: axiosClient.defaults.headers
});

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
