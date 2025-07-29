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
} from 'lucide-react';

// Update your theme variables
const lightTheme = {
  '--bg-color': '#dee8f1', // Darker background
  '--text-color': '#eaf5fa', // Lighter text for better readability
  '--primary-color': '#0c3d63', // Lighter blue for primary actions
  '--secondary-color': '#dff4fb', // Darker secondary background
  '--card-bg': '#dee8f1', // Darker card background
  '--border-color': '#334155', // Darker border
  '--input-bg': '#dee8f1', // Darker input background
  '--input-text': '#0c3d63', // Lighter text for inputs
  '--label-text': '#0c3d63', // Lighter gray for labels
  '--chat-user-bg': '#0a79c4', // Blue for user chat bubbles
  '--chat-user-text': '#eaf5fa', // Light text for user chat
  '--chat-avatar-bg': '#0a79c4', // Darker green for avatar chat bubbles
  '--chat-avatar-text': '#eaf5fa', // Light green for avatar text
  '--error-bg': '#7f1d1d', // Dark red for error backgrounds
  '--error-text': '#fecaca', // Light red for error text
  '--error-color': '#f87171', // Lighter red for error accents
};

const darkTheme = {
  '--bg-color': '#07264e', // Darker background
  '--text-color': '#f8fafc', // Lighter text for better readability
  '--primary-color': '#c4ecfe', // Lighter blue for primary actions
  '--secondary-color': '#011933', // Darker secondary background
  '--card-bg': '#1e293b', // Darker card background
  '--border-color': '#334155', // Darker border
  '--input-bg': '#1e293b', // Darker input background
  '--input-text': '#f8fafc', // Lighter text for inputs
  '--label-text': '#c4ecfe', // Lighter gray for labels
  '--chat-user-bg': '#c4ecfe', // Blue for user chat bubbles
  '--chat-user-text': '#07264e', // Light text for user chat
  '--chat-avatar-bg': '#c4ecfe', // Darker green for avatar chat bubbles
  '--chat-avatar-text': '#07264e', // Light green for avatar text
  '--error-bg': '#7f1d1d', // Dark red for error backgrounds
  '--error-text': '#fecaca', // Light red for error text
  '--error-color': '#f87171', // Lighter red for error accents
};

const INACTIVITY_TIMEOUT = 300000; // 5 minutes in milliseconds
// const INACTIVITY_TIMEOUT = 120000; // 2 minutes in milliseconds

const PROMPT_DURATION = 60000; // 1 minute to respond to prompt

// Utility functions for localStorage
const saveFormDataToLocal = (formData) => {
  try {
    localStorage.setItem('socialSecurityFormData', JSON.stringify(formData));
  } catch (error) {
    console.error('Error saving form data to localStorage:', error);
  }
};

const loadFormDataFromLocal = () => {
  try {
    const savedData = localStorage.getItem('socialSecurityFormData');
    return savedData ? JSON.parse(savedData) : null;
  } catch (error) {
    console.error('Error loading form data from localStorage:', error);
    return null;
  }
};

const clearFormDataFromLocal = () => {
  localStorage.removeItem('socialSecurityFormData');
};

// Multi-Step Form Component
const MultiStepForm = ({
  onSubmit,
  onCancel,
  avatarRef,
  toggleForm,
  setToggleForm,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    const savedData = loadFormDataFromLocal();
    return (
      savedData || {
        name: '',
        phone: '',
        email: '',
        ssn: '',
        marriedOverTenOrDeceased: null,
        spouseName: '',
        spouseDOB: '',
        spouseSSN: '',
        jobs: [
          {
            business: '',
            title: '',
            startDate: '',
            endDate: '',
            payAmount: '',
            payFrequency: '',
          },
        ],
        medical: {
          treatmentEndDate: '',
          primaryCare: {
            name: '',
            testing: '',
            address: '',
            zipCode: '',
            city: '',
            state: '',
            phone: '',
            date: '',
          },
          specialist: {
            name: '',
            specialty: '',
            testing: '',
            address: '',
            zipCode: '',
            city: '',
            state: '',
            phone: '',
            date: '',
          },
          additionalDoctors: [
            {
              name: '',
              city: '',
              phone: '',
              state: '',
              address: '',
              zipCode: '',
              date: '',
            },
          ],
          hospitalizations: [
            { name: '', address: '', phone: '', reason: '', date: '' },
          ],
        },
      }
    );
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false);

  useEffect(() => {
    const saveTimer = setTimeout(() => {
      saveFormDataToLocal(formData);
    }, 500); // Debounce to avoid too frequent saves

    return () => clearTimeout(saveTimer);
  }, [formData]);

  const handleChange = (
    field,
    value,
    jobIndex = null,
    doctorIndex = null,
    hospIndex = null,
    nestedField = null
  ) => {
    console.log('handleChange called with:', field, value);
    if (jobIndex !== null) {
      setFormData((prev) => {
        const newJobs = [...prev.jobs];
        newJobs[jobIndex] = { ...newJobs[jobIndex], [field]: value };
        return { ...prev, jobs: newJobs };
      });
      setErrors((prev) => ({ ...prev, [`jobs[${jobIndex}].${field}`]: '' }));
    } else if (doctorIndex !== null) {
      setFormData((prev) => {
        const newDoctors = [...prev.medical.additionalDoctors];
        newDoctors[doctorIndex] = {
          ...newDoctors[doctorIndex],
          [field]: value,
        };
        return {
          ...prev,
          medical: { ...prev.medical, additionalDoctors: newDoctors },
        };
      });
      setErrors((prev) => ({
        ...prev,
        [`medical.additionalDoctors[${doctorIndex}].${field}`]: '',
      }));
    } else if (hospIndex !== null) {
      setFormData((prev) => {
        const newHosp = [...prev.medical.hospitalizations];
        newHosp[hospIndex] = { ...newHosp[hospIndex], [field]: value };
        return {
          ...prev,
          medical: { ...prev.medical, hospitalizations: newHosp },
        };
      });
      setErrors((prev) => ({
        ...prev,
        [`medical.hospitalizations[${hospIndex}].${field}`]: '',
      }));
    } else if (nestedField) {
      if (nestedField == 'medical' && field === 'treatmentEndDate') {
        setFormData((prev) => ({
          ...prev,
          medical: {
            ...prev.medical,
            [field]: value,
          },
        }));
        setErrors((prev) => ({
          ...prev,
          [`medical.${nestedField}.${field}`]: '',
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          medical: {
            ...prev.medical,
            [nestedField]: { ...prev.medical[nestedField], [field]: value },
          },
        }));
        setErrors((prev) => ({
          ...prev,
          [`medical.${nestedField}.${field}`]: '',
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const addJob = () => {
    if (formData.jobs.length < 5) {
      setFormData((prev) => ({
        ...prev,
        jobs: [
          ...prev.jobs,
          {
            business: '',
            title: '',
            startDate: '',
            endDate: '',
            payAmount: '',
            payFrequency: '',
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
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`jobs[${index}].`)) delete newErrors[key];
      });
      return newErrors;
    });
  };

  const addDoctor = () => {
    setFormData((prev) => ({
      ...prev,
      medical: {
        ...prev.medical,
        additionalDoctors: [
          ...prev.medical.additionalDoctors,
          { name: '', city: '', phone: '', state: '' },
        ],
      },
    }));
  };

  const removeDoctor = (index) => {
    setFormData((prev) => ({
      ...prev,
      medical: {
        ...prev.medical,
        additionalDoctors: prev.medical.additionalDoctors.filter(
          (_, i) => i !== index
        ),
      },
    }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`medical.additionalDoctors[${index}].`))
          delete newErrors[key];
      });
      return newErrors;
    });
  };

  const addHospitalization = () => {
    setFormData((prev) => ({
      ...prev,
      medical: {
        ...prev.medical,
        hospitalizations: [
          ...prev.medical.hospitalizations,
          { name: '', address: '', phone: '', reason: '', date: '' },
        ],
      },
    }));
  };

  const removeHospitalization = (index) => {
    setFormData((prev) => ({
      ...prev,
      medical: {
        ...prev.medical,
        hospitalizations: prev.medical.hospitalizations.filter(
          (_, i) => i !== index
        ),
      },
    }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach((key) => {
        if (key.startsWith(`medical.hospitalizations[${index}].`))
          delete newErrors[key];
      });
      return newErrors;
    });
  };

  // const validateStep = (step) => {
  //   const newErrors = {};
  //   if (step === 1) {
  //     if (!formData.name.trim() || formData.name.length < 2)
  //       newErrors.name =
  //         'Full Name is required and must be at least 2 characters';
  //     if (!formData.phone.trim() || !/^\+?[\d\s-]{7,15}$/.test(formData.phone))
  //       newErrors.phone = 'Valid phone number is required';
  //     if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
  //       newErrors.email = 'Valid email address is required';
  //     if (!formData.ssn.trim() || !/^\d{4}$/.test(formData.ssn))
  //       newErrors.ssn = 'SSN must be exactly 4 digits';
  //   }
  //    else if (step === 2) {
  //     if (formData.marriedOverTenOrDeceased === null)
  //       newErrors.marriedOverTenOrDeceased = 'Please select an option';
  //     if (formData.marriedOverTenOrDeceased) {
  //       if (!formData.spouseName.trim())
  //         newErrors.spouseName = 'Spouse name is required';
  //       if (!formData.spouseDOB.trim())
  //         newErrors.spouseDOB = 'Spouse date of birth is required';
  //       if (!formData.spouseSSN.trim() || !/^\d{4}$/.test(formData.spouseSSN))
  //         newErrors.spouseSSN = 'Spouse SSN must be exactly 4 digits';
  //     }
  //   }

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const validateStep = (step) => {
    const newErrors = {};
    const currentDate = new Date();
    const twoYearsAgo = new Date(currentDate);
    twoYearsAgo.setFullYear(currentDate.getFullYear() - 2);
    if (step === 1) {
      // Step 1 validation remains strict (all fields required)
      if (!formData.name.trim() || formData.name.length < 2)
        newErrors.name =
          'Full Name is required and must be at least 2 characters';
      if (!formData.phone.trim() || !/^\+?[\d\s-]{7,15}$/.test(formData.phone))
        newErrors.phone = 'Valid phone number is required';
      if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
        newErrors.email = 'Valid email address is required';
      if (!formData.ssn.trim() || !/^\d{4}$/.test(formData.ssn))
        newErrors.ssn = 'SSN must be exactly 4 digits';
    } else if (step === 2) {
      // Step 2 validation remains strict (all fields required based on selection)
      if (formData.marriedOverTenOrDeceased === null)
        newErrors.marriedOverTenOrDeceased = 'Please select an option';
      if (formData.marriedOverTenOrDeceased) {
        if (!formData.spouseName.trim())
          newErrors.spouseName = 'Spouse name is required';
        if (!formData.spouseDOB.trim())
          newErrors.spouseDOB = 'Spouse date of birth is required';
        if (!formData.spouseSSN.trim() || !/^\d{4}$/.test(formData.spouseSSN))
          newErrors.spouseSSN = 'Spouse SSN must be exactly 4 digits';
      }
    } else if (step === 3) {
      // Step 3 validation - only validate fields that have values
      formData.jobs.forEach((job, index) => {
        if (job.business.trim() && job.business.length < 2) {
          newErrors[`jobs[${index}].business`] =
            'Business name must be at least 2 characters if provided';
        }
        if (job.title.trim() && job.title.length < 2) {
          newErrors[`jobs[${index}].title`] =
            'Job title must be at least 2 characters if provided';
        }
        if (job.startDate.trim() && !/^\d{4}-\d{2}$/.test(job.startDate)) {
          newErrors[`jobs[${index}].startDate`] =
            'Invalid start date format (YYYY-MM) if provided';
        }
        if (
          job.endDate.trim() &&
          job.endDate !== 'present' &&
          !/^\d{4}-\d{2}$/.test(job.endDate)
        ) {
          newErrors[`jobs[${index}].endDate`] =
            'Invalid end date format (YYYY-MM) if provided';
        }
        if (job.payAmount.trim() && !/^\d+(\.\d{1,2})?$/.test(job.payAmount)) {
          newErrors[`jobs[${index}].payAmount`] =
            'Invalid pay amount if provided';
        }
        if (job.payAmount.trim() && !job.payFrequency.trim()) {
          newErrors[`jobs[${index}].payFrequency`] =
            'Pay frequency is required if pay amount is provided';
        }
      });
    } else if (step === 4) {
      // Validate treatment end date if provided
      if (formData.medical.treatmentEndDate.trim()) {
        const treatmentEndDate = new Date(formData.medical.treatmentEndDate);
        if (isNaN(treatmentEndDate.getTime())) {
          newErrors['medical.treatmentEndDate'] =
            'Invalid date format (YYYY-MM)';
        } else if (
          treatmentEndDate < twoYearsAgo ||
          treatmentEndDate > currentDate
        ) {
          newErrors['medical.treatmentEndDate'] =
            'Treatment end date must be within the last two years';
        }
      }

      // Validate primary care fields if provided
      if (
        formData.medical.primaryCare.name.trim() &&
        formData.medical.primaryCare.name.length < 2
      ) {
        newErrors['medical.primaryCare.name'] =
          'Doctor name must be at least 2 characters if provided';
      }

      if (
        formData.medical.primaryCare.testing.trim() &&
        formData.medical.primaryCare.testing.length < 2
      ) {
        newErrors['medical.primaryCare.testing'] =
          'Testing must be at least 2 characters if provided';
      }

      if (
        formData.medical.primaryCare.address.trim() &&
        formData.medical.primaryCare.address.length < 2
      ) {
        newErrors['medical.primaryCare.address'] =
          'Address must be at least 2 characters if provided';
      }

      if (
        formData.medical.primaryCare.zipCode.trim() &&
        !/^\d{5}$/.test(formData.medical.primaryCare.zipCode)
      ) {
        newErrors['medical.primaryCare.zipCode'] =
          'Zip code must be exactly 5 digits if provided';
      }

      if (
        formData.medical.primaryCare.city.trim() &&
        formData.medical.primaryCare.city.length < 2
      ) {
        newErrors['medical.primaryCare.city'] =
          'City must be at least 2 characters if provided';
      }

      if (
        formData.medical.primaryCare.state.trim() &&
        !/^[A-Za-z]{2}$/.test(formData.medical.primaryCare.state)
      ) {
        newErrors['medical.primaryCare.state'] =
          'State must be exactly 2 characters if provided';
      }

      if (
        formData.medical.primaryCare.phone.trim() &&
        !/^\+?[\d\s-]{7,15}$/.test(formData.medical.primaryCare.phone)
      ) {
        newErrors['medical.primaryCare.phone'] =
          'Valid phone number is required if provided';
      }

      // Validate specialist fields if provided
      if (
        formData.medical.specialist.name.trim() &&
        formData.medical.specialist.name.length < 2
      ) {
        newErrors['medical.specialist.name'] =
          'Specialist name must be at least 2 characters if provided';
      }

      if (
        formData.medical.specialist.specialty.trim() &&
        formData.medical.specialist.specialty.length < 2
      ) {
        newErrors['medical.specialist.specialty'] =
          'Specialty must be at least 2 characters if provided';
      }

      if (
        formData.medical.specialist.testing.trim() &&
        formData.medical.specialist.testing.length < 2
      ) {
        newErrors['medical.specialist.testing'] =
          'Testing must be at least 2 characters if provided';
      }

      if (
        formData.medical.specialist.address.trim() &&
        formData.medical.specialist.address.length < 2
      ) {
        newErrors['medical.specialist.address'] =
          'Address must be at least 2 characters if provided';
      }

      if (
        formData.medical.specialist.zipCode.trim() &&
        !/^\d{5}$/.test(formData.medical.specialist.zipCode)
      ) {
        newErrors['medical.specialist.zipCode'] =
          'Zip code must be exactly 5 digits if provided';
      }

      if (
        formData.medical.specialist.city.trim() &&
        formData.medical.specialist.city.length < 2
      ) {
        newErrors['medical.specialist.city'] =
          'City must be at least 2 characters if provided';
      }

      if (
        formData.medical.specialist.state.trim() &&
        !/^[A-Za-z]{2}$/.test(formData.medical.specialist.state)
      ) {
        newErrors['medical.specialist.state'] =
          'State must be exactly 2 characters if provided';
      }

      if (
        formData.medical.specialist.phone.trim() &&
        !/^\+?[\d\s-]{7,15}$/.test(formData.medical.specialist.phone)
      ) {
        newErrors['medical.specialist.phone'] =
          'Valid phone number is required if provided';
      }

      // Validate additional doctors fields if provided
      formData.medical.additionalDoctors.forEach((doctor, index) => {
        if (doctor.name.trim() && doctor.name.length < 2) {
          newErrors[`medical.additionalDoctors[${index}].name`] =
            'Doctor name must be at least 2 characters if provided';
        }

        if (doctor.city.trim() && doctor.city.length < 2) {
          newErrors[`medical.additionalDoctors[${index}].city`] =
            'City must be at least 2 characters if provided';
        }

        if (doctor.phone.trim() && !/^\+?[\d\s-]{7,15}$/.test(doctor.phone)) {
          newErrors[`medical.additionalDoctors[${index}].phone`] =
            'Valid phone number is required if provided';
        }

        if (doctor.state.trim() && !/^[A-Za-z]{2}$/.test(doctor.state)) {
          newErrors[`medical.additionalDoctors[${index}].state`] =
            'State must be exactly 2 characters if provided';
        }

        if (doctor.address.trim() && doctor.address.length < 2) {
          newErrors[`medical.additionalDoctors[${index}].address`] =
            'Address must be at least 2 characters if provided';
        }

        if (doctor.zipCode.trim() && !/^\d{5}$/.test(doctor.zipCode)) {
          newErrors[`medical.additionalDoctors[${index}].zipCode`] =
            'Zip code must be exactly 5 digits if provided';
        }
      });

      // Validate hospitalizations fields if provided
      formData.medical.hospitalizations.forEach((hosp, index) => {
        if (hosp.name.trim() && hosp.name.length < 2) {
          newErrors[`medical.hospitalizations[${index}].name`] =
            'Facility name must be at least 2 characters if provided';
        }

        if (hosp.address.trim() && hosp.address.length < 2) {
          newErrors[`medical.hospitalizations[${index}].address`] =
            'Address must be at least 2 characters if provided';
        }

        if (hosp.phone.trim() && !/^\+?[\d\s-]{7,15}$/.test(hosp.phone)) {
          newErrors[`medical.hospitalizations[${index}].phone`] =
            'Valid phone number is required if provided';
        }

        if (hosp.reason.trim() && hosp.reason.length < 2) {
          newErrors[`medical.hospitalizations[${index}].reason`] =
            'Reason must be at least 2 characters if provided';
        }

        if (hosp.date.trim() && !/^\d{4}-\d{2}$/.test(hosp.date)) {
          newErrors[`medical.hospitalizations[${index}].date`] =
            'Invalid date format (YYYY-MM) if provided';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = async () => {
    if (validateStep(currentStep)) {
      setLoading(true);
      try {
        if (currentStep < 4) {
          if (currentStep === 1 && avatarRef.current) {
            await avatarRef.current.speak({
              // text: "Now let's go over your marital history. We'll ask: Were you married over 10 years, or did your spouse pass away during your marriage? Your spouse's or prior spouse's name, Their date of birth, Their SSN. This helps us determine eligibility for specific benefits.",
              text: "Now let's go over your marital history.",
              taskType: TaskType.TALK,
              taskMode: TaskMode.SYNC,
            });
          } else if (currentStep === 2 && avatarRef.current) {
            await avatarRef.current.speak({
              // text: "Now let's talk about your employment history over the past 5 years. You can list up to five employers. For each job, we'll ask: Type of business, Job title, Start and end dates (approximate is fine), How you were paid (hourly, monthly, etc.). This helps us build your employment timeline.",
              text: "Now let's talk about your employment history,  You can list up to five employers. Let me know if you need anything.",
              taskType: TaskType.TALK,
              taskMode: TaskMode.SYNC,
            });
          } else if (currentStep === 3 && avatarRef.current) {
            await avatarRef.current.speak({
              // text: "Now we'll ask about your recent medical history from the last 2 years. Please provide: Primary care/family doctor's name, Any specialists you've seen, Special tests/imaging (e.g., X-rays, MRIs), Addresses, cities, ZIPs, and phone numbers (if known), Hospital visits, surgeries, ER visits, etc.",
              text: 'This section will cover your medical history and other important details. Please let me know if you need any assistance.',
              taskType: TaskType.TALK,
              taskMode: TaskMode.SYNC,
            });
          }
          setCurrentStep(currentStep + 1);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!acceptedDisclaimer) {
  //     setErrors({
  //       ...errors,
  //       disclaimer: 'You must accept the disclaimer to proceed',
  //     });
  //     return;
  //   }

  //   setLoading(true)
  //   if (validateStep(currentStep)) {
  //     const submissionData = { ...formData };
  //     if (!formData.marriedOverTenOrDeceased) {
  //       delete submissionData.spouseName;
  //       delete submissionData.spouseDOB;
  //       delete submissionData.spouseSSN;
  //     }
  //     submissionData.medical.additionalDoctors =
  //       submissionData.medical.additionalDoctors.filter(
  //         (doc) =>
  //           doc.name.trim() ||
  //           doc.city.trim() ||
  //           doc.phone.trim() ||
  //           doc.state.trim()
  //       );
  //     submissionData.medical.hospitalizations =
  //       submissionData.medical.hospitalizations.filter(
  //         (hosp) =>
  //           hosp.name.trim() ||
  //           hosp.address.trim() ||
  //           hosp.phone.trim() ||
  //           hosp.reason.trim() ||
  //           hosp.date.trim()
  //       );

  //     try {
  //       await onSubmit(submissionData);
  //       // Clear saved data on successful submission
  //       clearFormDataFromLocal();
  //       // Show success message
  //       setLoading(false)
  //       Swal.fire({
  //         title: 'Thank you!',
  //         text: 'Your information has been submitted successfully. Our team will reach out to you soon.',
  //         icon: 'success',
  //         confirmButtonText: 'OK',
  //       });
  //     } catch (error) {
  //       console.error('Submission error:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the disclaimer is accepted
    if (!acceptedDisclaimer) {
      setErrors({
        ...errors,
        disclaimer: 'You must accept the disclaimer to proceed',
      });
      return;
    }

    // Validate the current step
    const isValid = validateStep(currentStep);

    // If there are validation errors, do not proceed
    if (!isValid) {
      // Optionally, notify the user that there are validation errors
      console.log('Validation errors exist. Please correct them.');
      return;
    }

    setLoading(true);

    try {
      const submissionData = { ...formData };
      if (!formData.marriedOverTenOrDeceased) {
        delete submissionData.spouseName;
        delete submissionData.spouseDOB;
        delete submissionData.spouseSSN;
      }

      submissionData.medical.additionalDoctors =
        submissionData.medical.additionalDoctors.filter(
          (doc) =>
            doc.name.trim() ||
            doc.city.trim() ||
            doc.phone.trim() ||
            doc.state.trim()
        );

      submissionData.medical.hospitalizations =
        submissionData.medical.hospitalizations.filter(
          (hosp) =>
            hosp.name.trim() ||
            hosp.address.trim() ||
            hosp.phone.trim() ||
            hosp.reason.trim() ||
            hosp.date.trim()
        );

      await onSubmit(submissionData);

      // Clear saved data on successful submission
      clearFormDataFromLocal();

      // Show success message
      Swal.fire({
        title: 'Thank you!',
        text: 'Your information has been submitted successfully. Our team will reach out to you soon.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onCancel(); // This calls the parent's onCancel
    setToggleForm(true);
  };

  return (
    <div className='bg-[var(--card-bg)] rounded-xl shadow-md h-full flex flex-col overflow-hidden border border-[var(--border-color)]'>
      <div className='border-b-[0.2px] border-[var(--border-color)]  text-[var(--label-text)] px-4 py-3 flex justify-between items-center'>
        <h2 className='font-semibold flex items-center gap-2'>
          <User size={20} />
          {currentStep === 1
            ? 'User Information'
            : currentStep === 2
            ? 'Marriage Information'
            : currentStep === 3
            ? 'Employment Information'
            : 'Medical Information'}{' '}
          (Step {currentStep} of 4)
        </h2>

        <div className='flex items-center gap-2'>
          Chat
          <button onClick={handleCancel} className='text-[var(--label-text)] '>
            {/* <ArrowDown /> */}
            <ToggleRight />
          </button>
          Form
        </div>
        {console.log('FORMDATA', formData)}
      </div>
      <div className='flex-1 p-6  overflow-y-auto bg-[var(--card-bg)]  '>
        <form className='space-y-4'>
          {currentStep === 1 && (
            <>
              <div>
                <label className='block text-sm font-medium text-[var(--label-text)]  mb-1'>
                  Full Name *
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                    errors.name
                      ? 'border-red-500'
                      : 'border-[var(--border-color)]'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]   `}
                  placeholder='Enter your full name'
                />
                {errors.name && (
                  <p className='text-red-500 text-xs mt-1'>{errors.name}</p>
                )}
              </div>
              <div>
                <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                  Phone Number *
                </label>
                <input
                  type='tel'
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                    errors.phone
                      ? 'border-red-500'
                      : 'border-[var(--border-color)]'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                  placeholder='Enter your phone number'
                />
                {errors.phone && (
                  <p className='text-red-500 text-xs mt-1'>{errors.phone}</p>
                )}
              </div>
              <div>
                <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                  Email Address *
                </label>
                <input
                  type='email'
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full px-3 text-[var(--input-text)] py-2 border ${
                    errors.email
                      ? 'border-red-500'
                      : 'border-[var(--border-color)]'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                  placeholder='Enter your email address'
                />
                {errors.email && (
                  <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
                )}
              </div>
              <div>
                <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                  Last 4 Digits of SSN *
                </label>
                <input
                  type='text'
                  maxLength='4'
                  value={formData.ssn}
                  onChange={(e) =>
                    handleChange('ssn', e.target.value.replace(/\D/g, ''))
                  }
                  className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                    errors.ssn
                      ? 'border-red-500'
                      : 'border-[var(--border-color)]'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                  placeholder='Enter last 4 digits'
                />
                {errors.ssn && (
                  <p className='text-red-500 text-xs mt-1'>{errors.ssn}</p>
                )}
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div>
                <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                  Were you married over 10 years or did your spouse pass away
                  during your marriage? *
                </label>
                <div className='flex gap-4'>
                  <label className='flex text-[var(--input-text)] items-center gap-2'>
                    <input
                      type='radio'
                      name='marriedOverTenOrDeceased'
                      checked={formData.marriedOverTenOrDeceased === true}
                      onChange={() =>
                        handleChange('marriedOverTenOrDeceased', true)
                      }
                      className='form-radio'
                    />
                    Yes
                  </label>
                  <label className='flex items-center text-[var(--input-text)] gap-2'>
                    <input
                      type='radio'
                      name='marriedOverTenOrDeceased'
                      checked={formData.marriedOverTenOrDeceased === false}
                      onChange={() =>
                        handleChange('marriedOverTenOrDeceased', false)
                      }
                      className='form-radio text-[var(--input-text)]'
                    />
                    No
                  </label>
                </div>
                {errors.marriedOverTenOrDeceased && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.marriedOverTenOrDeceased}
                  </p>
                )}
              </div>
              {formData.marriedOverTenOrDeceased && (
                <>
                  <div>
                    <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                      Name of Spouse/Prior Spouse *
                    </label>
                    <input
                      type='text'
                      value={formData.spouseName}
                      onChange={(e) =>
                        handleChange('spouseName', e.target.value)
                      }
                      className={`w-full px-3 text-[var(--input-text)] py-2 border ${
                        errors.spouseName
                          ? 'border-red-500'
                          : 'border-[var(--border-color)]'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                      placeholder="Enter spouse's full name"
                    />
                    {errors.spouseName && (
                      <p className='text-red-500 text-xs mt-1'>
                        {errors.spouseName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                      Spouse Date of Birth *
                    </label>
                    <input
                      type='date'
                      value={formData.spouseDOB}
                      onChange={(e) =>
                        handleChange('spouseDOB', e.target.value)
                      }
                      className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                        errors.spouseDOB
                          ? 'border-red-500'
                          : 'border-[var(--border-color)]'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                    />
                    {errors.spouseDOB && (
                      <p className='text-red-500 text-xs mt-1'>
                        {errors.spouseDOB}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                      Spouse Last 4 Digits of SSN *
                    </label>
                    <input
                      type='text'
                      maxLength='4'
                      value={formData.spouseSSN}
                      onChange={(e) =>
                        handleChange(
                          'spouseSSN',
                          e.target.value.replace(/\D/g, '')
                        )
                      }
                      className={`w-full px-3 text-[var(--input-text)] py-2 border ${
                        errors.spouseSSN
                          ? 'border-red-500'
                          : 'border-[var(--border-color)]'
                      } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                      placeholder='Enter last 4 digits'
                    />
                    {errors.spouseSSN && (
                      <p className='text-red-500 text-xs mt-1'>
                        {errors.spouseSSN}
                      </p>
                    )}
                  </div>
                </>
              )}
            </>
          )}
          {currentStep === 3 && (
            <>
              <h3 className='text-lg font-medium text-[var(--label-text)] mb-4'>
                Employment Information (Up to 5 most recent employers)
              </h3>
              {formData.jobs.map((job, index) => (
                <div
                  key={index}
                  className='border p-4 rounded-md mb-4 relative'
                >
                  <h4 className='text-md text-[var(--primary-color)] font-semibold mb-2'>
                    Job {index + 1}
                  </h4>
                  {formData.jobs.length > 1 && (
                    <button
                      type='button'
                      onClick={() => removeJob(index)}
                      className='absolute top-2 right-2 text-red-500 hover:text-red-700'
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Kind of Business *
                      </label>
                      <input
                        type='text'
                        value={job.business}
                        onChange={(e) =>
                          handleChange('business', e.target.value, index)
                        }
                        className={`w-full px-3 text-[var(--input-text)] py-2 border ${
                          errors[`jobs[${index}].business`]
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='e.g., Retail, Software Development'
                      />
                      {errors[`jobs[${index}].business`] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors[`jobs[${index}].business`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Job Title *
                      </label>
                      <input
                        type='text'
                        value={job.title}
                        onChange={(e) =>
                          handleChange('title', e.target.value, index)
                        }
                        className={`w-full px-3 text-[var(--input-text)] py-2 border ${
                          errors[`jobs[${index}].title`]
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='e.g., Software Engineer'
                      />
                      {errors[`jobs[${index}].title`] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors[`jobs[${index}].title`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Start Date (Month/Year) *
                      </label>
                      <input
                        type='month'
                        value={job.startDate}
                        onChange={(e) =>
                          handleChange('startDate', e.target.value, index)
                        }
                        className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                          errors[`jobs[${index}].startDate`]
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                      />
                      {errors[`jobs[${index}].startDate`] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors[`jobs[${index}].startDate`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        End Date (Month/Year or Present) *
                      </label>
                      <div className='flex gap-2'>
                        <input
                          type='month'
                          value={job.endDate === 'present' ? '' : job.endDate}
                          onChange={(e) =>
                            handleChange('endDate', e.target.value, index)
                          }
                          className={`w-full px-3 text-[var(--input-text)] py-2 border ${
                            errors[`jobs[${index}].endDate`]
                              ? 'border-red-500'
                              : 'border-[var(--border-color)]'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                          disabled={job.endDate === 'present'}
                        />
                        <label className='flex items-center gap-2 text-[var(--primary-color)]'>
                          <input
                            type='checkbox'
                            checked={job.endDate === 'present'}
                            onChange={(e) =>
                              handleChange(
                                'endDate',
                                e.target.checked ? 'present' : '',
                                index
                              )
                            }
                            className='form-checkbox  '
                          />
                          Present
                        </label>
                      </div>
                      {errors[`jobs[${index}].endDate`] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors[`jobs[${index}].endDate`]}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Pay *
                      </label>
                      <div className='flex gap-2'>
                        <input
                          type='number'
                          value={job.payAmount}
                          onChange={(e) =>
                            handleChange('payAmount', e.target.value, index)
                          }
                          className={`w-2/3  px-3 text-[var(--input-text)] py-2 border ${
                            errors[`jobs[${index}].payAmount`]
                              ? 'border-red-500'
                              : 'border-[var(--border-color)]'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                          placeholder='e.g., 50000'
                          min='0'
                          step='0.01'
                        />
                        <select
                          value={job.payFrequency}
                          onChange={(e) =>
                            handleChange('payFrequency', e.target.value, index)
                          }
                          className={`w-1/3 px-3 text-[var(--input-text)] py-2 border ${
                            errors[`jobs[${index}].payFrequency`]
                              ? 'border-red-500'
                              : 'border-[var(--border-color)]'
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        >
                          <option value=''>Select frequency</option>
                          <option value='hourly'>Hourly</option>
                          <option value='biweekly'>Biweekly</option>
                          <option value='monthly'>Monthly</option>
                          <option value='annually'>Annually</option>
                        </select>
                      </div>
                      {errors[`jobs[${index}].payAmount`] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors[`jobs[${index}].payAmount`]}
                        </p>
                      )}
                      {errors[`jobs[${index}].payFrequency`] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors[`jobs[${index}].payFrequency`]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {errors.jobs && (
                <p className='text-red-500 text-xs mt-1'>{errors.jobs}</p>
              )}
              {formData.jobs.length < 5 && (
                <button
                  type='button'
                  onClick={addJob}
                  className='flex-1 py-2 px-4 border  text-[var(--primary-color)] border-[var(--border-color)] rounded-md hover:text-[var(--bg-color)] hover:bg-[var(--chat-user-bg)] disabled:opacity-50'
                >
                  Add Job
                </button>
              )}
            </>
          )}
          {currentStep === 4 && (
            <>
              <h3 className='text-lg font-medium text-[var(--label-text)] mb-4'>
                Medical Information
              </h3>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                    Please provide medical treatment information for the last
                    two years.
                  </label>
                  <input
                    type='month'
                    value={formData.medical.treatmentEndDate}
                    onChange={(e) =>
                      handleChange(
                        'treatmentEndDate',
                        e.target.value,
                        null,
                        null,
                        null,
                        'medical'
                      )
                    }
                    className={`w-full px-3 text-[var(--input-text)] py-2 border ${
                      errors['medical.treatmentEndDate']
                        ? 'border-red-500'
                        : 'border-[var(--border-color)]'
                    } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                  />
                  {errors['medical.treatmentEndDate'] && (
                    <p className='text-red-500 text-xs mt-1'>
                      {errors['medical.treatmentEndDate']}
                    </p>
                  )}
                </div>
                <div className='border border-[var(--input-text)]  p-4 rounded-md'>
                  <h4 className='text-md text-[var(--input-text)] font-semibold mb-2'>
                    Primary Care/Family Doctor
                  </h4>
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Doctor Name
                      </label>
                      <input
                        type='text'
                        value={formData.medical.primaryCare.name}
                        onChange={(e) =>
                          handleChange(
                            'name',
                            e.target.value,
                            null,
                            null,
                            null,
                            'primaryCare'
                          )
                        }
                        className={`w-full px-3 text-[var(--input-text)] py-2 border ${
                          errors['medical.primaryCare.name']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='Enter doctor name'
                      />
                      {errors['medical.primaryCare.name'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.primaryCare.name']}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Special Testing/Imaging Ordered
                      </label>
                      <input
                        type='text'
                        value={formData.medical.primaryCare.testing}
                        onChange={(e) =>
                          handleChange(
                            'testing',
                            e.target.value,
                            null,
                            null,
                            null,
                            'primaryCare'
                          )
                        }
                        className={`w-full px-3 text-[var(--input-text)] py-2 border ${
                          errors['medical.primaryCare.testing']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='e.g., MRI, Blood Test'
                      />
                      {errors['medical.primaryCare.testing'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.primaryCare.testing']}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Address
                      </label>
                      <input
                        type='text'
                        value={formData.medical.primaryCare.address}
                        onChange={(e) =>
                          handleChange(
                            'address',
                            e.target.value,
                            null,
                            null,
                            null,
                            'primaryCare'
                          )
                        }
                        className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                          errors['medical.primaryCare.address']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='Enter address'
                      />
                      {errors['medical.primaryCare.address'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.primaryCare.address']}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Zip Code
                      </label>
                      <input
                        type='text'
                        maxLength='5'
                        value={formData.medical.primaryCare.zipCode}
                        onChange={(e) =>
                          handleChange(
                            'zipCode',
                            e.target.value.replace(/\D/g, ''),
                            null,
                            null,
                            null,
                            'primaryCare'
                          )
                        }
                        className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                          errors['medical.primaryCare.zipCode']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='Enter 5-digit zip code'
                      />
                      {errors['medical.primaryCare.zipCode'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.primaryCare.zipCode']}
                        </p>
                      )}
                    </div>

                    {/* Add these new fields */}
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        City
                      </label>
                      <input
                        type='text'
                        value={formData.medical.primaryCare.city}
                        onChange={(e) =>
                          handleChange(
                            'city',
                            e.target.value,
                            null,
                            null,
                            null,
                            'primaryCare'
                          )
                        }
                        className={`w-full px-3 text-[var(--input-text)] py-2 border ${
                          errors['medical.primaryCare.city']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='Enter city'
                      />
                      {errors['medical.primaryCare.city'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.primaryCare.city']}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        State
                      </label>
                      <input
                        type='text'
                        maxLength='2'
                        value={formData.medical.primaryCare.state}
                        onChange={(e) =>
                          handleChange(
                            'state',
                            e.target.value.toUpperCase(),
                            null,
                            null,
                            null,
                            'primaryCare'
                          )
                        }
                        className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                          errors['medical.primaryCare.state']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='e.g., CA'
                      />
                      {errors['medical.primaryCare.state'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.primaryCare.state']}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Phone
                      </label>
                      <input
                        type='tel'
                        value={formData.medical.primaryCare.phone}
                        onChange={(e) =>
                          handleChange(
                            'phone',
                            e.target.value,
                            null,
                            null,
                            null,
                            'primaryCare'
                          )
                        }
                        className={`w-full px-3 text-[var(--input-text)] py-2 border ${
                          errors['medical.primaryCare.phone']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='Enter phone number'
                      />
                      {errors['medical.primaryCare.phone'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.primaryCare.phone']}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Approximate date (month/year)
                      </label>
                      <input
                        type='month'
                        value={formData.medical.primaryCare.date}
                        onChange={(e) =>
                          handleChange(
                            'date',
                            e.target.value,
                            null,
                            null,
                            null,
                            'primaryCare'
                          )
                        }
                        className={`w-full px-3 py-2 text-[var(--input-text)] border ${
                          errors['medical.primaryCare.date']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                      />
                      {errors['medical.primaryCare.date'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.primaryCare.date']}
                        </p>
                      )}
                    </div>

                    {/* new filed */}
                  </div>
                </div>
                <div className='border border-[var(--input-text)]  p-4 rounded-md'>
                  <h4 className='text-md text-[var(--input-text)] font-semibold mb-2'>
                    Specialist Doctor
                  </h4>
                  <div className='space-y-4'>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Doctor Name
                      </label>
                      <input
                        type='text'
                        value={formData.medical.specialist.name}
                        onChange={(e) =>
                          handleChange(
                            'name',
                            e.target.value,
                            null,
                            null,
                            null,
                            'specialist'
                          )
                        }
                        className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                          errors['medical.specialist.name']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='Enter specialist name'
                      />
                      {errors['medical.specialist.name'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.specialist.name']}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Area of Specialty
                      </label>
                      <input
                        type='text'
                        value={formData.medical.specialist.specialty}
                        onChange={(e) =>
                          handleChange(
                            'specialty',
                            e.target.value,
                            null,
                            null,
                            null,
                            'specialist'
                          )
                        }
                        className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                          errors['medical.specialist.specialty']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='e.g., Cardiology'
                      />
                      {errors['medical.specialist.specialty'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.specialist.specialty']}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Special Testing/Imaging Ordered
                      </label>
                      <input
                        type='text'
                        value={formData.medical.specialist.testing}
                        onChange={(e) =>
                          handleChange(
                            'testing',
                            e.target.value,
                            null,
                            null,
                            null,
                            'specialist'
                          )
                        }
                        className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                          errors['medical.specialist.testing']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='e.g., CT Scan'
                      />
                      {errors['medical.specialist.testing'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.specialist.testing']}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Address
                      </label>
                      <input
                        type='text'
                        value={formData.medical.specialist.address}
                        onChange={(e) =>
                          handleChange(
                            'address',
                            e.target.value,
                            null,
                            null,
                            null,
                            'specialist'
                          )
                        }
                        className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                          errors['medical.specialist.address']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='Enter address'
                      />
                      {errors['medical.specialist.address'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.specialist.address']}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Zip Code
                      </label>
                      <input
                        type='text'
                        maxLength='5'
                        value={formData.medical.specialist.zipCode}
                        onChange={(e) =>
                          handleChange(
                            'zipCode',
                            e.target.value.replace(/\D/g, ''),
                            null,
                            null,
                            null,
                            'specialist'
                          )
                        }
                        className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                          errors['medical.specialist.zipCode']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='Enter 5-digit zip code'
                      />
                      {errors['medical.specialist.zipCode'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.specialist.zipCode']}
                        </p>
                      )}
                    </div>

                    {/* Add these new fields */}
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        City
                      </label>
                      <input
                        type='text'
                        value={formData.medical.specialist.city}
                        onChange={(e) =>
                          handleChange(
                            'city',
                            e.target.value,
                            null,
                            null,
                            null,
                            'specialist'
                          )
                        }
                        className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                          errors['medical.specialist.city']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='Enter city'
                      />
                      {errors['medical.specialist.city'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.specialist.city']}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        State
                      </label>
                      <input
                        type='text'
                        maxLength='2'
                        value={formData.medical.specialist.state}
                        onChange={(e) =>
                          handleChange(
                            'state',
                            e.target.value.toUpperCase(),
                            null,
                            null,
                            null,
                            'specialist'
                          )
                        }
                        className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                          errors['medical.specialist.state']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='e.g., CA'
                      />
                      {errors['medical.specialist.state'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.specialist.state']}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Phone
                      </label>
                      <input
                        type='tel'
                        value={formData.medical.specialist.phone}
                        onChange={(e) =>
                          handleChange(
                            'phone',
                            e.target.value,
                            null,
                            null,
                            null,
                            'specialist'
                          )
                        }
                        className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                          errors['medical.specialist.phone']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                        placeholder='Enter phone number'
                      />
                      {errors['medical.specialist.phone'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.specialist.phone']}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                        Approximate date (month/year)
                      </label>
                      <input
                        type='month'
                        value={formData.medical.specialist.date}
                        onChange={(e) =>
                          handleChange(
                            'date',
                            e.target.value,
                            null,
                            null,
                            null,
                            'specialist'
                          )
                        }
                        className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                          errors['medical.specialist.date']
                            ? 'border-red-500'
                            : 'border-[var(--border-color)]'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                      />
                      {errors['medical.specialist.date'] && (
                        <p className='text-red-500 text-xs mt-1'>
                          {errors['medical.specialist.date']}
                        </p>
                      )}
                    </div>

                    {/* specialist new fileds  */}
                  </div>
                </div>
                <div className='border border-[var(--input-text)] p-4 rounded-md'>
                  <h4 className='text-md text-[var(--input-text)] font-semibold mb-2'>
                    Additional Doctors
                  </h4>
                  {formData.medical.additionalDoctors.map((doctor, index) => (
                    <div
                      key={index}
                      className='border border-[var(--input-text)]  p-4 rounded-md mb-4 relative'
                    >
                      <h5 className='text-sm font-semibold text-[var(--input-text)] mb-2'>
                        Doctor {index + 1}
                      </h5>
                      {formData.medical.additionalDoctors.length > 1 && (
                        <button
                          type='button'
                          onClick={() => removeDoctor(index)}
                          className='absolute top-2 right-2 text-red-500 hover:text-red-700'
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                      <div className='space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                            Doctor Name
                          </label>
                          <input
                            type='text'
                            value={doctor.name}
                            onChange={(e) =>
                              handleChange('name', e.target.value, null, index)
                            }
                            className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                              errors[`medical.additionalDoctors[${index}].name`]
                                ? 'border-red-500'
                                : 'border-[var(--border-color)]'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                            placeholder='Enter doctor name'
                          />
                          {errors[
                            `medical.additionalDoctors[${index}].name`
                          ] && (
                            <p className='text-red-500 text-xs mt-1'>
                              {
                                errors[
                                  `medical.additionalDoctors[${index}].name`
                                ]
                              }
                            </p>
                          )}
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                            City
                          </label>
                          <input
                            type='text'
                            value={doctor.city}
                            onChange={(e) =>
                              handleChange('city', e.target.value, null, index)
                            }
                            className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                              errors[`medical.additionalDoctors[${index}].city`]
                                ? 'border-red-500'
                                : 'border-[var(--border-color)]'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                            placeholder='Enter city'
                          />
                          {errors[
                            `medical.additionalDoctors[${index}].city`
                          ] && (
                            <p className='text-red-500 text-xs mt-1'>
                              {
                                errors[
                                  `medical.additionalDoctors[${index}].city`
                                ]
                              }
                            </p>
                          )}
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                            Phone
                          </label>
                          <input
                            type='tel'
                            value={doctor.phone}
                            onChange={(e) =>
                              handleChange('phone', e.target.value, null, index)
                            }
                            className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                              errors[
                                `medical.additionalDoctors[${index}].phone`
                              ]
                                ? 'border-red-500'
                                : 'border-[var(--border-color)]'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                            placeholder='Enter phone number'
                          />
                          {errors[
                            `medical.additionalDoctors[${index}].phone`
                          ] && (
                            <p className='text-red-500 text-xs mt-1'>
                              {
                                errors[
                                  `medical.additionalDoctors[${index}].phone`
                                ]
                              }
                            </p>
                          )}
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                            State
                          </label>
                          <input
                            type='text'
                            maxLength='2'
                            value={doctor.state}
                            onChange={(e) =>
                              handleChange(
                                'state',
                                e.target.value.toUpperCase(),
                                null,
                                index
                              )
                            }
                            className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                              errors[
                                `medical.additionalDoctors[${index}].state`
                              ]
                                ? 'border-red-500'
                                : 'border-[var(--border-color)]'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                            placeholder='e.g., CA'
                          />
                          {errors[
                            `medical.additionalDoctors[${index}].state`
                          ] && (
                            <p className='text-red-500 text-xs mt-1'>
                              {
                                errors[
                                  `medical.additionalDoctors[${index}].state`
                                ]
                              }
                            </p>
                          )}
                        </div>

                        {/* Add these new fields */}
                        <div>
                          <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                            Address
                          </label>
                          <input
                            type='text'
                            value={doctor.address}
                            onChange={(e) =>
                              handleChange(
                                'address',
                                e.target.value,
                                null,
                                index
                              )
                            }
                            className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                              errors[
                                `medical.additionalDoctors[${index}].address`
                              ]
                                ? 'border-red-500'
                                : 'border-[var(--border-color)]'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                            placeholder='Enter address'
                          />
                          {errors[
                            `medical.additionalDoctors[${index}].address`
                          ] && (
                            <p className='text-red-500 text-xs mt-1'>
                              {
                                errors[
                                  `medical.additionalDoctors[${index}].address`
                                ]
                              }
                            </p>
                          )}
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                            Zip Code
                          </label>
                          <input
                            type='text'
                            maxLength='5'
                            value={doctor.zipCode}
                            onChange={(e) =>
                              handleChange(
                                'zipCode',
                                e.target.value.replace(/\D/g, ''),
                                null,
                                index
                              )
                            }
                            className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                              errors[
                                `medical.additionalDoctors[${index}].zipCode`
                              ]
                                ? 'border-red-500'
                                : 'border-[var(--border-color)]'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                            placeholder='Enter 5-digit zip code'
                          />
                          {errors[
                            `medical.additionalDoctors[${index}].zipCode`
                          ] && (
                            <p className='text-red-500 text-xs mt-1'>
                              {
                                errors[
                                  `medical.additionalDoctors[${index}].zipCode`
                                ]
                              }
                            </p>
                          )}
                        </div>

                        <div>
                          <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                            Approximate date (month/year)
                          </label>
                          <input
                            type='month'
                            value={doctor.date}
                            onChange={(e) =>
                              handleChange('date', e.target.value, null, index)
                            }
                            className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                              errors[`medical.additionalDoctors[${index}].date`]
                                ? 'border-red-500'
                                : 'border-[var(--border-color)]'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                          />
                          {errors[
                            `medical.additionalDoctors[${index}].date`
                          ] && (
                            <p className='text-red-500 text-xs mt-1'>
                              {
                                errors[
                                  `medical.additionalDoctors[${index}].date`
                                ]
                              }
                            </p>
                          )}
                        </div>
                        {/* new extd */}
                      </div>
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={addDoctor}
                    className='flex-1 py-2 px-4 border  text-[var(--primary-color)] border-[var(--border-color)] rounded-md hover:text-[var(--bg-color)] hover:bg-[var(--chat-user-bg)] disabled:opacity-50'
                  >
                    Add Doctor
                  </button>
                </div>
                <div className='border border-[var(--input-text)]  p-4 rounded-md'>
                  <h4 className='text-md font-medium text-[var(--label-text)] mb-2'>
                    Hospitalizations, Surgeries, ER Visits, or Important Medical
                    Testing/Imaging
                  </h4>
                  {formData.medical.hospitalizations.map((hosp, index) => (
                    <div
                      key={index}
                      className='border border-[var(--input-text)]  p-4 rounded-md mb-4 relative'
                    >
                      <h5 className='text-sm text-[var(--input-text)] font-semibold mb-2'>
                        Entry {index + 1}
                      </h5>
                      {formData.medical.hospitalizations.length > 1 && (
                        <button
                          type='button'
                          onClick={() => removeHospitalization(index)}
                          className='absolute top-2 right-2 text-red-500 hover:text-red-700'
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                      <div className='space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                            Facility Name
                          </label>
                          <input
                            type='text'
                            value={hosp.name}
                            onChange={(e) =>
                              handleChange(
                                'name',
                                e.target.value,
                                null,
                                null,
                                index
                              )
                            }
                            className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                              errors[`medical.hospitalizations[${index}].name`]
                                ? 'border-red-500'
                                : 'border-[var(--border-color)]'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                            placeholder='Enter facility name'
                          />
                          {errors[
                            `medical.hospitalizations[${index}].name`
                          ] && (
                            <p className='text-red-500 text-xs mt-1'>
                              {
                                errors[
                                  `medical.hospitalizations[${index}].name`
                                ]
                              }
                            </p>
                          )}
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                            Address
                          </label>
                          <input
                            type='text'
                            value={hosp.address}
                            onChange={(e) =>
                              handleChange(
                                'address',
                                e.target.value,
                                null,
                                null,
                                index
                              )
                            }
                            className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                              errors[
                                `medical.hospitalizations[${index}].address`
                              ]
                                ? 'border-red-500'
                                : 'border-[var(--border-color)]'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                            placeholder='Enter address'
                          />
                          {errors[
                            `medical.hospitalizations[${index}].address`
                          ] && (
                            <p className='text-red-500 text-xs mt-1'>
                              {
                                errors[
                                  `medical.hospitalizations[${index}].address`
                                ]
                              }
                            </p>
                          )}
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                            Phone
                          </label>
                          <input
                            type='tel'
                            value={hosp.phone}
                            onChange={(e) =>
                              handleChange(
                                'phone',
                                e.target.value,
                                null,
                                null,
                                index
                              )
                            }
                            className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                              errors[`medical.hospitalizations[${index}].phone`]
                                ? 'border-red-500'
                                : 'border-[var(--border-color)]'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                            placeholder='Enter phone number'
                          />
                          {errors[
                            `medical.hospitalizations[${index}].phone`
                          ] && (
                            <p className='text-red-500 text-xs mt-1'>
                              {
                                errors[
                                  `medical.hospitalizations[${index}].phone`
                                ]
                              }
                            </p>
                          )}
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                            Reason for Treatment
                          </label>
                          <input
                            type='text'
                            value={hosp.reason}
                            onChange={(e) =>
                              handleChange(
                                'reason',
                                e.target.value,
                                null,
                                null,
                                index
                              )
                            }
                            className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                              errors[
                                `medical.hospitalizations[${index}].reason`
                              ]
                                ? 'border-red-500'
                                : 'border-[var(--border-color)]'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                            placeholder='e.g., Appendectomy'
                          />
                          {errors[
                            `medical.hospitalizations[${index}].reason`
                          ] && (
                            <p className='text-red-500 text-xs mt-1'>
                              {
                                errors[
                                  `medical.hospitalizations[${index}].reason`
                                ]
                              }
                            </p>
                          )}
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-[var(--label-text)] mb-1'>
                            Approximate date (month/year)
                          </label>
                          <input
                            type='month'
                            value={hosp.date}
                            onChange={(e) =>
                              handleChange(
                                'date',
                                e.target.value,
                                null,
                                null,
                                index
                              )
                            }
                            className={`w-full text-[var(--input-text)] px-3 py-2 border ${
                              errors[`medical.hospitalizations[${index}].date`]
                                ? 'border-red-500'
                                : 'border-[var(--border-color)]'
                            } rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] bg-[var(--input-bg)]`}
                          />
                          {errors[
                            `medical.hospitalizations[${index}].date`
                          ] && (
                            <p className='text-red-500 text-xs mt-1'>
                              {
                                errors[
                                  `medical.hospitalizations[${index}].date`
                                ]
                              }
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={addHospitalization}
                    className=' flex-1 py-2 px-4 border  text-[var(--primary-color)] border-[var(--border-color)] rounded-md hover:text-[var(--bg-color)] hover:bg-[var(--chat-user-bg)] disabled:opacity-50'
                  >
                    Add Entry
                  </button>
                </div>
              </div>

              <div className='mt-4 p-4 bg-[var(--secondary-color)] rounded-md'>
                <label className='flex items-start space-x-2'>
                  <input
                    type='checkbox'
                    checked={acceptedDisclaimer}
                    onChange={(e) => {
                      setAcceptedDisclaimer(e.target.checked);
                      if (e.target.checked) {
                        setErrors({ ...errors, disclaimer: '' });
                      }
                    }}
                    className='mt-1'
                  />
                  <span className='text-sm text-[var(--input-text)]'>
                    I acknowledge that we have complete rights to use the
                    information provided in this form for processing my
                    application and related services.
                  </span>
                </label>
                {errors.disclaimer && (
                  <p className='text-red-500 text-xs mt-1'>
                    {errors.disclaimer}
                  </p>
                )}
              </div>
            </>
          )}

          <div className='flex gap-3 mt-6'>
            {currentStep > 1 && (
              <button
                type='button'
                onClick={handleBack}
                disabled={loading}
                className=' flex-1 py-2 px-4 border cursor-pointer  text-[var(--primary-color)] border-[var(--border-color)] rounded-md hover:text-[var(--bg-color)] hover:bg-[var(--chat-user-bg)] disabled:opacity-50'
              >
                Back
              </button>
            )}
            {currentStep < 4 ? (
              <button
                type='button'
                onClick={handleNext}
                disabled={loading}
                className='flex-1 py-2 cursor-pointer px-4 bg-[var(--primary-color)] text-[var(--bg-color)] rounded-md hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center'
              >
                {loading ? (
                  <>
                    {' '}
                    <Loader2 className='animate-spin mr-2' size={20} />{' '}
                    Processing...
                  </>
                ) : (
                  'Next'
                )}
              </button>
            ) : (
              <button
                type='button'
                onClick={handleSubmit}
                disabled={loading}
                className='flex-1 py-2 px-4 cursor-pointer bg-[var(--primary-color)] text-[var(--bg-color)] rounded-md hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center'
              >
                {loading ? (
                  <>
                    {' '}
                    <Loader2 className='animate-spin mr-2' size={20} />{' '}
                    Submitting...
                  </>
                ) : (
                  'Submit'
                )}
              </button>
            )}
            <button
              type='button'
              onClick={handleCancel}
              disabled={loading}
              className='flex-1 py-2 px-4 border cursor-pointer  text-[var(--primary-color)] border-[var(--border-color)] rounded-md hover:text-[var(--bg-color)] hover:bg-[var(--chat-user-bg)] disabled:opacity-50'
            >
              Cancel
            </button>
          </div>
        </form>
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

  // Track user activity
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

  // Update toggleTheme
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
  // Set up event listeners for user activity
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

  // Monitor inactivity and show prompt
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

  // Update activity when user interacts with chat
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

  const replaceEmptyWithNA = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(replaceEmptyWithNA);
    } else if (obj && typeof obj === 'object') {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
          if (typeof value === 'string' && value.trim() === '') {
            return [key, 'NA'];
          } else if (typeof value === 'object') {
            return [key, replaceEmptyWithNA(value)];
          } else {
            return [key, value];
          }
        })
      );
    }
    return obj;
  };

  const submitFormData = async (formData) => {
    let payload = {
      ...formData,
      timestamp: new Date().toISOString(),
      chatHistory: chat,
    };
    payload = replaceEmptyWithNA(payload);
    console.log(payload, 'Payload');

    try {
      const response = await fetch(
        'https://api.goodtogoapps.com/api/form-data',
        //  'http://localhost:3001/api/form-data',

        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...payload }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to submit form data: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Form data submitted successfully:', result);

      if (avatarRef.current && connectionStatus === 'connected') {
        await avatarRef.current.speak({
          text: 'Thanks for submitting your information.',
          taskType: TaskType.TALK,
          taskMode: TaskMode.SYNC,
        });
      }

      setShowForm(false);

      // Show success message
      Swal.fire({
        title: 'Thank you!',
        text: 'Your information has been submitted successfully. Our team will reach out to you soon.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // End the session after successful submission
      await endSession();
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
        text: 'Hi there! I am here to virtually help and guide you through the Social Security Application Prep Form. Each section is needed and important to move forward with your case. When ready to begin, type or say: ‘Ready to begin',
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

  // Clean up timers on unmount
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
    <div className=' bg-[var(--card-bg)] w-screen h-screen  '>
      <div className='p-4 md:p-8'>
        <div className='mx-auto p-4 flex justify-between items-center '>
          <img
            src='/linerlegallaw.png'
            className='w-[300px]'
            alt='Liner Legal Logo'
          />
          <button
            onClick={toggleTheme}
            className='p-2 rounded-full bg-[var(--primary-color)] text-[var(--bg-color)]  hover:text-white transition-colors'
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? (
              <span className='flex items-center gap-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z'
                    clipRule='evenodd'
                  />
                </svg>
                Light Mode
              </span>
            ) : (
              <span className='flex items-center gap-1'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-5 w-5'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
                </svg>
                Dark Mode
              </span>
            )}
          </button>
        </div>

        <div className='flex max-w-[1780px] mx-auto w-full gap-4 h-[calc(100vh-200px)]'>
          <div className='md:max-w-[50%] w-full'>
            <div className='bg-[var(--card-bg)] rounded-xl shadow-xl h-full flex flex-col'>
              <div className='flex-1 bg-[var(--secondary-color)] relative rounded-t-2xl'>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted={avatarMuted}
                  className={`w-full h-full object-cover rounded-t-2xl   ${
                    connectionStatus !== 'connected' ? 'hidden' : ''
                  }`}
                />
                {connectionStatus === 'connected' ? (
                  <>
                    <div className='absolute top-4 right-4 flex gap-2 z-10'>
                      <button
                        onClick={toggleMute}
                        className='p-2 text-[var(--card-bg)] bg-[var(--primary-color)]  rounded-full shadow-md ]'
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
                        className='p-2 text-[var(--card-bg)] bg-[var(--primary-color)] rounded-full shadow-md '
                        aria-label={isPaused ? 'Play' : 'Pause'}
                      >
                        {isPaused ? <Play size={20} /> : <Pause size={20} />}
                      </button>
                      <button
                        onClick={endSession}
                        className='p-2  bg-[var(--primary-color)] rounded-full cursor-pointer shadow-md  text-red-500'
                        aria-label='End Session'
                      >
                        End Session
                      </button>
                    </div>
                    <div className='absolute bottom-4 left-4 bg-[var(--card-bg)] px-3 py-1 rounded-lg shadow-md'>
                      <span className='w-2 h-2 rounded-full mr-2 bg-green-500 inline-block'></span>
                      <span className='text-sm text-[var(--primary-color)] font-medium'>
                        Connected
                      </span>
                    </div>
                    {errorMessage && (
                      <div className='absolute top-10 left-4 bg-red-100 border border-red-200 text-red-700 px-4 py-2 rounded-lg shadow-md'>
                        <span className='flex items-center gap-2'>
                          <AlertTriangle size={20} />
                          {errorMessage}
                        </span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className='h-full flex flex-col items-center justify-center p-6'>
                    <div className='max-w-md w-full space-y-4'>
                      <h2 className='text-xl font-semibold text-center text-[var(--primary-color)]'>
                        Start Your Avatar Session
                      </h2>
                      {errorMessage && (
                        <div className='bg-red-100 border border-red-200 text-red-700 px-4 py-2 rounded-lg'>
                          <span className='flex items-center gap-2'>
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
                            ? '   bg-gradient-to-br from-[#097FCD] to-[#0B3759] text-white'
                            : 'bg-gradient-to-br from-[#097FCD] to-[#0B3759] text-white  '
                        }`}
                      >
                        {isLoading ? (
                          <span className='flex items-center justify-center gap-2'>
                            <Loader2 className='animate-spin' size={20} />
                            Initializing...
                          </span>
                        ) : (
                          <span className='flex items-center justify-center gap-2'>
                            <Play size={20} />
                            Start Session
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className=' p-4'>
                <div className='flex'>
                  <button
                    onClick={() => handleChatModeChange('text_mode')}
                    className={`flex-1 cursor-pointer py-2 font-medium ${
                      chatMode === 'text_mode'
                        ? 'text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]'
                        : 'text-[var(--primary-color)]'
                    }`}
                    aria-label='Text Mode'
                  >
                    <span className='flex items-center justify-center gap-2'>
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
                    aria-label='Voice Mode'
                  >
                    <span className='flex items-center justify-center gap-2'>
                      <Mic size={18} />
                      Voice Mode
                    </span>
                  </button>
                </div>

                {chatMode === 'text_mode' ? (
                  <div className='flex gap-2 mt-4'>
                    <input
                      type='text'
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSpeak()}
                      placeholder='Type your message here...'
                      className='flex-1 p-2 border rounded-full focus:outline-none text-[var(--primary-color)] border-[var(--primary-color)] disabled:bg-[var(--secondary-color)]'
                      disabled={connectionStatus !== 'connected' || showForm}
                      aria-label='Type your message'
                    />
                    <button
                      onClick={handleSpeak}
                      disabled={
                        !text.trim() ||
                        connectionStatus !== 'connected' ||
                        showForm
                      }
                      className='p-2 bg-[var(--primary-color)] text-[var(--bg-color)] rounded-full disabled:bg-gray-300 hover:bg-blue-700'
                      aria-label='Send message'
                    >
                      <Send size={20} />
                    </button>
                  </div>
                ) : (
                  <div
                    className={`p-3 mt-4 rounded-full text-center ${
                      isUserTalking
                        ? ' bg-gradient-to-br from-[#097FCD] to-[#0B3759] text-white'
                        : ' bg-gradient-to-br from-[#097FCD] to-[#0B3759] text-white'
                    }`}
                  >
                    {isUserTalking ? (
                      <span className='flex items-center justify-center gap-2'>
                        <Mic className='text-white animate-pulse' size={20} />
                        Listening...
                      </span>
                    ) : (
                      <span className='flex text-white  items-center justify-center gap-2'>
                        <Mic className='text-white' size={20} />
                        Speak to interact
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className='md:max-w-[50%] w-full'>
            {showForm ? (
              <MultiStepForm
                onSubmit={submitFormData}
                onCancel={() => setShowForm(false)}
                avatarRef={avatarRef}
                toggleForm={toggleForm}
                setToggleForm={setToggleForm}
              />
            ) : (
              <div className='bg-[var(--card-bg)] flex rounded-2xl shadow-xl h-full flex-col'>
                <div className=' bg-[var(--card-bg)]  border border-[var(--border-color)] rounded-t-2xl text-[var(--primary-color)] px-6 py-3 flex justify-between items-center'>
                  <h3 className='flex items-center gap-2 font-semibold'>
                    <MessageSquare size={20} />
                    Chat History
                  </h3>
                  <div className='flex items-center gap-2'>
                    Chat
                    <button
                      onClick={() => {
                        setToggleForm(false);
                        setShowForm(!showForm);
                      }}
                      disabled={chat.length === 0}
                      aria-label='Toggle Form'
                    >
                      <ToggleLeft />
                    </button>
                    Form
                  </div>
                </div>
                <div
                  ref={chatContainerRef}
                  className='p-4 flex-1 bg-[var(--secondary-color)] rounded-b-2xl overflow-y-auto'
                >
                  {chat.length === 0 ? (
                    <div className='h-full flex items-center justify-center flex-col'>
                      <MessageSquare
                        size={40}
                        className='text-[var(--primary-color)] mb-4'
                      />
                      <p className='text-[var(--primary-color)]'>
                        No messages yet
                      </p>
                      <p className='text-[var(--primary-color)] text-sm mt-2'>
                        {connectionStatus === 'connected'
                          ? 'Start chatting with the avatar!'
                          : 'Start a session to begin chatting.'}
                      </p>
                    </div>
                  ) : (
                    // <div className='space-y-4'>
                    //   {chat.map((msg, index) => {
                    //     const prevMsg = index > 0 ? chat[index - 1] : null;
                    //     const showHeader =
                    //       !prevMsg || prevMsg.type !== msg.type;
                    //     return (
                    //       <div
                    //         key={index}
                    //         className={`flex ${msg.type === 'user'
                    //           ? 'justify-end'
                    //           : 'justify-start'
                    //           }`}
                    //       >
                    //         <div
                    //           className={`p-2 max-w-md ${msg.type === 'user'
                    //             ?'bg-[var(--chat-user-bg)] text-[var(--chat-user-text)] rounded-br-none'
                    //             : 'bg-[var(--chat-avatar-bg)] text-[var(--chat-avatar-text)] rounded-bl-none'
                    //             }`}
                    //         >
                    //           {showHeader && (
                    //             <p className='text-xs font-bold mb-1'>
                    //               {msg.type === 'user' ? (
                    //                 <span className='flex items-center gap-1'>
                    //                   <User size={12} />
                    //                   You
                    //                 </span>
                    //               ) : (
                    //                 <span className='flex items-center gap-1'>
                    //                   <svg
                    //                     xmlns='http://www.w3.org/2000/svg'
                    //                     viewBox='0 0 12 7.8'
                    //                     className='w-[30px] h-[30px] fill-[#097fcd]'
                    //                   >
                    //                     <title>SCREENAsset 6mdpi</title>
                    //                     <g id='Layer_2' data-name='Layer 2'>
                    //                       <g id='Layer_1-2' data-name='Layer 1'>
                    //                         <path d='M1.73,2.38a12.63,12.63,0,0,1,1.21.89l.41.33a4.89,4.89,0,0,1-.1-.78L2.87,2.5,1.56,1.42a.19.19,0,0,1-.05-.09C1.36.52,0,.47,0,.47S.22,1.78,1.06,1.85A.15.15,0,0,1,1.2,2c0,.43.1.49.17.58a.45.45,0,0,1,.07.18,5.86,5.86,0,0,0,1,2.82,1.89,1.89,0,0,1,0-.43.11.11,0,0,1,.11-.09l.15,0a5.65,5.65,0,0,1-.91-1.82,4.15,4.15,0,0,1,.66,1.08A.56.56,0,0,1,3,4.45c0-.66-.62-1.27-1-1.67A1.17,1.17,0,0,1,1.73,2.38Zm1,.34C2.38,2.5,2,2.28,2,2.08,2.3,2.08,2.53,2.34,2.75,2.72ZM.4.8c.42.09.71.28.74.69C.85,1.57.65,1,.4.8Z' />
                    //                         <path d='M10.55,1.09a.13.13,0,0,1-.05.09L9.33,2.29,9,2.64a7,7,0,0,1-.1.83l.41-.38a10.58,10.58,0,0,1,1.12-.94,1.3,1.3,0,0,1-.22.42C9.85,3,9.27,3.64,9.32,4.3a.55.55,0,0,1,.41-.19A4.29,4.29,0,0,1,10.33,3a5.87,5.87,0,0,1-.8,1.87h.15A.11.11,0,0,1,9.8,5a1.73,1.73,0,0,1,0,.42,5.82,5.82,0,0,0,.86-2.88.64.64,0,0,1,.06-.18c.07-.1.15-.16.14-.59A.14.14,0,0,1,11,1.58c.83-.12,1-1.45,1-1.45S10.65.27,10.55,1.09ZM9.41,2.55c.19-.39.4-.66.66-.68C10.11,2.07,9.76,2.31,9.41,2.55Zm1.52-1.32c0-.42.28-.63.7-.74C11.39.74,11.22,1.29,10.93,1.23Z' />
                    //                         <path d='M4,5.45a2.89,2.89,0,0,1-.21.28A8.55,8.55,0,0,1,1.76,7.57a14.88,14.88,0,0,1,2-1.94L4,5.42a2.12,2.12,0,0,1-.11-.21l-.24.23-2,1.9V7.8H2L4,5.93l.24-.22A2.33,2.33,0,0,1,4,5.45Z' />
                    //                         <path d='M8.07,5.66a8.81,8.81,0,0,1,2.2,1.57A9.65,9.65,0,0,1,8.07,5.66Zm.36,0-.27-.19a4.38,4.38,0,0,1-.28.42l.27.2,2,1.39h.39V7.05Z' />
                    //                         <path d='M4,5.42l-.24.21.05.1A2.89,2.89,0,0,0,4,5.45ZM9.25.64A6.73,6.73,0,0,1,6.13,0,6.54,6.54,0,0,1,2.94.64a8.82,8.82,0,0,0-.08,1.58,2.53,2.53,0,0,0,0,.28,6.12,6.12,0,0,0,.07.77,6,6,0,0,0,.73,2.17l.11.19.05.1a2.43,2.43,0,0,1,.14.2A4.78,4.78,0,0,0,6.05,7.71h.1A4.81,4.81,0,0,0,8.15,6c.1-.14.19-.28.28-.43a6.14,6.14,0,0,0,.85-2.52,5.13,5.13,0,0,0,.05-.8.17.17,0,0,0,0-.07A7.76,7.76,0,0,0,9.25.64ZM8.87,3.47a5.59,5.59,0,0,1-.71,1.95,4.38,4.38,0,0,1-.28.42,4.47,4.47,0,0,1-1.81,1.5A4.34,4.34,0,0,1,4.21,5.71,2.33,2.33,0,0,1,4,5.45l0,0a2.12,2.12,0,0,1-.11-.21A5.63,5.63,0,0,1,3.35,3.6a4.89,4.89,0,0,1-.1-.78,5.74,5.74,0,0,1,0-.6c0-.36,0-.9,0-1.23A7.2,7.2,0,0,0,6.14.4,7.31,7.31,0,0,0,9,1c0,.33,0,.87,0,1.23,0,.14,0,.28,0,.42A7,7,0,0,1,8.87,3.47Z' />
                    //                         <path d='M7.25,5.2c0,.11-.06.14-.32.14l-.85,0H4.84c-.07,0-.1,0-.1-.05s0,0,.08,0l.18,0c.1,0,.13-.13.15-.27s0-.61,0-1.07V3c0-.77,0-.91,0-1.07s0-.25-.21-.28l-.17,0c-.06,0-.08,0-.08,0s0-.05.11-.05l.68,0,.68,0c.07,0,.11,0,.11.05s0,0-.09,0l-.2,0c-.13,0-.17.11-.18.28s0,.3,0,1.07v.88c0,.64,0,1,.1,1.08s.22.11.61.11a.8.8,0,0,0,.59-.14.67.67,0,0,0,.13-.3s0-.08,0-.08,0,0,0,.08A3.74,3.74,0,0,1,7.25,5.2Z' />
                    //                         <path d='M7.75,4.08c0,.07,0,.09-.19.09H6.33s-.06,0-.06,0,0,0,0,0h.11c.06,0,.08-.08.09-.16s0-.36,0-.63V2.78c0-.45,0-.54,0-.63S6.49,2,6.39,2h-.1s0,0,0,0,0,0,.07,0h.8s.07,0,.07,0,0,0-.06,0H7c-.08,0-.11.06-.11.17s0,.18,0,.63V3.3c0,.38,0,.58.06.63s.13.07.36.07.27,0,.35-.08a.58.58,0,0,0,.08-.18s0-.05,0-.05,0,0,0,.05A2.55,2.55,0,0,1,7.75,4.08Z' />
                    //                       </g>
                    //                     </g>
                    //                   </svg>
                    //                   Michael
                    //                 </span>
                    //               )}
                    //             </p>
                    //           )}
                    //           <p>{msg.message}</p>
                    //           <p className='text-gray-400 text-xs mt-1'>
                    //             {new Date(msg.timestamp).toLocaleTimeString()}
                    //           </p>
                    //         </div>
                    //       </div>
                    //     );
                    //   })}
                    // </div>
                    <div className='space-y-4 px-4 py-6'>
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
                                <p className='text-xs font-semibold mb-1 flex items-center gap-1'>
                                  {isUser ? (
                                    <>
                                      <User size={14} /> You
                                    </>
                                  ) : (
                                    <>
                                     {darkMode ? <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 12 7.8'
                                        className='w-[30px] h-[30px] fill-[#097fcd]'
                                      >
                                        <title>SCREENAsset 6mdpi</title>
                                        <g id='Layer_2' data-name='Layer 2'>
                                          <g id='Layer_1-2' data-name='Layer 1'>
                                            <path d='M1.73,2.38a12.63,12.63,0,0,1,1.21.89l.41.33a4.89,4.89,0,0,1-.1-.78L2.87,2.5,1.56,1.42a.19.19,0,0,1-.05-.09C1.36.52,0,.47,0,.47S.22,1.78,1.06,1.85A.15.15,0,0,1,1.2,2c0,.43.1.49.17.58a.45.45,0,0,1,.07.18,5.86,5.86,0,0,0,1,2.82,1.89,1.89,0,0,1,0-.43.11.11,0,0,1,.11-.09l.15,0a5.65,5.65,0,0,1-.91-1.82,4.15,4.15,0,0,1,.66,1.08A.56.56,0,0,1,3,4.45c0-.66-.62-1.27-1-1.67A1.17,1.17,0,0,1,1.73,2.38Zm1,.34C2.38,2.5,2,2.28,2,2.08,2.3,2.08,2.53,2.34,2.75,2.72ZM.4.8c.42.09.71.28.74.69C.85,1.57.65,1,.4.8Z' />
                                            <path d='M10.55,1.09a.13.13,0,0,1-.05.09L9.33,2.29,9,2.64a7,7,0,0,1-.1.83l.41-.38a10.58,10.58,0,0,1,1.12-.94,1.3,1.3,0,0,1-.22.42C9.85,3,9.27,3.64,9.32,4.3a.55.55,0,0,1,.41-.19A4.29,4.29,0,0,1,10.33,3a5.87,5.87,0,0,1-.8,1.87h.15A.11.11,0,0,1,9.8,5a1.73,1.73,0,0,1,0,.42,5.82,5.82,0,0,0,.86-2.88.64.64,0,0,1,.06-.18c.07-.1.15-.16.14-.59A.14.14,0,0,1,11,1.58c.83-.12,1-1.45,1-1.45S10.65.27,10.55,1.09ZM9.41,2.55c.19-.39.4-.66.66-.68C10.11,2.07,9.76,2.31,9.41,2.55Zm1.52-1.32c0-.42.28-.63.7-.74C11.39.74,11.22,1.29,10.93,1.23Z' />
                                            <path d='M4,5.45a2.89,2.89,0,0,1-.21.28A8.55,8.55,0,0,1,1.76,7.57a14.88,14.88,0,0,1,2-1.94L4,5.42a2.12,2.12,0,0,1-.11-.21l-.24.23-2,1.9V7.8H2L4,5.93l.24-.22A2.33,2.33,0,0,1,4,5.45Z' />
                                            <path d='M8.07,5.66a8.81,8.81,0,0,1,2.2,1.57A9.65,9.65,0,0,1,8.07,5.66Zm.36,0-.27-.19a4.38,4.38,0,0,1-.28.42l.27.2,2,1.39h.39V7.05Z' />
                                            <path d='M4,5.42l-.24.21.05.1A2.89,2.89,0,0,0,4,5.45ZM9.25.64A6.73,6.73,0,0,1,6.13,0,6.54,6.54,0,0,1,2.94.64a8.82,8.82,0,0,0-.08,1.58,2.53,2.53,0,0,0,0,.28,6.12,6.12,0,0,0,.07.77,6,6,0,0,0,.73,2.17l.11.19.05.1a2.43,2.43,0,0,1,.14.2A4.78,4.78,0,0,0,6.05,7.71h.1A4.81,4.81,0,0,0,8.15,6c.1-.14.19-.28.28-.43a6.14,6.14,0,0,0,.85-2.52,5.13,5.13,0,0,0,.05-.8.17.17,0,0,0,0-.07A7.76,7.76,0,0,0,9.25.64ZM8.87,3.47a5.59,5.59,0,0,1-.71,1.95,4.38,4.38,0,0,1-.28.42,4.47,4.47,0,0,1-1.81,1.5A4.34,4.34,0,0,1,4.21,5.71,2.33,2.33,0,0,1,4,5.45l0,0a2.12,2.12,0,0,1-.11-.21A5.63,5.63,0,0,1,3.35,3.6a4.89,4.89,0,0,1-.1-.78,5.74,5.74,0,0,1,0-.6c0-.36,0-.9,0-1.23A7.2,7.2,0,0,0,6.14.4,7.31,7.31,0,0,0,9,1c0,.33,0,.87,0,1.23,0,.14,0,.28,0,.42A7,7,0,0,1,8.87,3.47Z' />
                                            <path d='M7.25,5.2c0,.11-.06.14-.32.14l-.85,0H4.84c-.07,0-.1,0-.1-.05s0,0,.08,0l.18,0c.1,0,.13-.13.15-.27s0-.61,0-1.07V3c0-.77,0-.91,0-1.07s0-.25-.21-.28l-.17,0c-.06,0-.08,0-.08,0s0-.05.11-.05l.68,0,.68,0c.07,0,.11,0,.11.05s0,0-.09,0l-.2,0c-.13,0-.17.11-.18.28s0,.3,0,1.07v.88c0,.64,0,1,.1,1.08s.22.11.61.11a.8.8,0,0,0,.59-.14.67.67,0,0,0,.13-.3s0-.08,0-.08,0,0,0,.08A3.74,3.74,0,0,1,7.25,5.2Z' />
                                            <path d='M7.75,4.08c0,.07,0,.09-.19.09H6.33s-.06,0-.06,0,0,0,0,0h.11c.06,0,.08-.08.09-.16s0-.36,0-.63V2.78c0-.45,0-.54,0-.63S6.49,2,6.39,2h-.1s0,0,0,0,0,0,.07,0h.8s.07,0,.07,0,0,0-.06,0H7c-.08,0-.11.06-.11.17s0,.18,0,.63V3.3c0,.38,0,.58.06.63s.13.07.36.07.27,0,.35-.08a.58.58,0,0,0,.08-.18s0-.05,0-.05,0,0,0,.05A2.55,2.55,0,0,1,7.75,4.08Z' />
                                          </g>
                                        </g>
                                      </svg> : 
                                      <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 12 7.8'
                                        className='w-[30px] h-[30px] fill-[#ffffff]'
                                      >
                                        <title>SCREENAsset 6mdpi</title>
                                        <g id='Layer_2' data-name='Layer 2'>
                                          <g id='Layer_1-2' data-name='Layer 1'>
                                            <path d='M1.73,2.38a12.63,12.63,0,0,1,1.21.89l.41.33a4.89,4.89,0,0,1-.1-.78L2.87,2.5,1.56,1.42a.19.19,0,0,1-.05-.09C1.36.52,0,.47,0,.47S.22,1.78,1.06,1.85A.15.15,0,0,1,1.2,2c0,.43.1.49.17.58a.45.45,0,0,1,.07.18,5.86,5.86,0,0,0,1,2.82,1.89,1.89,0,0,1,0-.43.11.11,0,0,1,.11-.09l.15,0a5.65,5.65,0,0,1-.91-1.82,4.15,4.15,0,0,1,.66,1.08A.56.56,0,0,1,3,4.45c0-.66-.62-1.27-1-1.67A1.17,1.17,0,0,1,1.73,2.38Zm1,.34C2.38,2.5,2,2.28,2,2.08,2.3,2.08,2.53,2.34,2.75,2.72ZM.4.8c.42.09.71.28.74.69C.85,1.57.65,1,.4.8Z' />
                                            <path d='M10.55,1.09a.13.13,0,0,1-.05.09L9.33,2.29,9,2.64a7,7,0,0,1-.1.83l.41-.38a10.58,10.58,0,0,1,1.12-.94,1.3,1.3,0,0,1-.22.42C9.85,3,9.27,3.64,9.32,4.3a.55.55,0,0,1,.41-.19A4.29,4.29,0,0,1,10.33,3a5.87,5.87,0,0,1-.8,1.87h.15A.11.11,0,0,1,9.8,5a1.73,1.73,0,0,1,0,.42,5.82,5.82,0,0,0,.86-2.88.64.64,0,0,1,.06-.18c.07-.1.15-.16.14-.59A.14.14,0,0,1,11,1.58c.83-.12,1-1.45,1-1.45S10.65.27,10.55,1.09ZM9.41,2.55c.19-.39.4-.66.66-.68C10.11,2.07,9.76,2.31,9.41,2.55Zm1.52-1.32c0-.42.28-.63.7-.74C11.39.74,11.22,1.29,10.93,1.23Z' />
                                            <path d='M4,5.45a2.89,2.89,0,0,1-.21.28A8.55,8.55,0,0,1,1.76,7.57a14.88,14.88,0,0,1,2-1.94L4,5.42a2.12,2.12,0,0,1-.11-.21l-.24.23-2,1.9V7.8H2L4,5.93l.24-.22A2.33,2.33,0,0,1,4,5.45Z' />
                                            <path d='M8.07,5.66a8.81,8.81,0,0,1,2.2,1.57A9.65,9.65,0,0,1,8.07,5.66Zm.36,0-.27-.19a4.38,4.38,0,0,1-.28.42l.27.2,2,1.39h.39V7.05Z' />
                                            <path d='M4,5.42l-.24.21.05.1A2.89,2.89,0,0,0,4,5.45ZM9.25.64A6.73,6.73,0,0,1,6.13,0,6.54,6.54,0,0,1,2.94.64a8.82,8.82,0,0,0-.08,1.58,2.53,2.53,0,0,0,0,.28,6.12,6.12,0,0,0,.07.77,6,6,0,0,0,.73,2.17l.11.19.05.1a2.43,2.43,0,0,1,.14.2A4.78,4.78,0,0,0,6.05,7.71h.1A4.81,4.81,0,0,0,8.15,6c.1-.14.19-.28.28-.43a6.14,6.14,0,0,0,.85-2.52,5.13,5.13,0,0,0,.05-.8.17.17,0,0,0,0-.07A7.76,7.76,0,0,0,9.25.64ZM8.87,3.47a5.59,5.59,0,0,1-.71,1.95,4.38,4.38,0,0,1-.28.42,4.47,4.47,0,0,1-1.81,1.5A4.34,4.34,0,0,1,4.21,5.71,2.33,2.33,0,0,1,4,5.45l0,0a2.12,2.12,0,0,1-.11-.21A5.63,5.63,0,0,1,3.35,3.6a4.89,4.89,0,0,1-.1-.78,5.74,5.74,0,0,1,0-.6c0-.36,0-.9,0-1.23A7.2,7.2,0,0,0,6.14.4,7.31,7.31,0,0,0,9,1c0,.33,0,.87,0,1.23,0,.14,0,.28,0,.42A7,7,0,0,1,8.87,3.47Z' />
                                            <path d='M7.25,5.2c0,.11-.06.14-.32.14l-.85,0H4.84c-.07,0-.1,0-.1-.05s0,0,.08,0l.18,0c.1,0,.13-.13.15-.27s0-.61,0-1.07V3c0-.77,0-.91,0-1.07s0-.25-.21-.28l-.17,0c-.06,0-.08,0-.08,0s0-.05.11-.05l.68,0,.68,0c.07,0,.11,0,.11.05s0,0-.09,0l-.2,0c-.13,0-.17.11-.18.28s0,.3,0,1.07v.88c0,.64,0,1,.1,1.08s.22.11.61.11a.8.8,0,0,0,.59-.14.67.67,0,0,0,.13-.3s0-.08,0-.08,0,0,0,.08A3.74,3.74,0,0,1,7.25,5.2Z' />
                                            <path d='M7.75,4.08c0,.07,0,.09-.19.09H6.33s-.06,0-.06,0,0,0,0,0h.11c.06,0,.08-.08.09-.16s0-.36,0-.63V2.78c0-.45,0-.54,0-.63S6.49,2,6.39,2h-.1s0,0,0,0,0,0,.07,0h.8s.07,0,.07,0,0,0-.06,0H7c-.08,0-.11.06-.11.17s0,.18,0,.63V3.3c0,.38,0,.58.06.63s.13.07.36.07.27,0,.35-.08a.58.58,0,0,0,.08-.18s0-.05,0-.05,0,0,0,.05A2.55,2.55,0,0,1,7.75,4.08Z' />
                                          </g>
                                        </g>
                                      </svg>
                                      
                                      }
                                      Michael
                                    </>
                                  )}
                                </p>
                              )}

                              <p className='whitespace-pre-line leading-relaxed'>
                                {msg.message}
                              </p>

                              <p className='text-[10px] text-[var(--chat-user-text)] text-right mt-2'>
                                {new Date(msg.timestamp).toLocaleTimeString(
                                  [],
                                  {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  }
                                )}
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
