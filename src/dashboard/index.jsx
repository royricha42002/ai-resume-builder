import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import GlobalApi from "./../../service/GlobalApi";
import { useUser } from '@clerk/clerk-react';
import ResumeCardItem from "./components/ResumeCardItem";
import "./dashboard.css"; // Import CSS

function Dashboard() {
    const { user } = useUser();
    const [resumeList, setResumeList] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null);   // Add error state

    const GetResumesList = () => {
        setLoading(true); // Set loading to true before the API call
        GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
            .then(resp => {
                console.log("GetResumes Response:", resp);
                if (resp?.data?.data) {
                    setResumeList(resp.data.data);
                    setError(null); // Clear any previous error
                } else {
                    setResumeList([]); // Handle cases where data might be empty or undefined
                }
                setLoading(false); // Set loading to false after successful fetch
            })
            .catch(err => {
                console.error("Error fetching resumes:", err);
                setError(err);     // Set the error state
                setLoading(false); // Set loading to false on error
                setResumeList([]); // Ensure resumeList is an array in case of error
            });
    };

    useEffect(() => {
        if (user?.primaryEmailAddress?.emailAddress) {
            GetResumesList();
        } else {
            setLoading(false); // If no user email, we're not loading
        }
    }, [user]);

    if (loading) {
        return <p className="loading-message">Loading your resumes...</p>;
    }

    if (error) {
        return <p className="error-message">Error loading resumes: {error.message || 'Something went wrong.'}</p>;
    }

    return (
        <div className="dashboard-container">
            {/* Title and Subtitle */}
            <div className="dashboard-header">
                <h1 className="dashboard-title">My Resume</h1>
                <p className="dashboard-subtitle">Resumes reimagined, powered by AI</p>
            </div>

            {/* Plus Icon at the Top */}
            <div className="add-resume-container">
                <AddResume />
            </div>

            {/* Resume Cards Grid */}
            <div className="resume-grid">
                {resumeList.length > 0 ? (
                    resumeList.map((resume, index) => (
                        <ResumeCardItem resume={resume} key={index} />
                    ))
                ) : (
                    <p>No resumes found.</p>
                )}
            </div>
        </div>
    );
}

export default Dashboard;

// import React, { useEffect, useState } from "react";
// import AddResume from "./components/AddResume";
// import GlobalApi from "./../../service/GlobalApi";
// import { useUser } from '@clerk/clerk-react';
// import ResumeCardItem from "./components/ResumeCardItem";
// import "./dashboard.css";  // Import CSS

// function Dashboard() {
//   const { user } = useUser();
//   const [resumeList, setResumeList] = useState([]);

//   const GetResumesList = () => {
//     GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
//       .then(resp => {
//         console.log(resp.data);
//         setResumeList(resp.data.data); // Ensure correct structure
//       });
//   };

//   useEffect(() => {
//     user && GetResumesList();
//   }, [user]);

//   return (
//     <div className="dashboard-container">
//       {/* Title and Subtitle */}
//       <div className="dashboard-header">
//         <h1 className="dashboard-title">My Resume</h1>
//         <p className="dashboard-subtitle">Resumes reimagined, powered by AI</p>
//       </div>

//       {/* Plus Icon at the Top */}
//       <div className="add-resume-container">
//         <AddResume />
//       </div>

//       {/* Resume Cards Grid */}
//       <div className="resume-grid">
//         {resumeList.length > 0 &&
//           resumeList.map((resume, index) => <ResumeCardItem resume={resume} key={index} />)}
//       </div>
//     </div>
//   );
// }

// export default Dashboard;
