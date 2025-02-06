import React, { useEffect, useState, useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { AIChatSession } from "./../../../../../service/AIModal";

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
      data: {
        summary: summary
      }
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
    <div className="p-4">
      <form onSubmit={onSave}>
        <div className="text-xl font-bold mb-2">Summary</div>
        <div>
          <div className="mb-2 flex justify-between items-center">
            <label className="block font-semibold">Add Summary</label>
            <button 
              type="button" 
              onClick={GenerateSummaryFromAI} 
              disabled={loading} 
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400">
              {loading ? "Generating..." : "Generate from AI"}
            </button>
          </div>
          <textarea
            onChange={(e) => setSummary(e.target.value)}
            required
            className="w-full h-40 border border-gray-300 p-2 rounded-lg"
            placeholder="Write your summary here..."
            value={loading ? "Generating summary..." : summary}
            disabled={loading}
          />
        </div>
        <button 
          disabled={loading} 
          type="submit" 
          className="bg-green-500 text-white px-4 py-2 mt-3 rounded-md hover:bg-green-600 disabled:bg-gray-400">
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
      {aiGeneratedSummaryList.length > 0 && (
        <div className='my-5'>
          <h2 className='font-bold text-lg'>Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummary(item?.summary)}
              className='p-5 shadow-lg my-4 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition'>
              <h2 className='font-bold my-1 text-blue-600'>Level: {item?.experience_level}</h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;