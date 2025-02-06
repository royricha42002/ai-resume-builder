import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import GlobalApi from "./../../service/GlobalApi";
import { useUser } from '@clerk/clerk-react';
import ResumeCardItem from "./components/ResumeCardItem";

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  const GetResumesList = () => {
    GlobalApi.GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        console.log(resp.data);
        setResumeList(resp.data.data); // Ensure the correct data structure is used
      });
  };

  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  return (
    <div>
      <div>My Resume</div>
      <div>Resumes reimagined, powered by AI</div>
      <div className="resume-grid">
        {/* AddResume component (plus sign) */}
        <AddResume />

        {/* Display fetched resume items */}
        {resumeList.length > 0 && resumeList.map((resume, index) => (
          <ResumeCardItem resume={resume} key={index} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;