import React, { useState } from 'react';
import { PlusSquare } from 'lucide-react';
import './AddResume.css';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/clerk-react';
import GlobalApi from './../../../service/GlobalApi';
import { useNavigate } from 'react-router-dom';

function AddResume() {
  const [openNameDialog, setOpenNameDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const { user } = useUser(); // Fetch the user object
  const navigation = useNavigate();

  const handleNameSubmit = () => {
    setLoading(true);
    setOpenNameDialog(false); // Close the name dialog

    const resumeId = uuidv4(); // Generate a unique UUID

    const data = { // Corrected data structure
      title: resumeTitle,
      resumeId: resumeId,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
    };

    GlobalApi.CreateNewResume(data).then( // Send data directly
      (resp) => {
        console.log(resp.data.data.documentId);
        if (resp) {
          setLoading(false);
          navigation('/dashboard/resume/' + resp.data.data.documentId + '/edit');
        }
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const handleInputChange = (e) => {
    setResumeTitle(e.target.value); // Update the resumeTitle state
  };

  return (
    <div className={openNameDialog ? "overlay" : ""}>
      <div className="container" onClick={() => setOpenNameDialog(true)}>
        <PlusSquare size={48} />
      </div>

      {openNameDialog && (
        <div className="dialog name-dialog">
          <h2>Name Your Resume</h2>
          <input
            type="text"
            placeholder="Enter resume name"
            value={resumeTitle} // Controlled input
            onChange={handleInputChange} // Handle input change
            className="name-input"
          />
          <div className="button-container">
            <button className="button cancel-button" onClick={() => setOpenNameDialog(false)}>
              Cancel
            </button>
            <button
              className="button submit-button"
              onClick={handleNameSubmit}
              disabled={!resumeTitle.trim()} // Disable if input is empty
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default AddResume;

// import React, { useState } from 'react';
// import { PlusSquare } from 'lucide-react';
// import './AddResume.css';
// import { v4 as uuidv4 } from 'uuid';
// import { useUser } from '@clerk/clerk-react';
// import GlobalApi from './../../../service/GlobalApi';
// import { useNavigate } from 'react-router-dom';

// function AddResume() {
//   const [openNameDialog, setOpenNameDialog] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [resumeTitle, setResumeTitle] = useState('');
//   const { user } = useUser(); // Fetch the user object
//   const navigation = useNavigate();

//   const handleNameSubmit = () => {
//     setLoading(true);
//     setOpenNameDialog(false); // Close the name dialog

//     const uuid = uuidv4(); // Generate a unique UUID

//     const data = {
//       data: {
//         title: resumeTitle,
//         resumeId: uuid,
//         userEmail: user?.primaryEmailAddress?.emailAddress,
//         userName: user?.fullName,
//       },
//     };

//     GlobalApi.CreateNewResume(data).then(
//       (resp) => {
//         console.log(resp.data.data.documentId);
//         if (resp) {
//           setLoading(false);
//           navigation('/dashboard/resume/' + resp.data.data.documentId + '/edit');
//         }
//       },
//       (error) => {
//         setLoading(false);
//       }
//     );
//   };

//   const handleInputChange = (e) => {
//     setResumeTitle(e.target.value); // Update the resumeTitle state
//   };

//   return (
//     <div className={openNameDialog ? "overlay" : ""}>
//       <div className="container" onClick={() => setOpenNameDialog(true)}>
//         <PlusSquare size={48} />
//       </div>

//       {openNameDialog && (
//         <div className="dialog name-dialog">
//           <h2>Name Your Resume</h2>
//           <input
//             type="text"
//             placeholder="Enter resume name"
//             value={resumeTitle} // Controlled input
//             onChange={handleInputChange} // Handle input change
//             className="name-input"
//           />
//           <div className="button-container">
//             <button className="button cancel-button" onClick={() => setOpenNameDialog(false)}>
//               Cancel
//             </button>
//             <button
//               className="button submit-button"
//               onClick={handleNameSubmit}
//               disabled={!resumeTitle.trim()} // Disable if input is empty
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
// export default AddResume;
