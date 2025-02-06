import React, { useState, useContext, useEffect } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";

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
            endDate: ""
        },
    ]);

    const handleChange=(event,index)=>{
        const newEntries=educationalList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        setEducationalList(newEntries);
      }

      useEffect(()=>{
        setResumeInfo({
            ...resumeInfo,
            education:educationalList
        })
      },[educationalList])

    const AddNewEducation = () => {
        setEducationalList([
            ...educationalList,
            {
                universityName: "",
                degree: "",
                major: "",
                startDate: "",
                endDate: ""
            },
        ]);
    };

    const RemoveEducation = () => {
        setEducationalList((educationalList) => educationalList.slice(0, -1));
    };

    

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                education: educationalList.map(({ id, ...rest }) => rest)
            },
        };

        GlobalApi.UpdateResumeDetail(params.resumeId,data).then(resp=>{
            console.log(resp);
            setLoading(false)
            alert('Details updated !')
          },(error)=>{
            setLoading(false);
            alert('Server Error, Please try again!')
          })


        
        console.log("Saving data:", data); // Placeholder

        


    };

    return (
        <div>
            <div>Education Details</div>
            <div>
                {educationalList.map((item, index) => (
                    <div key={index}> {/* Add a key prop here */}
                        <div>
                            <label>University/School Name</label>
                            <input
                                name="universityName"
                                onChange={(e) => handleChange(e, index)}
                                value={item.universityName} // Use value instead of defaultValue
                                defaultValue={item?.universityName}
                            />
                        </div>
                        <div>
                            <label>Degree</label>
                            <input
                                name="degree"
                                onChange={(e) => handleChange(e, index)}
                                value={item.degree} // Use value instead of defaultValue
                                defaultValue={item?.degree}
                            />
                        </div>
                        <div>
                            <label>Major</label>
                            <input
                                name="major"
                                onChange={(e) => handleChange(e, index)}
                                value={item.major} // Use value instead of defaultValue
                                defaultValue={item?.major}
                            />
                        </div>
                        <div>
                            <label>Start Date</label>
                            <input
                                name="startDate"
                                type="date"
                                onChange={(e) => handleChange(e, index)}
                                value={item.startDate} // Use value instead of defaultValue
                                defaultValue={item?.startDate}
                            />
                        </div>
                        <div>
                            <label>End Date</label>
                            <input
                                name="endDate"
                                type="date"
                                onChange={(e) => handleChange(e, index)}
                                value={item.endDate} // Use value instead of defaultValue
                                defaultValue={item?.endDate}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <div>
                    <button onClick={AddNewEducation}>Add Education</button>
                    <button onClick={RemoveEducation}>Remove Education</button>
                </div>
                <button onClick={onSave} disabled={loading}>
                    {loading ? "Saving..." : "Save"}
                </button>
            </div>
        </div>
    );
}

export default Education;