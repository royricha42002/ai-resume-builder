import React from 'react';
import './EducationPreview.css'; // Ensure you have a CSS file for styling

function EducationPreview({ resumeInfo }) {
  if (!resumeInfo || !resumeInfo.education) {
    return <div className="education-preview">No education data available.</div>;
  }

  return (
    <div className="education-preview">
      <h2 className="section-title">Education</h2>
      {resumeInfo.education.map((edu) => (
        <div key={edu.id} className="education-item">
          <div className="left-section">
            <div className="university-name">{edu.universityName}</div>
            <div className="degree-major">{edu.degree} in {edu.major}</div>
          </div>
          <div className="right-section">
            <div className="duration">
              {edu.startDate} - {edu.endDate}
            </div>
            <div className="grade">{edu.grade}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EducationPreview;