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







import React, { useState , useEffect } from 'react';
import InputMask from 'react-input-mask';
const WorkHistoryReport = () => {


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
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

  // State for form submission and error handling
  const [formSubmitted, setFormSubmitted] = useState(false);

  // State for conditional logic (mock for q8 and q9)
  const [showConditionalField, setShowConditionalField] = useState(false);

  // Custom phone number formatter
  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Apply (###) ###-#### format
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    } else {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      // Format phone number
      const formattedValue = formatPhoneNumber(value);
      setFormData((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Mock conditional logic for q8
    if (name === 'otherField' && value === 'Other') {
      setShowConditionalField(true);
    } else if (name === 'otherField') {
      setShowConditionalField(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
      alert('There are incomplete required fields. Please complete them.');
      return;
    }

    // Validate phone number format
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      alert('Please enter a valid phone number in the format (###) ###-####.');
      return;
    }

    // Prepare form data for JotForm
    const submissionData = {
      'q3_fullName3[first]': formData.firstName,
      'q3_fullName3[last]': formData.lastName,
      'q5_phoneNumber5[full]': formData.phoneNumber,
      q6_email6: formData.email,
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
        // Handle redirect or thank-you page (JotForm.activeRedirect = "thanktext")
        // Example: window.location.href = '/thank-you';
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
              <h1 className="text-2xl text-black font-normal">New Customer Registration Form</h1>
            </div>
          </li>

          {/* Customer Details Text */}
          <li className="w-full" data-type="control_text">
            <div className="w-full">
              <p className="text-[16pt] font-bold font-arial">Customer Details:</p>
            </div>
          </li>

          {/* Full Name */}
          <li className="w-full" data-type="control_fullname">
            <label className="block text-left text-black" htmlFor="first_3">
              Full Name <span className="text-[#f23a3c]">*</span>
            </label>
            <div className="w-full flex gap-2.5">
              <span className="inline-block align-top">
                <input
                  type="text"
                  id="first_3"
                  name="firstName"
                  className={`border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none ${
                    formSubmitted && !formData.firstName ? 'border-[#f23a3c] bg-[#ffd6d6]' : 'border-[#C3CAD8]/75'
                  }`}
                  autoComplete="section-input_3 given-name"
                  data-component="first"
                  aria-labelledby="label_3 sublabel_3_first"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                />
                <label className="text-xs text-[#1a1a1a] min-h-[13px]" htmlFor="first_3">
                  First Name
                </label>
              </span>
              <span className="inline-block align-top">
                <input
                  type="text"
                  id="last_3"
                  name="lastName"
                  className={`border rounded p-2 text-base bg-white w-full hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none ${
                    formSubmitted && !formData.lastName ? 'border-[#f23a3c] bg-[#ffd6d6]' : 'border-[#C3CAD8]/75'
                  }`}
                  autoComplete="section-input_3 family-name"
                  data-component="last"
                  aria-labelledby="label_3 sublabel_3_last"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                />
                <label className="text-xs text-[#1a1a1a] min-h-[13px]" htmlFor="last_3">
                  Last Name
                </label>
              </span>
            </div>
          </li>

          {/* Phone Number */}
          <li className="w-full" data-type="control_phone">
            <label className="block text-left text-black" htmlFor="input_5_full">
              Phone Number <span className="text-[#f23a3c]">*</span>
            </label>
            <div className="w-full">
              <span className="inline-block align-top">
                <input
                  type="tel"
                  id="input_5_full"
                  name="phoneNumber"
                  className={`border rounded p-2 text-base bg-white w-[310px] hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none ${
                    formSubmitted && !phoneRegex.test(formData.phoneNumber) ? 'border-[#f23a3c] bg-[#ffd6d6]' : 'border-[#C3CAD8]/75'
                  }`}
                  autoComplete="section-input_5 tel-national"
                  placeholder="(000) 000-0000"
                  data-component="phone"
                  aria-labelledby="label_5"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  maxLength={14} // Limits input to (###) ###-####
                />
              </span>
            </div>
          </li>

          {/* Email */}
          <li className="w-full" data-type="control_email">
            <label className="block text-left text-black" htmlFor="input_6">
              E-mail
            </label>
            <div className="w-full">
              <span className="inline-block align-top">
                <input
                  type="email"
                  id="input_6"
                  name="email"
                  className="border border-[#C3CAD8]/75 rounded p-2 text-base bg-white w-[310px] hover:border-[#2e69ff] focus:border-[#2e69ff] focus:ring-1 focus:ring-[#C9D8FE]/25 outline-none"
                  autoComplete="section-input_6 email"
                  placeholder="ex: email@yahoo.com"
                  data-component="email"
                  aria-labelledby="label_6 sublabel_input_6"
                  value={formData.email}
                  onChange={handleChange}
                />
                <label className="text-xs text-[#1a1a1a] min-h-[13px]" htmlFor="input_6">
                  example@example.com
                </label>
              </span>
            </div>
          </li>

          {/* Divider */}
          <li className="w-full" data-type="control_divider">
            <div className="w-full">
              <div className="border-b border-white h-[1px] my-[5px]"></div>
            </div>
          </li>

          {/* Divider */}
          <li className="w-full" data-type="control_divider">
            <div className="w-full">
              <div className="border-b border-white h-[1px] my-[5px]"></div>
            </div>
          </li>

          {/* Submit Button */}
          <li className="w-full" data-type="control_button">
            <div className="w-full text-center">
              <button
                type="submit"
                className="bg-[#18BD5B] border border-[#18BD5B] text-white min-w-[180px] text-base py-2.5 px-4 rounded cursor-pointer hover:bg-[#16AA52] hover:border-[#16AA52]"
                data-component="button"
              >
                Submit
              </button>
            </div>
          </li>

          {/* Hidden Anti-Spam Field */}
          <li className="hidden">
            Should be Empty: <input type="text" name="website" value={formData.website} onChange={handleChange} />
          </li>

          {/* Mock Conditional Field (for q8 and q9) */}
          {showConditionalField && (
            <li className="w-full" data-type="control_text">
              <div className="w-full">
                <p>Conditional Field (Triggered by Other)</p>
              </div>
            </li>
          )}
        </ul>
      </form>
    </div>
    
  );
};

export default WorkHistoryReport;


