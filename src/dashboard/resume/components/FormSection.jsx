import React, { useState } from "react";
import PersonalDetails from "./form/PersonalDetails";
import Summary from "./form/Summary";
import Experience from "./form/Experience";
import Education from "./form/Education";
import Skills from "./form/Skills";
import { Navigate, useParams } from "react-router-dom";
import "./FormSection.css"; // Import the external CSS file

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const { resumeId } = useParams();

  return (
    <div>
      <div className="button-container">
        <button
          disabled={activeFormIndex === 1}
          onClick={() => setActiveFormIndex((prev) => prev - 1)}
        >
          Previous
        </button>

        <button
          disabled={!enableNext}
          onClick={() => setActiveFormIndex((prev) => prev + 1)}
        >
          Next
        </button>
      </div>

      {/* Form Sections */}
      {activeFormIndex === 1 ? (
        <PersonalDetails enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summary enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 3 ? (
        <Experience enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 4 ? (
        <Education enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 5 ? (
        <Skills enabledNext={(v) => setEnableNext(v)} />
      ) : activeFormIndex === 6 ? (
        <Navigate to={`/my-resume/${resumeId}/view`} />
      ) : null}
    </div>
  );
}

export default FormSection;
