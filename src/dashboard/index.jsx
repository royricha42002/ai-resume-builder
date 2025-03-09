import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import GlobalApi from "./../../service/GlobalApi";
import { useUser } from '@clerk/clerk-react';
import ResumeCardItem from "./components/ResumeCardItem";
import "./dashboard.css";  // Import CSS

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        console.log(resp.data);
        setResumeList(resp.data.data); // Ensure correct structure
      });
  };

  useEffect(() => {
    user && GetResumesList();
  }, [user]);

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
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => <ResumeCardItem resume={resume} key={index} />)}
      </div>
    </div>
  );
}

export default Dashboard;
