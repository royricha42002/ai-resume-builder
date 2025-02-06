import { createContext } from "react";
import { useState } from "react";

export const ResumeInfoContext=createContext(null);

export const ResumeInfoProvider = ({ children }) => {
    const [resumeInfo, setResumeInfo] = useState({});
  
    return (
      <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
        {children}
      </ResumeInfoContext.Provider>
    );
  };