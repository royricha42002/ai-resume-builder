import React, { useState, useEffect, useContext } from 'react';
import Navbar from './../../../src/components/custom/navbar';
import ResumePreview from './../../../src/dashboard/resume/components/ResumePreview';
import { ResumeInfoContext } from './../../../src/context/ResumeInfoContext';
import GlobalApi from './../../../service/GlobalApi';
import { useParams } from 'react-router-dom';
import { RWebShare } from "react-web-share";

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const { resumeId } = useParams();

    console.log("Resume ID from useParams:", resumeId); // Add this line
    
    useEffect(() => {
        GetResumeInfo();
    }, []);

    const GetResumeInfo = () => {
        GlobalApi.GetResumeById(resumeId).then(resp => {
            console.log("Full API Response:", resp); // Log the entire response
            console.log("Data fetched from Strapi:", resp.data.data); // Check the raw data from Strapi
            setResumeInfo(resp.data.data);
        });
    };

    const HandleDownload = () => {
        setTimeout(() => {
            window.print();
        }, 500); // Delay ensures proper rendering before printing
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            {console.log("ResumeInfo in ViewResume:", resumeInfo)} {/* Check the resumeInfo state */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Navbar Section (Hidden in Print) */}
                <div style={{ display: 'block', width: '100%', marginBottom: '20px' }} className="no-print">
                    <Navbar />
                </div>

                {/* Message and Buttons (Hidden in Print) */}
                <div className="no-print" style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h2>Congrats!</h2>
                    <button
                        onClick={HandleDownload}
                        style={{
                            padding: '10px 20px',
                            marginRight: '10px',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: '#007bff',
                            color: 'white',
                            borderRadius: '5px'
                        }}>
                        Download
                    </button>
                    <RWebShare
                        data={{
                            text: "Open the URL",
                            url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
                            title: resumeInfo?.firstName + " resume",
                        }}
                        onClick={() => console.log("shared successfully!")}
                    >
                        <button
                            style={{
                                padding: '10px 20px',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: '#28a745',
                                color: 'white',
                                borderRadius: '5px'
                            }}>
                            Share 🔗
                        </button>
                    </RWebShare>
                </div>

                {/* Resume Preview (Visible in Print) */}
                <div id="print-area" style={{
                    width: '80%',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    padding: '20px',
                    backgroundColor: 'white'
                }}>
                    <ResumePreview /> {/* The ResumePreview component is where the rendering happens */}
                </div>
            </div>

            {/* Print Styles */}
            <style>
                {`
                    @media print {

                        @page {
                            margin: 0;   /* Removes headers & footers */
                            size: auto; /* Uses full page */
                        }

                        /* Ensure the entire resume is included in the print */
                        #print-area {
                            display: block !important;
                            width: 100% !important;
                            height: auto !important;
                            max-height: unset !important;
                            overflow: visible !important;
                            position: relative !important;
                        }

                        /* Ensure all text and elements are visible */
                        * {
                            overflow: visible !important;
                        }

                        /* Hide UI elements when printing */
                        .no-print {
                            display: none !important;
                        }

                        /* Prevent page break inside sections */
                        #print-area * {
                            page-break-inside: avoid;
                        }

                        /* Force all content to fit within the print page */
                        body, html {
                            height: auto !important;
                            overflow: visible !important;
                        }
                    }
                `}
            </style>
        </ResumeInfoContext.Provider>
    );
}

export default ViewResume;



// import React, { useState, useEffect } from 'react';
// import Navbar from './../../../src/components/custom/navbar';
// import ResumePreview from './../../../src/dashboard/resume/components/ResumePreview';
// import { ResumeInfoContext } from './../../../src/context/ResumeInfoContext';
// import GlobalApi from './../../../service/GlobalApi';
// import { useParams } from 'react-router-dom';
// import { RWebShare } from "react-web-share";

// function ViewResume() {
//     const [resumeInfo, setResumeInfo] = useState();
//     const { resumeId } = useParams();

//     useEffect(() => {
//         GetResumeInfo();
//     }, []);

//     const GetResumeInfo = () => {
//         GlobalApi.GetResumeById(resumeId).then(resp => {
//             console.log(resp.data.data);
//             setResumeInfo(resp.data.data);
//         });
//     };

//     const HandleDownload = () => {
//         setTimeout(() => {
//             window.print();
//         }, 500); // Delay ensures proper rendering before printing
//     };

//     return (
//         <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
//             <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 {/* Navbar Section (Hidden in Print) */}
//                 <div style={{ display: 'block', width: '100%', marginBottom: '20px' }} className="no-print">
//                     <Navbar />
//                 </div>

//                 {/* Message and Buttons (Hidden in Print) */}
//                 <div className="no-print" style={{ textAlign: 'center', marginBottom: '20px' }}>
//                     <h2>Congrats!</h2>
//                     <button 
//                         onClick={HandleDownload} 
//                         style={{
//                             padding: '10px 20px',
//                             marginRight: '10px',
//                             border: 'none',
//                             cursor: 'pointer',
//                             backgroundColor: '#007bff',
//                             color: 'white',
//                             borderRadius: '5px'
//                         }}>
//                         Download
//                     </button>
//                     <RWebShare
//                         data={{
//                             text: "Open the URL",
//                             url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
//                             title: resumeInfo?.firstName + " resume",
//                         }}
//                         onClick={() => console.log("shared successfully!")}
//                     >
//                         <button 
//                             style={{
//                                 padding: '10px 20px',
//                                 border: 'none',
//                                 cursor: 'pointer',
//                                 backgroundColor: '#28a745',
//                                 color: 'white',
//                                 borderRadius: '5px'
//                             }}>
//                             Share 🔗
//                         </button>
//                     </RWebShare>
//                 </div>

//                 {/* Resume Preview (Visible in Print) */}
//                 <div id="print-area" style={{
//                     width: '80%',
//                     boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
//                     padding: '20px',
//                     backgroundColor: 'white'
//                 }}>
//                     <ResumePreview />
//                 </div>
//             </div>

//             {/* Print Styles */}
//             <style>
//     {`
//         @media print {

//             @page {
//         margin: 0;  /* Removes headers & footers */
//         size: auto; /* Uses full page */
//     }

//             /* Ensure the entire resume is included in the print */
//             #print-area {
//                 display: block !important;
//                 width: 100% !important;
//                 height: auto !important;
//                 max-height: unset !important;
//                 overflow: visible !important;
//                 position: relative !important;
//             }

//             /* Ensure all text and elements are visible */
//             * {
//                 overflow: visible !important;
//             }

//             /* Hide UI elements when printing */
//             .no-print {
//                 display: none !important;
//             }

//             /* Prevent page break inside sections */
//             #print-area * {
//                 page-break-inside: avoid;
//             }

//             /* Force all content to fit within the print page */
//             body, html {
//                 height: auto !important;
//                 overflow: visible !important;
//             }
//         }
//     `}
// </style>


//         </ResumeInfoContext.Provider>
//     );
// }

// export default ViewResume;
