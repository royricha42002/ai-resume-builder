import React, { useState, useEffect, useContext } from 'react';
import RichTextEditor from './../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: '',
};

function Experience() {
    const [experienceList, setExperienceList] = useState([formField]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const AddNewExperience = () => {
        setExperienceList([
            ...experienceList,
            {
                title: '',
                companyName: '',
                city: '',
                state: '',
                startDate: '',
                endDate: '',
                workSummary: '',
            },
        ]);
    };

    const handleChange = (index, event) => {
        const newEntries = experienceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        console.log(newEntries);
        setExperienceList(newEntries);
    };

    const RemoveExperience = () => {
        setExperienceList((experienceList) => experienceList.slice(0, -1));
    };

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experienceList.slice();
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList.map(({ id, ...rest }) => rest),
        });
    }, [experienceList]); // Add experienceList as a dependency

    return (
        <div>
            <div>Professional Experience</div>
            <div>
                {experienceList.map((item, index) => (
                    <div key={index}>
                        <div>
                            <div>
                                <label className="text-xs">Position Title</label>
                                <input
                                    name="title"
                                    onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.title}
                                />
                            </div>
                            <div>
                                <label className="text-xs">Company Name</label>
                                <input
                                    name="companyName"
                                    onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.companyName}
                                />
                            </div>
                            <div>
                                <label className="text-xs">City</label>
                                <input
                                    name="city"
                                    onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.city}
                                />
                            </div>
                            <div>
                                <label className="text-xs">State</label>
                                <input
                                    name="state"
                                    onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.state}
                                />
                            </div>
                            <div>
                                <label className="text-xs">Start Date</label>
                                <input
                                    name="startDate"
                                    type="date"
                                    onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.startDate}
                                />
                            </div>
                            <div>
                                <label className="text-xs">End Date</label>
                                <input
                                    name="endDate"
                                    type="date"
                                    onChange={(event) => handleChange(index, event)}
                                    defaultValue={item?.endDate}
                                />
                            </div>
                            <div>
                                <RichTextEditor
                                    index={index}
                                    onRichTextEditorChange={(event) =>
                                        handleRichTextEditor(event, 'workSummary', index)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <div>
                    <button onClick={AddNewExperience}>Add Experience</button>
                    <button onClick={RemoveExperience}>Remove Experience</button>
                </div>
                <button>Save</button>
            </div>
        </div>
    );
}

export default Experience;