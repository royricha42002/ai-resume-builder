import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin } from 'react-icons/fa';
import './PersonalDetailPreview.css';

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div className="personal-detail-container">
      {/* Left Section: Candidate Picture */}
      <div className="left-section">
        <div className="candidate-picture">
          <img
            src="https://via.placeholder.com/100"
            alt="Candidate"
            className="picture"
          />
        </div>
      </div>

      {/* Right Section: Personal Details */}
      <div className="right-section">
        {/* Name */}
        <h1 className="name">
          {resumeInfo?.firstName || "First Name"} {resumeInfo?.lastName || "Last Name"}
        </h1>

        {/* Specialization */}
        <p className="specialization">
          {resumeInfo?.jobTitle || "Specialization"}
        </p>

        {/* Contact Details */}
        <div className="contact-details">
          {resumeInfo?.phone && (
            <div className="contact-item">
              <FaPhone className="icon" />
              <span>{resumeInfo.phone}</span>
            </div>
          )}
          {resumeInfo?.email && (
            <div className="contact-item">
              <FaEnvelope className="icon" />
              <span>{resumeInfo.email}</span>
            </div>
          )}
          {resumeInfo?.socialLinks?.linkedin && (
  <div className="contact-item">
    <FaLinkedin className="icon" />
    <a href={resumeInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
      {resumeInfo.socialLinks.linkedin}
    </a>
  </div>
)}
        </div>

        {/* Address */}
        {resumeInfo?.address && (
          <div className="address-details">
            <div className="contact-item">
              <FaMapMarkerAlt className="icon" />
              <span>{resumeInfo.address}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalDetailPreview;
