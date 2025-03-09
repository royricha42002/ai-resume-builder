import React, { useState, useContext, useEffect } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import "./Education.css";

function Education() {
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [educationalList, setEducationalList] = useState([
        {
            universityName: "",
            degree: "",
            major: "",
            startDate: "",
            endDate: "",
        },
    ]);

    const handleChange = (event, index) => {
        const newEntries = [...educationalList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationalList(newEntries);
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            education: educationalList,
        });
    }, [educationalList]);

    const AddNewEducation = () => {
        setEducationalList([
            ...educationalList,
            {
                universityName: "",
                degree: "",
                major: "",
                startDate: "",
                endDate: "",
            },
        ]);
    };

    const RemoveEducation = () => {
        if (educationalList.length > 1) {
            setEducationalList(educationalList.slice(0, -1));
        }
    };

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                education: educationalList.map(({ id, ...rest }) => rest),
            },
        };

        GlobalApi.UpdateResumeDetail(params.resumeId, data)
            .then((resp) => {
                console.log(resp);
                setLoading(false);
                alert("Details updated!");
            })
            .catch(() => {
                setLoading(false);
                alert("Server Error, Please try again!");
            });
    };

    return (
        <div className="education-container">
            <h2 className="education-title">Education Details</h2>
            {educationalList.map((item, index) => (
                <div key={index} className="education-box">
                    <label>University/School Name</label>
                    <input
                        name="universityName"
                        onChange={(e) => handleChange(e, index)}
                        value={item.universityName}
                    />

                    <label>Degree</label>
                    <input
                        name="degree"
                        onChange={(e) => handleChange(e, index)}
                        value={item.degree}
                    />

                    <label>Major</label>
                    <input
                        name="major"
                        onChange={(e) => handleChange(e, index)}
                        value={item.major}
                    />

                    <label>Start Date</label>
                    <input
                        name="startDate"
                        type="date"
                        onChange={(e) => handleChange(e, index)}
                        value={item.startDate}
                    />

                    <label>End Date</label>
                    <input
                        name="endDate"
                        type="date"
                        onChange={(e) => handleChange(e, index)}
                        value={item.endDate}
                    />
                </div>
            ))}
            <div className="button-group">
                <button onClick={AddNewEducation} className="education-btn">+ Add Education</button>
                <button onClick={RemoveEducation} className="education-btn">- Remove Education</button>
            </div>
            <button onClick={onSave} disabled={loading} className="save-btn">
                {loading ? "Saving..." : "Save"}
            </button>
        </div>
    );
}

export default Education;
