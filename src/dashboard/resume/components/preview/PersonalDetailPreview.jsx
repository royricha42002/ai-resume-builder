import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";
import "./PersonalDetailPreview.css";

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div className="personal-detail-container">
      {/* Name */}
      <h1 className="name">
        {resumeInfo?.firstName || "First Name"} {resumeInfo?.lastName || "Last Name"}
      </h1>

      {/* Specialization */}
      <p className="specialization">{resumeInfo?.jobTitle || "Specialization"}</p>

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
              LinkedIn
            </a>
          </div>
        )}
      </div>

      {/* Address */}
      {resumeInfo?.address && (
        <div className="address-details">
          <FaMapMarkerAlt className="icon" />
          <span>{resumeInfo.address}</span>
        </div>
      )}

      {/* Single Horizontal Line */}
      <hr className="horizontal-line" />
    </div>
  );
}

export default PersonalDetailPreview;