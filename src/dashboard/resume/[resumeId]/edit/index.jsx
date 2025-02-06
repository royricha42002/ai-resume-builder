import React, { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../components/FormSection";
import ResumePreview from "../../components/ResumePreview";
import { ResumeInfoContext } from "./../../../../context/ResumeInfoContext";
import dummy from "./../../../../../data/dummy";
import GlobalApi from "./../../../../../service/GlobalApi";

import "./EditResume.css";

function EditResume() {
  const {resumeId} = useParams();
  const [resumeInfo,setResumeInfo]=useState();
  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo=()=>{
    GlobalApi.GetResumeById(resumeId).then(resp=>{
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    })
}

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="edit-resume-container">
        {/* Left - Form Section */}
        <div className="form-section">
          <FormSection />
        </div>

        {/* Right - Preview Section */}
        <div className="preview-section">
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
