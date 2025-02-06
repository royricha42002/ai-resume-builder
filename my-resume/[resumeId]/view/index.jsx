import React from 'react'
import Navbar from './../../../src/components/custom/navbar'
import ResumePreview from './../../../src/dashboard/resume/components/ResumePreview'
import { ResumeInfoContext } from './../../../src/context/ResumeInfoContext'
import { useState, useEffect } from 'react'
import GlobalApi from './../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { RWebShare } from "react-web-share";

function ViewResume() {

    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();

    useEffect(() => {
        GetResumeInfo();
    }, [])

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            console.log(resp.data.data);
            setResumeInfo(resp.data.data);
        })
    }

    const HandleDownload = () => {
        window.print();
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">


                <Navbar />
                <div>
                    <div>Congrats!</div>
                    <div>
                        <button onClick={HandleDownload}>Download</button>
                        <RWebShare
                            data={{
                                text: "url kholo",
                                url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
                                title: resumeInfo?.firstName+" resume",
                            }}
                            onClick={() => console.log("shared successfully!")}
                        >
                            <button>Share 🔗</button>

                        </RWebShare>
                    </div>
                </div>
                <div id="print-area">
                    <ResumePreview />
                </div>
            </div>
        </ResumeInfoContext.Provider>
    )
}

export default ViewResume