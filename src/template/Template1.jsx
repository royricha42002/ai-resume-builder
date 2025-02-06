import React from 'react';

function ModernBlue({ resumeInfo }) {
  return (
    <div className="modern-blue-template">
      <h1>{resumeInfo.firstName} {resumeInfo.lastName}</h1>
      <h2>{resumeInfo.jobTitle}</h2>
      <div className="contact-info">
        <p>{resumeInfo.phone}</p>
        <p>{resumeInfo.email}</p>
        <p>{resumeInfo.address}</p>
      </div>
      <div className="section">
        <h3>Summary</h3>
        <p>{resumeInfo.summery}</p>
      </div>
      <div className="section">
        <h3>Experience</h3>
        {resumeInfo.experience.map((exp) => (
          <div key={exp.id}>
            <h4>{exp.title}</h4>
            <p>{exp.companyName} | {exp.city}, {exp.state}</p>
            <p>{exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}</p>
            <p>{exp.workSummery}</p>
          </div>
        ))}
      </div>
      <div className="section">
        <h3>Education</h3>
        {resumeInfo.education.map((edu) => (
          <div key={edu.id}>
            <h4>{edu.universityName}</h4>
            <p>{edu.degree} in {edu.major}</p>
            <p>{edu.startDate} - {edu.endDate}</p>
            <p>{edu.description}</p>
          </div>
        ))}
      </div>
      <div className="section">
        <h3>Skills</h3>
        <ul>
          {resumeInfo.skills.map((skill) => (
            <li key={skill.id}>
              {skill.name} - {skill.rating}%
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ModernBlue;