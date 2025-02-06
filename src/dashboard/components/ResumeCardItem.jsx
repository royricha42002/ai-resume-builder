import { Notebook } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

function ResumeCardItem({ resume }) {
  return (
    <Link to={'/dashboard/resume/'+resume.documentId+'/edit'}>
    <div className="resume-card">
      <div className="resume-icon">
        <Notebook />
      </div>
      <h2 className="resume-title">{resume.title}</h2>
    </div>
    </Link>
  );
}

export default ResumeCardItem;