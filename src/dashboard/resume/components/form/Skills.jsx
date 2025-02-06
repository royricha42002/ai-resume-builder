import React, { useState, useContext, useEffect } from 'react';
import './Skills.css';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from './../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';

function Skills() {
    const [loading, setLoading] = useState(false);
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    // Remove the rating field from the initial state
    const [skillsList, setSkillsList] = useState([{ name: '' }]);

    const handleChange = (index, name, value) => {
        const newEntries = [...skillsList];
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    };

    const AddNewSkills = () => {
        setSkillsList([...skillsList, { name: '' }]); // Only add the name field
    };

    const RemoveSkills = () => {
        setSkillsList((skillsList) => skillsList.slice(0, -1));
    };

    useEffect(() => {
        setResumeInfo((prev) => ({
            ...prev,
            skills: skillsList,
        }));
    }, [skillsList]);

    const onSave = () => {
        setLoading(true);

        // Send only the name field to the backend
        const data = {
            data: {
                skills: skillsList.map((skill) => ({ name: skill.name })), // Only include the name field
            },
        };

        GlobalApi.UpdateResumeDetail(resumeId, data)
            .then((resp) => {
                console.log(resp);
                setLoading(false);
                alert('Details updated!');
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error updating resume:', error.response?.data || error.message);
                alert('Server Error, Try again!');
            });
    };

    return (
        <div>
            <div>Skills</div>
            <div className="skills-container">
                {skillsList.map((item, index) => (
                    <div className="skill-item" key={index}>
                        <label>Name</label>
                        <input
                            defaultValue={item.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <button variant="outline" onClick={AddNewSkills} className="text-primary">
                        + Add More Skill
                    </button>
                    <button variant="outline" onClick={RemoveSkills} className="text-primary">
                        - Remove
                    </button>
                </div>
                <button disabled={loading} onClick={onSave}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default Skills;