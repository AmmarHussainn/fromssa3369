import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskMode,
  TaskType,
  VoiceEmotion,
  STTProvider,
} from '@heygen/streaming-avatar';
import {
  Mic,
  MicOff,
  MessageSquare,
  Send,
  Trash2,
  Volume2,
  VolumeX,
  Loader2,
  Play,
  User,
  Bot,
  AlertTriangle,
  X,
  ArrowDown,
  ToggleLeft,
  Pause,
  ToggleRight,
  Plus,
} from 'lucide-react';
import axios from 'axios';

const lightTheme = {
  '--bg-color': '#dee8f1',
  '--text-color': '#eaf5fa',
  '--primary-color': '#0c3d63',
  '--secondary-color': '#dff4fb',
  '--card-bg': '#dee8f1',
  '--border-color': '#334155',
  '--input-bg': '#dee8f1',
  '--input-text': '#0c3d63',
  '--label-text': '#0c3d63',
  '--chat-user-bg': '#0a79c4',
  '--chat-user-text': '#eaf5fa',
  '--chat-avatar-bg': '#0a79c4',
  '--chat-avatar-text': '#eaf5fa',
  '--error-bg': '#7f1d1d',
  '--error-text': '#fecaca',
  '--error-color': '#f87171',
};

const darkTheme = {
  '--bg-color': '#07264e',
  '--text-color': '#f8fafc',
  '--primary-color': '#c4ecfe',
  '--secondary-color': '#011933',
  '--card-bg': '#1e293b',
  '--border-color': '#334155',
  '--input-bg': '#1e293b',
  '--input-text': '#f8fafc',
  '--label-text': '#c4ecfe',
  '--chat-user-bg': '#c4ecfe',
  '--chat-user-text': '#07264e',
  '--chat-avatar-bg': '#c4ecfe',
  '--chat-avatar-text': '#07264e',
  '--error-bg': '#7f1d1d',
  '--error-text': '#fecaca',
  '--error-color': '#f87171',
};

const INACTIVITY_TIMEOUT = 300000;
const PROMPT_DURATION = 60000;

const MultiStepForm = ({ toggleForm, setToggleForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    ssn: '',
    primaryPhone: '',
    secondaryPhone: '',
    jobs: [
      {
        jobTitle: '',
        rateOfPay: '',
        payPeriod: '',
        hoursPerDay: '',
        daysPerWeek: '',
        tasksDescription: '',
        reportTasks: '',
        supervisoryDuties: '',
        equipmentUsed: '',
        interactionRequired: false,
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
          fingerUseOneHand: '',
          fingerUseBothHands: '',
          handUseOneHand: '',
          handUseBothHands: '',
          reachShoulderOneArm: '',
          reachShoulderBothArms: '',
          reachOverheadOneArm: '',
          reachOverheadBothArms: '',
        },
        liftingDetails: '',
        heaviestWeight: '',
        frequentWeight: '',
        exposures: [],
        exposureDetails: '',
        medicalImpact: '',
      },
    ],
    additionalInfo: '',
    reportDate: new Date().toLocaleDateString('en-US'),
    completedBy: 'applicant',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const handleChange = (field, value, index = null) => {
    if (index !== null) {
      setFormData((prev) => ({
        ...prev,
        jobs: prev.jobs.map((job, i) =>
          i === index ? { ...job, [field]: value } : job
        ),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handlePhysicalActivityChange = (field, value, index) => {
    setFormData((prev) => ({
      ...prev,
      jobs: prev.jobs.map((job, i) =>
        i === index
          ? {
              ...job,
              physicalActivities: {
                ...job.physicalActivities,
                [field]: value,
              },
            }
          : job
      ),
    }));
  };

  const handleExposureChange = (exposure, checked, index) => {
    setFormData((prev) => {
      const newJobs = [...prev.jobs];
      if (checked) {
        newJobs[index].exposures = [...newJobs[index].exposures, exposure];
      } else {
        newJobs[index].exposures = newJobs[index].exposures.filter(
          (e) => e !== exposure
        );
      }
      return { ...prev, jobs: newJobs };
    });
  };

  const addJob = () => {
    if (formData.jobs.length < 5) {
      setFormData((prev) => ({
        ...prev,
        jobs: [
          ...prev.jobs,
          {
            jobTitle: '',
            rateOfPay: '',
            payPeriod: '',
            hoursPerDay: '',
            daysPerWeek: '',
            tasksDescription: '',
            reportTasks: '',
            supervisoryDuties: '',
            equipmentUsed: '',
            interactionRequired: false,
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
              fingerUseOneHand: '',
              fingerUseBothHands: '',
              handUseOneHand: '',
              handUseBothHands: '',
              reachShoulderOneArm: '',
              reachShoulderBothArms: '',
              reachOverheadOneArm: '',
              reachOverheadBothArms: '',
            },
            liftingDetails: '',
            heaviestWeight: '',
            frequentWeight: '',
            exposures: [],
            exposureDetails: '',
            medicalImpact: '',
          },
        ],
      }));
    }
  };

  const removeJob = (index) => {
    setFormData((prev) => ({
      ...prev,
      jobs: prev.jobs.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.ssn.trim() || !/^\d{3}-\d{2}-\d{4}$/.test(formData.ssn))
      newErrors.ssn = 'Valid SSN is required (XXX-XX-XXXX)';
    if (!formData.primaryPhone.trim())
      newErrors.primaryPhone = 'Primary phone is required';

    formData.jobs.forEach((job, index) => {
      if (!job.jobTitle.trim())
        newErrors[`jobTitle-${index}`] = 'Job title is required';
      if (!job.hoursPerDay.trim())
        newErrors[`hoursPerDay-${index}`] = 'Hours per day is required';
      if (!job.daysPerWeek.trim())
        newErrors[`daysPerWeek-${index}`] = 'Days per week is required';
      if (!job.tasksDescription.trim())
        newErrors[`tasksDescription-${index}`] = 'Tasks description is required';
      if (job.interactionRequired && !job.interactionDetails.trim())
        newErrors[`interactionDetails-${index}`] =
          'Interaction details required when interaction is checked';
      if (job.exposures.length > 0 && !job.exposureDetails.trim())
        newErrors[`exposureDetails-${index}`] =
          'Exposure details required when exposures are selected';
      if (!job.medicalImpact.trim())
        newErrors[`medicalImpact-${index}`] = 'Medical impact is required';
    });

    if (!formData.reportDate.trim())
      newErrors.reportDate = 'Report date is required';
    if (!formData.completedBy.trim())
      newErrors.completedBy = 'Please specify who is completing this report';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const submissionData = {
        submission: {
          '3': formData.name,
          '4': formData.ssn,
          '5': formData.primaryPhone,
          '6': formData.secondaryPhone,
          '7': formData.jobs[0]?.jobTitle || '',
          '8': formData.jobs[0]?.rateOfPay || '',
          '9': formData.jobs[0]?.payPeriod || '',
          '10': formData.jobs[0]?.hoursPerDay || '',
          '11': formData.jobs[0]?.daysPerWeek || '',
          '12': formData.jobs[0]?.tasksDescription || '',
          '13': formData.jobs[0]?.reportTasks || '',
          '14': formData.jobs[0]?.supervisoryDuties || '',
          '15': formData.jobs[0]?.equipmentUsed || '',
          '16': formData.jobs[0]?.interactionRequired ? 'Yes' : 'No',
          '17': formData.jobs[0]?.interactionDetails || '',
          '18': formData.jobs[0]?.physicalActivities.standingWalking || '',
          '19': formData.jobs[0]?.physicalActivities.sitting || '',
          '20': formData.jobs[0]?.physicalActivities.stooping || '',
          '21': formData.jobs[0]?.physicalActivities.kneeling || '',
          '22': formData.jobs[0]?.physicalActivities.crouching || '',
          '23': formData.jobs[0]?.physicalActivities.crawling || '',
          '24': formData.jobs[0]?.physicalActivities.climbingStairs || '',
          '25': formData.jobs[0]?.physicalActivities.climbingLadders || '',
          '26': formData.jobs[0]?.physicalActivities.fingerUseOneHand || '',
          '27': formData.jobs[0]?.physicalActivities.fingerUseBothHands || '',
          '28': formData.jobs[0]?.physicalActivities.handUseOneHand || '',
          '29': formData.jobs[0]?.physicalActivities.handUseBothHands || '',
          '30': formData.jobs[0]?.physicalActivities.reachShoulderOneArm || '',
          '31': formData.jobs[0]?.physicalActivities.reachShoulderBothArms || '',
          '32': formData.jobs[0]?.physicalActivities.reachOverheadOneArm || '',
          '33': formData.jobs[0]?.physicalActivities.reachOverheadBothArms || '',
          '34': formData.jobs[0]?.liftingDetails || '',
          '35': formData.jobs[0]?.heaviestWeight || '',
          '36': formData.jobs[0]?.frequentWeight || '',
          '37': formData.jobs[0]?.exposures.join(', ') || '',
          '38': formData.jobs[0]?.exposureDetails || '',
          '39': formData.jobs[0]?.medicalImpact || '',
          '40': formData.additionalInfo || '',
          '41': formData.reportDate,
          '42': formData.completedBy,
        },
      };

      const response = await axios.post(
        'https://submit.jotform.com/submit/241841575846062',
        submissionData,
        {
          headers: {
            APIKEY: '07c05b71d9b676d89fe92feaa1b77979',
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.responseCode === 200) {
        setSubmissionSuccess(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({ submit: 'Failed to submit form. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const weightOptions = [
    'None',
    'Up to 10 lbs',
    'Up to 20 lbs',
    'Up to 50 lbs',
    'Up to 100 lbs',
    'Over 100 lbs',
  ];

  const exposureOptions = [
    'Noise',
    'Fumes',
    'Dust',
    'Chemicals',
    'Toxic conditions',
    'Extreme temperatures',
    'Humidity',
    'Vibration',
    'Other',
  ];

  return (
    <div className="bg-[var(--card-bg)] rounded-xl shadow-md h-full flex flex-col overflow-hidden border border-[var(--border-color)]">
      <div className="border-b-[0.2px] border-[var(--border-color)] text-[var(--label-text)] px-4 py-3 flex justify-between items-center">
        <h2 className="font-semibold flex items-center gap-2">
          <User size={20} />
          Work History Report
        </h2>
        <div className="flex items-center gap-2">
          Chat
          <button
            onClick={() => setToggleForm(!toggleForm)}
            className="text-[var(--label-text)]"
          >
            <ToggleRight />
          </button>
          Form
        </div>
      </div>
      <div className="flex-1 p-6 overflow-y-auto bg-[var(--card-bg)]">
        {submissionSuccess ? (
          <div className="text-center py-8">
            <div className="text-green-500 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-[var(--primary-color)] mb-2">
              Thank You!
            </h3>
            <p className="text-[var(--input-text)]">
              Your work history report has been submitted successfully.
            </p>
            <button
              onClick={() => setSubmissionSuccess(false)}
              className="mt-6 px-6 py-2 bg-[var(--primary-color)] text-[var(--bg-color)] rounded-md hover:bg-blue-700"
            >
              Submit Another
            </button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <section>
              <h3 className="text-lg font-medium text-[var(--label-text)] mb-3 border-b pb-2">
                SECTION 1 - INFORMATION ABOUT YOU
              </h3>
              <p className="text-sm text-[var(--input-text)] mb-4">
                When a question refers to "you" or "your," it refers to the person
                who is applying for disability benefits. If you are completing this
                report for someone else, provide information about them.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                    NAME *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                      errors.name
                        ? 'border-red-500'
                        : 'border-[var(--border-color)]'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                    SOCIAL SECURITY NUMBER *
                  </label>
                  <input
                    type="text"
                    value={formData.ssn}
                    onChange={(e) => handleChange('ssn', e.target.value)}
                    placeholder="XXX-XX-XXXX"
                    className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                      errors.ssn
                        ? 'border-red-500'
                        : 'border-[var(--border-color)]'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                  />
                  {errors.ssn && (
                    <p className="text-red-500 text-xs mt-1">{errors.ssn}</p>
                  )}
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                  DAYTIME PHONE NUMBER(S) where we can call to speak with you or
                  leave a message, if needed. Include area code or IDD and country
                  code if outside the USA or Canada.
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                      Primary *
                    </label>
                    <input
                      type="tel"
                      value={formData.primaryPhone}
                      onChange={(e) =>
                        handleChange('primaryPhone', e.target.value)
                      }
                      className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                        errors.primaryPhone
                          ? 'border-red-500'
                          : 'border-[var(--border-color)]'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                    />
                    {errors.primaryPhone && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.primaryPhone}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                      Secondary (if available)
                    </label>
                    <input
                      type="tel"
                      value={formData.secondaryPhone}
                      onChange={(e) =>
                        handleChange('secondaryPhone', e.target.value)
                      }
                      className="w-full px-3 py-2 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium text-[var(--label-text)] mb-3 border-b pb-2">
                SECTION 2 - WORK HISTORY
              </h3>

              {formData.jobs.map((job, index) => (
                <div
                  key={index}
                  className="border border-[var(--border-color)] p-4 rounded-md mb-6 relative"
                >
                  <h4 className="text-md font-medium text-[var(--primary-color)] mb-3">
                    JOB TITLE NO. {index + 1}
                  </h4>

                  {formData.jobs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeJob(index)}
                      className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                        JOB TITLE *
                      </label>
                      <input
                        type="text"
                        value={job.jobTitle}
                        onChange={(e) =>
                          handleChange('jobTitle', e.target.value, index)
                        }
                        className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                          errors[`jobTitle-${index}`]
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder="e.g., Cashier"
                      />
                      {errors[`jobTitle-${index}`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`jobTitle-${index}`]}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                          Rate of Pay:
                        </label>
                        <input
                          type="text"
                          value={job.rateOfPay}
                          onChange={(e) =>
                            handleChange('rateOfPay', e.target.value, index)
                          }
                          className="w-full px-3 py-2 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                          Per (Check One):
                        </label>
                        <select
                          value={job.payPeriod}
                          onChange={(e) =>
                            handleChange('payPeriod', e.target.value, index)
                          }
                          className="w-full px-3 py-2 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                        >
                          <option value="">Select</option>
                          <option value="Hour">Hour</option>
                          <option value="Day">Day</option>
                          <option value="Week">Week</option>
                          <option value="Month">Month</option>
                          <option value="Year">Year</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                          Hours per Day: *
                        </label>
                        <input
                          type="text"
                          value={job.hoursPerDay}
                          onChange={(e) =>
                            handleChange('hoursPerDay', e.target.value, index)
                          }
                          placeholder="e.g., 8"
                          className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                            errors[`hoursPerDay-${index}`]
                              ? 'border-red-500'
                              : 'border-[var(--border-color)]'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        />
                        {errors[`hoursPerDay-${index}`] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[`hoursPerDay-${index}`]}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                          Days per Week: *
                        </label>
                        <input
                          type="text"
                          value={job.daysPerWeek}
                          onChange={(e) =>
                            handleChange('daysPerWeek', e.target.value, index)
                          }
                          placeholder="e.g., 5"
                          className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                            errors[`daysPerWeek-${index}`]
                              ? 'border-red-500'
                              : 'border-[var(--border-color)]'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        />
                        {errors[`daysPerWeek-${index}`] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[`daysPerWeek-${index}`]}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                        For the job you listed in Job Title No. {index + 1},
                        describe in detail the tasks you did in a typical workday. *
                      </label>
                      <textarea
                        value={job.tasksDescription}
                        onChange={(e) =>
                          handleChange('tasksDescription', e.target.value, index)
                        }
                        className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                          errors[`tasksDescription-${index}`]
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        rows={4}
                        maxLength={525}
                      />
                      <div className="text-xs text-gray-500 text-right">
                        {job.tasksDescription.length}/525
                      </div>
                      {errors[`tasksDescription-${index}`] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors[`tasksDescription-${index}`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                        If any of the tasks listed above involved writing or
                        completing reports, describe the type of report you wrote
                        or completed and how much time you spent on it per workday
                        or workweek.
                      </label>
                      <textarea
                        value={job.reportTasks}
                        onChange={(e) =>
                          handleChange('reportTasks', e.target.value, index)
                        }
                        className="w-full px-3 py-2 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                        rows={3}
                        maxLength={425}
                      />
                      <div className="text-xs text-gray-500 text-right">
                        {job.reportTasks.length}/425
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                        If any of the tasks listed above involved supervising
                        others, describe who or what you supervised and what
                        supervisory duties you had.
                      </label>
                      <textarea
                        value={job.supervisoryDuties}
                        onChange={(e) =>
                          handleChange('supervisoryDuties', e.target.value, index)
                        }
                        className="w-full px-3 py-2 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                        rows={3}
                        maxLength={425}
                      />
                      <div className="text-xs text-gray-500 text-right">
                        {job.supervisoryDuties.length}/425
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                        List the machines, tools, and equipment you used regularly
                        when doing this job, and explain what you used them for.
                      </label>
                      <textarea
                        value={job.equipmentUsed}
                        onChange={(e) =>
                          handleChange('equipmentUsed', e.target.value, index)
                        }
                        className="w-full px-3 py-2 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                        rows={3}
                        maxLength={425}
                      />
                      <div className="text-xs text-gray-500 text-right">
                        {job.equipmentUsed.length}/425
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                        Did this job require you to interact with coworkers, the
                        general public, or anyone else?
                      </label>
                      <div className="flex items-center gap-4 mb-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={job.interactionRequired}
                            onChange={() =>
                              handleChange('interactionRequired', true, index)
                            }
                            className="form-radio"
                          />
                          Yes
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={!job.interactionRequired}
                            onChange={() =>
                              handleChange('interactionRequired', false, index)
                            }
                            className="form-radio"
                          />
                          No
                        </label>
                      </div>

                      {job.interactionRequired && (
                        <>
                          <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                            If YES, describe who you interacted with, the purpose
                            of the interaction, how you interacted, and how much
                            time you spent doing it per workday or workweek. *
                          </label>
                          <textarea
                            value={job.interactionDetails}
                            onChange={(e) =>
                              handleChange(
                                'interactionDetails',
                                e.target.value,
                                index
                              )
                            }
                            className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                              errors[`interactionDetails-${index}`]
                                ? 'border-red-500'
                                : 'border-[var(--border-color)]'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                            rows={4}
                            maxLength={525}
                          />
                          <div className="text-xs text-gray-500 text-right">
                            {job.interactionDetails.length}/525
                          </div>
                          {errors[`interactionDetails-${index}`] && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors[`interactionDetails-${index}`]}
                            </p>
                          )}
                        </>
                      )}
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <h5 className="text-md font-medium text-[var(--label-text)] mb-3">
                        Tell us how much time you spent doing the following
                        physical activities in a typical workday.
                      </h5>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                            Standing and walking (combined)
                          </label>
                          <input
                            type="text"
                            value={job.physicalActivities.standingWalking}
                            onChange={(e) =>
                              handlePhysicalActivityChange(
                                'standingWalking',
                                e.target.value,
                                index
                              )
                            }
                            className="w-full px-3 py-2 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                            placeholder="Hours/Minutes"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                            Sitting
                          </label>
                          <input
                            type="text"
                            value={job.physicalActivities.sitting}
                            onChange={(e) =>
                              handlePhysicalActivityChange(
                                'sitting',
                                e.target.value,
                                index
                              )
                            }
                            className="w-full px-3 py-2 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                            placeholder="Hours/Minutes"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {[
                          {
                            field: 'stooping',
                            label: 'Stooping (i.e., bending down & forward at waist)',
                          },
                          {
                            field: 'kneeling',
                            label: 'Kneeling (i.e., bending legs to rest on knees)',
                          },
                          {
                            field: 'crouching',
                            label:
                              'Crouching (i.e., bending legs & back down & forward)',
                          },
                          {
                            field: 'crawling',
                            label: 'Crawling (i.e., moving on hands and knees)',
                          },
                          {
                            field: 'climbingStairs',
                            label: 'Climbing stairs or ramps',
                          },
                          {
                            field: 'climbingLadders',
                            label: 'Climbing ladders, ropes, or scaffolds',
                          },
                        ].map((activity) => (
                          <div key={activity.field}>
                            <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                              {activity.label}
                            </label>
                            <input
                              type="text"
                              value={job.physicalActivities[activity.field]}
                              onChange={(e) =>
                                handlePhysicalActivityChange(
                                  activity.field,
                                  e.target.value,
                                  index
                                )
                              }
                              className="w-full px-3 py-2 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                              placeholder="Hours/Minutes"
                            />
                          </div>
                        ))}
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <h6 className="text-sm font-medium text-[var(--label-text)] mb-3">
                          Hand and Arm Activities
                        </h6>

                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="text-left py-2 text-sm font-medium text-[var(--label-text)]">
                                Activities
                              </th>
                              <th className="text-center py-2 text-sm font-medium text-[var(--label-text)]">
                                One Hand
                              </th>
                              <th className="text-center py-2 text-sm font-medium text-[var(--label-text)]">
                                Both Hands
                              </th>
                              <th className="text-center py-2 text-sm font-medium text-[var(--label-text)]">
                                How much of your workday?
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="py-2 text-sm text-[var(--input-text)]">
                                Using fingers to touch, pick, or pinch (e.g.,
                                using a mouse, keyboard, turning pages, or
                                buttoning a shirt):
                              </td>
                              <td className="px-2 py-2 text-center">
                                <input
                                  type="text"
                                  value={job.physicalActivities.fingerUseOneHand}
                                  onChange={(e) =>
                                    handlePhysicalActivityChange(
                                      'fingerUseOneHand',
                                      e.target.value,
                                      index
                                    )
                                  }
                                  className="w-full px-2 py-1 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                                />
                              </td>
                              <td className="px-2 py-2 text-center">
                                <input
                                  type="text"
                                  value={
                                    job.physicalActivities.fingerUseBothHands
                                  }
                                  onChange={(e) =>
                                    handlePhysicalActivityChange(
                                      'fingerUseBothHands',
                                      e.target.value,
                                      index
                                    )
                                  }
                                  className="w-full px-2 py-1 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                                />
                              </td>
                              <td className="px-2 py-2 text-center">
                                <input
                                  type="text"
                                  className="w-full px-2 py-1 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                                  placeholder="Hours/Minutes"
                                  disabled
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 text-sm text-[var(--input-text)]">
                                Using hands to seize, hold, grasp, or turn (e.g.,
                                holding a large envelope, a small box, a hammer, or
                                water bottle):
                              </td>
                              <td className="px-2 py-2 text-center">
                                <input
                                  type="text"
                                  value={job.physicalActivities.handUseOneHand}
                                  onChange={(e) =>
                                    handlePhysicalActivityChange(
                                      'handUseOneHand',
                                      e.target.value,
                                      index
                                    )
                                  }
                                  className="w-full px-2 py-1 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                                />
                              </td>
                              <td className="px-2 py-2 text-center">
                                <input
                                  type="text"
                                  value={job.physicalActivities.handUseBothHands}
                                  onChange={(e) =>
                                    handlePhysicalActivityChange(
                                      'handUseBothHands',
                                      e.target.value,
                                      index
                                    )
                                  }
                                  className="w-full px-2 py-1 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                                />
                              </td>
                              <td className="px-2 py-2 text-center">
                                <input
                                  type="text"
                                  className="w-full px-2 py-1 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                                  placeholder="Hours/Minutes"
                                  disabled
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 text-sm text-[var(--input-text)]">
                                Reaching at or below shoulder level:
                              </td>
                              <td className="px-2 py-2 text-center">
                                <input
                                  type="text"
                                  value={
                                    job.physicalActivities.reachShoulderOneArm
                                  }
                                  onChange={(e) =>
                                    handlePhysicalActivityChange(
                                      'reachShoulderOneArm',
                                      e.target.value,
                                      index
                                    )
                                  }
                                  className="w-full px-2 py-1 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                                />
                              </td>
                              <td className="px-2 py-2 text-center">
                                <input
                                  type="text"
                                  value={
                                    job.physicalActivities.reachShoulderBothArms
                                  }
                                  onChange={(e) =>
                                    handlePhysicalActivityChange(
                                      'reachShoulderBothArms',
                                      e.target.value,
                                      index
                                    )
                                  }
                                  className="w-full px-2 py-1 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                                />
                              </td>
                              <td className="px-2 py-2 text-center">
                                <input
                                  type="text"
                                  className="w-full px-2 py-1 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                                  placeholder="Hours/Minutes"
                                  disabled
                                />
                              </td>
                            </tr>
                            <tr>
                              <td className="py-2 text-sm text-[var(--input-text)]">
                                Reaching overhead:
                              </td>
                              <td className="px-2 py-2 text-center">
                                <input
                                  type="text"
                                  value={
                                    job.physicalActivities.reachOverheadOneArm
                                  }
                                  onChange={(e) =>
                                    handlePhysicalActivityChange(
                                      'reachOverheadOneArm',
                                      e.target.value,
                                      index
                                    )
                                  }
                                  className="w-full px-2 py-1 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                                />
                              </td>
                              <td className="px-2 py-2 text-center">
                                <input
                                  type="text"
                                  value={
                                    job.physicalActivities.reachOverheadBothArms
                                  }
                                  onChange={(e) =>
                                    handlePhysicalActivityChange(
                                      'reachOverheadBothArms',
                                      e.target.value,
                                      index
                                    )
                                  }
                                  className="w-full px-2 py-1 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                                />
                              </td>
                              <td className="px-2 py-2 text-center">
                                <input
                                  type="text"
                                  className="w-full px-2 py-1 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                                  placeholder="Hours/Minutes"
                                  disabled
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                          If you lifted or carried anything while doing this job,
                          describe in detail what you lifted or carried, how far
                          you carried it, and how often you did this in a typical
                          workday.
                        </label>
                        <textarea
                          value={job.liftingDetails}
                          onChange={(e) =>
                            handleChange('liftingDetails', e.target.value, index)
                          }
                          className="w-full px-3 py-2 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                          rows={3}
                          maxLength={425}
                        />
                        <div className="text-xs text-gray-500 text-right">
                          {job.liftingDetails.length}/425
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                            Heaviest Weight Lifted
                          </label>
                          <select
                            value={job.heaviestWeight}
                            onChange={(e) =>
                              handleChange('heaviestWeight', e.target.value, index)
                            }
                            className="w-full px-3 py-2 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                          >
                            {weightOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                            Weight Lifted Most Frequently
                          </label>
                          <select
                            value={job.frequentWeight}
                            onChange={(e) =>
                              handleChange('frequentWeight', e.target.value, index)
                            }
                            className="w-full px-3 py-2 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                          >
                            {weightOptions.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                          Check any of the following you were exposed to while
                          doing this job:
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {exposureOptions.map((exposure) => (
                            <label key={exposure} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={job.exposures.includes(exposure)}
                                onChange={(e) =>
                                  handleExposureChange(
                                    exposure,
                                    e.target.checked,
                                    index
                                  )
                                }
                                className="form-checkbox"
                              />
                              {exposure}
                            </label>
                          ))}
                        </div>
                        {job.exposures.length > 0 && (
                          <>
                            <label className="block text-sm font-medium text-[var(--label-text)] mt-3 mb-1">
                              Describe the exposure(s) in detail, including how
                              often and for how long you were exposed in a typical
                              workday. *
                            </label>
                            <textarea
                              value={job.exposureDetails}
                              onChange={(e) =>
                                handleChange(
                                  'exposureDetails',
                                  e.target.value,
                                  index
                                )
                              }
                              className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                                errors[`exposureDetails-${index}`]
                                  ? 'border-red-500'
                                  : 'border-[var(--border-color)]'
                              } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                              rows={4}
                              maxLength={525}
                            />
                            <div className="text-xs text-gray-500 text-right">
                              {job.exposureDetails.length}/525
                            </div>
                            {errors[`exposureDetails-${index}`] && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors[`exposureDetails-${index}`]}
                              </p>
                            )}
                          </>
                        )}
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                          Describe how the tasks, physical activities, and
                          exposures described above impacted any medical
                          condition(s) you have. *
                        </label>
                        <textarea
                          value={job.medicalImpact}
                          onChange={(e) =>
                            handleChange('medicalImpact', e.target.value, index)
                          }
                          className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                            errors[`medicalImpact-${index}`]
                              ? 'border-red-500'
                              : 'border-[var(--border-color)]'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                          rows={4}
                          maxLength={525}
                        />
                        <div className="text-xs text-gray-500 text-right">
                          {job.medicalImpact.length}/525
                        </div>
                        {errors[`medicalImpact-${index}`] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors[`medicalImpact-${index}`]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {formData.jobs.length < 5 && (
                <button
                  type="button"
                  onClick={addJob}
                  className="mt-4 px-4 py-2 bg-[var(--primary-color)] text-[var(--bg-color)] rounded-md hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus size={18} />
                  Add Another Job
                </button>
              )}
            </section>

            <section>
              <h3 className="text-lg font-medium text-[var(--label-text)] mb-3 border-b pb-2">
                SECTION 3 - REMARKS
              </h3>
              <p className="text-sm text-[var(--input-text)] mb-4">
                Use this section to add any other information you feel is
                important about your work history or to continue any answers from
                previous sections.
              </p>
              <textarea
                value={formData.additionalInfo}
                onChange={(e) => handleChange('additionalInfo', e.target.value)}
                className="w-full px-3 py-2 text-[var(--input-text)] border border-[var(--border-color)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]"
                rows={5}
                maxLength={1000}
              />
              <div className="text-xs text-gray-500 text-right">
                {formData.additionalInfo.length}/1000
              </div>
            </section>

            <section>
              <h3 className="text-lg font-medium text-[var(--label-text)] mb-3 border-b pb-2">
                SECTION 4 - WHO IS COMPLETING THIS REPORT
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    value={formData.reportDate}
                    onChange={(e) => handleChange('reportDate', e.target.value)}
                    className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                      errors.reportDate
                        ? 'border-red-500'
                        : 'border-[var(--border-color)]'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                  />
                  {errors.reportDate && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.reportDate}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--label-text)] mb-1">
                    This report is being completed by: *
                  </label>
                  <select
                    value={formData.completedBy}
                    onChange={(e) => handleChange('completedBy', e.target.value)}
                    className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                      errors.completedBy
                        ? 'border-red-500'
                        : 'border-[var(--border-color)]'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                  >
                    <option value="applicant">Applicant</option>
                    <option value="representative">Representative</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.completedBy && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.completedBy}
                    </p>
                  )}
                </div>
              </div>
            </section>

            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 bg-[var(--primary-color)] text-[var(--bg-color)] rounded-md hover:bg-blue-700 flex items-center gap-2 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Submit Report
                  </>
                )}
              </button>
            </div>

            {errors.submit && (
              <p className="text-red-500 text-sm mt-2 text-center">
                {errors.submit}
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
};

const InteractiveAvatar = () => {
  const [text, setText] = useState('');
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [avatarMuted, setAvatarMuted] = useState(false);
  const [isUserTalking, setIsUserTalking] = useState(false);
  const [chatMode, setChatMode] = useState('text_mode');
  const [stream, setStream] = useState(null);
  const [userVoiceInput, setUserVoiceInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const [inactivityPromptShown, setInactivityPromptShown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const videoRef = useRef(null);
  const avatarRef = useRef(null);
  const avatarResponseRef = useRef('');
  const chatContainerRef = useRef(null);
  const processedMessagesRef = useRef(new Set());
  const processedVoiceMessagesRef = useRef(new Set());
  const chatModeRef = useRef(chatMode);
  const inactivityTimerRef = useRef(null);
  const promptTimerRef = useRef(null);
  const API_KEY = import.meta.env.VITE_HEYGEN_API_KEY;
  const API_URL = import.meta.env.VITE_NEXT_PUBLIC_BASE_API_URL;
  const DEFAULT_AVATAR_ID = '3c592a67d01344f5b1d398d169e4b7d4';

  const updateActivity = () => {
    setLastActivityTime(Date.now());
    if (inactivityPromptShown) {
      setInactivityPromptShown(false);
      if (promptTimerRef.current) {
        clearTimeout(promptTimerRef.current);
      }
    }
  };

  useEffect(() => {
    const theme = darkMode ? darkTheme : lightTheme;
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, [darkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('themePreference');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('themePreference', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    const handleActivity = () => updateActivity();
    activityEvents.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });
    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, []);

  useEffect(() => {
    if (connectionStatus !== 'connected') return;
    const checkInactivity = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - lastActivityTime;
      if (elapsed >= INACTIVITY_TIMEOUT && !inactivityPromptShown) {
        showInactivityPrompt();
      }
    };
    inactivityTimerRef.current = setInterval(checkInactivity, 1000);
    return () => {
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
      }
    };
  }, [lastActivityTime, inactivityPromptShown, connectionStatus]);

  const showInactivityPrompt = async () => {
    setInactivityPromptShown(true);
    try {
      if (avatarRef.current) {
        await avatarRef.current.speak({
          text: 'Are you still there? If yes, add more minutes. If not, I will disconnect in 30 seconds.',
          taskType: TaskType.TALK,
          taskMode: TaskMode.SYNC,
        });
      }
      console.log('Inactivity prompt shown1');
      promptTimerRef.current = setTimeout(() => {
        console.log('Inactivity prompt shown2');
        console.log('Session ended due to inactivity');
        endSession();
      }, PROMPT_DURATION);
    } catch (error) {
      console.error('Error showing inactivity prompt:', error);
    }
  };

  const addToChat = (message, type, mode) => {
    updateActivity();
    const messageId = `${message}-${type}-${mode}-${Date.now()}`;
    if (processedMessagesRef.current.has(messageId)) return;
    processedMessagesRef.current.add(messageId);
    const newMessage = {
      message,
      type,
      mode,
      timestamp: new Date().toISOString(),
    };
    setChat((prev) => [...prev, newMessage]);
  };

  const submitFormData = async (formData) => {
    try {
      console.log('Submitting form data:', formData);
     const response = await axios.post(
  'http://localhost:3000/api/submit-to-jotform',
  formData
);

      if (response.data.responseCode === 200) {
        setShowForm(false);
        Swal.fire({
          title: 'Thank you!',
          text: 'Your information has been submitted successfully. Our team will reach out to you soon.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        await endSession();
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
      setErrorMessage('Failed to submit form data. Please try again.');
    }
  };

  const handleError = (error) => {
    console.error('Avatar error:', error);
    if (error.name === 'NotFoundError')
      setErrorMessage(
        'Microphone not found. Please connect a microphone and allow access.'
      );
    else if (error.name === 'NotAllowedError')
      setErrorMessage(
        'Microphone access denied. Please allow microphone permissions.'
      );
    else setErrorMessage('An error occurred: ' + error.message);
    if (connectionStatus !== 'connected') setConnectionStatus('disconnected');
  };

  useEffect(() => {
    if (chatContainerRef.current)
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    const lastMessage = chat[chat.length - 1];
    if (
      lastMessage &&
      lastMessage.type === 'avatar' &&
      lastMessage.message
        .toLowerCase()
        .includes('start with your basic information') &&
      !showForm &&
      !toggleForm
    ) {
      console.log(lastMessage.message, 'I am last');
      setShowForm(true);
    }
  }, [chat, showForm]);

  useEffect(() => {
    chatModeRef.current = chatMode;
  }, [chatMode]);

  const getStreamingToken = async () => {
    try {
      const response = await fetch(`${API_URL}/v1/streaming.create_token`, {
        method: 'POST',
        headers: { 'x-api-key': API_KEY, 'Content-Type': 'application/json' },
      });
      if (!response.ok)
        throw new Error(`API request failed with status ${response.status}`);
      const data = await response.json();
      return data.data.token;
    } catch (error) {
      console.error('Error fetching streaming token:', error);
      handleError(error);
      return null;
    }
  };

  const startVoiceChat = async () => {
    try {
      if (!avatarRef.current)
        throw new Error('Avatar reference not initialized');
      await navigator.mediaDevices.getUserMedia({ audio: true });
      await avatarRef.current.startVoiceChat({
        useSilencePrompt: true,
        isInputAudioMuted: false,
        sttProvider: STTProvider.DEEPGRAM,
      });
      setChatMode('voice_mode');
      setUserVoiceInput('');
      avatarResponseRef.current = '';
      setErrorMessage('');
    } catch (error) {
      console.error('Error starting voice chat:', error);
      handleError(error);
      setChatMode('text_mode');
    }
  };

  const stopVoiceChat = async () => {
    try {
      if (avatarRef.current) {
        await avatarRef.current.closeVoiceChat();
        if (userVoiceInput.trim()) {
          addToChat(userVoiceInput, 'user', 'voice_mode');
          setUserVoiceInput('');
        }
      }
    } catch (error) {
      console.warn('Error stopping voice chat:', error);
    }
  };

  const handleUserVoiceInput = (event) => {
    if (!event.detail?.message || chatModeRef.current !== 'voice_mode') return;
    const userMessage = event.detail.message.trim();
    if (!userMessage) return;
    const messageKey = `${userMessage}-voice-${Date.now()}`;
    if (processedVoiceMessagesRef.current.has(messageKey)) return;
    processedVoiceMessagesRef.current.add(messageKey);
    setTimeout(
      () => processedVoiceMessagesRef.current.delete(messageKey),
      5000
    );
    setUserVoiceInput(userMessage);
    addToChat(userMessage, 'user', 'voice_mode');
  };

  const startSession = async () => {
    setIsLoading(true);
    setConnectionStatus('connecting');
    try {
      const token = await getStreamingToken();
      if (!token) throw new Error('Failed to obtain streaming token');
      if (avatarRef.current) {
        await avatarRef.current.stopAvatar().catch(console.warn);
        avatarRef.current = null;
      }
      processedMessagesRef.current = new Set();
      processedVoiceMessagesRef.current = new Set();
      avatarRef.current = new StreamingAvatar({ token, basePath: API_URL });
      avatarRef.current.on(StreamingEvents.ERROR, handleError);
      avatarRef.current.on(StreamingEvents.STREAM_READY, handleStreamReady);
      avatarRef.current.on(StreamingEvents.STREAM_DISCONNECTED, endSession);
      avatarRef.current.on(
        StreamingEvents.AVATAR_TALKING_MESSAGE,
        handleAvatarSpeaking
      );
      avatarRef.current.on(StreamingEvents.AVATAR_END_MESSAGE, handleAvatarEnd);
      avatarRef.current.on(
        StreamingEvents.USER_TALKING_MESSAGE,
        handleUserVoiceInput
      );
      avatarRef.current.on(StreamingEvents.USER_START, () =>
        setIsUserTalking(true)
      );
      avatarRef.current.on(StreamingEvents.USER_STOP, () =>
        setIsUserTalking(false)
      );
      await avatarRef.current.createStartAvatar({
        quality: AvatarQuality.Medium,
        avatarName: DEFAULT_AVATAR_ID,
        voice: { rate: 1.2, emotion: VoiceEmotion.NEUTRAL },
        language: 'en',
        disableIdleTimeout: true,
      });
      await avatarRef.current.speak({
        text: 'Hi there! I am here to virtually help and guide you through the Social Security Application Prep Form. Each section is needed and important to move forward with your case. When ready to begin, type or say: ‘Ready to begin’',
        taskType: TaskType.REPEAT,
        taskMode: TaskMode.SYNC,
      });
      setConnectionStatus('connected');
    } catch (error) {
      console.error('Error starting session:', error);
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStreamReady = (event) => {
    setConnectionStatus('ready');
    const mediaStream = event?.detail;
    setStream(mediaStream);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () =>
          videoRef.current.play().catch(console.error);
      }
    }, 500);
  };

  const handleAvatarSpeaking = (event) => {
    if (event.detail?.message)
      avatarResponseRef.current += event.detail.message;
  };

  const handleAvatarEnd = () => {
    if (avatarResponseRef.current) {
      addToChat(avatarResponseRef.current, 'avatar', chatMode);
      avatarResponseRef.current = '';
    }
  };

  const endSession = async () => {
    setConnectionStatus('disconnected');
    if (userVoiceInput.trim()) {
      addToChat(userVoiceInput, 'user', 'voice_mode');
      setUserVoiceInput('');
    }
    if (avatarResponseRef.current) {
      addToChat(avatarResponseRef.current, 'avatar', chatMode);
      avatarResponseRef.current = '';
    }
    if (avatarRef.current) {
      try {
        if (chatMode === 'voice_mode') {
          await stopVoiceChat();
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        await avatarRef.current.interrupt().catch(console.warn);
        await avatarRef.current.stopAvatar();
      } catch (error) {
        if (!error.message.includes('DataChannel error'))
          console.error('Error stopping avatar:', error);
      } finally {
        avatarRef.current = null;
      }
    }
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setChat([]);
    setShowForm(false);
    setErrorMessage('');
    setIsPaused(false);
  };

  const handleSpeak = async () => {
    if (!text.trim() || !avatarRef.current) return;
    updateActivity();
    try {
      addToChat(text, 'user', 'text_mode');
      await avatarRef.current.speak({
        text: text,
        taskType: TaskType.TALK,
        taskMode: TaskMode.SYNC,
      });
      setText('');
    } catch (error) {
      console.error('Error in handleSpeak:', error);
      handleError(error);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !avatarMuted;
      setAvatarMuted(!avatarMuted);
    }
  };

  const togglePause = () => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.play().catch(console.error);
      } else {
        videoRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const handleChatModeChange = async (mode) => {
    if (mode === chatMode || !avatarRef.current) return;
    try {
      if (mode === 'voice_mode') await startVoiceChat();
      else {
        await stopVoiceChat();
        setChatMode('text_mode');
      }
    } catch (error) {
      console.error('Error changing chat mode:', error);
      handleError(error);
      setChatMode('text_mode');
    }
  };

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () =>
        videoRef.current.play().catch(console.error);
    }
  }, [stream]);

  useEffect(() => {
    return () => {
      if (avatarRef.current) avatarRef.current.stopAvatar().catch(console.warn);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
      }
      if (promptTimerRef.current) {
        clearTimeout(promptTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-[var(--card-bg)] w-screen h-screen">
      <div className="p-4 md:p-8">
        <div className="mx-auto p-4 flex justify-between items-center">
          <img
            src="/linerlegallaw.png"
            className="w-[300px]"
            alt="Liner Legal Logo"
          />
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-[var(--primary-color)] text-[var(--bg-color)] hover:text-white transition-colors"
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? (
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
                Light Mode
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                Dark Mode
              </span>
            )}
          </button>
        </div>
        <div className="flex max-w-[1780px] mx-auto w-full gap-4 h-[calc(100vh-200px)]">
          <div className="md:max-w-[50%] w-full">
            <div className="bg-[var(--card-bg)] rounded-xl shadow-xl h-full flex flex-col">
              <div className="flex-1 bg-[var(--secondary-color)] relative rounded-t-2xl">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted={avatarMuted}
                  className={`w-full h-full object-cover rounded-t-2xl ${
                    connectionStatus !== 'connected' ? 'hidden' : ''
                  }`}
                />
                {connectionStatus === 'connected' ? (
                  <>
                    <div className="absolute top-4 right-4 flex gap-2 z-10">
                      <button
                        onClick={toggleMute}
                        className="p-2 text-[var(--card-bg)] bg-[var(--primary-color)] rounded-full shadow-md"
                        aria-label={avatarMuted ? 'Unmute' : 'Mute'}
                      >
                        {avatarMuted ? (
                          <VolumeX size={20} />
                        ) : (
                          <Volume2 size={20} />
                        )}
                      </button>
                      <button
                        onClick={togglePause}
                        className="p-2 text-[var(--card-bg)] bg-[var(--primary-color)] rounded-full shadow-md"
                        aria-label={isPaused ? 'Play' : 'Pause'}
                      >
                        {isPaused ? <Play size={20} /> : <Pause size={20} />}
                      </button>
                      <button
                        onClick={endSession}
                        className="p-2 bg-[var(--primary-color)] rounded-full cursor-pointer shadow-md text-red-500"
                        aria-label="End Session"
                      >
                        End Session
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 bg-[var(--card-bg)] px-3 py-1 rounded-lg shadow-md">
                      <span className="w-2 h-2 rounded-full mr-2 bg-green-500 inline-block"></span>
                      <span className="text-sm text-[var(--primary-color)] font-medium">
                        Connected
                      </span>
                    </div>
                    {errorMessage && (
                      <div className="absolute top-10 left-4 bg-red-100 border border-red-200 text-red-700 px-4 py-2 rounded-lg shadow-md">
                        <span className="flex items-center gap-2">
                          <AlertTriangle size={20} />
                          {errorMessage}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center p-6">
                    <div className="max-w-md w-full space-y-4">
                      <h2 className="text-xl font-semibold text-center text-[var(--primary-color)]">
                        Start Your Avatar Session
                      </h2>
                      {errorMessage && (
                        <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-2 rounded-lg">
                          <span className="flex items-center gap-2">
                            <AlertTriangle size={20} />
                            {errorMessage}
                          </span>
                        </div>
                      )}
                      <button
                        onClick={startSession}
                        disabled={isLoading}
                        className={`w-full py-3 cursor-pointer px-4 rounded-lg font-medium text-white ${
                          isLoading
                            ? 'bg-gradient-to-br from-[#097FCD] to-[#0B3759] text-white'
                            : 'bg-gradient-to-br from-[#097FCD] to-[#0B3759] text-white'
                        }`}
                      >
                        {isLoading ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin" size={20} />
                            Initializing...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-2">
                            <Play size={20} />
                            Start Session
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex">
                  <button
                    onClick={() => handleChatModeChange('text_mode')}
                    className={`flex-1 cursor-pointer py-2 font-medium ${
                      chatMode === 'text_mode'
                        ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
                        : 'text-[var(--primary-color)]'
                    }`}
                    aria-label="Text Mode"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <MessageSquare size={18} />
                      Text Mode
                    </span>
                  </button>
                  <button
                    onClick={() => handleChatModeChange('voice_mode')}
                    className={`flex-1 cursor-pointer py-2 font-medium ${
                      chatMode === 'voice_mode'
                        ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
                        : 'text-[var(--primary-color)]'
                    }`}
                    aria-label="Voice Mode"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Mic size={18} />
                      Voice Mode
                    </span>
                  </button>
                </div>
                {chatMode === 'text_mode' ? (
                  <div className="flex gap-2 mt-4">
                    <input
                      type="text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSpeak()}
                      placeholder="Type your message here..."
                      className="flex-1 p-2 border rounded-full focus:outline-none text-[var(--primary-color)] border-[var(--primary-color)] disabled:bg-[var(--secondary-color)]"
                      disabled={connectionStatus !== 'connected' || showForm}
                      aria-label="Type your message"
                    />
                    <button
                      onClick={handleSpeak}
                      disabled={
                        !text.trim() ||
                        connectionStatus !== 'connected' ||
                        showForm
                      }
                      className="p-2 bg-[var(--primary-color)] text-[var(--bg-color)] rounded-full disabled:bg-gray-300 hover:bg-blue-700"
                      aria-label="Send message"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                ) : (
                  <div
                    className={`p-3 mt-4 rounded-full text-center ${
                      isUserTalking
                        ? 'bg-gradient-to-br from-[#097FCD] to-[#0B3759] text-white'
                        : 'bg-gradient-to-br from-[#097FCD] to-[#0B3759] text-white'
                    }`}
                  >
                    {isUserTalking ? (
                      <span className="flex items-center justify-center gap-2">
                        <Mic className="text-white animate-pulse" size={20} />
                        Listening...
                      </span>
                    ) : (
                      <span className="flex text-white items-center justify-center gap-2">
                        <Mic className="text-white" size={20} />
                        Speak to interact
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="md:max-w-[50%] w-full">
            {showForm ? (
              <MultiStepForm
                onSubmit={submitFormData}
                onCancel={() => setShowForm(false)}
                avatarRef={avatarRef}
                toggleForm={toggleForm}
                setToggleForm={setToggleForm}
              />
            ) : (
              <div className="bg-[var(--card-bg)] flex rounded-2xl shadow-xl h-full flex-col">
                <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-t-2xl text-[var(--primary-color)] px-6 py-3 flex justify-between items-center">
                  <h3 className="flex items-center gap-2 font-semibold">
                    <MessageSquare size={20} />
                    Chat History
                  </h3>
                  <div className="flex items-center gap-2">
                    Chat
                    <button
                      onClick={() => {
                        setToggleForm(false);
                        setShowForm(!showForm);
                      }}
                      disabled={chat.length === 0}
                      aria-label="Toggle Form"
                    >
                      <ToggleLeft />
                    </button>
                    Form
                  </div>
                </div>
                <div
                  ref={chatContainerRef}
                  className="p-4 flex-1 bg-[var(--secondary-color)] rounded-b-2xl overflow-y-auto"
                >
                  {chat.length === 0 ? (
                    <div className="h-full flex items-center justify-center flex-col">
                      <MessageSquare
                        size={40}
                        className="text-[var(--primary-color)] mb-4"
                      />
                      <p className="text-[var(--primary-color)]">
                        No messages yet
                      </p>
                      <p className="text-[var(--primary-color)] text-sm mt-2">
                        {connectionStatus === 'connected'
                          ? 'Start chatting with the avatar!'
                          : 'Start a session to begin chatting.'}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 px-4 py-6">
                      {chat.map((msg, index) => {
                        const prevMsg = index > 0 ? chat[index - 1] : null;
                        const showHeader =
                          !prevMsg || prevMsg.type !== msg.type;
                        const isUser = msg.type === 'user';
                        return (
                          <div
                            key={index}
                            className={`flex ${
                              isUser ? 'justify-end' : 'justify-start'
                            } animate-fadeIn`}
                          >
                            <div
                              className={`relative p-4 max-w-[75%] text-sm md:text-base rounded-2xl shadow-md
                                ${
                                  isUser
                                    ? 'bg-[var(--chat-user-bg)] text-[var(--chat-user-text)] rounded-br-none'
                                    : 'bg-[var(--chat-avatar-bg)] text-[var(--chat-avatar-text)] rounded-bl-none'
                                }`}
                            >
                              {showHeader && (
                                <p className="text-xs font-semibold mb-1 flex items-center gap-1">
                                  {isUser ? (
                                    <>
                                      <User size={14} /> You
                                    </>
                                  ) : (
                                    <>
                                      {darkMode ? (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 12 7.8"
                                          className="w-[30px] h-[30px] fill-[#097fcd]"
                                        >
                                          <title>SCREENAsset 6mdpi</title>
                                          <g id="Layer_2" data-name="Layer 2">
                                            <g
                                              id="Layer_1-2"
                                              data-name="Layer 1"
                                            >
                                              <path d="M1.73,2.38a12.63,12.63,0,0,1,1.21.89l.41.33a4.89,4.89,0,0,1-.1-.78L2.87,2.5,1.56,1.42a.19.19,0,0,1-.05-.09C1.36.52,0,.47,0,.47S.22,1.78,1.06,1.85A.15.15,0,0,1,1.2,2c0,.43.1.49.17.58a.45.45,0,0,1,.07.18,5.86,5.86,0,0,0,1,2.82,1.89,1.89,0,0,1,0-.43.11.11,0,0,1,.11-.09l.15,0a5.65,5.65,0,0,1-.91-1.82,4.15,4.15,0,0,1,.66,1.08A.56.56,0,0,1,3,4.45c0-.66-.62-1.27-1-1.67A1.17,1.17,0,0,1,1.73,2.38Zm1,.34C2.38,2.5,2,2.28,2,2.08,2.3,2.08,2.53,2.34,2.75,2.72ZM.4.8c.42.09.71.28.74.69C.85,1.57.65,1,.4.8Z" />
                                              <path d="M10.55,1.09a.13.13,0,0,1-.05.09L9.33,2.29,9,2.64a7,7,0,0,1-.1.83l.41-.38a10.58,10.58,0,0,1,1.12-.94,1.3,1.3,0,0,1-.22.42C9.85,3,9.27,3.64,9.32,4.3a.55.55,0,0,1,.41-.19A4.29,4.29,0,0,1,10.33,3a5.87,5.87,0,0,1-.8,1.87h.15A.11.11,0,0,1,9.8,5a1.73,1.73,0,0,1,0,.42,5.82,5.82,0,0,0,.86-2.88.64.64,0,0,1,.06-.18c.07-.1.15-.16.14-.59A.14.14,0,0,1,11,1.58c.83-.12,1-1.45,1-1.45S10.65.27,10.55,1.09ZM9.41,2.55c.19-.39.4-.66.66-.68C10.11,2.07,9.76,2.31,9.41,2.55Zm1.52-1.32c0-.42.28-.63.7-.74C11.39.74,11.22,1.29,10.93,1.23Z" />
                                              <path d="M4,5.45a2.89,2.89,0,0,1-.21.28A8.55,8.55,0,0,1,1.76,7.57a14.88,14.88,0,0,1,2-1.94L4,5.42a2.12,2.12,0,0,1-.11-.21l-.24.23-2,1.9V7.8H2L4,5.93l.24-.22A2.33,2.33,0,0,1,4,5.45Z" />
                                              <path d="M8.07,5.66a8.81,8.81,0,0,1,2.2,1.57A9.65,9.65,0,0,1,8.07,5.66Zm.36,0-.27-.19a4.38,4.38,0,0,1-.28.42l.27.2,2,1.39h.39V7.05Z" />
                                              <path d="M4,5.42l-.24.21.05.1A2.89,2.89,0,0,0,4,5.45ZM9.25.64A6.73,6.73,0,0,1,6.13,0,6.54,6.54,0,0,1,2.94.64a8.82,8.82,0,0,0-.08,1.58,2.53,2.53,0,0,0,0,.28,6.12,6.12,0,0,0,.07.77,6,6,0,0,0,.73,2.17l.11.19.05.1a2.43,2.43,0,0,1,.14.2A4.78,4.78,0,0,0,6.05,7.71h.1A4.81,4.81,0,0,0,8.15,6c.1-.14.19-.28.28-.43a6.14,6.14,0,0,0,.85-2.52,5.13,5.13,0,0,0,.05-.8.17.17,0,0,0,0-.07A7.76,7.76,0,0,0,9.25.64ZM8.87,3.47a5.59,5.59,0,0,1-.71,1.95,4.38,4.38,0,0,1-.28.42,4.47,4.47,0,0,1-1.81,1.5A4.34,4.34,0,0,1,4.21,5.71,2.33,2.33,0,0,1,4,5.45l0,0a2.12,2.12,0,0,1-.11-.21A5.63,5.63,0,0,1,3.35,3.6a4.89,4.89,0,0,1-.1-.78,5.74,5.74,0,0,1,0-.6c0-.36,0-.9,0-1.23A7.2,7.2,0,0,0,6.14.4,7.31,7.31,0,0,0,9,1c0,.33,0,.87,0,1.23,0,.14,0,.28,0,.42A7,7,0,0,1,8.87,3.47Z" />
                                              <path d="M7.25,5.2c0,.11-.06.14-.32.14l-.85,0H4.84c-.07,0-.1,0-.1-.05s0,0,.08,0l.18,0c.1,0,.13-.13.15-.27s0-.61,0-1.07V3c0-.77,0-.91,0-1.07s0-.25-.21-.28l-.17,0c-.06,0-.08,0-.08,0s0-.05.11-.05l.68,0,.68,0c.07,0,.11,0,.11.05s0,0-.09,0l-.2,0c-.13,0-.17.11-.18.28s0,.3,0,1.07v.88c0,.64,0,1,.1,1.08s.22.11.61.11a.8.8,0,0,0,.59-.14.67.67,0,0,0,.13-.3s0-.08,0-.08,0,0,0,.08A3.74,3.74,0,0,1,7.25,5.2Z" />
                                              <path d="M7.75,4.08c0,.07,0,.09-.19.09H6.33s-.06,0-.06,0,0,0,0,0h.11c.06,0,.08-.08.09-.16s0-.36,0-.63V2.78c0-.45,0-.54,0-.63S6.49,2,6.39,2h-.1s0,0,0,0,0,0,.07,0h.8s.07,0,.07,0,0,0-.06,0H7c-.08,0-.11.06-.11.17s0,.18,0,.63V3.3c0,.38,0,.58.06.63s.13.07.36.07.27,0,.35-.08a.58.58,0,0,0,.08-.18s0-.05,0-.05,0,0,0,.05A2.55,2.55,0,0,1,7.75,4.08Z" />
                                            </g>
                                          </g>
                                        </svg>
                                      ) : (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 12 7.8"
                                          className="w-[30px] h-[30px] fill-[#ffffff]"
                                        >
                                          <title>SCREENAsset 6mdpi</title>
                                          <g id="Layer_2" data-name="Layer 2">
                                            <g
                                              id="Layer_1-2"
                                              data-name="Layer 1"
                                            >
                                              <path d="M1.73,2.38a12.63,12.63,0,0,1,1.21.89l.41.33a4.89,4.89,0,0,1-.1-.78L2.87,2.5,1.56,1.42a.19.19,0,0,1-.05-.09C1.36.52,0,.47,0,.47S.22,1.78,1.06,1.85A.15.15,0,0,1,1.2,2c0,.43.1.49.17.58a.45.45,0,0,1,.07.18,5.86,5.86,0,0,0,1,2.82,1.89,1.89,0,0,1,0-.43.11.11,0,0,1,.11-.09l.15,0a5.65,5.65,0,0,1-.91-1.82,4.15,4.15,0,0,1,.66,1.08A.56.56,0,0,1,3,4.45c0-.66-.62-1.27-1-1.67A1.17,1.17,0,0,1,1.73,2.38Zm1,.34C2.38,2.5,2,2.28,2,2.08,2.3,2.08,2.53,2.34,2.75,2.72ZM.4.8c.42.09.71.28.74.69C.85,1.57.65,1,.4.8Z" />
                                              <path d="M10.55,1.09a.13.13,0,0,1-.05.09L9.33,2.29,9,2.64a7,7,0,0,1-.1.83l.41-.38a10.58,10.58,0,0,1,1.12-.94,1.3,1.3,0,0,1-.22.42C9.85,3,9.27,3.64,9.32,4.3a.55.55,0,0,1,.41-.19A4.29,4.29,0,0,1,10.33,3a5.87,5.87,0,0,1-.8,1.87h.15A.11.11,0,0,1,9.8,5a1.73,1.73,0,0,1,0,.42,5.82,5.82,0,0,0,.86-2.88.64.64,0,0,1,.06-.18c.07-.1.15-.16.14-.59A.14.14,0,0,1,11,1.58c.83-.12,1-1.45,1-1.45S10.65.27,10.55,1.09ZM9.41,2.55c.19-.39.4-.66.66-.68C10.11,2.07,9.76,2.31,9.41,2.55Zm1.52-1.32c0-.42.28-.63.7-.74C11.39.74,11.22,1.29,10.93,1.23Z" />
                                              <path d="M4,5.45a2.89,2.89,0,0,1-.21.28A8.55,8.55,0,0,1,1.76,7.57a14.88,14.88,0,0,1,2-1.94L4,5.42a2.12,2.12,0,0,1-.11-.21l-.24.23-2,1.9V7.8H2L4,5.93l.24-.22A2.33,2.33,0,0,1,4,5.45Z" />
                                              <path d="M8.07,5.66a8.81,8.81,0,0,1,2.2,1.57A9.65,9.65,0,0,1,8.07,5.66Zm.36,0-.27-.19a4.38,4.38,0,0,1-.28.42l.27.2,2,1.39h.39V7.05Z" />
                                              <path d="M4,5.42l-.24.21.05.1A2.89,2.89,0,0,0,4,5.45ZM9.25.64A6.73,6.73,0,0,1,6.13,0,6.54,6.54,0,0,1,2.94.64a8.82,8.82,0,0,0-.08,1.58,2.53,2.53,0,0,0,0,.28,6.12,6.12,0,0,0,.07.77,6,6,0,0,0,.73,2.17l.11.19.05.1a2.43,2.43,0,0,1,.14.2A4.78,4.78,0,0,0,6.05,7.71h.1A4.81,4.81,0,0,0,8.15,6c.1-.14.19-.28.28-.43a6.14,6.14,0,0,0,.85-2.52,5.13,5.13,0,0,0,.05-.8.17.17,0,0,0,0-.07A7.76,7.76,0,0,0,9.25.64ZM8.87,3.47a5.59,5.59,0,0,1-.71,1.95,4.38,4.38,0,0,1-.28.42,4.47,4.47,0,0,1-1.81,1.5A4.34,4.34,0,0,1,4.21,5.71,2.33,2.33,0,0,1,4,5.45l0,0a2.12,2.12,0,0,1-.11-.21A5.63,5.63,0,0,1,3.35,3.6a4.89,4.89,0,0,1-.1-.78,5.74,5.74,0,0,1,0-.6c0-.36,0-.9,0-1.23A7.2,7.2,0,0,0,6.14.4,7.31,7.31,0,0,0,9,1c0,.33,0,.87,0,1.23,0,.14,0,.28,0,.42A7,7,0,0,1,8.87,3.47Z" />
                                              <path d="M7.25,5.2c0,.11-.06.14-.32.14l-.85,0H4.84c-.07,0-.1,0-.1-.05s0,0,.08,0l.18,0c.1,0,.13-.13.15-.27s0-.61,0-1.07V3c0-.77,0-.91,0-1.07s0-.25-.21-.28l-.17,0c-.06,0-.08,0-.08,0s0-.05.11-.05l.68,0,.68,0c.07,0,.11,0,.11.05s0,0-.09,0l-.2,0c-.13,0-.17.11-.18.28s0,.3,0,1.07v.88c0,.64,0,1,.1,1.08s.22.11.61.11a.8.8,0,0,0,.59-.14.67.67,0,0,0,.13-.3s0-.08,0-.08,0,0,0,.08A3.74,3.74,0,0,1,7.25,5.2Z" />
                                              <path d="M7.75,4.08c0,.07,0,.09-.19.09H6.33s-.06,0-.06,0,0,0,0,0h.11c.06,0,.08-.08.09-.16s0-.36,0-.63V2.78c0-.45,0-.54,0-.63S6.49,2,6.39,2h-.1s0,0,0,0,0,0,.07,0h.8s.07,0,.07,0,0,0-.06,0H7c-.08,0-.11.06-.11.17s0,.18,0,.63V3.3c0,.38,0,.58.06.63s.13.07.36.07.27,0,.35-.08a.58.58,0,0,0,.08-.18s0-.05,0-.05,0,0,0,.05A2.55,2.55,0,0,1,7.75,4.08Z" />
                                            </g>
                                          </g>
                                        </svg>
                                      )}
                                      Michael
                                    </>
                                  )}
                                </p>
                              )}
                              <p className="whitespace-pre-line leading-relaxed">
                                {msg.message}
                              </p>
                              <p className="text-[10px] text-[var(--chat-user-text)] text-right mt-2">
                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveAvatar;
