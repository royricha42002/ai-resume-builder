import React, { useEffect, useState, useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { AIChatSession } from "./../../../../../service/AIModal";
import "./Summary.css";

function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState([]);
  
  const prompt = "Job Title: {jobTitle} , Depends on job title give me list of summary for 3 experience levels: Senior, Mid-Level, and Fresher, in 3-4 lines in array format, with summary and experience_level fields in JSON format.";

  useEffect(() => {
    if (summary && summary !== resumeInfo.summary) {
      setResumeInfo((prev) => ({ ...prev, summary }));
    }
  }, [summary, setResumeInfo]);

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
        setSummary(parsedResult[0]?.summary); // Automatically populate first summary
      }
    } catch (error) {
      console.error("Error parsing AI response:", error);
      alert("Error generating summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);
    enabledNext(true);
    const data = {
    //   data: {
        summary: summary
      // }
    };
    GlobalApi.UpdateResumeDetail(params?.resumeId, data)
      .then((resp) => {
        console.log(resp);
        enabledNext(true);
        setLoading(false);
        alert("Data added Successfully!!!");
      })
      .catch((error) => {
        console.error("Error updating resume details:", error);
        setLoading(false);
        alert("Couldn't add data. Please check your connection and try again.");
      });
  };

  return (
    <div className="summary-container">
      <form onSubmit={onSave}>
        <div className="form-header">About Me</div>
        <div className="form-group">
          <button 
            type="button" 
            onClick={GenerateSummaryFromAI} 
            disabled={loading} 
            className="generate-btn">
            {loading ? "Generating..." : "Generate from AI"}
          </button>
          <div className="summary-box">
            <textarea
              onChange={(e) => setSummary(e.target.value)}
              required
              className="summary-textarea"
              placeholder="Write your summary here..."
              value={loading ? "Generating summary..." : summary}
              disabled={loading}
            />
          </div>
        </div>
        <button 
          disabled={loading} 
          type="submit" 
          className="save-btn">
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
      {aiGeneratedSummaryList.length > 0 && (
        <div className='suggestions-container'>
          <h2 className='suggestions-title'>Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummary(item?.summary)}
              className='suggestion-card'>
              <h2 className='suggestion-level'>Level: {item?.experience_level}</h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
