
import React, { useState } from 'react';

const WorkHistoryReport = () => {
  // State for form data
  const [formData, setFormData] = useState({
    // Section 1 - Information About You
    q190_name: 'Deve111loper.',
    q326_socialSecurity: '123-45-6789',
    q327_primary327: '(155) 123-4567',
    q328_secondaryif328: '(555) 987-6543',

    // Section 2 - Work History (Matrix) - 5 jobs
    q197_jobs: [
      ['Cashier', 'Grocery Store', '01/2020', '06/2022'],
      ['Warehouse Associate', 'Retail Distribution', '07/2018', '12/2019'],
      ['Customer Service Rep', 'Telecommunications', '03/2017', '06/2018'],
      ['Delivery Driver', 'Logistics Company', '09/2016', '02/2017'],
      ['Retail Sales', 'Clothing Store', '04/2015', '08/2016'],
   ['Cashier', 'Grocery Store', '01/2020', '06/2022'],
      ['Warehouse Associate', 'Retail Distribution', '07/2018', '12/2019'],
      ['Customer Service Rep', 'Telecommunications', '03/2017', '06/2018'],
      ['Delivery Driver', 'Logistics Company', '09/2016', '02/2017'],
      ['Retail Sales', 'Clothing Store', '04/2015', '08/2016'],
    ],

    // Job 1 Details
    q199_jobTitle: 'Cashier',
    q330_rateOf330: '15.50',
    q331_percheck331: ['Hour'],
    q332_hoursPer332: '8',
    q333_daysPer333: '5',
    q334_forThe334: 'Processed customer transactions, handled cash register, provided customer service, restocked shelves, and maintained clean work area.',
    q335_ifAny335: 'Completed daily sales reports which took about 30 minutes per shift.',
    q206_ifAny206: 'Supervised 2-3 baggers during shifts, assigned tasks, and provided training to new employees.',
    q207_listThe: 'Used cash register (POS system), barcode scanner, and credit card terminal daily.',
    q209_didThis: ['Yes'],
    q208_listThe208: 'Interacted with customers for about 7 hours per day, answering questions about products and processing purchases.',
    q340_activities340: [
      ['6 hours'], // Standing and walking
      ['2 hours'], // Sitting
      ['3 hours'], // Stooping
      ['30 minutes'], // Kneeling
      ['1 hour'], // Crouching
      ['None'], // Crawling
      ['15 minutes'], // Climbing stairs
      ['None'], // Climbing ladders

    ],
    q212_activities212: [
      // First row - Using fingers to touch, pick, or pinch
      [
        true,     // #input_212_0_0 (One Hand checkbox)
        false,   // #input_212_0_1 (Both Hands checkbox)
        "6 hours" // #input_212_0_2 (Text input)
      ],
      // Second row - Using hands to seize, hold, grasp, or turn
      [
        true,     // #input_212_1_0
        '',   // #input_212_1_1
        "3 hours" // #input_212_1_2
      ],

    ],
    q213_activities213: [
      [
        true,
        '',
        '20 mins'
      ],
      [
        '',
        true,
        '24 hours'
      ]

    ],
    q341_tellUs341: [
      'No additional comments for this job.'
    ],
    q342_selectThe342: [

      'Less than 1 lb.',
      'Less than 10 lbs.',
      '20 lbs.',
      '50 lbs.',
      '100 lbs. or more',
      'other details are here test tes111t',
    ],
     q343_selectThe: [

      'Less than 1 lb.',
      'Less than 10 lbs.',
      '20 lbs.',
      '50 lbs.',
      '100 lbs. or more',
      'other details are here test tes111t',
    ],
    q344_didThis344:[
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
      'othernoicecefefesfsefesfkjhes'

    ],
    q345_ifOne345: 'No exposure',
    q346_explainHow346: 'No exposure to environmental factors was noted during the job.',


    // Job 2 Details
    q221_jobTitle221: 'Warehouse Associate',
    q222_rateOf222: '18.00',
    q223_percheck223: ['Hour'],
    q224_hoursPer224: '10',
    q225_daysPer225: '4',
    q226_forThe226: 'Managed inventory, operated forklift, loaded/unloaded trucks, and ensured warehouse organization.',
    q227_ifAny227: 'Prepared weekly inventory reports, taking approximately 1 hour per week.',
    q228_ifAny228: 'No supervisory duties assigned.',
    q229_listThe229: 'Used forklift, pallet jack, and handheld scanner for inventory management.',
    q230_didThis230: ['Yes'],
    q231_ifYes: 'Interacted with shipping personnel for about 3 hours per day to coordinate deliveries.',
    q233_activities233: [
      ['4 hours'], // Standing and walking
      ['6 hours'], // Sitting
      ['2 hours'], // Stooping
      ['1 hour'], // Kneeling
      ['30 minutes'], // Crouching
      ['None'], // Crawling
      ['45 minutes'], // Climbing stairs
      ['15 minutes'] // Climbing ladders
    ],




     q234_activities234: [
      // First row - Using fingers to touch, pick, or pinch
      [
        true,     // #input_212_0_0 (One Hand checkbox)
        false,   // #input_212_0_1 (Both Hands checkbox)
        "6 hours" // #input_212_0_2 (Text input)
      ],
      // Second row - Using hands to seize, hold, grasp, or turn
      [
        true,     // #input_212_1_0
        '',   // #input_212_1_1
        "3 hours" // #input_212_1_2
      ],

    ],
    q235_activities235: [
      [
        true,
        '',
        '20 mins'
      ],
      [
        '',
        true,
        '24 hours'
      ]

    ],
    q236_tellUs236: [
      'No additional comments for this job.'
    ],
    q237_selectThe237: [

      'Less than 1 lb.',
      'Less than 10 lbs.',
      '20 lbs.',
      '50 lbs.',
      '100 lbs. or more',
      'other details are here test tes111t',
    ],
     q238_selectThe238: [

      'Less than 1 lb.',
      'Less than 10 lbs.',
      '20 lbs.',
      '50 lbs.',
      '100 lbs. or more',
      'other details are here test tes111t',
    ],
    q239_didThis239:[
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
      'othernoicecefefesfsefesfkjhes'

    ],
    q240_ifOne240: 'No exposure',
    q241_explainHow241: 'No exposure to environmental factors was noted during the job.',












    // Job 3 Details
    q243_jobTitle243: 'Customer Service Rep',
    q244_rateOf244: '16.75',
    q245_percheck245: ['Day'],
    q246_hoursPer246: '7',
    q247_daysPer247: '5',
    q248_forThe248: 'Handled customer inquiries, processed orders, resolved complaints, and updated account records.',
    q249_ifAny249: 'Completed call logs and customer feedback reports, taking about 1 hour per day.',
    q250_ifAny250: 'No supervisory responsibilities.',
    q251_listThe251: 'Used telephone system, computer with CRM software, and headset daily.',
    q252_didThis252: ['Yes'],
    q253_ifYes253: 'Interacted with customers via phone for approximately 5 hours per day.',
    q255_activities255: [
      ['2 hours'], // Standing and walking
      ['5 hours'], // Sitting
      ['1 hour'], // Stooping
      ['None'], // Kneeling
      ['30 minutes'], // Crouching
      ['None'], // Crawling
      ['15 minutes'], // Climbing stairs
      ['None'] // Climbing ladders
    ],


     q256_activities256: [
      // First row - Using fingers to touch, pick, or pinch
      [
        true,     // #input_212_0_0 (One Hand checkbox)
        false,   // #input_212_0_1 (Both Hands checkbox)
        "6 hours" // #input_212_0_2 (Text input)
      ],
      // Second row - Using hands to seize, hold, grasp, or turn
      [
        true,     // #input_212_1_0
        '',   // #input_212_1_1
        "3 hours" // #input_212_1_2
      ],

    ],
    q257_activities257: [
      [
        true,
        '',
        '20 mins'
      ],
      [
        '',
        true,
        '24 hours'
      ]

    ],
    q258_tellUs258: [
      'No additional comments for this job.'
    ],
    q259_selectThe259: [

      'Less than 1 lb.',
      'Less than 10 lbs.',
      '20 lbs.',
      '50 lbs.',
      '100 lbs. or more',
      'other details are here test tes111t',
    ],
     q260_selectThe260: [

      'Less than 1 lb.',
      'Less than 10 lbs.',
      '20 lbs.',
      '50 lbs.',
      '100 lbs. or more',
      'other details are here test tes111t',
    ],
    q261_didThis261:[
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
      'othernoicecefefesfsefesfkjhes'

    ],
    q262_ifOne262: 'No exposure',
    q263_explainHow263: 'No exposure to environmental factors was noted during the job.',






    // Job 4 Details
    q265_jobTitle265: 'Office Administrator',
    q266_rateOf266: '20.00',
    q267_percheck267: ['Hour'],
    q268_hoursPer268: '8',
    q269_daysPer269: '5',
    q270_forThe270: 'Managed office operations, scheduled appointments, handled correspondence, maintained files, and ordered supplies.',
    q271_ifAny271: 'Prepared monthly expense reports which took about 2 hours per month.',
    q272_ifAny272: 'Supervised 1-2 interns, assigning tasks and reviewing their work.',
    q273_listThe273: 'Used computer with MS Office, multi-line phone system, and photocopier daily.',
    q274_didThis274: ['Yes'],
    q275_ifYes275: 'Interacted with staff and clients for about 4 hours per day, answering phones and greeting visitors.',
    q277_activities277: [
      ['3 hours'], // Standing and walking
      ['5 hours'], // Sitting
      ['1 hour'], // Stooping
      ['None'], // Kneeling
      ['30 minutes'], // Crouching
      ['None'], // Crawling
      ['15 minutes'], // Climbing stairs
      ['None'] // Climbing ladders
    ],
    q276_activities278: [
      [
        true,
        '',
        '6 hours'
      ],
      [
        true,
        '',
        '3 hours'
      ]
    ],
    q278_activities279: [
      [
        true,
        '',
        '15 mins'
      ],
      [
        '',
        true,
        '8 hours'
      ]
    ],
    q280_tellUs280: [
      'Occasionally worked overtime during busy periods.'
    ],
    q281_selectThe281: [
      'Less than 1 lb.',
      'Less than 10 lbs.',
      '20 lbs.',
      'other details are here test tes111t',
    ],
    q282_selectThe282: [
      'Less than 1 lb.',
      'Less than 10 lbs.',
      'other details are here test tes111t',
    ],
    q283_didThis283: [
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
      'othernoicece1efesfsefesfkjhes'

    ],
    q284_ifOne284: 'Minimal exposure',
    q285_explainHow285: 'Occasional exposure to printer toner and office cleaning chemicals.',

    // Job 5 Details
    q287_jobTitle287: 'Landscaper',
    q288_rateOf288: '17.50',
    q289_percheck289: ['Hour'],
    q290_hoursPer290: '9',
    q291_daysPer291: '4',
    q292_forThe292: 'Maintained grounds, planted flowers/shrubs, mowed lawns, trimmed hedges, and applied fertilizers.',
    q293_ifAny293: 'Completed daily equipment maintenance logs, taking about 15 minutes per day.',
    q294_ifAny294: 'No supervisory duties.',
    q295_listThe295: 'Used lawn mower, hedge trimmer, leaf blower, and various hand tools daily.',
    q296_didThis296: ['Yes'],
    q297_ifYes297: 'Interacted with clients for about 1 hour per day to discuss landscaping needs.',
    q299_activities299: [
      ['7 hours'], // Standing and walking
      ['1 hour'], // Sitting
      ['3 hours'], // Stooping
      ['2 hours'], // Kneeling
      ['1 hour'], // Crouching
      ['30 minutes'], // Crawling
      ['None'], // Climbing stairs
      ['30 minutes'] // Climbing ladders
    ],
    q300_activities300: [
      [
        true,
        '',
        '6 hours'
      ],
      [
        true,
        '',
        '5 hours'
      ]
    ],
    q301_activities301: [
      [
        true,
        '',
        '1 hour'
      ],
      [
        '',
        true,
        '8 hours'
      ]
    ],
    q302_tellUs302: [
      'Worked in various weather conditions throughout the year.'
    ],
    q303_selectThe303: [
      'Less than 10 lbs.',
      '20 lbs.',
      '50 lbs.',
      '100 lbs. or more',
      'other details are here test tes111t',
    ],
    q304_selectThe304: [
      'Less than 10 lbs.',
      '20 lbs.',
      '50 lbs.',
      '100 lbs. or more',
      'other details are here test tes111t',
    ],
    q305_didThis305: [
      'Outdoors',
      'Extreme heat (non-weather related)',
      'Extreme cold (non-weather related)',
      'Wetness',
      'Humidity',
      'Hazardous substances',
      'Moving mechanical parts',
      'High, exposed places',
      'Loud noises',
      'othernoicecefefesfsefesfkjhes'
    ],
    q306_ifOne306: 'Frequent exposure',
    q307_explainHow307: 'test exposure to outdoor elements, loud equipment noise, and landscaping chemicals.',

    






    // Section 3 - Remarks
    q313_typeA: 'No additional remarks at this time.',

    // Section 4 - Who is Completing This Report
    q315_dateReport: new Date().toLocaleDateString('en-US'),
    q316_whoIs: ['Myself'],
    q317_name317: 'John A. Doe Jr.',
    q318_name318: 'Self',

    q319_mailingAddress: {
      addr_line1: '123 Main St',
      addr_line2: 'Apt 4B',
      city: 'Anytown',
      state: 'CA',
      postal: '90210',
      country: 'United States'
    },
    q320_daytimePhone: '(555) 123-4567'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      const currentValues = [...formData[name] || []];
      if (checked) {
        currentValues.push(value);
      } else {
        const index = currentValues.indexOf(value);
        if (index > -1) {
          currentValues.splice(index, 1);
        }
      }
      setFormData({ ...formData, [name]: currentValues });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMatrixChange = (section, row, col, value) => {
    const updatedMatrix = [...formData[section]];
    updatedMatrix[row][col] = value;
    setFormData({ ...formData, [section]: updatedMatrix });
  };

  const handleAddressChange = (field, value) => {
    setFormData({
      ...formData,
      q319_mailingAddress: {
        ...formData.q319_mailingAddress,
        [field]: value
      }
    });
  };


  const handleActivitiesChange = (rowIndex, field, value) => {
    setFormData(prev => {
      const updatedActivities = [...prev.q212_activities212];
      updatedActivities[rowIndex] = {
        ...updatedActivities[rowIndex],
        [field]: value
      };
      return {
        ...prev,
        q212_activities212: updatedActivities
      };
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    const submissionData = new FormData();
    console.log('Submitting form data:', formData);

    const flattenData = (data, parentKey = '') => {
      for (const key in data) {
        const fullKey = parentKey ? `${parentKey}[${key}]` : key;
        const value = data[key];

        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (Array.isArray(item)) {
              item.forEach((subItem, subIndex) => {
                submissionData.append(`${fullKey}[${index}][${subIndex}]`, subItem);
              });
            } else if (typeof item === 'object') {
              for (const subKey in item) {
                submissionData.append(`${fullKey}[${index}][${subKey}]`, item[subKey]);
              }
            } else {
              submissionData.append(`${fullKey}[${index}]`, item);
            }
          });
        } else if (typeof value === 'object') {
          flattenData(value, fullKey);
        } else {
          submissionData.append(fullKey, value);
        }
      }
    };

    flattenData(formData);

    try {
      const response = await fetch('https://submit.jotform.com/submit/241841575846062', {
        method: 'POST',
        body: submissionData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert('Form submitted successfully!');
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error submitting the form. Please try again.');
    }
  };




  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1 - Information About You */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SECTION 1 - INFORMATION ABOUT YOU</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="q190_name" className="block text-sm font-medium text-gray-700 mb-1">
                NAME <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="q190_name"
                name="q190_name"
                value={formData.q190_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="First, Middle Initial, Last, Suffix"
                required
              />
            </div>

            {/* Social Security Number */}
            <div className="mb-4">
              <label htmlFor="q326_socialSecurity" className="block text-sm font-medium text-gray-700 mb-1">
                SOCIAL SECURITY NUMBER <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="q326_socialSecurity"
                name="q326_socialSecurity"
                value={formData.q326_socialSecurity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="###-##-####"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">
              DAYTIME PHONE NUMBER(S) where we can call to speak with you or leave a message, if needed.
              Include area code or IDD and country code if outside the USA or Canada.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Primary Phone */}
              <div className="mb-4">
                <label htmlFor="q327_primary327" className="block text-sm font-medium text-gray-700 mb-1">
                  Primary: <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="q327_primary327"
                  name="q327_primary327"
                  value={formData.q327_primary327}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(###) ###-####"
                  required
                />
              </div>

              {/* Secondary Phone */}
              <div className="mb-4">
                <label htmlFor="q328_secondaryif328" className="block text-sm font-medium text-gray-700 mb-1">
                  Secondary: (if available)
                </label>
                <input
                  type="tel"
                  id="q328_secondaryif328"
                  name="q328_secondaryif328"
                  value={formData.q328_secondaryif328}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(###) ###-####"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2 - Work History */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SECTION 2 - WORK HISTORY</h2>

          <p className="text-sm text-gray-600 mb-4">
            List all the jobs you had in the <strong>5 years before you became unable to work</strong> because of your medical conditions:
          </p>

          <ul className="list-disc pl-5 text-sm text-gray-600 mb-4 space-y-1">
            <li>List your most recent job first</li>
            <li>List all job titles even if they were for the same employer</li>
            <li><strong>Do not include jobs you held less than 30 calendar days</strong></li>
            <li>Include self-employment (e.g., rideshare driver, hair stylist)</li>
            <li>Include work in a foreign country</li>
          </ul>

          {/* Jobs Matrix */}
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-blue-600 text-white">
                  <th className="px-4 py-2 border border-gray-300"></th>
                  <th className="px-4 py-2 border border-gray-300">
                    <label className="block font-normal">
                      <b>Job Title</b><br />(e.g., Cashier)
                    </label>
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    <label className="block font-normal">
                      <b>Type of Business</b><br />(e.g., Grocery Store)
                    </label>
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    <label className="block font-normal">
                      <b>Dates Worked From</b><br />(MM/YYYY)
                    </label>
                  </th>
                  <th className="px-4 py-2 border border-gray-300">
                    <label className="block font-normal">
                      <b>Dates Worked To</b><br />(MM/YYYY)
                    </label>
                  </th>
                </tr>
              </thead>
              <tbody>
                {formData.q197_jobs.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border border-gray-300 text-center">{rowIndex + 1}</td>
                    {row.map((cell, colIndex) => (
                      <td key={colIndex} className="px-2 py-1 border border-gray-300">
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => handleMatrixChange('q197_jobs', rowIndex, colIndex, e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          required={rowIndex < 3} // First 3 jobs are required in the dummy data
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Job 1 Details */}
          <div className="mt-8">
            <h3 className="text-md font-semibold text-gray-900 mb-2">
              Provide more information about Job No. 1 listed in Section 2. Estimate hours and pay, if needed.
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Title */}
              <div className="mb-4">
                <label htmlFor="q199_jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
                  JOB TITLE NO. 1
                </label>
                <input
                  type="text"
                  id="q199_jobTitle"
                  name="q199_jobTitle"
                  value={formData.q199_jobTitle}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Rate of Pay */}
              <div className="mb-4">
                <label htmlFor="q330_rateOf330" className="block text-sm font-medium text-gray-700 mb-1">
                  Rate of Pay:
                </label>
                <input
                  type="text"
                  id="q330_rateOf330"
                  name="q330_rateOf330"
                  value={formData.q330_rateOf330}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Per (Check One) */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Per (Check One):
              </label>
              <div className="flex flex-wrap gap-4">
                {['Hour', 'Day', 'Week', 'Month', 'Year'].map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      name="q331_percheck331"
                      value={option}
                      checked={formData.q331_percheck331.includes(option)}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Hours per Day */}
              <div className="mb-4">
                <label htmlFor="q332_hoursPer332" className="block text-sm font-medium text-gray-700 mb-1">
                  Hours per Day:
                </label>
                <input
                  type="number"
                  id="q332_hoursPer332"
                  name="q332_hoursPer332"
                  value={formData.q332_hoursPer332}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 3"
                />
              </div>

              {/* Days per Week */}
              <div className="mb-4">
                <label htmlFor="q333_daysPer333" className="block text-sm font-medium text-gray-700 mb-1">
                  Days per Week:
                </label>
                <input
                  type="number"
                  id="q333_daysPer333"
                  name="q333_daysPer333"
                  value={formData.q333_daysPer333}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., 4"
                />


              </div>
            </div>




            {/* Tasks Description */}
            <div className="mb-4">
              <label htmlFor="q334_forThe334" className="block text-sm font-medium text-gray-700 mb-1">
                For the job you listed in Job Title No. 1, describe in detail the tasks you did in a typical workday.
              </label>
              <textarea
                id="q334_forThe334"
                name="q334_forThe334"
                value={formData.q334_forThe334}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Reports Description */}
            <div className="mb-4">
              <label htmlFor="q335_ifAny335" className="block text-sm font-medium text-gray-700 mb-1">
                If any of the tasks listed above involved writing or completing reports, describe the type of report you wrote or completed and how much time you spent on it per workday or workweek.
              </label>
              <textarea
                id="q335_ifAny335"
                name="q335_ifAny335"
                value={formData.q335_ifAny335}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Supervisory Duties */}
            <div className="mb-4">
              <label htmlFor="q206_ifAny206" className="block text-sm font-medium text-gray-700 mb-1">
                If any of the tasks listed above involved supervising others, describe who or what you supervised and what supervisory duties you had.
              </label>
              <textarea
                id="q206_ifAny206"
                name="q206_ifAny206"
                value={formData.q206_ifAny206}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Equipment Used */}
            <div className="mb-4">
              <label htmlFor="q207_listThe" className="block text-sm font-medium text-gray-700 mb-1">
                List the machines, tools, and equipment you used regularly when doing this job, and explain what you used them for.
              </label>
              <textarea
                id="q207_listThe"
                name="q207_listThe"
                value={formData.q207_listThe}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Interaction Checkbox */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Did this job require you to interact with coworkers, the general public, or anyone else?
              </label>
              <div className="flex gap-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="q209_didThis"
                    value="Yes"
                    checked={formData.q209_didThis.includes('Yes')}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="q209_didThis"
                    value="No"
                    checked={formData.q209_didThis.includes('No')}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>

            {/* Interaction Description */}
            {formData.q209_didThis.includes('Yes') && (
              <div className="mb-4">
                <label htmlFor="q208_listThe208" className="block text-sm font-medium text-gray-700 mb-1">
                  If YES, describe who you interacted with, the purpose of the interaction, how you interacted, and how much time you spent doing it per workday or workweek.
                </label>
                <textarea
                  id="q208_listThe208"
                  name="q208_listThe208"
                  value={formData.q208_listThe208}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}

            {/* Physical Activities */}
            {/* <div className="mt-6">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">
                Tell us how much time you spent doing the following physical activities in a typical workday.
                The total hours/minutes for standing, walking, and sitting should equal the Hours per Day.
                The example below shows an 8-hour workday with 2 hours standing and walking, and 6 hours sitting (8 hours total).
              </h4>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="px-4 py-2 border border-gray-300"></th>
                      <th className="px-4 py-2 border border-gray-300">
                        <label className="block font-normal">
                          How much of your workday? (Hours/Minutes)
                        </label>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      'Standing and walking (combined)',
                      'Sitting',
                      'Stooping (i.e., bending down & forward at waist)',
                      'Kneeling (i.e., bending legs to rest on knees)',
                      'Crouching (i.e., bending legs & back down & forward)',
                      'Crawling (i.e., moving on hands and knees)',
                      'Climbing stairs or ramps',
                      'Climbing ladders, ropes, or scaffolds'
                    ].map((activity, rowIndex) => (
                      <tr key={rowIndex} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border border-gray-300">{activity}</td>
                        <td className="px-2 py-1 border border-gray-300">
                          <input
                            type="text"
                            value={formData.q340_activities340[rowIndex][0]}
                            onChange={(e) => {
                              const newActivities = [...formData.q340_activities340];
                              newActivities[rowIndex][0] = e.target.value;
                              setFormData({ ...formData, q340_activities340: newActivities });
                            }}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div> */}


            <div className="border-b border-gray-200 pb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Activities</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      <th className="px-4 py-2 border border-gray-300"></th>
                      <th className="px-4 py-2 border border-gray-300">One Hand</th>
                      <th className="px-4 py-2 border border-gray-300">Both Hands</th>
                      <th className="px-4 py-2 border border-gray-300">
                        How much of your workday? (Hours/Minutes)
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* First Activity Row */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-2 border border-gray-300">
                        Using fingers to touch, pick, or pinch (e.g., using a mouse, keyboard, turning pages, or buttoning a shirt):
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                          type="checkbox"
                          checked={formData.q212_activities212[0].oneHand}
                          onChange={(e) => handleActivitiesChange(0, 'oneHand', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                          type="checkbox"
                          checked={formData.q212_activities212[0].bothHands}
                          onChange={(e) => handleActivitiesChange(0, 'bothHands', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        <input
                          type="text"
                          value={formData.q212_activities212[0].duration}
                          onChange={(e) => handleActivitiesChange(0, 'duration', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                    </tr>

                    {/* Second Activity Row */}
                    <tr className="hover:bg-gray-50">
                      <td className="px-4 py-2 border border-gray-300">
                        Using hands to seize, hold, grasp, or turn (e.g., holding a large envelope, a small box, a hammer, or water bottle):
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                          type="checkbox"
                          checked={formData.q212_activities212[1].oneHand}
                          onChange={(e) => handleActivitiesChange(1, 'oneHand', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-300 text-center">
                        <input
                          type="checkbox"
                          checked={formData.q212_activities212[1].bothHands}
                          onChange={(e) => handleActivitiesChange(1, 'bothHands', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </td>
                      <td className="px-4 py-2 border border-gray-300">
                        <input
                          type="text"
                          value={formData.q212_activities212[1].duration}
                          onChange={(e) => handleActivitiesChange(1, 'duration', e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3 - Remarks */}
        <div className="border-b border-gray-200 pb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SECTION 3 - REMARKS</h2>

          <p className="text-sm text-gray-600 mb-4">
            Please provide any additional information you did not give in earlier parts of this report.
            If you did not have enough space in the prior sections of this report to provide the requested information,
            please use this space to provide the additional information requested in those sections. Be sure to include
            the job title number and question to which you are referring. If you add more jobs than the 5 jobs listed,
            please provide the same information as you did for job titles numbers 1-5 on a separate sheet of paper(s).
          </p>

          <div className="mb-4">
            <label htmlFor="q313_typeA" className="block text-sm font-medium text-gray-700 mb-1">
              Remarks
            </label>
            <textarea
              id="q313_typeA"
              name="q313_typeA"
              value={formData.q313_typeA}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Section 4 - Who is Completing This Report */}
        <div className="pb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">SECTION 4 - WHO IS COMPLETING THIS REPORT</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Date Report Completed */}
            <div className="mb-4">
              <label htmlFor="q315_dateReport" className="block text-sm font-medium text-gray-700 mb-1">
                Date Report Completed (MM/DD/YYYY)
              </label>
              <input
                type="text"
                id="q315_dateReport"
                name="q315_dateReport"
                value={formData.q315_dateReport}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Who is completing */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Who is completing this report?
            </label>
            <div className="space-y-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="q316_whoIs"
                  value="Myself"
                  checked={formData.q316_whoIs.includes('Myself')}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Myself</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="q316_whoIs"
                  value="Someone else (Complete the information below)"
                  checked={formData.q316_whoIs.includes('Someone else (Complete the information below)')}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Someone else (Complete the information below)</span>
              </label>
            </div>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label htmlFor="q317_name317" className="block text-sm font-medium text-gray-700 mb-1">
              NAME
            </label>
            <input
              type="text"
              id="q317_name317"
              name="q317_name317"
              value={formData.q317_name317}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Relationship */}
          <div className="mb-4">
            <label htmlFor="q318_name318" className="block text-sm font-medium text-gray-700 mb-1">
              Relationship to the Person in 1.A.
            </label>
            <input
              type="text"
              id="q318_name318"
              name="q318_name318"
              value={formData.q318_name318}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Mailing Address */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              MAILING ADDRESS (Street or PO Box) Include the apartment number, if applicable.
            </label>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Street Address"
                value={formData.q319_mailingAddress.addr_line1}
                onChange={(e) => handleAddressChange('addr_line1', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Apt/Suite"
                value={formData.q319_mailingAddress.addr_line2}
                onChange={(e) => handleAddressChange('addr_line2', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={formData.q319_mailingAddress.city}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="State"
                  value={formData.q319_mailingAddress.state}
                  onChange={(e) => handleAddressChange('state', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={formData.q319_mailingAddress.postal}
                  onChange={(e) => handleAddressChange('postal', e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <input
                type="text"
                placeholder="Country"
                value={formData.q319_mailingAddress.country}
                onChange={(e) => handleAddressChange('country', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Daytime Phone */}
          <div className="mb-4">
            <label htmlFor="q320_daytimePhone" className="block text-sm font-medium text-gray-700 mb-1">
              DAYTIME PHONE NUMBER where we may reach you or leave a message, if needed. Include the area code or IDD and country code if outside the USA or Canada.
            </label>
            <input
              type="tel"
              id="q320_daytimePhone"
              name="q320_daytimePhone"
              value={formData.q320_daytimePhone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="(###) ###-####"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};



export default WorkHistoryReport;