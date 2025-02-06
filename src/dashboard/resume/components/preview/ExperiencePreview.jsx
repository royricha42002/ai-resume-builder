import React from 'react';
import './ExperiencePreview.css';

function ExperiencePreview({ resumeInfo }) {
  if (!resumeInfo || !resumeInfo.experience) {
    return <div className="experience-preview">No experience data available.</div>;
  }

  return (
    <div className="experience-preview">
      <h2 className="section-title">Experience</h2>
      {resumeInfo.experience.map((exp) => (
        <div key={exp.id} className="experience-item">
          <div className="left-section">
            <div className="profile-name">{exp.title}</div>
            <div className="company-name">{exp.companyName}</div>
          </div>
          <div className="right-section">
            <div className="duration">
              {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
            </div>
            <div className="location">
              {exp.city}, {exp.state}
            </div>
          </div>
          <div className="bullet-points" dangerouslySetInnerHTML={{__html:exp?.workSummary}} />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
