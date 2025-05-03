import React, { useState, useEffect, useContext } from 'react';
import RichTextEditor from './../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { AIChatSession } from './../../../../../service/AIModal';
import './Experience.css';

const formField = {
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummary: '', // Ensure this field is included
};

function Experience() {
    const [experienceList, setExperienceList] = useState([formField]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState([]);

    const prompt = "Job Title: {jobTitle} , Based on job title, generate a list of summaries for 3 experience levels: Senior, Mid-Level, and Fresher, in 3-4 lines each, formatted as an array with summary and experience_level fields in JSON.";

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList.map(({ id, ...rest }) => rest), // Ensure workSummary is included
        });
    }, [experienceList]);

    const GenerateSummaryFromAI = async () => {
        setLoading(true);
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
        console.log(PROMPT);
        try {
            const result = await AIChatSession.sendMessage(PROMPT);
            const parsedResult = JSON.parse(result.response.text());
            console.log(parsedResult);
            setAiGenerateSummaryList(parsedResult);
            if (parsedResult.length > 0) {
                const newEntries = [...experienceList];
                newEntries[0].workSummary = parsedResult[0]?.summary; // Update the first experience's workSummary
                setExperienceList(newEntries);
            }
        } catch (error) {
            console.error("Error parsing AI response:", error);
            alert("Error generating summary. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (index, event) => {
        const newEntries = [...experienceList];
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    };

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = [...experienceList];
        newEntries[index][name] = e.target.value;
        setExperienceList(newEntries);
    };

    const AddNewExperience = () => {
        setExperienceList([...experienceList, { ...formField }]);
    };

    const RemoveExperience = () => {
        if (experienceList.length > 1) {
            setExperienceList(experienceList.slice(0, -1));
        }
    };

    const onSave = () => {
        setLoading(true);
        const data = experienceList.map(({ id, ...rest }) => rest);

        GlobalApi.UpdateResumeDetail(params?.resumeId, data)
            .then((res) => {
                console.log(res);
                setLoading(false);
                alert('Details updated!');
            })
            .catch(() => {
                setLoading(false);
                alert("Details couldn't be updated!");
            });
    };

    return (
        <div className="experience-container">
            <h2 className="experience-title">Work Experience</h2>
            {experienceList.map((item, index) => (
                <div key={index} className="experience-box">
                    <label>Position Title</label>
                    <input name="title" onChange={(e) => handleChange(index, e)} value={item.title} />

                    <label>Company Name</label>
                    <input name="companyName" onChange={(e) => handleChange(index, e)} value={item.companyName} />

                    <label>City</label>
                    <input name="city" onChange={(e) => handleChange(index, e)} value={item.city} />

                    <label>State</label>
                    <input name="state" onChange={(e) => handleChange(index, e)} value={item.state} />

                    <label>Start Date</label>
                    <input name="startDate" type="date" onChange={(e) => handleChange(index, e)} value={item.startDate} />

                    <label>End Date</label>
                    <input name="endDate" type="date" onChange={(e) => handleChange(index, e)} value={item.endDate} />

                    <div className="work-summary-container">
                        <label>Work Summary</label>
                        {/* <button onClick={GenerateSummaryFromAI} disabled={loading} className="ai-generate-btn">
                            {loading ? "Generating..." : "Generate from AI"}
                        </button> */}
                        <RichTextEditor
                            index={index}
                            onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummary', index)}
                            value={item.workSummary} // Pass the value to RichTextEditor
                        />
                    </div>
                </div>
            ))}
            <div className="button-group">
                <button onClick={AddNewExperience} className="experience-btn">+ Add Experience</button>
                <button onClick={RemoveExperience} className="experience-btn">- Remove Experience</button>
            </div>
            <button onClick={onSave} disabled={loading} className="save-btn">
                {loading ? "Saving..." : "Save"}
            </button>
        </div>
    );
}

export default Experience;
