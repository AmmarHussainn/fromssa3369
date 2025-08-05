// import React, { useState, useEffect } from 'react';
// import { TaskType, TaskMode } from '@heygen/streaming-avatar';

// const WorkHistoryReport = ({ avatarRef, toggleForm, setToggleForm, onCancel }) => {
//   const [isDarkTheme, setIsDarkTheme] = useState(false);
//   const [currentStep, setCurrentStep] = useState(1);
//   const [jobs, setJobs] = useState([{ jobTitle: '', businessType: '', from: '', to: '' }]);
//   const [formData, setFormData] = useState({
//     name: '',
//     ssn: '',
//     primaryPhone: '',
//     secondaryPhone: '',
//     remarks: '',
//     completerDate: '',
//     completer: 'self',
//     completerName: '',
//     completerRelationship: '',
//     address1: '',
//     address2: '',
//     city: '',
//     state: '',
//     zip: '',
//     country: '',
//     completerPhone: '',
//   });
//   const [jobDetails, setJobDetails] = useState(
//     jobs.map(() => ({
//       rateOfPay: '',
//       payFrequency: 'Hour',
//       hoursPerDay: '',
//       daysPerWeek: '',
//       tasks: '',
//       reports: '',
//       supervisory: '',
//       equipment: '',
//       interaction: 'No',
//       interactionDetails: '',
//       physicalActivities: {
//         standingWalking: '',
//         sitting: '',
//         stooping: '',
//         kneeling: '',
//         crouching: '',
//         crawling: '',
//         climbingStairs: '',
//         climbingLadders: '',
//       },
//       handActivities: {
//         fingersOneHand: '',
//         fingersBothHands: '',
//         graspOneHand: '',
//         graspBothHands: '',
//       },
//       armActivities: {
//         reachBelowOneArm: '',
//         reachBelowBothArms: '',
//         reachOverheadOneArm: '',
//         reachOverheadBothArms: '',
//       },
//       liftingDetails: '',
//       heaviestWeight: 'Less than 1 lb.',
//       frequentWeight: 'Less than 1 lb.',
//       exposures: [],
//       exposureDetails: '',
//       medicalImpact: '',
//     }))
//   );

//   useEffect(() => {
//     if (window.JotForm) {
//       window.JotForm.init(function() {
//         console.log('JotForm initialized');
//       });
//     }
//   }, []);

//   const toggleTheme = () => {
//     setIsDarkTheme(!isDarkTheme);
//     setToggleForm(!toggleForm);
//   };

//   const addJob = () => {
//     if (jobs.length < 10) {
//       setJobs([...jobs, { jobTitle: '', businessType: '', from: '', to: '' }]);
//       setJobDetails([
//         ...jobDetails,
//         {
//           rateOfPay: '',
//           payFrequency: 'Hour',
//           hoursPerDay: '',
//           daysPerWeek: '',
//           tasks: '',
//           reports: '',
//           supervisory: '',
//           equipment: '',
//           interaction: 'No',
//           interactionDetails: '',
//           physicalActivities: {
//             standingWalking: '',
//             sitting: '',
//             stooping: '',
//             kneeling: '',
//             crouching: '',
//             crawling: '',
//             climbingStairs: '',
//             climbingLadders: '',
//           },
//           handActivities: {
//             fingersOneHand: '',
//             fingersBothHands: '',
//             graspOneHand: '',
//             graspBothHands: '',
//           },
//           armActivities: {
//             reachBelowOneArm: '',
//             reachBelowBothArms: '',
//             reachOverheadOneArm: '',
//             reachOverheadBothArms: '',
//           },
//           liftingDetails: '',
//           heaviestWeight: 'Less than 1 lb.',
//           frequentWeight: 'Less than 1 lb.',
//           exposures: [],
//           exposureDetails: '',
//           medicalImpact: '',
//         },
//       ]);
//     }
//   };

//   const handleJobChange = (index, field, value) => {
//     const updatedJobs = [...jobs];
//     updatedJobs[index][field] = value;
//     setJobs(updatedJobs);
//   };

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleJobDetailChange = (index, field, value) => {
//     const updatedDetails = [...jobDetails];
//     updatedDetails[index] = {
//       ...updatedDetails[index],
//       [field]: value,
//     };
//     setJobDetails(updatedDetails);
//   };

//   const handleNestedChange = (index, category, field, value) => {
//     const updatedDetails = [...jobDetails];
//     updatedDetails[index][category][field] = value;
//     setJobDetails(updatedDetails);
//   };

//   const handleExposureChange = (index, exposure) => {
//     const updatedDetails = [...jobDetails];
//     const exposures = updatedDetails[index].exposures;
//     if (exposures.includes(exposure)) {
//       updatedDetails[index].exposures = exposures.filter((e) => e !== exposure);
//     } else {
//       updatedDetails[index].exposures = [...exposures, exposure];
//     }
//     setJobDetails(updatedDetails);
//   };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   if (!window.JotForm) {
//     console.error('JotForm is not loaded');
//     return;
//   }

//   const safeSetValue = (id, value) => {
//     const el = document.getElementById(id);
//     if (el) el.value = value || '';
//     else console.warn(`Element with id "${id}" not found`);
//   };

//   // Section 1: Information About You
//   safeSetValue('input_190', formData.name);
//   safeSetValue('input_326', formData.ssn);
//   safeSetValue('input_327_full', formData.primaryPhone);
//   safeSetValue('input_328_full', formData.secondaryPhone);

//   // Section 2: Work History
//   jobs.forEach((job, index) => {
//     const baseId = index === 0 ? 199 : 200 + (index - 1) * 20 + 21;
//     safeSetValue(`input_${baseId}`, job.jobTitle);
//     safeSetValue(`input_${baseId + 1}`, job.businessType);
//     safeSetValue(`input_${baseId + 2}`, job.from);
//     safeSetValue(`input_${baseId + 3}`, job.to);
//     safeSetValue(`input_${baseId + 4}`, jobDetails[index].rateOfPay);

//     // Pay Frequency (Radio Buttons)
//     ['Hour', 'Day', 'Week', 'Month', 'Year'].forEach((freq) => {
//       const cb = document.querySelector(`input[name="q${baseId + 5}_percheck${baseId + 5}[]"][value="${freq}"]`);
//       if (cb) cb.checked = jobDetails[index].payFrequency === freq;
//     });

//     safeSetValue(`input_${baseId + 6}`, jobDetails[index].hoursPerDay);
//     safeSetValue(`input_${baseId + 7}`, jobDetails[index].daysPerWeek);
//     safeSetValue(`input_${baseId + 8}`, jobDetails[index].tasks);
//     safeSetValue(`input_${baseId + 9}`, jobDetails[index].reports);
//     safeSetValue(`input_${baseId + 10}`, jobDetails[index].supervisory);
//     safeSetValue(`input_${baseId + 11}`, jobDetails[index].equipment);

//     // Interaction (Yes/No Radio Buttons)
//     const interactionRadio = document.querySelector(
//       `input[name="q${baseId + 12}_${jobDetails[index].interaction.toLowerCase()}"]`
//     );
//     if (interactionRadio) interactionRadio.checked = true;

//     safeSetValue(`input_${baseId + 13}`, jobDetails[index].interactionDetails);

//     // Physical Activities
//     safeSetValue(`input_${baseId + 14}`, jobDetails[index].physicalActivities.standingWalking);
//     safeSetValue(`input_${baseId + 15}`, jobDetails[index].physicalActivities.sitting);
//     safeSetValue(`input_${baseId + 16}`, jobDetails[index].physicalActivities.stooping);
//     safeSetValue(`input_${baseId + 17}`, jobDetails[index].physicalActivities.kneeling);
//     safeSetValue(`input_${baseId + 18}`, jobDetails[index].physicalActivities.crouching);
//     safeSetValue(`input_${baseId + 19}`, jobDetails[index].physicalActivities.crawling);
//     safeSetValue(`input_${baseId + 20}`, jobDetails[index].physicalActivities.climbingStairs);
//     safeSetValue(`input_${baseId + 21}`, jobDetails[index].physicalActivities.climbingLadders);

//     // Hand Activities
//     safeSetValue(`input_${baseId + 22}`, jobDetails[index].handActivities.fingersOneHand);
//     safeSetValue(`input_${baseId + 23}`, jobDetails[index].handActivities.fingersBothHands);
//     safeSetValue(`input_${baseId + 24}`, jobDetails[index].handActivities.graspOneHand);
//     safeSetValue(`input_${baseId + 25}`, jobDetails[index].handActivities.graspBothHands);

//     // Arm Activities
//     safeSetValue(`input_${baseId + 26}`, jobDetails[index].armActivities.reachBelowOneArm);
//     safeSetValue(`input_${baseId + 27}`, jobDetails[index].armActivities.reachBelowBothArms);
//     safeSetValue(`input_${baseId + 28}`, jobDetails[index].armActivities.reachOverheadOneArm);
//     safeSetValue(`input_${baseId + 29}`, jobDetails[index].armActivities.reachOverheadBothArms);

//     safeSetValue(`input_${baseId + 30}`, jobDetails[index].liftingDetails);

//     // Heaviest Weight
//     const heaviestWeightRadio = document.querySelector(
//       `input[name="q${baseId + 31}_${jobDetails[index].heaviestWeight.toLowerCase().replace(/\s/g, '')}"]`
//     );
//     if (heaviestWeightRadio) heaviestWeightRadio.checked = true;

//     // Frequent Weight
//     const frequentWeightRadio = document.querySelector(
//       `input[name="q${baseId + 32}_${jobDetails[index].frequentWeight.toLowerCase().replace(/\s/g, '')}"]`
//     );
//     if (frequentWeightRadio) frequentWeightRadio.checked = true;

//     // Exposures (Checkboxes)
//     [
//       'Outdoors',
//       'Extreme heat (non-weather related)',
//       'Extreme cold (non-weather related)',
//       'Wetness',
//       'Humidity',
//       'Hazardous substances',
//       'Moving mechanical parts',
//       'High, exposed places',
//       'Heavy vibrations',
//       'Loud noises',
//       'Other',
//     ].forEach((exposure) => {
//       const exposureCheckbox = document.querySelector(
//         `input[name="q${baseId + 33}_${exposure.toLowerCase().replace(/\s/g, '')}"]`
//       );
//       if (exposureCheckbox) exposureCheckbox.checked = jobDetails[index].exposures.includes(exposure);
//     });

//     safeSetValue(`input_${baseId + 34}`, jobDetails[index].exposureDetails);
//     safeSetValue(`input_${baseId + 35}`, jobDetails[index].medicalImpact);
//   });

//   // Section 3: Remarks
//   safeSetValue('input_313', formData.remarks);

//   // Section 4: Who is Completing This Report
//   safeSetValue('id_315', formData.completerDate);
//   const completerRadio = document.querySelector(`input[name="q316"][value="${formData.completer}"]`);
//   if (completerRadio) completerRadio.checked = true;
//   safeSetValue('input_317', formData.completerName);
//   safeSetValue('input_318', formData.completerRelationship);
//   safeSetValue('input_319_addr_line1', formData.address1);
//   safeSetValue('input_319_addr_line2', formData.address2);
//   safeSetValue('input_319_city', formData.city);
//   safeSetValue('input_319_state', formData.state);
//   safeSetValue('input_319_postal', formData.zip);
//   safeSetValue('input_319_country', formData.country);
//   safeSetValue('input_320_full', formData.completerPhone);

//   // Submit the form
//   const form = document.getElementById('241841575846062');
//   if (form) {
//     form.submit();
//   } else {
//     console.error('Form with ID 241841575846062 not found');
//   }
// };

//   const handleNext = async () => {
//     const nextStep = Math.min(currentStep + 1, 4);
//     setCurrentStep(nextStep);
//     if (avatarRef.current) {
//       let message = '';
//       if (nextStep === 2) {
//         message = 'Hey, welcome to step 2';
//       } else if (nextStep === 3) {
//         message = 'Hey, welcome to step 3';
//       }
//       if (message) {
//         try {
//           await avatarRef.current.speak({
//             text: message,
//             taskType: TaskType.TALK,
//             taskMode: TaskMode.SYNC,
//           });
//         } catch (error) {
//           console.error('Error making avatar speak on next:', error);
//         }
//       }
//     }
//   };

//   const handleBack = async () => {
//     const prevStep = Math.max(currentStep - 1, 1);
//     setCurrentStep(prevStep);
//     if (avatarRef.current) {
//       try {
//         await avatarRef.current.speak({
//           text: `Hey, welcome back to step ${prevStep}`,
//           taskType: TaskType.TALK,
//           taskMode: TaskMode.SYNC,
//         });
//       } catch (error) {
//         console.error('Error making avatar speak on back:', error);
//       }
//     }
//   };

//   return (
//     <div className={` h-full border ${isDarkTheme ? 'bg-dark-bg' : 'bg-light-bg'}`}>
//       <style>{`
//         :root {
//           --bg-color: ${isDarkTheme ? '#07264e' : '#dee8f1'};
//           --text-color: ${isDarkTheme ? '#f8fafc' : '#eaf5fa'};
//           --primary-color: ${isDarkTheme ? '#c4ecfe' : '#0c3d63'};
//           --secondary-color: ${isDarkTheme ? '#011933' : '#dff4fb'};
//           --card-bg: ${isDarkTheme ? '#1e293b' : '#dee8f1'};
//           --border-color: ${isDarkTheme ? '#334155' : '#334155'};
//           --input-bg: ${isDarkTheme ? '#1e293b' : '#dee8f1'};
//           --input-text: ${isDarkTheme ? '#f8fafc' : '#0c3d63'};
//           --label-text: ${isDarkTheme ? '#c4ecfe' : '#0c3d63'};
//           --error-bg: #7f1d1d;
//           --error-text: #fecaca;
//           --error-color: #f87171;
//         }
//         .bg-light-bg { background-color: var(--bg-color); }
//         .bg-dark-bg { background-color: var(--bg-color); }
//         .text-primary { color: var(--primary-color); }
//         .bg-primary { background-color: var(--primary-color); }
//         .bg-secondary { background-color: var(--secondary-color); }
//         .bg-card { background-color: var(--card-bg); }
//         .border-primary { border-color: var(--border-color); }
//         .text-input { color: var(--input-text); }
//         .bg-input { background-color: var(--input-bg); }
//         .text-label { color: var(--label-text); }
//         .text-error { color: var(--error-color); }
//         .bg-error { background-color: var(--error-bg); }
//       `}</style>
//       <div className="max-w-5xl h-full p-4 mx-auto bg-card shadow-2xl rounded-xl ">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-primary">WORK HISTORY REPORT</h1>
//           <div className="space-x-4">
           
//             <button
//               onClick={onCancel}
//               className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//         <p className="text-error mb-6 text-sm">
//           Anyone who makes or causes to be made a false statement or representation
//           of material fact for use in determining a payment under the Social
//           Security Act, or knowingly conceals or fails to disclose an event with an
//           intent to affect an initial or continued right to payment, commits a crime
//           punishable under Federal law by fine, imprisonment, or both, and may be
//           subject to administrative sanctions.
//         </p>

//         <form className="jotform-form" id="241841575846062" action="https://submit.jotform.com/submit/241841575846062" method="post" name="form_241841575846062" accept-charset="utf-8" autocomplete="on">
//           <input type="hidden" name="formID" value="241841575846062" />
//           <input type="hidden" id="JWTContainer" value="" />
//           <input type="hidden" id="cardinalOrderNumber" value="" />
//           <input type="hidden" id="jsExecutionTracker" name="jsExecutionTracker" value="build-date-1753978995819" />
//           <input type="hidden" id="submitSource" name="submitSource" value="unknown" />
//           <input type="hidden" id="submitDate" name="submitDate" value="05:49 PM PKT on Friday, August 01, 2025" />
//           <input type="hidden" id="buildDate" name="buildDate" value="1753978995819" />
//           <input type="hidden" name="uploadServerUrl" value="https://upload.jotform.com/upload" />
//           <input type="hidden" name="eventObserver" value="1" />

//           {currentStep === 1 && (
//             <section className="mb-10">
//               <h2 className="text-2xl font-semibold text-label mb-4">SECTION 1 - INFORMATION ABOUT YOU</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-label">Name *</label>
//                   <input
//                     type="text"
//                     id="input_190"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleFormChange}
//                     className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3 focus:ring-primary focus:border-primary transition"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-label">Social Security Number *</label>
//                   <input
//                     type="text"
//                     id="input_326"
//                     name="ssn"
//                     value={formData.ssn}
//                     onChange={handleFormChange}
//                     className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3 focus:ring-primary focus:border-primary transition"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-label">Primary Phone Number *</label>
//                   <input
//                     type="tel"
//                     id="input_327_full"
//                     name="primaryPhone"
//                     value={formData.primaryPhone}
//                     onChange={handleFormChange}
//                     className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3 focus:ring-primary focus:border-primary transition"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-label">Secondary Phone Number</label>
//                   <input
//                     type="tel"
//                     id="input_328_full"
//                     name="secondaryPhone"
//                     value={formData.secondaryPhone}
//                     onChange={handleFormChange}
//                     className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3 focus:ring-primary focus:border-primary transition"
//                   />
//                 </div>
//               </div>
//             </section>
//           )}

//           {currentStep === 2 && (
//             <>
//               <section className="mb-10">
//                 <h2 className="text-2xl font-semibold text-label mb-4">SECTION 2 - WORK HISTORY</h2>
//                 <p className="text-sm text-input mb-4">
//                   List all the jobs you had in the 5 years before you became unable to work
//                   because of your medical conditions:
//                 </p>
//                 <div className="overflow-x-auto rounded-lg border border-primary">
//                   <table className="w-full">
//                     <thead>
//                       <tr className="bg-secondary">
//                         <th className="p-3 text-left text-sm font-medium text-label">Job Title</th>
//                         <th className="p-3 text-left text-sm font-medium text-label">Type of Business</th>
//                         <th className="p-3 text-left text-sm font-medium text-label">Dates Worked From (MM/YYYY)</th>
//                         <th className="p-3 text-left text-sm font-medium text-label">Dates Worked To (MM/YYYY)</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {jobs.map((job, index) => {
//                         const baseId = index === 0 ? 199 : 200 + (index - 1) * 20 + 21;
//                         return (
//                           <tr key={index} className="border-t border-primary">
//                             <td className="p-3">
//                               <input
//                                 type="text"
//                                 id={`input_${baseId}`}
//                                 value={job.jobTitle}
//                                 onChange={(e) => handleJobChange(index, 'jobTitle', e.target.value)}
//                                 className="w-full bg-input text-input border border-primary rounded-md p-2"
//                               />
//                             </td>
//                             <td className="p-3">
//                               <input
//                                 type="text"
//                                 id={`input_${baseId + 1}`}
//                                 value={job.businessType}
//                                 onChange={(e) => handleJobChange(index, 'businessType', e.target.value)}
//                                 className="w-full bg-input text-input border border-primary rounded-md p-2"
//                               />
//                             </td>
//                             <td className="p-3">
//                               <input
//                                 type="text"
//                                 id={`input_${baseId + 2}`}
//                                 value={job.from}
//                                 onChange={(e) => handleJobChange(index, 'from', e.target.value)}
//                                 className="w-full bg-input text-input border border-primary rounded-md p-2"
//                               />
//                             </td>
//                             <td className="p-3">
//                               <input
//                                 type="text"
//                                 id={`input_${baseId + 3}`}
//                                 value={job.to}
//                                 onChange={(e) => handleJobChange(index, 'to', e.target.value)}
//                                 className="w-full bg-input text-input border border-primary rounded-md p-2"
//                               />
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//                 {jobs.length < 10 && (
//                   <button
//                     type="button"
//                     onClick={addJob}
//                     className="mt-4 bg-primary text-[var(--secondary-color)] px-4 py-2 rounded-md hover:bg-secondary transition"
//                   >
//                     Add Job
//                   </button>
//                 )}
//               </section>
//               {jobs.map((job, index) => {
//                 const baseId = index === 0 ? 199 : 200 + (index - 1) * 20 + 21;
//                 return (
//                   <section key={index} className="mb-10">
//                     <h2 className="text-2xl font-semibold text-label mb-4">
//                       Job No. {index + 1}: {job.jobTitle || 'Details'}
//                     </h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-medium text-label">Rate of Pay</label>
//                         <input
//                           type="number"
//                           id={`input_${baseId + 1}`}
//                           value={jobDetails[index].rateOfPay}
//                           onChange={(e) => handleJobDetailChange(index, 'rateOfPay', e.target.value)}
//                           className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3"
//                         />
//                       </div>
//                       <div>
//                         <label className="block  text-sm font-medium text-label mb-2">Pay Frequency</label>
//                         <div className="flex flex-wrap gap-4">
//                           {['Hour', 'Day', 'Week', 'Month', 'Year'].map((option) => (
//                             <label key={option} className="inline-flex items-center space-x-2 text-[var(--primary-color)]" >
//                               <input
//                                 type="radio"
//                                 name={`payFrequency_${index}`}
//                                 value={option}
//                                 checked={jobDetails[index].payFrequency === option}
//                                 onChange={(e) =>
//                                   handleJobDetailChange(index, 'payFrequency', e.target.value)
//                                 }
//                                 className="form-radio text-primary h-4 w-4"
//                               />
//                               <span>{option}</span>
//                             </label>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </section>
//                 );
//               })}
//             </>
//           )}

//           {currentStep === 3 && (
//             <section className="mb-10">
//               <h2 className="text-2xl font-semibold text-label mb-4">SECTION 3 - REMARKS</h2>
//               <textarea
//                 id="input_313"
//                 name="remarks"
//                 value={formData.remarks}
//                 onChange={handleFormChange}
//                 className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3"
//                 rows="6"
//                 maxLength="2000"
//                 placeholder="Provide any additional information..."
//               ></textarea>
//             </section>
//           )}

//           {currentStep === 4 && (
//             <section className="mb-10">
//               <h2 className="text-2xl font-semibold text-label mb-4">SECTION 4 - WHO IS COMPLETING THIS REPORT</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <label className="block text-sm font-medium text-label">Date Report Completed (MM/DD/YYYY) *</label>
//                   <input
//                     type="text"
//                     id="id_315"
//                     name="completerDate"
//                     value={formData.completerDate}
//                     onChange={handleFormChange}
//                     className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3"
//                     placeholder="MM/DD/YYYY"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-label">Who is completing this report? *</label>
//                   <div className="flex space-x-4 mt-2">
//                     <label className="flex items-center text-input">
//                       <input
//                         type="radio"
//                         id="q316_self"
//                         name="q316"
//                         value="self"
//                         checked={formData.completer === 'self'}
//                         onChange={handleFormChange}
//                         className="mr-2"
//                         required
//                       />
//                       The person listed in 1.A.
//                     </label>
//                     <label className="flex items-center text-input">
//                       <input
//                         type="radio"
//                         id="q316_other"
//                         name="q316"
//                         value="other"
//                         checked={formData.completer === 'other'}
//                         onChange={handleFormChange}
//                         className="mr-2"
//                       />
//                       Someone else
//                     </label>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-label">Name *</label>
//                   <input
//                     type="text"
//                     id="input_317"
//                     name="completerName"
//                     value={formData.completerName}
//                     onChange={handleFormChange}
//                     className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3"
//                     required
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-label">Relationship to the Person in 1.A. *</label>
//                   <input
//                     type="text"
//                     id="input_318"
//                     name="completerRelationship"
//                     value={formData.completerRelationship}
//                     onChange={handleFormChange}
//                     className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3"
//                     required
//                   />
//                 </div>
//                 <div className="md:col-span-2">
//                   <label className="block text-sm font-medium text-label">Mailing Address *</label>
//                   <input
//                     type="text"
//                     id="input_319_addr_line1"
//                     name="address1"
//                     value={formData.address1}
//                     onChange={handleFormChange}
//                     className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3"
//                     placeholder="Street Address"
//                     required
//                   />
//                   <input
//                     type="text"
//                     id="input_319_addr_line2"
//                     name="address2"
//                     value={formData.address2}
//                     onChange={handleFormChange}
//                     className="mt-2 block w-full bg-input text-input border border-primary rounded-md p-3"
//                     placeholder="Street Address Line 2"
//                   />
//                   <div className="grid grid-cols-2 gap-4 mt-2">
//                     <input
//                       type="text"
//                       id="input_319_city"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleFormChange}
//                       className="block w-full bg-input text-input border border-primary rounded-md p-3"
//                       placeholder="City"
//                       required
//                     />
//                     <input
//                       type="text"
//                       id="input_319_state"
//                       name="state"
//                       value={formData.state}
//                       onChange={handleFormChange}
//                       className="block w-full bg-input text-input border border-primary rounded-md p-3"
//                       placeholder="State / Province"
//                       required
//                     />
//                   </div>
//                   <div className="grid grid-cols-2 gap-4 mt-2">
//                     <input
//                       type="text"
//                       id="input_319_postal"
//                       name="zip"
//                       value={formData.zip}
//                       onChange={handleFormChange}
//                       className="block w-full bg-input text-input border border-primary rounded-md p-3"
//                       placeholder="Postal / Zip Code"
//                       required
//                     />
//                     <select
//                       id="input_319_country"
//                       name="country"
//                       value={formData.country}
//                       onChange={handleFormChange}
//                       className="block w-full bg-input text-input border border-primary rounded-md p-3"
//                       required
//                     >
//                       <option value="">Select Country</option>
//                       {['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Zimbabwe', 'Other'].map((country) => (
//                         <option key={country} value={country}>{country}</option>
//                       ))}
//                     </select>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-label">Daytime Phone Number *</label>
//                   <input
//                     type="tel"
//                     id="input_320_full"
//                     name="completerPhone"
//                     value={formData.completerPhone}
//                     onChange={handleFormChange}
//                     className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3"
//                     required
//                   />
//                 </div>
//               </div>
//             </section>
//           )}

//           <div className="flex justify-between items-center">
//             {currentStep > 1 && (
//               <button
//                 type="button"
//                 onClick={handleBack}
//                 className="bg-secondary text-[var(--primary-color)] px-6 py-3 rounded-md hover:bg-primary hover:text-white transition"
//               >
//                 Back
//               </button>
//             )}
//             <div className="space-x-4">
//               {currentStep < 4 && (
//                 <button
//                   type="button"
//                   onClick={handleNext}
//                   className="bg-primary text-[var(--secondary-color)] px-6 py-3 rounded-md hover:bg-secondary hover:text-input transition"
//                 >
//                   Next
//                 </button>
//               )}
//               {currentStep === 4 && (
//                 <>
//                   <button
//                     type="button"
//                     className="bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary hover:text-input transition"
//                   >
//                     Preview PDF
//                   </button>
//                   <button
//                     type="submit"
//                     onClick={handleSubmit}
//                     className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
//                   >
//                     Submit
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default WorkHistoryReport;




import React, { useState, useEffect } from 'react';

const WorkHistoryReport = () => {
  const [formData, setFormData] = useState({
    name: '',
    ssn: '',
    primaryPhone: '',
    secondaryPhone: '',
    jobs: Array(10).fill({ title: '', business: '', from: '', to: '' }),
    jobDetails: Array(5).fill({
      title: '',
      rateOfPay: '',
      payPeriod: '',
      hoursPerDay: '',
      daysPerWeek: '',
      tasks: '',
      reports: '',
      supervision: '',
      tools: '',
      interaction: '',
      interactionDetails: '',
      physicalActivities: {
        standingWalking: '',
        sitting: '',
        stooping: '',
        kneeling: '',
        crouching: '',
        crawling: '',
        climbingStairs: '',
        climbingLadders: '',
      },
      handActivities: {
        fingersOneHand: false,
        fingersBothHands: false,
        fingersTime: '',
        graspOneHand: false,
        graspBothHands: false,
        graspTime: '',
      },
      armActivities: {
        reachBelowOneArm: false,
        reachBelowBothArms: false,
        reachBelowTime: '',
        reachOverheadOneArm: false,
        reachOverheadBothArms: false,
        reachOverheadTime: '',
      },
      liftingCarrying: '',
      heaviestWeight: '',
      frequentWeight: '',
      exposures: [],
      exposureDetails: '',
      medicalConditions: '',
    }),
    remarks: '',
    completionDate: '',
    completer: '',
    completerName: '',
    completerRelationship: '',
    address: {
      street: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
      country: '',
    },
    completerPhone: '',
    formID: '252154456278462',
    simple_spc: '252154456278462-252154456278462',
    jsExecutionTracker: 'build-date-1754323901292',
    submitSource: 'unknown',
    submitDate: 'undefined',
    buildDate: '1754323901292',
    uploadServerUrl: 'https://upload.jotform.com/upload',
    eventObserver: '1',
    website: '', // Anti-spam field
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showInteractionDetails, setShowInteractionDetails] = useState(Array(5).fill(false));

  // Custom phone number formatter
  const formatPhoneNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  // Handle input changes
  const handleChange = (e, section, index) => {
    const { name, value, type, checked } = e.target;

    if (section === 'topLevel') {
      if (name === 'primaryPhone' || name === 'secondaryPhone' || name === 'completerPhone') {
        const formattedValue = formatPhoneNumber(value);
        setFormData((prev) => ({ ...prev, [name]: formattedValue }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else if (section === 'jobs') {
      setFormData((prev) => ({
        ...prev,
        jobs: prev.jobs.map((job, i) =>
          i === index ? { ...job, [name]: value } : job
        ),
      }));
    } else if (section === 'jobDetails') {
      if (name === 'interaction') {
        setShowInteractionDetails((prev) =>
          prev.map((show, i) => (i === index ? value === 'Yes' : show))
        );
      }
      if (type === 'checkbox') {
        setFormData((prev) => ({
          ...prev,
          jobDetails: prev.jobDetails.map((detail, i) =>
            i === index
              ? {
                  ...detail,
                  exposures: checked
                    ? [...detail.exposures, value]
                    : detail.exposures.filter((exp) => exp !== value),
                }
              : detail
          ),
        }));
      } else if (name.includes('physicalActivities')) {
        const activity = name.split('.')[1];
        setFormData((prev) => ({
          ...prev,
          jobDetails: prev.jobDetails.map((detail, i) =>
            i === index
              ? { ...detail, physicalActivities: { ...detail.physicalActivities, [activity]: value } }
              : detail
          ),
        }));
      } else if (name.includes('handActivities')) {
        const [field, subField] = name.split('.');
        setFormData((prev) => ({
          ...prev,
          jobDetails: prev.jobDetails.map((detail, i) =>
            i === index
              ? {
                  ...detail,
                  handActivities: {
                    ...detail.handActivities,
                    [subField]: type === 'checkbox' ? checked : value,
                  },
                }
              : detail
          ),
        }));
      } else if (name.includes('armActivities')) {
        const [field, subField] = name.split('.');
        setFormData((prev) => ({
          ...prev,
          jobDetails: prev.jobDetails.map((detail, i) =>
            i === index
              ? {
                  ...detail,
                  armActivities: {
                    ...detail.armActivities,
                    [subField]: type === 'checkbox' ? checked : value,
                  },
                }
              : detail
          ),
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          jobDetails: prev.jobDetails.map((detail, i) =>
            i === index ? { ...detail, [name]: value } : detail
          ),
        }));
      }
    } else if (section === 'address') {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Validate required fields
    const requiredFields = [
      { field: formData.name, name: 'Name' },
      { field: formData.ssn, name: 'Social Security Number' },
      { field: formData.primaryPhone, name: 'Primary Phone Number' },
      { field: formData.completionDate, name: 'Completion Date' },
      { field: formData.completer, name: 'Who is completing this report' },
      { field: formData.completerName, name: 'Completer Name' },
      { field: formData.completerRelationship, name: 'Relationship to Person' },
      { field: formData.address.street, name: 'Street Address' },
      { field: formData.completerPhone, name: 'Completer Phone Number' },
    ];

    for (const { field, name } of requiredFields) {
      if (!field) {
        alert(`There are incomplete required fields. Please complete ${name}.`);
        return;
      }
    }

    // Validate phone number format
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!phoneRegex.test(formData.primaryPhone)) {
      alert('Please enter a valid primary phone number in the format (###) ###-####.');
      return;
    }
    if (formData.secondaryPhone && !phoneRegex.test(formData.secondaryPhone)) {
      alert('Please enter a valid secondary phone number in the format (###) ###-####.');
      return;
    }
    if (!phoneRegex.test(formData.completerPhone)) {
      alert('Please enter a valid completer phone number in the format (###) ###-####.');
      return;
    }

    // Prepare form data for JotForm
    const submissionData = {
      'q1_name': formData.name,
      'q2_ssn': formData.ssn,
      'q3_phoneNumber[primary]': formData.primaryPhone,
      'q3_phoneNumber[secondary]': formData.secondaryPhone,
      ...formData.jobs.reduce((acc, job, index) => ({
        ...acc,
        [`q4_jobs[${index}][title]`]: job.title,
        [`q4_jobs[${index}][business]`]: job.business,
        [`q4_jobs[${index}][from]`]: job.from,
        [`q4_jobs[${index}][to]`]: job.to,
      }), {}),
      ...formData.jobDetails.reduce((acc, detail, index) => ({
        ...acc,
        [`q5_jobDetails[${index}][title]`]: detail.title,
        [`q5_jobDetails[${index}][rateOfPay]`]: detail.rateOfPay,
        [`q5_jobDetails[${index}][payPeriod]`]: detail.payPeriod,
        [`q5_jobDetails[${index}][hoursPerDay]`]: detail.hoursPerDay,
        [`q5_jobDetails[${index}][daysPerWeek]`]: detail.daysPerWeek,
        [`q5_jobDetails[${index}][tasks]`]: detail.tasks,
        [`q5_jobDetails[${index}][reports]`]: detail.reports,
        [`q5_jobDetails[${index}][supervision]`]: detail.supervision,
        [`q5_jobDetails[${index}][tools]`]: detail.tools,
        [`q5_jobDetails[${index}][interaction]`]: detail.interaction,
        [`q5_jobDetails[${index}][interactionDetails]`]: detail.interactionDetails,
        ...Object.entries(detail.physicalActivities).reduce((actAcc, [key, value]) => ({
          ...actAcc,
          [`q5_jobDetails[${index}][physicalActivities][${key}]`]: value,
        }), {}),
        ...Object.entries(detail.handActivities).reduce((actAcc, [key, value]) => ({
          ...actAcc,
          [`q5_jobDetails[${index}][handActivities][${key}]`]: value,
        }), {}),
        ...Object.entries(detail.armActivities).reduce((actAcc, [key, value]) => ({
          ...actAcc,
          [`q5_jobDetails[${index}][armActivities][${key}]`]: value,
        }), {}),
        [`q5_jobDetails[${index}][liftingCarrying]`]: detail.liftingCarrying,
        [`q5_jobDetails[${index}][heaviestWeight]`]: detail.heaviestWeight,
        [`q5_jobDetails[${index}][frequentWeight]`]: detail.frequentWeight,
        [`q5_jobDetails[${index}][exposures]`]: detail.exposures.join(','),
        [`q5_jobDetails[${index}][exposureDetails]`]: detail.exposureDetails,
        [`q5_jobDetails[${index}][medicalConditions]`]: detail.medicalConditions,
      }), {}),
      'q6_remarks': formData.remarks,
      'q7_completionDate': formData.completionDate,
      'q8_completer': formData.completer,
      'q9_completerName': formData.completerName,
      'q10_completerRelationship': formData.completerRelationship,
      'q11_address[street]': formData.address.street,
      'q11_address[street2]': formData.address.street2,
      'q11_address[city]': formData.address.city,
      'q11_address[state]': formData.address.state,
      'q11_address[zip]': formData.address.zip,
      'q11_address[country]': formData.address.country,
      'q12_completerPhone': formData.completerPhone,
      formID: formData.formID,
      simple_spc: formData.simple_spc,
      jsExecutionTracker: formData.jsExecutionTracker,
      submitSource: formData.submitSource,
      submitDate: formData.submitDate,
      buildDate: formData.buildDate,
      uploadServerUrl: formData.uploadServerUrl,
      eventObserver: formData.eventObserver,
      website: formData.website,
    };

    try {
      const response = await fetch('https://submit.jotform.com/submit/252154456278462', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(submissionData).toString(),
      });

      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      alert('Error submitting form: ' + error.message);
    }
  };

  // Set simple_spc on mount
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      simple_spc: '252154456278462-252154456278462',
    }));
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F3FE]">
      <form
        className="max-w-[700px] mx-auto bg-white rounded-[20px] p-0 font-inter text-base text-black"
        onSubmit={handleSubmit}
        action="https://submit.jotform.com/submit/252154456278462"
        method="post"
        name="form_252154456278462"
        id="252154456278462"
        acceptCharset="utf-8"
        autoComplete="on"
      >
        {/* Hidden Inputs */}
        <input type="hidden" name="formID" value={formData.formID} />
        <input type="hidden" id="JWTContainer" name="JWTContainer" value="" />
        <input type="hidden" id="cardinalOrderNumber" name="cardinalOrderNumber" value="" />
        <input type="hidden" id="jsExecutionTracker" name="jsExecutionTracker" value={formData.jsExecutionTracker} />
        <input type="hidden" id="submitSource" name="submitSource" value={formData.submitSource} />
        <input type="hidden" id="submitDate" name="submitDate" value={formData.submitDate} />
        <input type="hidden" id="buildDate" name="buildDate" value={formData.buildDate} />
        <input type="hidden" name="uploadServerUrl" value={formData.uploadServerUrl} />
        <input type="hidden" name="eventObserver" value={formData.eventObserver} />
        <input type="hidden" name="website" value={formData.website} />
        <input type="hidden" className="simple_spc" id="simple_spc" name="simple_spc" value={formData.simple_spc} />

        <ul className="list-none p-0 px-[38px]" role="presentation">
          {/* Header */}
          <li className="w-full" data-type="control_head">
            <div className="my-0 px-[52px] py-[40px]">
              <h1 className="text-2xl text-black font-normal">WORK HISTORY REPORT</h1>
              <p className="text-sm text-gray-600">
                Anyone who makes or causes to be made a false statement or representation of material fact for use in determining a payment under the Social Security Act, or knowingly conceals or fails to disclose an event with an intent to affect an initial or continued right to payment, commits a crime punishable under Federal law by fine, imprisonment, or both, and may be subject to administrative sanctions.
              </p>
            </div>
          </li>

          {/* Section 1 - Information About You */}
          <li className="w-full" data-type="control_text">
            <div className="w-full">
              <p className="text-[16pt] font-bold font-arial">SECTION 1 - INFORMATION ABOUT YOU</p>
              <p className="text-sm text-gray-600">When a question refers to "you" or "your," it refers to the person who is applying for disability benefits. If you are completing this report for someone else, provide information about them.</p>
            </div>
          </li>
          <li className="w-full" data-type="control_textbox">
            <label className="block text-left text-black" htmlFor="name">
              NAME <span className="text-[#f23a3c]">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none ${
                formSubmitted && !formData.name ? 'border-[#f23a3c] bg-[#ffd6d6]' : 'border-[#C3CAD8]/75'
              }`}
              required
              value={formData.name}
              onChange={(e) => handleChange(e, 'topLevel')}
            />
          </li>
          <li className="w-full" data-type="control_textbox">
            <label className="block text-left text-black" htmlFor="ssn">
              SOCIAL SECURITY NUMBER <span className="text-[#f23a3c]">*</span>
            </label>
            <input
              type="text"
              id="ssn"
              name="ssn"
              className={`border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none ${
                formSubmitted && !formData.ssn ? 'border-[#f23a3c] bg-[#ffd6d6]' : 'border-[#C3CAD8]/75'
              }`}
              required
              value={formData.ssn}
              onChange={(e) => handleChange(e, 'topLevel')}
            />
          </li>
          <li className="w-full" data-type="control_phone">
            <label className="block text-left text-black">
              DAYTIME PHONE NUMBER(S) where we can call to speak with you or leave a message, if needed. Include area code or IDD and country code if outside the USA or Canada.
            </label>
            <div className="w-full flex flex-col gap-2.5">
              <span>
                <label className="block text-left text-black" htmlFor="primaryPhone">
                  Primary <span className="text-[#f23a3c]">*</span>
                </label>
                <input
                  type="tel"
                  id="primaryPhone"
                  name="primaryPhone"
                  className={`border rounded p-2 text-base bg-white w-[310px] hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none ${
                    formSubmitted && !phoneRegex.test(formData.primaryPhone) ? 'border-[#f23a3c] bg-[#ffd6d6]' : 'border-[#C3CAD8]/75'
                  }`}
                  placeholder="(000) 000-0000"
                  required
                  value={formData.primaryPhone}
                  onChange={(e) => handleChange(e, 'topLevel')}
                  maxLength={14}
                />
              </span>
              <span>
                <label className="block text-left text-black" htmlFor="secondaryPhone">
                  Secondary (if available)
                </label>
                <input
                  type="tel"
                  id="secondaryPhone"
                  name="secondaryPhone"
                  className="border rounded p-2 text-base bg-white w-[310px] hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                  placeholder="(000) 000-0000"
                  value={formData.secondaryPhone}
                  onChange={(e) => handleChange(e, 'topLevel')}
                  maxLength={14}
                />
              </span>
            </div>
          </li>

          {/* Section 2 - Work History */}
          <li className="w-full" data-type="control_text">
            <div className="w-full">
              <p className="text-[16pt] font-bold font-arial">SECTION 2 - WORK HISTORY</p>
              <p className="text-sm text-gray-600">List all the jobs you had in the 5 years before you became unable to work because of your medical conditions:</p>
              <ul className="list-disc list-inside text-sm text-gray-600">
                <li>List your most recent job first</li>
                <li>List all job titles even if they were for the same employer</li>
                <li>Do not include jobs you held less than 30 calendar days</li>
                <li>Include self-employment (e.g., rideshare driver, hair stylist)</li>
                <li>Include work in a foreign country</li>
              </ul>
            </div>
          </li>
          <li className="w-full" data-type="control_matrix">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Job Title (e.g., Cashier)</th>
                  <th className="border border-gray-300 p-2">Type of Business (e.g., Grocery Store)</th>
                  <th className="border border-gray-300 p-2">Dates Worked From (MM/YYYY)</th>
                  <th className="border border-gray-300 p-2">Dates Worked To (MM/YYYY)</th>
                </tr>
              </thead>
              <tbody>
                {formData.jobs.map((job, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        name="title"
                        className="w-full border-none p-1"
                        value={job.title}
                        onChange={(e) => handleChange(e, 'jobs', index)}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        name="business"
                        className="w-full border-none p-1"
                        value={job.business}
                        onChange={(e) => handleChange(e, 'jobs', index)}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        name="from"
                        className="w-full border-none p-1"
                        placeholder="MM/YYYY"
                        value={job.from}
                        onChange={(e) => handleChange(e, 'jobs', index)}
                      />
                    </td>
                    <td className="border border-gray-300 p-2">
                      <input
                        type="text"
                        name="to"
                        className="w-full border-none p-1"
                        placeholder="MM/YYYY"
                        value={job.to}
                        onChange={(e) => handleChange(e, 'jobs', index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </li>

          {/* Job Details Sections (1-5) */}
          {formData.jobDetails.map((detail, index) => (
            <React.Fragment key={index}>
              <li className="w-full" data-type="control_text">
                <div className="w-full">
                  <p className="text-[16pt] font-bold font-arial">Provide more information about Job No. {index + 1} listed in Section 2</p>
                  <p className="text-sm text-gray-600">Estimate hours and pay, if needed.</p>
                </div>
              </li>
              <li className="w-full" data-type="control_textbox">
                <label className="block text-left text-black" htmlFor={`jobTitle${index}`}>
                  JOB TITLE NO. {index + 1}
                </label>
                <input
                  type="text"
                  id={`jobTitle${index}`}
                  name="title"
                  className="border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                  value={detail.title}
                  onChange={(e) => handleChange(e, 'jobDetails', index)}
                />
              </li>
              <li className="w-full" data-type="control_textbox">
                <label className="block text-left text-black" htmlFor={`rateOfPay${index}`}>
                  Rate of Pay
                </label>
                <input
                  type="text"
                  id={`rateOfPay${index}`}
                  name="rateOfPay"
                  className="border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                  value={detail.rateOfPay}
                  onChange={(e) => handleChange(e, 'jobDetails', index)}
                />
              </li>
              <li className="w-full" data-type="control_radio">
                <label className="block text-left text-black">Per (Check One):</label>
                <div className="flex flex-wrap gap-4">
                  {['Hour', 'Day', 'Week', 'Month', 'Year'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="payPeriod"
                        value={option}
                        checked={detail.payPeriod === option}
                        onChange={(e) => handleChange(e, 'jobDetails', index)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </li>
              <li className="w-full" data-type="control_textbox">
                <label className="block text-left text-black" htmlFor={`hoursPerDay${index}`}>
                  Hours per Day
                </label>
                <input
                  type="text"
                  id={`hoursPerDay${index}`}
                  name="hoursPerDay"
                  className="border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                  value={detail.hoursPerDay}
                  onChange={(e) => handleChange(e, 'jobDetails', index)}
                />
              </li>
              <li className="w-full" data-type="control_textbox">
                <label className="block text-left text-black" htmlFor={`daysPerWeek${index}`}>
                  Days per Week
                </label>
                <input
                  type="text"
                  id={`daysPerWeek${index}`}
                  name="daysPerWeek"
                  className="border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                  value={detail.daysPerWeek}
                  onChange={(e) => handleChange(e, 'jobDetails', index)}
                />
              </li>
              <li className="w-full" data-type="control_textarea">
                <label className="block text-left text-black" htmlFor={`tasks${index}`}>
                  For the job you listed in Job Title No. {index + 1}, describe in detail the tasks you did in a typical workday.
                </label>
                <textarea
                  id={`tasks${index}`}
                  name="tasks"
                  className="border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                  rows="5"
                  maxLength="525"
                  value={detail.tasks}
                  onChange={(e) => handleChange(e, 'jobDetails', index)}
                ></textarea>
                <p className="text-sm text-gray-500">{detail.tasks.length}/525</p>
              </li>
              <li className="w-full" data-type="control_textarea">
                <label className="block text-left text-black" htmlFor={`reports${index}`}>
                  If any of the tasks listed above involved writing or completing reports, describe the type of report you wrote or completed and how much time you spent on it per workday or workweek.
                </label>
                <textarea
                  id={`reports${index}`}
                  name="reports"
                  className="border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                  rows="5"
                  maxLength="425"
                  value={detail.reports}
                  onChange={(e) => handleChange(e, 'jobDetails', index)}
                ></textarea>
                <p className="text-sm text-gray-500">{detail.reports.length}/425</p>
              </li>
              <li className="w-full" data-type="control_textarea">
                <label className="block text-left text-black" htmlFor={`supervision${index}`}>
                  If any of the tasks listed above involved supervising others, describe who or what you supervised and what supervisory duties you had.
                </label>
                <textarea
                  id={`supervision${index}`}
                  name="supervision"
                  className="border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                  rows="5"
                  maxLength="425"
                  value={detail.supervision}
                  onChange={(e) => handleChange(e, 'jobDetails', index)}
                ></textarea>
                <p className="text-sm text-gray-500">{detail.supervision.length}/425</p>
              </li>
              <li className="w-full" data-type="control_textarea">
                <label className="block text-left text-black" htmlFor={`tools${index}`}>
                  List the machines, tools, and equipment you used regularly when doing this job, and explain what you used them for.
                </label>
                <textarea
                  id={`tools${index}`}
                  name="tools"
                  className="border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                  rows="5"
                  maxLength="425"
                  value={detail.tools}
                  onChange={(e) => handleChange(e, 'jobDetails', index)}
                ></textarea>
                <p className="text-sm text-gray-500">{detail.tools.length}/425</p>
              </li>
              <li className="w-full" data-type="control_radio">
                <label className="block text-left text-black">
                  Did this job require you to interact with coworkers, the general public, or anyone else?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="interaction"
                      value="Yes"
                      checked={detail.interaction === 'Yes'}
                      onChange={(e) => handleChange(e, 'jobDetails', index)}
                      className="mr-2"
                    />
                    Yes
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="interaction"
                      value="No"
                      checked={detail.interaction === 'No'}
                      onChange={(e) => handleChange(e, 'jobDetails', index)}
                      className="mr-2"
                    />
                    No
                  </label>
                </div>
              </li>
              {showInteractionDetails[index] && (
                <li className="w-full" data-type="control_textarea">
                  <label className="block text-left text-black" htmlFor={`interactionDetails${index}`}>
                    If YES, describe who you interacted with, the purpose of the interaction, how you interacted, and how much time you spent doing it per workday or workweek.
                  </label>
                  <textarea
                    id={`interactionDetails${index}`}
                    name="interactionDetails"
                    className="border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                    rows="5"
                    maxLength="525"
                    value={detail.interactionDetails}
                    onChange={(e) => handleChange(e, 'jobDetails', index)}
                  ></textarea>
                  <p className="text-sm text-gray-500">{detail.interactionDetails.length}/525</p>
                </li>
              )}
              <li className="w-full" data-type="control_matrix">
                <label className="block text-left text-black">
                  Tell us how much time you spent doing the following physical activities in a typical workday.
                </label>
                <p className="text-sm text-gray-600">
                  The total hours/minutes for standing, walking, and sitting should equal the Hours per Day. The example below shows an 8-hour workday with 2 hours standing and walking, and 6 hours sitting (8 hours total).
                </p>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Activities</th>
                      <th className="border border-gray-300 p-2">How much of your workday? (Hours/Minutes)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { key: 'standingWalking', label: 'Standing and walking (combined)' },
                      { key: 'sitting', label: 'Sitting' },
                      { key: 'stooping', label: 'Stooping (i.e., bending down & forward at waist)' },
                      { key: 'kneeling', label: 'Kneeling (i.e., bending legs to rest on knees)' },
                      { key: 'crouching', label: 'Crouching (i.e., bending legs & back down & forward)' },
                      { key: 'crawling', label: 'Crawling (i.e., moving on hands and knees)' },
                      { key: 'climbingStairs', label: 'Climbing stairs or ramps' },
                      { key: 'climbingLadders', label: 'Climbing ladders, ropes, or scaffolds' },
                    ].map(({ key, label }) => (
                      <tr key={key}>
                        <td className="border border-gray-300 p-2">{label}</td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            name={`physicalActivities.${key}`}
                            className="w-full border-none p-1"
                            value={detail.physicalActivities[key]}
                            onChange={(e) => handleChange(e, 'jobDetails', index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </li>
              <li className="w-full" data-type="control_matrix">
                <label className="block text-left text-black">Hand Activities</label>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Activities</th>
                      <th className="border border-gray-300 p-2">One Hand</th>
                      <th className="border border-gray-300 p-2">Both Hands</th>
                      <th className="border border-gray-300 p-2">How much of your workday? (Hours/Minutes)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        label: 'Using fingers to touch, pick, or pinch (e.g., using a mouse, keyboard, turning pages, or buttoning a shirt)',
                        oneHandKey: 'fingersOneHand',
                        bothHandsKey: 'fingersBothHands',
                        timeKey: 'fingersTime',
                      },
                      {
                        label: 'Using hands to seize, hold, grasp, or turn (e.g., holding a large envelope, a small box, a hammer, or water bottle)',
                        oneHandKey: 'graspOneHand',
                        bothHandsKey: 'graspBothHands',
                        timeKey: 'graspTime',
                      },
                    ].map(({ label, oneHandKey, bothHandsKey, timeKey }) => (
                      <tr key={label}>
                        <td className="border border-gray-300 p-2">{label}</td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="checkbox"
                            name={`handActivities.${oneHandKey}`}
                            checked={detail.handActivities[oneHandKey]}
                            onChange={(e) => handleChange(e, 'jobDetails', index)}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="checkbox"
                            name={`handActivities.${bothHandsKey}`}
                            checked={detail.handActivities[bothHandsKey]}
                            onChange={(e) => handleChange(e, 'jobDetails', index)}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            name={`handActivities.${timeKey}`}
                            className="w-full border-none p-1"
                            value={detail.handActivities[timeKey]}
                            onChange={(e) => handleChange(e, 'jobDetails', index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </li>
              <li className="w-full" data-type="control_matrix">
                <label className="block text-left text-black">Arm Activities</label>
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 p-2">Activities</th>
                      <th className="border border-gray-300 p-2">One Arm</th>
                      <th className="border border-gray-300 p-2">Both Arms</th>
                      <th className="border border-gray-300 p-2">How much of your workday? (Hours/Minutes)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        label: 'Reaching at or below the shoulder',
                        oneArmKey: 'reachBelowOneArm',
                        bothArmsKey: 'reachBelowBothArms',
                        timeKey: 'reachBelowTime',
                      },
                      {
                        label: 'Reaching overhead (above the shoulder)',
                        oneArmKey: 'reachOverheadOneArm',
                        bothArmsKey: 'reachOverheadBothArms',
                        timeKey: 'reachOverheadTime',
                      },
                    ].map(({ label, oneArmKey, bothArmsKey, timeKey }) => (
                      <tr key={label}>
                        <td className="border border-gray-300 p-2">{label}</td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="checkbox"
                            name={`armActivities.${oneArmKey}`}
                            checked={detail.armActivities[oneArmKey]}
                            onChange={(e) => handleChange(e, 'jobDetails', index)}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="checkbox"
                            name={`armActivities.${bothArmsKey}`}
                            checked={detail.armActivities[bothArmsKey]}
                            onChange={(e) => handleChange(e, 'jobDetails', index)}
                          />
                        </td>
                        <td className="border border-gray-300 p-2">
                          <input
                            type="text"
                            name={`armActivities.${timeKey}`}
                            className="w-full border-none p-1"
                            value={detail.armActivities[timeKey]}
                            onChange={(e) => handleChange(e, 'jobDetails', index)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </li>
              <li className="w-full" data-type="control_textarea">
                <label className="block text-left text-black" htmlFor={`liftingCarrying${index}`}>
                  Tell us about lifting and carrying in this job. Explain what you lifted, how far you carried it, and how often you did it in a typical workday.
                </label>
                <textarea
                  id={`liftingCarrying${index}`}
                  name="liftingCarrying"
                  className="border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                  rows="5"
                  maxLength="275"
                  value={detail.liftingCarrying}
                  onChange={(e) => handleChange(e, 'jobDetails', index)}
                ></textarea>
                <p className="text-sm text-gray-500">{detail.liftingCarrying.length}/275</p>
              </li>
              <li className="w-full" data-type="control_radio">
                <label className="block text-left text-black">Select the heaviest weight lifted:</label>
                <div className="flex flex-wrap gap-4">
                  {['Less than 1 lb.', 'Less than 10 lbs.', '10 lbs.', '20 lbs.', '50 lbs.', '100 lbs. or more', 'Other'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="heaviestWeight"
                        value={option}
                        checked={detail.heaviestWeight === option}
                        onChange={(e) => handleChange(e, 'jobDetails', index)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </li>
              <li className="w-full" data-type="control_radio">
                <label className="block text-left text-black">Select the weight frequently lifted (i.e., 1/3 to 2/3 of the workday):</label>
                <div className="flex flex-wrap gap-4">
                  {['Less than 1 lb.', 'Less than 10 lbs.', '10 lbs.', '25 lbs.', '50 lbs. or more', 'Other'].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="radio"
                        name="frequentWeight"
                        value={option}
                        checked={detail.frequentWeight === option}
                        onChange={(e) => handleChange(e, 'jobDetails', index)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </li>
              <li className="w-full" data-type="control_checkbox">
                <label className="block text-left text-black">Did this job expose you to any of the following? Check all that apply.</label>
                <div className="flex flex-wrap gap-4">
                  {[
                    'Outdoors',
                    'Extreme heat (non-weather related)',
                    'Extreme cold (non-weather related)',
                    'Wetness',
                    'Humidity',
                    'Hazardous substances',
                    'Moving mechanical parts',
                    'High, exposed places',
                    'Heavy vibrations',
                    'Loud noises',
                    'Other',
                  ].map((option) => (
                    <label key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        name="exposures"
                        value={option}
                        checked={detail.exposures.includes(option)}
                        onChange={(e) => handleChange(e, 'jobDetails', index)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </li>
              {detail.exposures.length > 0 && (
                <li className="w-full" data-type="control_textarea">
                  <label className="block text-left text-black" htmlFor={`exposureDetails${index}`}>
                    If one or more boxes are checked, tell us about the exposure(s) and how often you were exposed.
                  </label>
                  <textarea
                    id={`exposureDetails${index}`}
                    name="exposureDetails"
                    className="border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                    rows="5"
                    maxLength="275"
                    value={detail.exposureDetails}
                    onChange={(e) => handleChange(e, 'jobDetails', index)}
                  ></textarea>
                  <p className="text-sm text-gray-500">{detail.exposureDetails.length}/275</p>
                </li>
              )}
              <li className="w-full" data-type="control_textarea">
                <label className="block text-left text-black" htmlFor={`medicalConditions${index}`}>
                  Explain how your medical conditions would affect your ability to do this job.
                </label>
                <textarea
                  id={`medicalConditions${index}`}
                  name="medicalConditions"
                  className="border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                  rows="5"
                  maxLength="275"
                  value={detail.medicalConditions}
                  onChange={(e) => handleChange(e, 'jobDetails', index)}
                ></textarea>
                <p className="text-sm text-gray-500">{detail.medicalConditions.length}/275</p>
              </li>
            </React.Fragment>
          ))}

          {/* Section 3 - Remarks */}
          <li className="w-full" data-type="control_text">
            <div className="w-full">
              <p className="text-[16pt] font-bold font-arial">SECTION 3 - REMARKS</p>
              <p className="text-sm text-gray-600">
                Please provide any additional information you did not give in earlier parts of this report. If you did not have enough space in the prior sections of this report to provide the requested information, please use this space to provide the additional information requested in those sections. Be sure to include the job title number and question to which you are referring. If you add more jobs than the 5 jobs listed, please provide the same information as you did for job titles numbers 1-5 on a separate sheet of paper(s).
              </p>
            </div>
          </li>
          <li className="w-full" data-type="control_textarea">
            <label className="block text-left text-black" htmlFor="remarks">
              Remarks
            </label>
            <textarea
              id="remarks"
              name="remarks"
              className="border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
              rows="5"
              maxLength="2000"
              value={formData.remarks}
              onChange={(e) => handleChange(e, 'topLevel')}
            ></textarea>
            <p className="text-sm text-gray-500">{formData.remarks.length}/2000</p>
          </li>

          {/* Section 4 - Who is Completing This Report */}
          <li className="w-full" data-type="control_text">
            <div className="w-full">
              <p className="text-[16pt] font-bold font-arial">SECTION 4 - WHO IS COMPLETING THIS REPORT</p>
            </div>
          </li>
          <li className="w-full" data-type="control_textbox">
            <label className="block text-left text-black" htmlFor="completionDate">
              Date Report Completed (MM/DD/YYYY) <span className="text-[#f23a3c]">*</span>
            </label>
            <input
              type="text"
              id="completionDate"
              name="completionDate"
              className={`border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none ${
                formSubmitted && !formData.completionDate ? 'border-[#f23a3c] bg-[#ffd6d6]' : 'border-[#C3CAD8]/75'
              }`}
              placeholder="MM/DD/YYYY"
              required
              value={formData.completionDate}
              onChange={(e) => handleChange(e, 'topLevel')}
            />
          </li>
          <li className="w-full" data-type="control_radio">
            <label className="block text-left text-black">Who is completing this report? <span className="text-[#f23a3c]">*</span></label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="completer"
                  value="person"
                  checked={formData.completer === 'person'}
                  onChange={(e) => handleChange(e, 'topLevel')}
                  className="mr-2"
                />
                The person listed in 1.A.
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="completer"
                  value="someone-else"
                  checked={formData.completer === 'someone-else'}
                  onChange={(e) => handleChange(e, 'topLevel')}
                  className="mr-2"
                />
                Someone else (Complete the information below)
              </label>
            </div>
          </li>
          <li className="w-full" data-type="control_textbox">
            <label className="block text-left text-black" htmlFor="completerName">
              NAME <span className="text-[#f23a3c]">*</span>
            </label>
            <input
              type="text"
              id="completerName"
              name="completerName"
              className={`border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none ${
                formSubmitted && !formData.completerName ? 'border-[#f23a3c] bg-[#ffd6d6]' : 'border-[#C3CAD8]/75'
              }`}
              required
              value={formData.completerName}
              onChange={(e) => handleChange(e, 'topLevel')}
            />
          </li>
          <li className="w-full" data-type="control_textbox">
            <label className="block text-left text-black" htmlFor="completerRelationship">
              Relationship to the Person in 1.A. <span className="text-[#f23a3c]">*</span>
            </label>
            <input
              type="text"
              id="completerRelationship"
              name="completerRelationship"
              className={`border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none ${
                formSubmitted && !formData.completerRelationship ? 'border-[#f23a3c] bg-[#ffd6d6]' : 'border-[#C3CAD8]/75'
              }`}
              required
              value={formData.completerRelationship}
              onChange={(e) => handleChange(e, 'topLevel')}
            />
          </li>
          <li className="w-full" data-type="control_address">
            <label className="block text-left text-black">
              MAILING ADDRESS (Street or PO Box) Include the apartment number, if applicable. <span className="text-[#f23a3c]">*</span>
            </label>
            <div className="flex flex-col gap-2.5">
              <input
                type="text"
                name="street"
                className={`border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none ${
                  formSubmitted && !formData.address.street ? 'border-[#f23a3c] bg-[#ffd6d6]' : 'border-[#C3CAD8]/75'
                }`}
                placeholder="Street Address"
                required
                value={formData.address.street}
                onChange={(e) => handleChange(e, 'address')}
              />
              <input
                type="text"
                name="street2"
                className="border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                placeholder="Street Address Line 2"
                value={formData.address.street2}
                onChange={(e) => handleChange(e, 'address')}
              />
              <div className="flex gap-2.5">
                <input
                  type="text"
                  name="city"
                  className="border rounded p-2 text-base bg-white w-1/2 hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                  placeholder="City"
                  value={formData.address.city}
                  onChange={(e) => handleChange(e, 'address')}
                />
                <input
                  type="text"
                  name="state"
                  className="border rounded p-2 text-base bg-white w-1/2 hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                  placeholder="State / Province"
                  value={formData.address.state}
                  onChange={(e) => handleChange(e, 'address')}
                />
              </div>
              <div className="flex gap-2.5">
                <input
                  type="text"
                  name="zip"
                  className="border rounded p-2 text-base bg-white w-1/2 hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                  placeholder="Postal / Zip Code"
                  value={formData.address.zip}
                  onChange={(e) => handleChange(e, 'address')}
                />
                <select
                  name="country"
                  className="border rounded p-2 text-base bg-white w-1/2 hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none border-[#C3CAD8]/75"
                  value={formData.address.country}
                  onChange={(e) => handleChange(e, 'address')}
                >
                  <option>Please Select</option>
                  <option>Afghanistan</option>
                  <option>Albania</option>
                  <option>Algeria</option>
                  <option>American Samoa</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </li>
          <li className="w-full" data-type="control_phone">
            <label className="block text-left text-black" htmlFor="completerPhone">
              DAYTIME PHONE NUMBER where we may reach you or leave a message, if needed. Include the area code or IDD and country code if outside the USA or Canada. <span className="text-[#f23a3c]">*</span>
            </label>
            <input
              type="tel"
              id="completerPhone"
              name="completerPhone"
              className={`border rounded p-2 text-base bg-white w-[310px] hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none ${
                formSubmitted && !phoneRegex.test(formData.completerPhone) ? 'border-[#f23a3c] bg-[#ffd6d6]' : 'border-[#C3CAD8]/75'
              }`}
              placeholder="(000) 000-0000"
              required
              value={formData.completerPhone}
              onChange={(e) => handleChange(e, 'topLevel')}
              maxLength={14}
            />
          </li>

          {/* Buttons */}
          <li className="w-full" data-type="control_button">
            <div className="w-full flex justify-between">
              <button
                type="button"
                className="bg-gray-300 text-gray-700 px-4 py-2.5 rounded cursor-pointer hover:bg-gray-400"
                data-component="button"
              >
                Back
              </button>
              <div>
                <button
                  type="button"
                  className="bg-blue-500 text-white px-4 py-2.5 rounded cursor-pointer hover:bg-blue-600 mr-2"
                  data-component="button"
                >
                  Preview PDF
                </button>
                <button
                  type="submit"
                  className="bg-[#18BD5B] border border-[#18BD5B] text-white min-w-[180px] px-4 py-2.5 rounded cursor-pointer hover:bg-[#16AA52] hover:border-[#16AA52]"
                  data-component="button"
                >
                  Submit
                </button>
              </div>
            </div>
          </li>

          {/* Hidden Anti-Spam Field */}
          <li className="hidden">
            Should be Empty: <input
              type="text"
              name="website"
              value={formData.website}
              onChange={(e) => handleChange(e, 'topLevel')}
            />
          </li>
        </ul>
      </form>
    </div>
  );
};

export default WorkHistoryReport;