import React from "react";
import { ResumeInfoContext } from "./../../../../context/ResumeInfoContext";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import "./PersonalDetails.css"; // Import the CSS file

function PersonalDetails({ enabledNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(params);
  }, []);

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      data: formData,
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        alert("Data added Successfully!!!");
      },
      (error) => {
        setLoading(false);
        alert("Couldn't add data :-(");
      }
    );
  };

  return (
    <div className="personal-details-container">
      <div>Personal Details</div>
      <form onSubmit={onSave}>
        <div>
          <label>First Name</label>
          <input
            name="firstName"
            defaultValue={resumeInfo?.firstName}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Last Name</label>
          <input
            name="lastName"
            defaultValue={resumeInfo?.lastName}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Job Title</label>
          <input
            name="jobTitle"
            defaultValue={resumeInfo?.jobTitle}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone No</label>
          <input
            name="phone"
            defaultValue={resumeInfo?.phone}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            defaultValue={resumeInfo?.email}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>LinkedIn ID</label>
          <input
            name="linkedin"
            defaultValue={resumeInfo?.linkedin}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            name="address"
            defaultValue={resumeInfo?.address}
            required
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetails;