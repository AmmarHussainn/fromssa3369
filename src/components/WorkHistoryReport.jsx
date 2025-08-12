import React, { useState, useEffect } from 'react';
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskMode,
  TaskType,
  VoiceEmotion,
  STTProvider,
} from '@heygen/streaming-avatar';

const JobDetails = ({ jobIndex, formData, setFormData, isLastJob, onNext, onPrev, onAddJob }) => {
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? (checked ? value : '') : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // const handleActivityChange = (e, field) => {
  //   const { value } = e.target;
  //   const activitiesFieldName = fields[jobIndex].activities;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [activitiesFieldName]: {
  //       ...prev[activitiesFieldName],
  //       [field]: value,
  //     },
  //   }));
  // };


  const handleActivityChange = (e, fieldIndex) => {
  const { value } = e.target;
  const activitiesFieldName = fields[jobIndex].activities;
  setFormData((prev) => {
    const newActivities = [...(prev[activitiesFieldName] || [[''], [''], [''], [''], [''], [''], [''], ['']])];
    newActivities[fieldIndex][0] = value;
    return {
      ...prev,
      [activitiesFieldName]: newActivities,
    };
  });
};

  const handleCheckboxArrayChange = (e, fieldName) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const currentArray = prev[fieldName] || [];
      return {
        ...prev,
        [fieldName]: checked
          ? [...currentArray, value]
          : currentArray.filter((item) => item !== value),
      };
    });
  };

  const fields = {
    1: {
      title: 'q199_jobTitle',
      rate: 'q330_rateOf330',
      per: 'q331_percheck331',
      hours: 'q332_hoursPer332',
      days: 'q333_daysPer333',
      duties: 'q334_forThe334',
      admin: 'q335_ifAny335',
      supervise: 'q206_ifAny206',
      tools: 'q207_listThe',
      interact: 'q209_didThis',
      interactDetails: 'q208_listThe208',
      activities: 'q340_activities340',
      comments: 'q341_tellUs341',
      weights: 'q342_selectThe342',
      conditions: 'q344_didThis344',
      exposure: 'q345_ifOne345',
      exposureDetails: 'q346_explainHow346',
    },
    2: {
      title: 'q221_jobTitle221',
      rate: 'q222_rateOf222',
      per: 'q223_percheck223',
      hours: 'q224_hoursPer224',
      days: 'q225_daysPer225',
      duties: 'q226_forThe226',
      admin: 'q227_ifAny227',
      supervise: 'q228_ifAny228',
      tools: 'q229_listThe229',
      interact: 'q230_didThis230',
      interactDetails: 'q231_ifYes',
      activities: 'q233_activities233',
      comments: 'q236_tellUs236',
      weights: 'q237_selectThe237',
      conditions: 'q239_didThis239',
      exposure: 'q240_ifOne240',
      exposureDetails: 'q241_explainHow241',
    },
    3: {
      title: 'q243_jobTitle243',
      rate: 'q244_rateOf244',
      per: 'q245_percheck245',
      hours: 'q246_hoursPer246',
      days: 'q247_daysPer247',
      duties: 'q248_forThe248',
      admin: 'q249_ifAny249',
      supervise: 'q250_ifAny250',
      tools: 'q251_listThe251',
      interact: 'q252_didThis252',
      interactDetails: 'q253_ifYes253',
      activities: 'q255_activities255',
      comments: 'q258_tellUs258',
      weights: 'q259_selectThe259',
      conditions: 'q261_didThis261',
      exposure: 'q262_ifOne262',
      exposureDetails: 'q263_explainHow263',
    },
    4: {
      title: 'q265_jobTitle265',
      rate: 'q266_rateOf266',
      per: 'q267_percheck267',
      hours: 'q268_hoursPer268',
      days: 'q269_daysPer269',
      duties: 'q270_forThe270',
      admin: 'q271_ifAny271',
      supervise: 'q272_ifAny272',
      tools: 'q273_listThe273',
      interact: 'q274_didThis274',
      interactDetails: 'q275_ifYes275',
      activities: 'q277_activities277',
      comments: 'q280_tellUs280',
      weights: 'q281_selectThe281',
      conditions: 'q283_didThis283',
      exposure: 'q284_ifOne284',
      exposureDetails: 'q285_explainHow285',
    },
    5: {
      title: 'q287_jobTitle287',
      rate: 'q288_rateOf288',
      per: 'q289_percheck289',
      hours: 'q290_hoursPer290',
      days: 'q291_daysPer291',
      duties: 'q292_forThe292',
      admin: 'q293_ifAny293',
      supervise: 'q294_ifAny294',
      tools: 'q295_listThe295',
      interact: 'q296_didThis296',
      interactDetails: 'q297_ifYes297',
      activities: 'q299_activities299',
      comments: 'q302_tellUs302',
      weights: 'q303_selectThe303',
      conditions: 'q305_didThis305',
      exposure: 'q306_ifOne306',
      exposureDetails: 'q307_explainHow307',
    },
  };

  const activityLabels = {
    standing: 'Standing',
    sitting: 'Sitting',
    stooping: 'Stooping',
    kneeling: 'Kneeling',
    crouching: 'Crouching',
    crawling: 'Crawling',
    climbingStairs: 'Climbing Stairs',
    climbingLadders: 'Climbing Ladders',
  };

  return (
    <div className="form-section bg-[var(--card-bg)] p-6 rounded-lg h-[900px] shadow-md border border-[var(--border-color)] mb-6">
      <div className="section-header bg-[var(--section-header-bg)] text-[var(--text-color)] p-4 rounded-t-lg -mx-6 -mt-6 mb-6">
        <div className="flex items-center">
          <div className="bg-white text-[var(--primary-color)] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
            {jobIndex}
          </div>
          <h2 className="text-xl font-bold text-[var(--primary-color)]">Job {jobIndex} Details</h2>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              name={fields[jobIndex].title}
              value={formData[fields[jobIndex].title] || ''}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter job title"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Rate of Pay</label>
            <input
              type="text"
              name={fields[jobIndex].rate}
              value={formData[fields[jobIndex].rate] || ''}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter rate of pay"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="form-group">
            <label className="form-label">Pay Period</label>
            <select
              name={fields[jobIndex].per}
              value={formData[fields[jobIndex].per] || 'Hour'}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="Hour">Hour</option>
              <option value="Day">Day</option>
              <option value="Week">Week</option>
              <option value="Month">Month</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Hours per Day</label>
            <input
              type="number"
              name={fields[jobIndex].hours}
              value={formData[fields[jobIndex].hours] || ''}
              onChange={handleInputChange}
              className="form-input"
              placeholder="8"
              min="0"
              max="24"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Days per Week</label>
            <input
              type="number"
              name={fields[jobIndex].days}
              value={formData[fields[jobIndex].days] || ''}
              onChange={handleInputChange}
              className="form-input"
              placeholder="5"
              min="0"
              max="7"
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="form-group">
            <label className="form-label">Primary Job Duties</label>
            <textarea
              name={fields[jobIndex].duties}
              value={formData[fields[jobIndex].duties] || ''}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="Describe your main job responsibilities..."
              rows="4"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="form-label">Administrative Duties</label>
              <textarea
                name={fields[jobIndex].admin}
                value={formData[fields[jobIndex].admin] || ''}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Describe administrative duties, if any"
                rows="3"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Supervisory Duties</label>
              <textarea
                name={fields[jobIndex].supervise}
                value={formData[fields[jobIndex].supervise] || ''}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Describe supervisory duties, if any"
                rows="3"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Machines/Tools Used</label>
            <textarea
              name={fields[jobIndex].tools}
              value={formData[fields[jobIndex].tools] || ''}
              onChange={handleInputChange}
              className="form-textarea"
              placeholder="List machines, tools, or equipment used"
              rows="3"
            />
          </div>
          <div className="space-y-4">
            <div className="form-group">
              <label className="form-label">Customer Interaction</label>
              <select
                name={fields[jobIndex].interact}
                value={formData[fields[jobIndex].interact] || 'Yes'}
                onChange={handleInputChange}
                className="form-input"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {formData[fields[jobIndex].interact] === 'Yes' && (
              <div className="form-group">
                <label className="form-label">Interaction Details</label>
                <textarea
                  name={fields[jobIndex].interactDetails}
                  value={formData[fields[jobIndex].interactDetails] || ''}
                  onChange={handleInputChange}
                  className="form-textarea"
                  placeholder="Describe customer interaction"
                  rows="2"
                />
              </div>
            )}
          </div>
        </div>
        <div className="form-section bg-[var(--secondary-color)] p-6 rounded-lg">
          <h3 className="section-subheader text-[var(--primary-color)]">Physical Activities (Hours per Day)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* {Object.entries(activityLabels).map(([activity, label]) => (
              <div key={activity} className="form-group">
                <label className="form-label">{label}</label>
                <input
                  type="number"
                  value={formData[fields[jobIndex].activities]?.[activity] || ''}
                  onChange={(e) => handleActivityChange(e, activity)}
                  className="form-input"
                  placeholder="0"
                  min="0"
                  max="24"
                  step="0.5"
                />
              </div>
            ))} */}

            {Object.entries(activityLabels).map(([activity, label], index) => (
  <div key={activity} className="form-group">
    <label className="form-label">{label}</label>
    <input
      type="number"
      value={formData[fields[jobIndex].activities]?.[index]?.[0] || ''}
      onChange={(e) => handleActivityChange(e, index)}
      className="form-input"
      placeholder="0"
      min="0"
      max="24"
      step="0.5"
    />
  </div>
))}

          </div>
        </div>
        <div className="form-section bg-[var(--secondary-color)] p-6 text-[var(--primary-color)] rounded-lg">
          <h3 className="section-subheader text-[var(--primary-color)] ">Weights Lifted (Check all that apply)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3  !text-[var(--primary-color)]">
            {['Less than 1 lb.', 'Less than 10 lbs.', '20 lbs.', '50 lbs.', '100 lbs. or more', 'Other'].map((weight) => (
              <label key={weight} className="checkbox-label text-[var(--primary-color)] ">
                <input
                  type="checkbox"
                  value={weight}
                  checked={formData[fields[jobIndex].weights]?.includes(weight) || false}
                  onChange={(e) => handleCheckboxArrayChange(e, fields[jobIndex].weights)}
                  className="checkbox-input text-[var(--primary-color)]"
                />
                <span className="checkbox-text text-[var(--primary-color)]">{weight}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="form-section bg-[var(--secondary-color)] p-6 rounded-lg">
          <h3 className="section-subheader !text-[var(--primary-color)]">Environmental Conditions (Check all that apply)</h3>
          <div className="grid grid-cols-1 !text-[var(--primary-color)] md:grid-cols-2 lg:grid-cols-3 gap-3">
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
            ].map((condition) => (
              <label key={condition} className="checkbox-label text-[var(--primary-color)]">
                <input
                  type="checkbox"
                  value={condition}
                  checked={formData[fields[jobIndex].conditions]?.includes(condition) || false}
                  onChange={(e) => handleCheckboxArrayChange(e, fields[jobIndex].conditions)}
                  className="checkbox-input text-[var(--primary-color)] "
                />
                <span className="checkbox-text text-[var(--primary-color)]">{condition}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Exposure Frequency</label>
            <input
              type="text"
              name={fields[jobIndex].exposure}
              value={formData[fields[jobIndex].exposure] || ''}
              onChange={handleInputChange}
              className="form-input text-[var(--primary-color)]"
              placeholder="Describe exposure frequency"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Exposure Details</label>
            <textarea
              name={fields[jobIndex].exposureDetails}
              value={formData[fields[jobIndex].exposureDetails] || ''}
              onChange={handleInputChange}
              className="form-textarea text-[var(--primary-color)]"
              placeholder="Explain exposure details"
              rows="3"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label text-[var(--primary-color)]">Additional Comments</label>
          <textarea
            name={fields[jobIndex].comments}
            value={formData[fields[jobIndex].comments] || ''}
            onChange={handleInputChange}
            className="form-textarea"
            placeholder="Any additional comments about this job"
            rows="3"
          />
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onPrev}
          className="text-[var(--primary-color)] px-6 py-2 border rounded hover:bg-[var(--button-hover)] transition cursor-pointer"
        >
          Previous
        </button>
        <div className="flex gap-4">
          {isLastJob && (
            <button
              type="button"
              onClick={onAddJob}
              className="text-[var(--primary-color)] px-6 py-2 border rounded hover:bg-[var(--button-hover)] transition cursor-pointer"
            >
              + Add Another Job
            </button>
          )}
          <button
            type="button"
            onClick={onNext}
            className="text-[var(--primary-color)] px-6 py-2 border rounded hover:bg-[var(--button-hover)] transition cursor-pointer"
          >
            {isLastJob ? 'Next Section' : 'Next Job'}
          </button>
        </div>
      </div>
    </div>
  );
};

const PersonalInfoSection = ({ formData, setFormData, onNext }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleJobChange = (index, fieldIndex, value) => {
    const newJobs = [...formData.q197_jobs];
    newJobs[index][fieldIndex] = value;
    setFormData((prev) => ({
      ...prev,
      q197_jobs: newJobs,
    }));
  };

  return (
    <div className="form-section bg-[var(--card-bg)] p-6 rounded-lg shadow-md border border-[var(--border-color)] mb-6">
      <div className="section-header bg-[var(--section-header-bg)] text-[var(--text-color)] p-4 rounded-t-lg -mx-6 -mt-6 mb-6">
        <div className="flex items-center">
          <div className="bg-[var(--card-bg)] text-[var(--primary-color)] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
            1
          </div>
          <h2 className="text-xl font-bold text-[var(--primary-color)]">Personal Information</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="form-group">
          <label className="form-label">Full Name *</label>
          <input
            type="text"
            name="q190_name"
            value={formData.q190_name}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Social Security Number</label>
          <input
            type="text"
            name="q326_socialSecurity"
            value={formData.q326_socialSecurity}
            onChange={handleInputChange}
            className="form-input"
            placeholder="XXX-XX-XXXX"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Primary Phone *</label>
          <input
            type="tel"
            name="q327_primary327"
            value={formData.q327_primary327}
            onChange={handleInputChange}
            className="form-input"
            placeholder="(XXX) XXX-XXXX"
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Secondary Phone</label>
          <input
            type="tel"
            name="q328_secondaryif328"
            value={formData.q328_secondaryif328}
            onChange={handleInputChange}
            className="form-input"
            placeholder="(XXX) XXX-XXXX"
          />
        </div>
        <div className="mt-8">
          <div className="section-header bg-[var(--section-header-bg)] text-[var(--text-color)] p-4 rounded-t-lg -mx-6 mb-4">
            <h3 className="text-lg font-semibold text-[var(--primary-color)]">Job History Summary</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[var(--table-header-bg)] text-[var(--primary-color)]">
                  <th className="p-3 text-left border border-[var(--border-primary)] text-[var(--primary-color)]">Job Title</th>
                  <th className="p-3 text-left border border-[var(--border-primary)] text-[var(--primary-color)]">Company</th>
                  <th className="p-3 text-left border border-[var(--border-primary)] text-[var(--primary-color)]">Start Date</th>
                  <th className="p-3 text-left border border-[var(--border-primary)] text-[var(--primary-color)]">End Date</th>
                </tr>
              </thead>
              <tbody>
                {formData.q197_jobs.map((job, index) => (
                  <tr key={index} className="hover:bg-[var(--table-row-hover)]">
                    <td className="p-2 border border-[var(--border-color)] text-[var(--primary-color)]">
                      <input
                        type="text"
                        value={job[0] || ''}
                        name={`q197_jobs[${index}][0]`}
                        onChange={(e) => handleJobChange(index, 0, e.target.value)}
                        className="w-full p-2 bg-transparent  text-[var(--primary-color)]focus:outline-none"
                        placeholder="Enter title"
                      />
                    </td>
                    <td className="p-2 border border-[var(--border-color)]">
                      <input
                        type="text"
                        value={job[1] || ''}
                        name={`q197_jobs[${index}][1]`}
                        onChange={(e) => handleJobChange(index, 1, e.target.value)}
                        className="w-full p-2 bg-transparent text-[var(--primary-color)] focus:outline-none"
                        placeholder="Enter company"
                      />
                    </td>
                    <td className="p-2 border border-[var(--border-color)] text-[var(--primary-color)]">
                      <input
                        type="text"
                        value={job[2] || ''}
                        name={`q197_jobs[${index}][2]`}
                        onChange={(e) => handleJobChange(index, 2, e.target.value)}
                        className="w-full p-2 bg-transparent  text-[var(--primary-color)] focus:outline-none"
                        placeholder="MM/YYYY"
                      />
                    </td>
                    <td className="p-2 border text-[var(--primary-color)] border-[var(--border-color)]">
                      <input
                        type="text"
                        name={`q197_jobs[${index}][3]`}
                        value={job[3] || ''}
                        onChange={(e) => handleJobChange(index, 3, e.target.value)}
                        className="w-full p-2 bg-transparent text-[var(--primary-color)] focus:outline-none"
                        placeholder="MM/YYYY"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-8">
        <button
          type="button"
          onClick={onNext}
          className="text-[var(--primary-color)] px-6 py-2 border rounded hover:bg-[var(--button-hover)] transition cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const RemarksSection = ({ formData, setFormData, onNext, onPrev }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="form-section bg-[var(--card-bg)] p-6 rounded-lg shadow-md border border-[var(--border-color)] mb-6">
      <div className="section-header bg-[var(--section-header-bg)] text-[var(--text-color)] p-4 rounded-t-lg -mx-6 -mt-6 mb-6">
        <div className="flex items-center">
          <div className="bg-white text-[var(--primary-color)] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
            📝
          </div>
          <h2 className="text-xl font-bold text-[var(--primary-color)]">Additional Remarks</h2>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Additional Remarks</label>
        <textarea
          name="q313_typeA"
          value={formData.q313_typeA}
          onChange={handleInputChange}
          className="form-textarea"
          placeholder="Enter any additional remarks or information..."
          rows="6"
        />
      </div>
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onPrev}
          className="text-[var(--primary-color)] px-6 py-2 border rounded hover:bg-[var(--button-hover)] transition cursor-pointer"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          className="text-[var(--primary-color)] px-6 py-2 border rounded hover:bg-[var(--button-hover)] transition cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

const CompletionSection = ({ formData, setFormData, onSubmit, onPrev }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddressChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      q319_mailingAddress: {
        ...prev.q319_mailingAddress,
        [field]: value,
      },
    }));
  };

  return (
    <div className="form-section bg-[var(--card-bg)] p-6 rounded-lg shadow-md border border-[var(--border-color)] mb-6">
      <div className="section-header bg-[var(--section-header-bg)] text-[var(--text-color)] p-4 rounded-t-lg -mx-6 -mt-6 mb-6">
        <div className="flex items-center">
          <div className="bg-white text-[var(--primary-color)] rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
            👤
          </div>
          <h2 className="text-xl font-bold">Report Completion Information</h2>
        </div>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Date of Report</label>
            <input
              type="text"
              name="q315_dateReport"
              value={formData.q315_dateReport}
              onChange={handleInputChange}
              className="form-input"
              placeholder="MM/DD/YYYY"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Who is Completing</label>
            <select
              name="q316_whoIs"
              value={formData.q316_whoIs}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="Myself">Myself</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              name="q317_name317"
              value={formData.q317_name317}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter name"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Relationship</label>
            <input
              type="text"
              name="q318_name318"
              value={formData.q318_name318}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Enter relationship"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Mailing Address</label>
          <div className="space-y-3">
            <input
              type="text"
              value={formData.q319_mailingAddress.addr_line1}
              onChange={(e) => handleAddressChange('addr_line1', e.target.value)}
              className="form-input"
              placeholder="Address Line 1"
            />
            <input
              type="text"
              value={formData.q319_mailingAddress.addr_line2}
              onChange={(e) => handleAddressChange('addr_line2', e.target.value)}
              className="form-input"
              placeholder="Address Line 2"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                value={formData.q319_mailingAddress.city}
                onChange={(e) => handleAddressChange('city', e.target.value)}
                className="form-input"
                placeholder="City"
              />
              <input
                type="text"
                value={formData.q319_mailingAddress.state}
                onChange={(e) => handleAddressChange('state', e.target.value)}
                className="form-input"
                placeholder="State"
              />
              <input
                type="text"
                value={formData.q319_mailingAddress.postal}
                onChange={(e) => handleAddressChange('postal', e.target.value)}
                className="form-input"
                placeholder="Postal Code"
              />
            </div>
            <input
              type="text"
              value={formData.q319_mailingAddress.country}
              onChange={(e) => handleAddressChange('country', e.target.value)}
              className="form-input"
              placeholder="Country"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Daytime Phone</label>
          <input
            type="tel"
            name="q320_daytimePhone"
            value={formData.q320_daytimePhone}
            onChange={handleInputChange}
            className="form-input"
            placeholder="(XXX) XXX-XXXX"
          />
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button
          type="button"
          onClick={onPrev}
          className="text-[var(--primary-color)] px-6 py-2 border rounded hover:bg-[var(--button-hover)] transition cursor-pointer"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="text-[var(--primary-color)] px-6 py-2 border rounded hover:bg-[var(--button-hover)] transition cursor-pointer"
        >
          Submit Form
        </button>
      </div>
    </div>
  );
};

const WorkHistoryReport = ({ avatarRef }) => {
  const [currentSection, setCurrentSection] = useState('personal');
  const [currentJobIndex, setCurrentJobIndex] = useState(1);
  const [totalJobs, setTotalJobs] = useState(1);
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('workHistoryFormData');
    const savedTimestamp = localStorage.getItem('workHistoryFormTimestamp');
    const now = new Date().getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (savedData && savedTimestamp && now - savedTimestamp < twentyFourHours) {
      return JSON.parse(savedData);
    } else {
      localStorage.removeItem('workHistoryFormData');
      localStorage.removeItem('workHistoryFormTimestamp');
      return {
        q190_name: '',
        q326_socialSecurity: '',
        q327_primary327: '',
        q328_secondaryif328: '',
        q197_jobs: [
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
          ['', '', '', ''],
        ],
        q199_jobTitle: '',
        q330_rateOf330: '',
        q331_percheck331: 'Hour',
        q332_hoursPer332: '',
        q333_daysPer333: '',
        q334_forThe334: '',
        q335_ifAny335: '',
        q206_ifAny206: '',
        q207_listThe: '',
        q209_didThis: 'Yes',
        q208_listThe208: '',
        // q340_activities340: {
        //   standing: '',
        //   sitting: '',
        //   stooping: '',
        //   kneeling: '',
        //   crouching: '',
        //   crawling: '',
        //   climbingStairs: '',
        //   climbingLadders: '',
        // },

        q340_activities340: [
          
      [''], // Standing and walking
      [''], // Sitting
      [''], // Stooping
      [''], // Kneeling
      [''], // Crouching
      [''], // Crawling
      [''], // Climbing stairs
      [''], // Climbing ladders

    

        ],
        q341_tellUs341: '',
        q342_selectThe342: [],
        q344_didThis344: [],
        q345_ifOne345: '',
        q346_explainHow346: '',
        q221_jobTitle221: '',
        q222_rateOf222: '',
        q223_percheck223: 'Hour',
        q224_hoursPer224: '',
        q225_daysPer225: '',
        q226_forThe226: '',
        q227_ifAny227: '',
        q228_ifAny228: '',
        q229_listThe229: '',
        q230_didThis230: 'Yes',
        q231_ifYes: '',
        q233_activities233: [
          
      [''], // Standing and walking
      [''], // Sitting
      [''], // Stooping
      [''], // Kneeling
      [''], // Crouching
      [''], // Crawling
      [''], // Climbing stairs
      [''], // Climbing ladders

    

        ],
        q236_tellUs236: '',
        q237_selectThe237: [],
        q239_didThis239: [],
        q240_ifOne240: '',
        q241_explainHow241: '',
        q243_jobTitle243: '',
        q244_rateOf244: '',
        q245_percheck245: 'Hour',
        q246_hoursPer246: '',
        q247_daysPer247: '',
        q248_forThe248: '',
        q249_ifAny249: '',
        q250_ifAny250: '',
        q251_listThe251: '',
        q252_didThis252: 'Yes',
        q253_ifYes253: '',
        q255_activities255: {
          standing: '',
          sitting: '',
          stooping: '',
          kneeling: '',
          crouching: '',
          crawling: '',
          climbingStairs: '',
          climbingLadders: '',
        },
        q258_tellUs258: '',
        q259_selectThe259: [],
        q261_didThis261: [],
        q262_ifOne262: '',
        q263_explainHow263: '',
        q265_jobTitle265: '',
        q266_rateOf266: '',
        q267_percheck267: 'Hour',
        q268_hoursPer268: '',
        q269_daysPer269: '',
        q270_forThe270: '',
        q271_ifAny271: '',
        q272_ifAny272: '',
        q273_listThe273: '',
        q274_didThis274: 'Yes',
        q275_ifYes275: '',
        q277_activities277: [
          
      [''], // Standing and walking
      [''], // Sitting
      [''], // Stooping
      [''], // Kneeling
      [''], // Crouching
      [''], // Crawling
      [''], // Climbing stairs
      [''], // Climbing ladders

    

        ],
        q280_tellUs280: '',
        q281_selectThe281: [],
        q283_didThis283: [],
        q284_ifOne284: '',
        q285_explainHow285: '',
        q287_jobTitle287: '',
        q288_rateOf288: '',
        q289_percheck289: 'Hour',
        q290_hoursPer290: '',
        q291_daysPer291: '',
        q292_forThe292: '',
        q293_ifAny293: '',
        q294_ifAny294: '',
        q295_listThe295: '',
        q296_didThis296: 'Yes',
        q297_ifYes297: '',
        q299_activities299: [
          
      [''], // Standing and walking
      [''], // Sitting
      [''], // Stooping
      [''], // Kneeling
      [''], // Crouching
      [''], // Crawling
      [''], // Climbing stairs
      [''], // Climbing ladders

    

        ],
        q302_tellUs302: '',
        q303_selectThe303: [],
        q305_didThis305: [],
        q306_ifOne306: '',
        q307_explainHow307: '',
        q313_typeA: '',
        q315_dateReport: new Date().toLocaleDateString('en-US'),
        q316_whoIs: 'Myself',
        q317_name317: '',
        q318_name318: '',
        q319_mailingAddress: {
          addr_line1: '',
          addr_line2: '',
          city: '',
          state: '',
          postal: '',
          country: '',
        },
        q320_daytimePhone: '',
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('workHistoryFormData', JSON.stringify(formData));
    localStorage.setItem('workHistoryFormTimestamp', new Date().getTime());
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key.includes('activities')) {
        Object.entries(formData[key]).forEach(([activity, value]) => {
          submissionData.append(`${key}[${activity}]`, value);
        });
      } else if (key === 'q319_mailingAddress') {
        Object.entries(formData[key]).forEach(([subKey, value]) => {
          submissionData.append(`q319_mailingAddress[${subKey}]`, value);
        });
      } else if (key === 'q197_jobs') {
        formData[key].forEach((row, rowIndex) => {
          row.forEach((value, colIndex) => {
            submissionData.append(`q197_jobs[${rowIndex}][${colIndex}]`, value);
          });
        });
        submissionData.append('q197_jobs[colIds]', JSON.stringify(['0', '1', '2', '3']));
        submissionData.append('q197_jobs[rowIds]', JSON.stringify(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']));
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          submissionData.append(`${key}[${index}]`, item);
        });
      } else {
        submissionData.append(key, formData[key]);
      }
    });
    try {
      const response = await fetch('https://submit.jotform.com/submit/241841575846062', {
        method: 'POST',
        body: submissionData,
        headers: {
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        alert('Form submitted successfully! 🎉');
        localStorage.removeItem('workHistoryFormData');
        localStorage.removeItem('workHistoryFormTimestamp');
      } else {
        alert('Error submitting form. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while submitting the form.');
    }
  };

  const speak = async (message) => {
    if (avatarRef.current) {
      try {
        await avatarRef.current.speak({
          text: message,
          taskType: TaskType.TALK,
          taskMode: TaskMode.SYNC,
        });
      } catch (error) {
        console.error('Error speaking:', error);
      }
    }
  };

  const nextSection = async () => {
    const sections = ['personal', 'job1', 'job2', 'job3', 'job4', 'job5', 'remarks', 'completion'];
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      await speak("Moving to the next section. Please continue providing your work history details.");
      setCurrentSection(sections[currentIndex + 1]);
    }
  };

  const prevSection = async () => {
    const sections = ['personal', 'job1', 'job2', 'job3', 'job4', 'job5', 'remarks', 'completion'];
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex > 0) {
      await speak("Going back to the previous section. Let me know if you need to correct anything.");
      setCurrentSection(sections[currentIndex - 1]);
    }
  };

  const nextJob = async () => {
    if (currentJobIndex < totalJobs) {
      await speak(`Now let's move to Job ${currentJobIndex + 1} details.`);
      setCurrentJobIndex(currentJobIndex + 1);
      setCurrentSection(`job${currentJobIndex + 1}`);
    } else {
      await speak("Let's proceed to the additional remarks section.");
      setCurrentSection('remarks');
    }
  };

  const prevJob = async () => {
    if (currentJobIndex > 1) {
      await speak(`Returning to Job ${currentJobIndex - 1} details.`);
      setCurrentJobIndex(currentJobIndex - 1);
      setCurrentSection(`job${currentJobIndex - 1}`);
    } else {
      await speak("Returning to personal information section.");
      setCurrentSection('personal');
    }
  };

  const addJob = async () => {
    if (totalJobs < 5) {
      await speak(`Adding Job ${totalJobs + 1} to your work history.`);
      setTotalJobs(totalJobs + 1);
      setCurrentJobIndex(totalJobs + 1);
      setCurrentSection(`job${totalJobs + 1}`);
    }
  };

  return (
    <div className="text-[var(--text-color)] h-[900px] overflow-y-auto">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl text-[var(--primary-color)] md:text-5xl font-bold mb-4">
            Work History Report
          </h1>
          <p className="text-lg max-w-2xl text-[var(--primary-color)] mx-auto">
            Please fill out this comprehensive work history form with accurate information about your employment history.
          </p>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2 text-[var(--primary-color)]">
            {['Personal', 'Job 1', 'Job 2', 'Job 3', 'Job 4', 'Job 5', 'Remarks', 'Completion'].map((label, index) => {
              const sectionKey = index === 0 ? 'personal' :
                index < 6 ? `job${index}` :
                  index === 6 ? 'remarks' : 'completion';
              const isActive = currentSection === sectionKey;
              const isCompleted = (
                (sectionKey === 'personal' && currentSection !== 'personal') ||
                (sectionKey.startsWith('job') && parseInt(sectionKey.replace('job', '')) < currentJobIndex ||
                  (sectionKey === 'remarks' && currentSection === 'completion'))
              );
              return (
                <React.Fragment key={sectionKey}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                        ${isActive ? 'bg-[var(--primary-color)] text-[var(--secondary-color)]' :
                          isCompleted ? 'bg-green-500 text-[var(--secondary-color)]' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-xs mt-1 text-center">{label}</span>
                  </div>
                  {index < 7 && (
                    <div className={`flex-1 h-1 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        {currentSection === 'personal' && (
          <PersonalInfoSection
            formData={formData}
            setFormData={setFormData}
            onNext={() => {
              setCurrentSection('job1');
              setCurrentJobIndex(1);
            }}
          />
        )}
        {currentSection.startsWith('job') && (
          <JobDetails
            jobIndex={parseInt(currentSection.replace('job', ''))}
            formData={formData}
            setFormData={setFormData}
            isLastJob={currentJobIndex === totalJobs}
            onNext={nextJob}
            onPrev={prevJob}
            onAddJob={addJob}
          />
        )}
        {currentSection === 'remarks' && (
          <RemarksSection
            formData={formData}
            setFormData={setFormData}
            onNext={() => setCurrentSection('completion')}
            onPrev={() => {
              setCurrentSection(`job${totalJobs}`);
              setCurrentJobIndex(totalJobs);
            }}
          />
        )}
        {currentSection === 'completion' && (
          <CompletionSection
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            onPrev={() => setCurrentSection('remarks')}
          />
        )}
      </div>
      <style jsx>{`
        .form-section {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .section-header {
          background-color: var(--section-header-bg);
          color: var(--text-color);
          padding: 1rem;
          border-radius: 0.5rem 0.5rem 0 0;
          margin: -1.5rem -1.5rem 1.5rem -1.5rem;
        }
        .section-number {
          background-color: white;
          color: var(--primary-color);
          border-radius: 9999px;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 0.75rem;
        }
        .section-title {
          font-size: 1.25rem;
          font-weight: bold;
        }
        .form-group {
          margin-bottom: 1rem;
        }
        .form-label {
          display: block;
          color: var(--label-text);
          font-weight: 600;
          margin-bottom: 0.5rem;
          font-size: 0.875rem;
        }
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: var(--input-bg);
          color: var(--input-text);
          border: 1px solid var(--border-color);
          border-radius: 0.375rem;
          transition: all 0.2s;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px var(--primary-color);
        }
        .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          background-color: var(--input-bg);
          color: var(--input-text);
          border: 1px solid var(--border-color);
          border-radius: 0.375rem;
          transition: all 0.2s;
          resize: vertical;
        }
        .form-textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 0 2px var(--primary-color);
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          padding: 0.75rem;
          background-color: var(--input-bg);
          border: 1px solid var(--border-color);
          border-radius: 0.375rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .checkbox-label:hover {
          border-color: var(--primary-color);
        }
        .checkbox-input {
          margin-right: 0.75rem;
          accent-color: var(--primary-color);
        }
        .checkbox-text {
          font-size: 0.875rem;
          
        }
      `}</style>
    </div>
  );
};

export default WorkHistoryReport;
