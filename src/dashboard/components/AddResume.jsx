import React, { useState } from 'react';
import { PlusSquare } from 'lucide-react';
import './AddResume.css';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../../service/GlobalApi';
import { Navigate,useNavigate } from 'react-router-dom';

function AddResume() {
  const [openTemplatesDialog, setOpenTemplatesDialog] = useState(false);
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [resumeTitle, setResumeTitle] = useState('');
  const { user } = useUser(); // Fetch the user object
  const navigation=useNavigate();

  const templates = [
    { id: 1, name: 'Modern Blue', image: 'url-to-image-1' },
    { id: 2, name: 'Classic Gray', image: 'url-to-image-2' },
    { id: 3, name: 'Creative Green', image: 'url-to-image-3' },
  ];

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setOpenPreviewDialog(true);
  };

  const handleProceed = () => {
    setOpenPreviewDialog(false);
    setOpenNameDialog(true);
  };

  const handleNameSubmit = () => {
    setLoading(true);
    setOpenNameDialog(false); // Close the name dialog

    const uuid = uuidv4(); // Generate a unique UUID

    const data = {
        data: { // Add the 'data' wrapper here
          title: resumeTitle,
          resumeId: uuid,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
        },
      };

    GlobalApi.CreateNewResume(data).then(resp=>{
        console.log(resp.data.data.documentId);
        if(resp){
            setLoading(false);
            navigation('/dashboard/resume/'+resp.data.data.documentId+'/edit');
        }
    },(error)=>{
        setLoading(false)
    });

    console.log('Resume Data:', data); // For now, we just log the data

    setLoading(false); // Stop the loading state after submission
  };

  const handleInputChange = (e) => {
    setResumeTitle(e.target.value); // Update the resumeTitle state
  };

  return (
    <div>
      <div className="container" onClick={() => setOpenTemplatesDialog(true)}>
        <PlusSquare size={48} />
      </div>

      {openTemplatesDialog && (
        <div className="dialog">
          <h2>Choose a Resume Template</h2>
          <div className="template-grid">
            {templates.map((template) => (
              <div
                key={template.id}
                className="template-card"
                onClick={() => handleTemplateClick(template)}
              >
                <img
                  src={template.image}
                  alt={template.name}
                  className="template-image"
                />
                <div className="template-name">{template.name}</div>
              </div>
            ))}
          </div>
          <button className="button" onClick={() => setOpenTemplatesDialog(false)}>
            Close
          </button>
        </div>
      )}

      {openPreviewDialog && (
        <div className="dialog preview-dialog">
          <h2>Preview</h2>
          <img
            src={selectedTemplate.image}
            alt={selectedTemplate.name}
            className="preview-image"
          />
          <div className="button-container">
            <button className="button" onClick={() => setOpenPreviewDialog(false)}>
              Cancel
            </button>
            <button className="button" onClick={handleProceed}>
              Proceed
            </button>
          </div>
        </div>
      )}

      {openNameDialog && (
        <div className="dialog name-dialog">
          <h2>Name Your Resume</h2>
          <input
            type="text"
            placeholder="Enter resume name"
            value={resumeTitle} // Controlled input
            onChange={handleInputChange} // Handle input change
            className="name-input"
          />
          <div className="button-container">
            <button className="button" onClick={() => setOpenNameDialog(false)}>
              Cancel
            </button>
            <button
              className="button"
              onClick={handleNameSubmit}
              disabled={!resumeTitle.trim()} // Disable if input is empty
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddResume;
