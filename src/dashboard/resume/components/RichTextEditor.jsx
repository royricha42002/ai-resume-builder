import React from 'react'
import { useState,useContext } from 'react';
import { ResumeInfoContext } from './../../../context/ResumeInfoContext';
import { BtnBold, BtnItalic, Toolbar } from 'react-simple-wysiwyg'
import Editor, { EditorProvider } from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModal';

const PROMPT='position title: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experince level and No JSON array) , give me result in HTML tags'

function RichTextEditor({onRichTextEditorChange, index}) {

    const [value,setValue]=useState();
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
    const [loading,setLoading]=useState(false);

    const GenerateSummaryFromAI=async()=>{
     
        if(!resumeInfo?.experience[index]?.title)
        {
          alert('Please Add Position Title');
          return ;
        }
        setLoading(true)
        const prompt=PROMPT.replace('{positionTitle}',resumeInfo.experience[index].title);
        
        const result=await AIChatSession.sendMessage(prompt);
        console.log(result.response.text());
        const resp=result.response.text()
        setValue(resp.replace('[','').replace(']',''));
        setLoading(false);
      }
  
  return (
    <div>
        <div>
        {/* <label className='text-xs'>Summary</label> */}
        <button  size="sm" onClick={GenerateSummaryFromAI}> Generate from AI 
         </button> 
        </div>
        <EditorProvider>
        <Editor value={value} onChange={(e)=>{
            setValue(e.target.value);
            onRichTextEditorChange(e);
        }}>
            <Toolbar>
          <BtnBold />
          <BtnItalic />
          </Toolbar>
        </Editor>
        </EditorProvider>
    </div>
  )
}

export default RichTextEditor