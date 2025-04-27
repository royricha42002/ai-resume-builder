import React from 'react';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import { ResumeInfoContext } from './../../../context/ResumeInfoContext';
import { useContext } from "react";
import SummaryPreview from './preview/SummaryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/EducationPreview';
import ProjectPreview from './preview/ProjectPreview';
// import SkillPreview from './preview/skillPreview';

function ResumePreview() {
    const { resumeInfo } = useContext(ResumeInfoContext);

    return (
        <div className="resume-container">  {/* Fixed container with scrolling */}
            {/* Personal details */}
            <PersonalDetailPreview resumeInfo={resumeInfo} />
            {/* Summary */}
            <SummaryPreview resumeInfo={resumeInfo} />
            {/* Work experience */}
            {/* <ExperiencePreview resumeInfo={resumeInfo} /> */}
            {/* <hr/> */}
            {/* education  */}
            {/* <EducationPreview resumeInfo={resumeInfo} /> */}
            {/* projects  */}
            {/* <ProjectPreview resumeInfo={resumeInfo}/> */}
            {/* skills  */}
            {/* <hr/> */}
            {/* <SkillPreview resumeInfo={resumeInfo}/> */}
        </div>
    );
}

export default ResumePreview;
