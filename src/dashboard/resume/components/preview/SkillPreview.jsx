import React from 'react';
import './SkillPreview.css'; // Ensure you have a CSS file for styling

function SkillsPreview({ resumeInfo }) {
    return (
        <div className="skills-preview">
            <h2 className="section-title" style={{ color: resumeInfo?.themeColor }}>
                Skills
            </h2>
            {/* <hr className="section-divider" style={{ borderColor: resumeInfo?.themeColor }} /> */}

            <div className="skills-list">
                {resumeInfo?.skills?.map((skill) => (
                    <span key={skill.id || skill.name} className="skill-name">
                        {skill.name}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default SkillsPreview;