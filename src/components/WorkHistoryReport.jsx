import React, { useState, useEffect } from 'react';

const WorkHistoryReport = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [jobs, setJobs] = useState([{ jobTitle: '', businessType: '', from: '', to: '' }]);
  const [formData, setFormData] = useState({
    name: '',
    ssn: '',
    primaryPhone: '',
    secondaryPhone: '',
    remarks: '',
    completerDate: '',
    completer: 'self',
    completerName: '',
    completerRelationship: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    completerPhone: '',
  });
  const [jobDetails, setJobDetails] = useState(
    jobs.map(() => ({
      rateOfPay: '',
      payFrequency: 'Hour',
      hoursPerDay: '',
      daysPerWeek: '',
      tasks: '',
      reports: '',
      supervisory: '',
      equipment: '',
      interaction: 'No',
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
        fingersOneHand: '',
        fingersBothHands: '',
        graspOneHand: '',
        graspBothHands: '',
      },
      armActivities: {
        reachBelowOneArm: '',
        reachBelowBothArms: '',
        reachOverheadOneArm: '',
        reachOverheadBothArms: '',
      },
      liftingDetails: '',
      heaviestWeight: 'Less than 1 lb.',
      frequentWeight: 'Less than 1 lb.',
      exposures: [],
      exposureDetails: '',
      medicalImpact: '',
    }))
  );

  useEffect(() => {
    // Ensure JotForm is initialized after scripts load
    if (window.JotForm) {
      window.JotForm.init(function() {
        console.log('JotForm initialized');
      });
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const addJob = () => {
    if (jobs.length < 10) {
      setJobs([...jobs, { jobTitle: '', businessType: '', from: '', to: '' }]);
      setJobDetails([
        ...jobDetails,
        {
          rateOfPay: '',
          payFrequency: 'Hour',
          hoursPerDay: '',
          daysPerWeek: '',
          tasks: '',
          reports: '',
          supervisory: '',
          equipment: '',
          interaction: 'No',
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
            fingersOneHand: '',
            fingersBothHands: '',
            graspOneHand: '',
            graspBothHands: '',
          },
          armActivities: {
            reachBelowOneArm: '',
            reachBelowBothArms: '',
            reachOverheadOneArm: '',
            reachOverheadBothArms: '',
          },
          liftingDetails: '',
          heaviestWeight: 'Less than 1 lb.',
          frequentWeight: 'Less than 1 lb.',
          exposures: [],
          exposureDetails: '',
          medicalImpact: '',
        },
      ]);
    }
  };

  const handleJobChange = (index, field, value) => {
    const updatedJobs = [...jobs];
    updatedJobs[index][field] = value;
    setJobs(updatedJobs);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleJobDetailChange = (index, field, value) => {
  //   const updatedDetails = [...jobDetails];
  //   updatedDetails[index][field] = value;
  //   setJobDetails(updatedDetails);
  // };

  const handleJobDetailChange = (index, field, value) => {
  const updatedDetails = [...jobDetails];
  updatedDetails[index] = {
    ...updatedDetails[index],
    [field]: value,
  };
  setJobDetails(updatedDetails);
};

  const handleNestedChange = (index, category, field, value) => {
    const updatedDetails = [...jobDetails];
    updatedDetails[index][category][field] = value;
    setJobDetails(updatedDetails);
  };

  const handleExposureChange = (index, exposure) => {
    const updatedDetails = [...jobDetails];
    const exposures = updatedDetails[index].exposures;
    if (exposures.includes(exposure)) {
      updatedDetails[index].exposures = exposures.filter((e) => e !== exposure);
    } else {
      updatedDetails[index].exposures = [...exposures, exposure];
    }
    setJobDetails(updatedDetails);
  };

  

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!window.JotForm) {
    console.error('JotForm is not loaded');
    return;
  }

  const safeSetValue = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.value = value;
    else console.error(`Element with id "${id}" not found`);
  };

  safeSetValue('input_190', formData.name); // Name
  safeSetValue('input_326', formData.ssn); // SSN
  safeSetValue('input_327_full', formData.primaryPhone); // Primary Phone
  safeSetValue('input_328_full', formData.secondaryPhone); // Secondary Phone
  safeSetValue('input_313', formData.remarks); // Remarks
  safeSetValue('id_315', formData.completerDate); // Date Completed

  const completerRadio = document.querySelector(`input[name="q316"][value="${formData.completer}"]`);
  if (completerRadio) {
    completerRadio.checked = true;
  } else {
    console.error(`Radio button for completer "${formData.completer}" not found`);
  }

  safeSetValue('input_317', formData.completerName); // Completer Name
  safeSetValue('input_318', formData.completerRelationship); // Relationship
  safeSetValue('input_319_addr_line1', formData.address1);
  safeSetValue('input_319_addr_line2', formData.address2);
  safeSetValue('input_319_city', formData.city);
  safeSetValue('input_319_state', formData.state);
  safeSetValue('input_319_postal', formData.zip);
  safeSetValue('input_319_country', formData.country);
  safeSetValue('input_320_full', formData.completerPhone);

  jobs.forEach((job, index) => {
    const baseId = index === 0 ? 199 : 200 + (index - 1) * 20 + 21;

    safeSetValue(`input_${baseId}`, job.jobTitle); // Job Title
    safeSetValue(`input_${baseId + 1}`, jobDetails[index].rateOfPay); // Rate of Pay

    // ✅ Pay Frequency (JotForm uses checkboxes w/ maxselection=1)
    const payFreq = jobDetails[index].payFrequency;
    ['Hour', 'Day', 'Week', 'Month', 'Year'].forEach((freq) => {
      const cb = document.querySelector(`input[name="q223_percheck223[]"][value="${freq}"]`);
      if (cb) cb.checked = false;
    });
    const selectedCheckbox = document.querySelector(`input[name="q223_percheck223[]"][value="${payFreq}"]`);
    if (selectedCheckbox) {
      selectedCheckbox.checked = true;
    } else {
      console.error(`Pay frequency checkbox for value "${payFreq}" not found`);
    }

    safeSetValue(`input_${baseId + 3}`, jobDetails[index].hoursPerDay);
    safeSetValue(`input_${baseId + 4}`, jobDetails[index].daysPerWeek);
    safeSetValue(`input_${baseId + 5}`, jobDetails[index].tasks);
    safeSetValue(`input_${baseId + 6}`, jobDetails[index].reports);
    safeSetValue(`input_${baseId + 7}`, jobDetails[index].supervisory);
    safeSetValue(`input_${baseId + 8}`, jobDetails[index].equipment);

    const interactionRadio = document.querySelector(
      `input[name="q${baseId + 9}_${jobDetails[index].interaction.toLowerCase()}"]`
    );
    if (interactionRadio) {
      interactionRadio.checked = true;
    } else {
      console.error(`Interaction radio for job ${index} not found`);
    }

    safeSetValue(`input_${baseId + 10}`, jobDetails[index].interactionDetails);
    safeSetValue(`input_${baseId + 11}`, jobDetails[index].physicalActivities.standingWalking);
    safeSetValue(`input_${baseId + 12}`, jobDetails[index].liftingDetails);

    const heaviestWeightRadio = document.querySelector(
      `input[name="q${baseId + 13}_${jobDetails[index].heaviestWeight.toLowerCase().replace(/\s/g, '')}"]`
    );
    if (heaviestWeightRadio) {
      heaviestWeightRadio.checked = true;
    } else {
      console.error(`Heaviest weight radio for job ${index} not found`);
    }

    const frequentWeightRadio = document.querySelector(
      `input[name="q${baseId + 14}_${jobDetails[index].frequentWeight.toLowerCase().replace(/\s/g, '')}"]`
    );
    if (frequentWeightRadio) {
      frequentWeightRadio.checked = true;
    } else {
      console.error(`Frequent weight radio for job ${index} not found`);
    }

    jobDetails[index].exposures.forEach((exposure) => {
      const exposureRadio = document.querySelector(
        `input[name="q${baseId + 15}_${exposure.toLowerCase().replace(/\s/g, '')}"]`
      );
      if (exposureRadio) {
        exposureRadio.checked = true;
      } else {
        console.error(`Exposure radio for ${exposure} in job ${index} not found`);
      }
    });

    safeSetValue(`input_${baseId + 16}`, jobDetails[index].exposureDetails);
    safeSetValue(`input_${baseId + 17}`, jobDetails[index].medicalImpact);
  });

  document.getElementById('241841575846062').submit(); // Submit JotForm
};


  // ... (rest of the state management functions remain unchanged)

  return (
    <div className={`min-h-screen p-6 ${isDarkTheme ? 'bg-dark-bg' : 'bg-light-bg'}`}>
      <style>{`
        :root {
          --bg-color: ${isDarkTheme ? '#07264e' : '#dee8f1'};
          --text-color: ${isDarkTheme ? '#f8fafc' : '#eaf5fa'};
          --primary-color: ${isDarkTheme ? '#c4ecfe' : '#0c3d63'};
          --secondary-color: ${isDarkTheme ? '#011933' : '#dff4fb'};
          --card-bg: ${isDarkTheme ? '#1e293b' : '#dee8f1'};
          --border-color: ${isDarkTheme ? '#334155' : '#334155'};
          --input-bg: ${isDarkTheme ? '#1e293b' : '#dee8f1'};
          --input-text: ${isDarkTheme ? '#f8fafc' : '#0c3d63'};
          --label-text: ${isDarkTheme ? '#c4ecfe' : '#0c3d63'};
          --error-bg: #7f1d1d;
          --error-text: #fecaca;
          --error-color: #f87171;
        }
        .bg-light-bg { background-color: var(--bg-color); }
        .bg-dark-bg { background-color: var(--bg-color); }
        .text-primary { color: var(--primary-color); }
        .bg-primary { background-color: var(--primary-color); }
        .bg-secondary { background-color: var(--secondary-color); }
        .bg-card { background-color: var(--card-bg); }
        .border-primary { border-color: var(--border-color); }
        .text-input { color: var(--input-text); }
        .bg-input { background-color: var(--input-bg); }
        .text-label { color: var(--label-text); }
        .text-error { color: var(--error-color); }
        .bg-error { background-color: var(--error-bg); }
      `}</style>
      <div className="max-w-5xl mx-auto bg-card shadow-2xl rounded-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">WORK HISTORY REPORT</h1>
          <button
            onClick={toggleTheme}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition"
          >
            {isDarkTheme ? 'Light Theme' : 'Dark Theme'}
          </button>
        </div>
        <p className="text-error mb-6 text-sm">
          Anyone who makes or causes to be made a false statement or representation
          of material fact for use in determining a payment under the Social
          Security Act, or knowingly conceals or fails to disclose an event with an
          intent to affect an initial or continued right to payment, commits a crime
          punishable under Federal law by fine, imprisonment, or both, and may be
          subject to administrative sanctions.
        </p>

        <form className="jotform-form" id="241841575846062" action="https://submit.jotform.com/submit/241841575846062" method="post" name="form_241841575846062" accept-charset="utf-8" autocomplete="on">
          <input type="hidden" name="formID" value="241841575846062" />
          <input type="hidden" id="JWTContainer" value="" />
          <input type="hidden" id="cardinalOrderNumber" value="" />
          <input type="hidden" id="jsExecutionTracker" name="jsExecutionTracker" value="build-date-1753978995819" />
          <input type="hidden" id="submitSource" name="submitSource" value="unknown" />
          <input type="hidden" id="submitDate" name="submitDate" value="05:49 PM PKT on Friday, August 01, 2025" />
          <input type="hidden" id="buildDate" name="buildDate" value="1753978995819" />
          <input type="hidden" name="uploadServerUrl" value="https://upload.jotform.com/upload" />
          <input type="hidden" name="eventObserver" value="1" />

          {/* Section 1: Information About You */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-label mb-4">SECTION 1 - INFORMATION ABOUT YOU</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-label">Name *</label>
                <input
                  type="text"
                  id="input_190"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3 focus:ring-primary focus:border-primary transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-label">Social Security Number *</label>
                <input
                  type="text"
                  id="input_326"
                  name="ssn"
                  value={formData.ssn}
                  onChange={handleFormChange}
                  className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3 focus:ring-primary focus:border-primary transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-label">Primary Phone Number *</label>
                <input
                  type="tel"
                  id="input_327_full"
                  name="primaryPhone"
                  value={formData.primaryPhone}
                  onChange={handleFormChange}
                  className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3 focus:ring-primary focus:border-primary transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-label">Secondary Phone Number</label>
                <input
                  type="tel"
                  id="input_328_full"
                  name="secondaryPhone"
                  value={formData.secondaryPhone}
                  onChange={handleFormChange}
                  className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3 focus:ring-primary focus:border-primary transition"
                />
              </div>
            </div>
          </section>

          {/* Section 2: Work History */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-label mb-4">SECTION 2 - WORK HISTORY</h2>
            <p className="text-sm text-input mb-4">
              List all the jobs you had in the 5 years before you became unable to work
              because of your medical conditions:
            </p>
            <div className="overflow-x-auto rounded-lg border border-primary">
              <table className="w-full">
                <thead>
                  <tr className="bg-secondary">
                    <th className="p-3 text-left text-sm font-medium text-label">Job Title</th>
                    <th className="p-3 text-left text-sm font-medium text-label">Type of Business</th>
                    <th className="p-3 text-left text-sm font-medium text-label">Dates Worked From (MM/YYYY)</th>
                    <th className="p-3 text-left text-sm font-medium text-label">Dates Worked To (MM/YYYY)</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job, index) => {
                    const baseId = index === 0 ? 199 : 200 + (index - 1) * 20 + 21;
                    return (
                      <tr key={index} className="border-t border-primary">
                        <td className="p-3">
                          <input
                            type="text"
                            id={`input_${baseId}`}
                            value={job.jobTitle}
                            onChange={(e) => handleJobChange(index, 'jobTitle', e.target.value)}
                            className="w-full bg-input text-input border border-primary rounded-md p-2"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            id={`input_${baseId + 1}`} // Adjust ID based on JotForm structure
                            value={job.businessType}
                            onChange={(e) => handleJobChange(index, 'businessType', e.target.value)}
                            className="w-full bg-input text-input border border-primary rounded-md p-2"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            id={`input_${baseId + 2}`} // Adjust ID
                            value={job.from}
                            onChange={(e) => handleJobChange(index, 'from', e.target.value)}
                            className="w-full bg-input text-input border border-primary rounded-md p-2"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            id={`input_${baseId + 3}`} // Adjust ID
                            value={job.to}
                            onChange={(e) => handleJobChange(index, 'to', e.target.value)}
                            className="w-full bg-input text-input border border-primary rounded-md p-2"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {jobs.length < 10 && (
              <button
                onClick={addJob}
                className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition"
              >
                Add Job
              </button>
            )}
          </section>

          {/* Job Details (Simplified for brevity, expand similarly) */}
          {jobs.map((job, index) => {
            const baseId = index === 0 ? 199 : 200 + (index - 1) * 20 + 21;
            return (
              <section key={index} className="mb-10">
                <h2 className="text-2xl font-semibold text-label mb-4">
                  Job No. {index + 1}: {job.jobTitle || 'Details'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-label">Rate of Pay</label>
                    <input
                      type="number"
                      id={`input_${baseId + 1}`}
                      value={jobDetails[index].rateOfPay}
                      onChange={(e) => handleJobDetailChange(index, 'rateOfPay', e.target.value)}
                      className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3"
                    />
                  </div>
                <div>
  <label className="block text-sm font-medium text-label mb-2">Pay Frequency</label>
  <div className="flex flex-wrap gap-4">
    {['Hour', 'Day', 'Week', 'Month', 'Year'].map((option) => (
      <label key={option} className="inline-flex items-center space-x-2">
        <input
          type="radio"
          name={`payFrequency_${index}`}
          value={option}
          checked={jobDetails[index].payFrequency === option}
          onChange={(e) =>
            handleJobDetailChange(index, 'payFrequency', e.target.value)
          }
          className="form-radio text-primary h-4 w-4"
        />
        <span>{option}</span>
      </label>
    ))}
  </div>
</div>


                  {/* Add other job details fields with appropriate IDs (e.g., input_206, input_207, etc.) */}
                </div>
              </section>
            );
          })}

          {/* Section 3: Remarks */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-label mb-4">SECTION 3 - REMARKS</h2>
            <textarea
              id="input_313"
              name="remarks"
              value={formData.remarks}
              onChange={handleFormChange}
              className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3"
              rows="6"
              maxLength="2000"
              placeholder="Provide any additional information..."
            ></textarea>
          </section>

          {/* Section 4: Who is Completing This Report */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-label mb-4">SECTION 4 - WHO IS COMPLETING THIS REPORT</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-label">Date Report Completed (MM/DD/YYYY) *</label>
                <input
                  type="text"
                  id="id_315"
                  name="completerDate"
                  value={formData.completerDate}
                  onChange={handleFormChange}
                  className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3"
                  placeholder="MM/DD/YYYY"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-label">Who is completing this report? *</label>
                <div className="flex space-x-4 mt-2">
                  <label className="flex items-center text-input">
                    <input
                      type="radio"
                      id="q316_self"
                      name="q316"
                      value="self"
                      checked={formData.completer === 'self'}
                      onChange={handleFormChange}
                      className="mr-2"
                      required
                    />
                    The person listed in 1.A.
                  </label>
                  <label className="flex items-center text-input">
                    <input
                      type="radio"
                      id="q316_other"
                      name="q316"
                      value="other"
                      checked={formData.completer === 'other'}
                      onChange={handleFormChange}
                      className="mr-2"
                    />
                    Someone else
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-label">Name *</label>
                <input
                  type="text"
                  id="input_317"
                  name="completerName"
                  value={formData.completerName}
                  onChange={handleFormChange}
                  className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-label">Relationship to the Person in 1.A. *</label>
                <input
                  type="text"
                  id="input_318"
                  name="completerRelationship"
                  value={formData.completerRelationship}
                  onChange={handleFormChange}
                  className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-label">Mailing Address *</label>
                <input
                  type="text"
                  id="input_319_addr_line1"
                  name="address1"
                  value={formData.address1}
                  onChange={handleFormChange}
                  className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3"
                  placeholder="Street Address"
                  required
                />
                <input
                  type="text"
                  id="input_319_addr_line2"
                  name="address2"
                  value={formData.address2}
                  onChange={handleFormChange}
                  className="mt-2 block w-full bg-input text-input border border-primary rounded-md p-3"
                  placeholder="Street Address Line 2"
                />
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <input
                    type="text"
                    id="input_319_city"
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                    className="block w-full bg-input text-input border border-primary rounded-md p-3"
                    placeholder="City"
                    required
                  />
                  <input
                    type="text"
                    id="input_319_state"
                    name="state"
                    value={formData.state}
                    onChange={handleFormChange}
                    className="block w-full bg-input text-input border border-primary rounded-md p-3"
                    placeholder="State / Province"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <input
                    type="text"
                    id="input_319_postal"
                    name="zip"
                    value={formData.zip}
                    onChange={handleFormChange}
                    className="block w-full bg-input text-input border border-primary rounded-md p-3"
                    placeholder="Postal / Zip Code"
                    required
                  />
                  <select
                    id="input_319_country"
                    name="country"
                    value={formData.country}
                    onChange={handleFormChange}
                    className="block w-full bg-input text-input border border-primary rounded-md p-3"
                    required
                  >
                    <option value="">Select Country</option>
                    {['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', /* ... */ 'Zimbabwe', 'Other'].map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-label">Daytime Phone Number *</label>
                <input
                  type="tel"
                  id="input_320_full"
                  name="completerPhone"
                  value={formData.completerPhone}
                  onChange={handleFormChange}
                  className="mt-1 block w-full bg-input text-input border border-primary rounded-md p-3"
                  required
                />
              </div>
            </div>
          </section>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button type="button" className="bg-secondary text-input px-6 py-3 rounded-md hover:bg-primary hover:text-white transition">
              Back
            </button>
            <div className="space-x-4">
              <button type="button" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-secondary hover:text-input transition">
                Preview PDF
              </button>
              <button type="submit" onClick={handleSubmit} className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkHistoryReport;