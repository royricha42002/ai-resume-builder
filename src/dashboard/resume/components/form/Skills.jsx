import React, { useState, useContext, useEffect } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import "./Skills.css";

function Skills() {
    const [loading, setLoading] = useState(false);
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [skillsList, setSkillsList] = useState([{ name: "" }]);

    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    const AddNewSkills = () => {
        setSkillsList([...skillsList, { name: "" }]);
    };

    const RemoveSkills = () => {
        if (skillsList.length > 1) {
            setSkillsList(skillsList.slice(0, -1));
        }
    };

    useEffect(() => {
        setResumeInfo((prev) => ({
            ...prev,
            skills: skillsList,
        }));
    }, [skillsList]);

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                skills: skillsList.map((skill) => ({ name: skill.name })),
            },
        };

        GlobalApi.UpdateResumeDetail(resumeId, data)
            .then((resp) => {
                console.log(resp);
                setLoading(false);
                alert("Details updated!");
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error updating resume:", error.response?.data || error.message);
                alert("Server Error, Try again!");
            });
    };

    return (
        <div className="skills-container">
            <h2 className="skills-title">Skills</h2>
            {skillsList.map((item, index) => (
                <div className="skill-item" key={index}>
                    <label>Skill Name</label>
                    <input
                        name="name"
                        value={item.name}
                        onChange={(e) => handleChange(index, "name", e.target.value)}
                    />
                </div>
            ))}
            <div className="button-group">
                <button onClick={AddNewSkills} className="skills-btn">+ Add More Skill</button>
                <button onClick={RemoveSkills} className="skills-btn">- Remove</button>
            </div>
            <button disabled={loading} onClick={onSave} className="save-btn">
                {loading ? "Saving..." : "Save"}
            </button>
        </div>
    );
}

export default Skills;
