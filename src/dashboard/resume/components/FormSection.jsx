import React, { useState, useContext } from "react";
import PersonalDetails from "./form/PersonalDetails";
import { Button } from "@/components/ui/button";
import Summary from "./form/Summary";
import Experience from "./form/Experience";
import Education from "./form/Education";
import Skills from "./form/Skills";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext,setEnableNext]=useState(true);
  const {resumeId}=useParams();

  return (
    <div>
      <div>
          {/* Disable "Previous" button when on the first section */}
          <Button 
            disabled={activeFormIndex === 1} 
            onClick={() => setActiveFormIndex(prev => prev - 1)}
          >
            Previous
          </Button>

          {/* Enable "Next" button to move to the next section */}
          <Button disabled={!enableNext} onClick={() => setActiveFormIndex(prev => prev + 1)}>
            Next
          </Button>
        </div>

        {/* Personal Details */}
      {activeFormIndex==1? <PersonalDetails enabledNext={(v)=>setEnableNext(v)}/>:
        activeFormIndex==2? <Summary enabledNext={(v)=>setEnableNext(v)}/>:
        activeFormIndex==3? <Experience enabledNext={(v)=>setEnableNext(v)}/>:
        activeFormIndex==4? <Education enabledNext={(v)=>setEnableNext(v)}/>:
        activeFormIndex==5? <Skills enabledNext={(v)=>setEnableNext(v)}/>:
        activeFormIndex==6?
          <Navigate to={'/my-resume/'+resumeId+"/view"}/>:null}
      
      

      
    </div>
  );
}

export default FormSection;
