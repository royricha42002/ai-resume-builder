import axios from "axios";

// Environment variables with validation
const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const API_URL = import.meta.env.VITE_STRAPI_API_URL || import.meta.env.VITE_BASE_URL;

if (!API_KEY) {
  console.error('Missing VITE_STRAPI_API_KEY in environment variables');
}

if (!API_URL) {
  console.error('Missing both VITE_STRAPI_API_URL and VITE_BASE_URL in environment variables');
}

// Create axios instance with default headers
const axiosClient = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
    'Accept': 'application/json'
  }
});

// Enhanced request interceptor
axiosClient.interceptors.request.use(config => {
  console.debug(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
  return config;
}, error => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

// Enhanced response interceptor
axiosClient.interceptors.response.use(
  response => {
    console.debug('API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data
    });
    return response;
  },
  error => {
    const errorDetails = {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
      requestHeaders: error.config?.headers,
      responseData: error.response?.data,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    };

    console.error('API Error Details:', errorDetails);
    
    // Convert to a more user-friendly error format
    const apiError = new Error(error.response?.data?.error?.message || error.message);
    apiError.details = errorDetails;
    
    return Promise.reject(apiError);
  }
);

// API methods with enhanced options
const api = {
  CreateNewResume: (data) => axiosClient.post('/user-resumes', data),
  
  GetUserResumes: (userEmail) => axiosClient.get('/user-resumes', {
    params: {
      'filters[userEmail][$eq]': userEmail,
      'populate': '*',
      'sort': 'createdAt:desc' // Added default sorting
    }
  }),

  UpdateResumeDetail: (id, data) => axiosClient.put(`/user-resumes/${id}`, {
    data: data // Wrapped in data object for Strapi v4 compliance
  }),

  GetResumeById: (id) => axiosClient.get(`/user-resumes/${id}`, {
    params: { 
      'populate': '*',
      'publicationState': 'live' // Ensure published content
    }
  }),

  DeleteResumeById: (id) => axiosClient.delete(`/user-resumes/${id}`, {
    params: {
      'confirmDeletion': true // Added for explicit confirmation
    }
  }),

  // Health check endpoint
  CheckAPIHealth: () => axiosClient.get('/_health')
};

// Debug log to verify initialization
console.log('API Client initialized with baseURL:', axiosClient.defaults.baseURL);

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
