import React from 'react';
import './ExperiencePreview.css'; // ✅ Uses the same CSS

function EducationPreview({ resumeInfo }) {
  if (!resumeInfo || !resumeInfo.education) {
    return <div className="experience-preview">No education data available.</div>;
  }

  return (
    <div className="experience-preview">
      <h2 className="section-title">Education</h2>
      {resumeInfo.education.map((edu) => (
        <div key={edu.id} className="experience-item">
          <div className="left-section">
            <div className="profile-name">{edu.universityName}</div>
            <div className="company-name">{edu.degree} in {edu.major}</div>
          </div>
          <div className="right-section">
            <div className="duration">
              {edu.startDate} - {edu.endDate}
            </div>
            <div className="location">{edu.grade}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EducationPreview;
