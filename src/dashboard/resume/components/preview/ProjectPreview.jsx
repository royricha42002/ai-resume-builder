import React, { useState, useEffect, useRef } from 'react';
import './ProjectPreview.css';

function ProjectPreview({ resumeInfo }) {
  const [pages, setPages] = useState([]);
  const containerRef = useRef(null);
  const maxHeight = 800; // Adjust based on content

  useEffect(() => {
    if (!resumeInfo || !resumeInfo.projects) return;

    let currentPage = [];
    let currentHeight = 0;
    let newPages = [];

    resumeInfo.projects.forEach((project) => {
      const projectHeight = 120; // Approximate height per project
      if (currentHeight + projectHeight > maxHeight) {
        newPages.push(currentPage);
        currentPage = [];
        currentHeight = 0;
      }
      currentPage.push(project);
      currentHeight += projectHeight;
    });

    if (currentPage.length > 0) {
      newPages.push(currentPage);
    }

    setPages(newPages);
  }, [resumeInfo]);

  if (!resumeInfo || !resumeInfo.projects || resumeInfo.projects.length === 0) {
    return <div className="project-preview">No project data available.</div>;
  }

  return (
    <div className="project-preview" ref={containerRef}>
      <h2 className="section-title">Projects</h2>
      {pages.map((page, pageIndex) => (
        <div key={pageIndex} className="project-page">
          {page.map((project) => (
            <div key={project.id} className="project-item">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-description">{project.description}</p>
            </div>
          ))}
          {pageIndex < pages.length - 1 && <div className="page-break"></div>}
        </div>
      ))}
    </div>
  );
}

export default ProjectPreview;
