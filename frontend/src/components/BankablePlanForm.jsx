// import { useState, useEffect } from 'react'
// import Select from 'react-select'
// import api from '../config/api'

// function BankablePlanForm() {
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [submitError, setSubmitError] = useState('')
//   const [submitSuccess, setSubmitSuccess] = useState(false)
//   const [availableSlots, setAvailableSlots] = useState([])
//   const [loadingSlots, setLoadingSlots] = useState(true)
  
//   const [formData, setFormData] = useState({
//     fullName: '',
//     businessEmail: '',
//     companyName: '',
//     industrySector: null,
//     currentBusinessStage: null,
//     primaryServiceInterest: null,
//     targetFundingAmount: null,
//     businessSummary: '',
//     selectedSlot: null
//   })

//   // Fetch available slots on component mount
//   useEffect(() => {
//     fetchAvailableSlots()
//   }, [])

//   const fetchAvailableSlots = async () => {
//     try {
//       setLoadingSlots(true)
//       const response = await api.get('/slots/available')
      
//       if (response.data.success) {
//         // Transform slots into options for react-select
//         const slotOptions = response.data.data.slots.map(slot => ({
//           value: slot.id,
//           label: `${new Date(slot.date).toLocaleDateString('en-US', { 
//             weekday: 'long', 
//             month: 'long', 
//             day: 'numeric',
//             year: 'numeric'
//           })} at ${slot.time}`,
//           date: slot.date,
//           time: slot.time
//         }))
        
//         setAvailableSlots(slotOptions)
//       }
//     } catch (error) {
//       console.error('Error fetching slots:', error)
//       setSubmitError('Failed to load available time slots. Please refresh the page.')
//     } finally {
//       setLoadingSlots(false)
//     }
//   }

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//     setSubmitError('')
//   }

//   const handleSelectChange = (selectedOption, actionMeta) => {
//     setFormData({
//       ...formData,
//       [actionMeta.name]: selectedOption
//     })
//     setSubmitError('')
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setIsSubmitting(true)
//     setSubmitError('')
//     setSubmitSuccess(false)

//     try {
//       // Prepare data for backend
//       const submitData = {
//         fullName: formData.fullName,
//         businessEmail: formData.businessEmail,
//         companyName: formData.companyName,
//         industrySector: formData.industrySector?.value || '',
//         currentBusinessStage: formData.currentBusinessStage?.value || '',
//         primaryServiceInterest: formData.primaryServiceInterest?.value || '',
//         targetFundingAmount: formData.targetFundingAmount?.value || '',
//         businessSummary: formData.businessSummary,
//         slotId: formData.selectedSlot?.value
//       }

//       console.log('📤 Submitting consultation:', submitData)

//       // Submit to backend
//       const response = await api.post('/consultations/submit', submitData)

//       if (response.data.success) {
//         setSubmitSuccess(true)
        
//         // Reset form
//         setFormData({
//           fullName: '',
//           businessEmail: '',
//           companyName: '',
//           industrySector: null,
//           currentBusinessStage: null,
//           primaryServiceInterest: null,
//           targetFundingAmount: null,
//           businessSummary: '',
//           selectedSlot: null
//         })

//         // Refresh available slots
//         fetchAvailableSlots()

//         // Hide success message after 5 seconds
//         setTimeout(() => {
//           setSubmitSuccess(false)
//         }, 5000)
//       }
//     } catch (error) {
//       console.error('Error submitting consultation:', error)
//       setSubmitError(error.response?.data?.message || 'Failed to submit consultation. Please try again.')
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   // Detect if device is mobile
//   const isMobile = window.innerWidth < 1024

//   // Options for dropdowns
//   const industrySectorOptions = [
//     { value: 'Technology', label: 'Technology' },
//     { value: 'Financial Services', label: 'Financial Services' },
//     { value: 'Healthcare', label: 'Healthcare' },
//     { value: 'Retail & E-commerce', label: 'Retail & E-commerce' },
//     { value: 'FMCG', label: 'FMCG' },
//     { value: 'Agriculture', label: 'Agriculture' },
//     { value: 'Manufacturing', label: 'Manufacturing' },
//     { value: 'Education', label: 'Education' },
//     { value: 'Real Estate', label: 'Real Estate' },
//     { value: 'Hospitality & Tourism', label: 'Hospitality & Tourism' },
//     { value: 'Other', label: 'Other' }
//   ]

//   const businessStageOptions = [
//     { value: 'Idea Stage', label: 'Idea Stage' },
//     { value: 'Startup (0-2 years)', label: 'Startup (0-2 years)' },
//     { value: 'Early Growth (2-5 years)', label: 'Early Growth (2-5 years)' },
//     { value: 'Established (5+ years)', label: 'Established (5+ years)' },
//     { value: 'Scaling/Expansion', label: 'Scaling/Expansion' }
//   ]

//   const serviceInterestOptions = [
//     { value: 'Strategic Planning & Execution', label: 'Strategic Planning & Execution' },
//     { value: 'Funding & Capital Access', label: 'Funding & Capital Access' },
//     { value: 'AI Consulting & Digital Transformation', label: 'AI Consulting & Digital Transformation' },
//     { value: 'Business Clinic & Leadership Development', label: 'Business Clinic & Leadership Development' },
//     { value: 'Multiple Services', label: 'Multiple Services' }
//   ]

//   const fundingAmountOptions = [
//     { value: 'Under ₦1 Million', label: 'Under ₦1 Million' },
//     { value: '₦1 Million - ₦5 Million', label: '₦1 Million - ₦5 Million' },
//     { value: '₦5 Million - ₦10 Million', label: '₦5 Million - ₦10 Million' },
//     { value: '₦10 Million - ₦50 Million', label: '₦10 Million - ₦50 Million' },
//     { value: '₦50 Million - ₦100 Million', label: '₦50 Million - ₦100 Million' },
//     { value: 'Over ₦100 Million', label: 'Over ₦100 Million' },
//     { value: 'Not Applicable', label: 'Not Applicable' }
//   ]

//   // Custom styles for react-select
//   const customSelectStyles = {
//     control: (base, state) => ({
//       ...base,
//       border: '1px solid #d1d5db',
//       borderRadius: '0.5rem',
//       padding: '0.375rem',
//       boxShadow: 'none',
//       borderColor: state.isFocused ? '#9ca3af' : '#d1d5db',
//       '&:hover': {
//         borderColor: '#9ca3af'
//       }
//     }),
//     placeholder: (base) => ({
//       ...base,
//       color: '#9ca3af'
//     }),
//     menu: (base) => ({
//       ...base,
//       borderRadius: '0.5rem',
//       overflow: 'hidden',
//       border: '1px solid #d1d5db'
//     }),
//     menuList: (base) => ({
//       ...base,
//       padding: 0,
//       borderRadius: '0.5rem'
//     }),
//     option: (base, state) => ({
//       ...base,
//       backgroundColor: state.isSelected
//         ? '#f3f4f6'
//         : state.isFocused
//         ? '#f3f4f6'
//         : 'white',
//       color: 'black',
//       cursor: 'pointer',
//       '&:active': {
//         backgroundColor: '#f3f4f6'
//       }
//     }),
//     dropdownIndicator: (base) => ({
//       ...base,
//       color: '#6b7280',
//       '&:hover': {
//         color: '#6b7280'
//       }
//     }),
//     indicatorSeparator: () => ({
//       display: 'none'
//     })
//   }

//   return (
//     <section id="consultation-form" className="py-12 lg:py-16 px-4 lg:px-8 bg-[#1a2332]">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-6 lg:mb-8">
//           <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2 lg:mb-3">Schedule Your Consultation</h2>
//           <p className="text-gray-300 text-sm lg:text-lg">
//             Tell us about your venture and choose your preferred consultation time. Your first 15-minute consultation is free.
//           </p>
//         </div>

//         {/* Success Message */}
//         {submitSuccess && (
//           <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
//             <div className="flex items-center gap-3">
//               <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
//               </svg>
//               <div>
//                 <p className="text-green-800 font-semibold">Consultation Scheduled Successfully!</p>
//                 <p className="text-green-700 text-sm">Check your email for confirmation and appointment details.</p>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 lg:p-12">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
//             {/* Full Name */}
//             <div>
//               <input
//                 type="text"
//                 name="fullName"
//                 placeholder="Full name"
//                 value={formData.fullName}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
//                 required
//                 disabled={isSubmitting}
//               />
//             </div>

//             {/* Business Email */}
//             <div>
//               <input
//                 type="email"
//                 name="businessEmail"
//                 placeholder="Business Email"
//                 value={formData.businessEmail}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
//                 required
//                 disabled={isSubmitting}
//               />
//             </div>

//             {/* Company Name */}
//             <div>
//               <input
//                 type="text"
//                 name="companyName"
//                 placeholder="Company Name"
//                 value={formData.companyName}
//                 onChange={handleChange}
//                 className="w-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
//                 required
//                 disabled={isSubmitting}
//               />
//             </div>

//             {/* Industry Sector */}
//             <div>
//               <Select
//                 name="industrySector"
//                 options={industrySectorOptions}
//                 value={formData.industrySector}
//                 onChange={handleSelectChange}
//                 placeholder="Industry Sector"
//                 styles={customSelectStyles}
//                 isSearchable={!isMobile}
//                 required
//                 isDisabled={isSubmitting}
//               />
//             </div>

//             {/* Current Business Stage */}
//             <div>
//               <Select
//                 name="currentBusinessStage"
//                 options={businessStageOptions}
//                 value={formData.currentBusinessStage}
//                 onChange={handleSelectChange}
//                 placeholder="Current Business Stage"
//                 styles={customSelectStyles}
//                 isSearchable={!isMobile}
//                 required
//                 isDisabled={isSubmitting}
//               />
//             </div>

//             {/* Primary Service Interest */}
//             <div>
//               <Select
//                 name="primaryServiceInterest"
//                 options={serviceInterestOptions}
//                 value={formData.primaryServiceInterest}
//                 onChange={handleSelectChange}
//                 placeholder="Primary Service Interest"
//                 styles={customSelectStyles}
//                 isSearchable={!isMobile}
//                 required
//                 isDisabled={isSubmitting}
//               />
//             </div>

//             {/* Target Funding Amount */}
//             <div className="lg:col-span-2">
//               <Select
//                 name="targetFundingAmount"
//                 options={fundingAmountOptions}
//                 value={formData.targetFundingAmount}
//                 onChange={handleSelectChange}
//                 placeholder="Target Funding Amount (if applicable)"
//                 styles={customSelectStyles}
//                 isSearchable={!isMobile}
//                 isClearable
//                 isDisabled={isSubmitting}
//               />
//             </div>

//             {/* Available Time Slots */}
//             <div className="lg:col-span-2">
//               {loadingSlots ? (
//                 <div className="flex items-center justify-center py-4">
//                   <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1a2332]"></div>
//                   <span className="ml-2 text-gray-600">Loading available slots...</span>
//                 </div>
//               ) : availableSlots.length === 0 ? (
//                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                   <p className="text-blue-800 text-sm">
//                     No available time slots at the moment. Please check back later or contact us directly.
//                   </p>
//                 </div>
//               ) : (
//                 <Select
//                   name="selectedSlot"
//                   options={availableSlots}
//                   value={formData.selectedSlot}
//                   onChange={handleSelectChange}
//                   placeholder="Choose your preferred date and time"
//                   styles={customSelectStyles}
//                   isSearchable={!isMobile}
//                   required
//                   isDisabled={isSubmitting}
//                 />
//               )}
//             </div>

//             {/* Business Summary */}
//             <div className="lg:col-span-2">
//               <textarea
//                 name="businessSummary"
//                 placeholder="Quick Summary of Business Idea or Challenge"
//                 value={formData.businessSummary}
//                 onChange={handleChange}
//                 rows="4"
//                 className="w-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 resize-none"
//                 required
//                 disabled={isSubmitting}
//               />
//             </div>
//           </div>

//           {/* Error Message */}
//           {submitError && (
//             <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-600 text-sm">{submitError}</p>
//             </div>
//           )}

//           {/* Privacy Policy */}
//           <p className="text-xs lg:text-sm text-gray-600 mt-4 lg:mt-6 mb-4 lg:mb-6">
//             By submitting, you agree to our{' '}
//             <a href="/company-policies" className="underline hover:text-[#60a5fa]">
//               Privacy Policy
//             </a>
//           </p>

//           {/* Submit Button */}
//           <div className="flex justify-center">
//             <button
//               type="submit"
//               disabled={isSubmitting || loadingSlots || availableSlots.length === 0}
//               className="bg-[#1a2332] text-white px-12 py-2.5 lg:px-16 lg:py-3 text-sm lg:text-base rounded-full hover:bg-[#2a3f52] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? 'Submitting...' : 'Schedule Consultation'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </section>
//   )
// }

// export default BankablePlanForm


import { useState, useEffect } from 'react'
import Select from 'react-select'
import api from '../config/api'
import { useNotification } from '../context/NotificationContext'

function BankablePlanForm() {
  const { showSuccess, showError } = useNotification()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [availableSlots, setAvailableSlots] = useState([])
  const [loadingSlots, setLoadingSlots] = useState(true)
  
  const [formData, setFormData] = useState({
    fullName: '',
    businessEmail: '',
    companyName: '',
    industrySector: null,
    currentBusinessStage: null,
    primaryServiceInterest: null,
    targetFundingAmount: null,
    businessSummary: '',
    selectedSlot: null
  })

  // Fetch available slots on component mount
  useEffect(() => {
    fetchAvailableSlots()
  }, [])

  const fetchAvailableSlots = async () => {
    try {
      setLoadingSlots(true)
      const response = await api.get('/slots/available')
      
      if (response.data.success) {
        // Transform slots into options for react-select
        const slotOptions = response.data.data.slots.map(slot => ({
          value: slot.id,
          label: `${new Date(slot.date).toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric',
            year: 'numeric'
          })} at ${slot.time}`,
          date: slot.date,
          time: slot.time
        }))
        
        setAvailableSlots(slotOptions)
      }
    } catch (error) {
      console.error('Error fetching slots:', error)
      showError(
        'Failed to load available time slots',
        'Please refresh the page to try again.'
      )
    } finally {
      setLoadingSlots(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSelectChange = (selectedOption, actionMeta) => {
    setFormData({
      ...formData,
      [actionMeta.name]: selectedOption
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Prepare data for backend
      const submitData = {
        fullName: formData.fullName,
        businessEmail: formData.businessEmail,
        companyName: formData.companyName,
        industrySector: formData.industrySector?.value || '',
        currentBusinessStage: formData.currentBusinessStage?.value || '',
        primaryServiceInterest: formData.primaryServiceInterest?.value || '',
        targetFundingAmount: formData.targetFundingAmount?.value || '',
        businessSummary: formData.businessSummary,
        slotId: formData.selectedSlot?.value
      }

      console.log('📤 Submitting consultation:', submitData)

      // Submit to backend
      const response = await api.post('/consultations/submit', submitData)

      if (response.data.success) {
        // Show success notification
        showSuccess(
          'Consultation Scheduled Successfully!',
          'Check your email for confirmation and appointment details.'
        )
        
        // Reset form
        setFormData({
          fullName: '',
          businessEmail: '',
          companyName: '',
          industrySector: null,
          currentBusinessStage: null,
          primaryServiceInterest: null,
          targetFundingAmount: null,
          businessSummary: '',
          selectedSlot: null
        })

        // Refresh available slots
        fetchAvailableSlots()
      }
    } catch (error) {
      console.error('Error submitting consultation:', error)
      
      // Show error notification
      showError(
        'Failed to submit consultation application',
        'Please refresh and try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Detect if device is mobile
  const isMobile = window.innerWidth < 1024

  // Options for dropdowns
  const industrySectorOptions = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Financial Services', label: 'Financial Services' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Retail & E-commerce', label: 'Retail & E-commerce' },
    { value: 'FMCG', label: 'FMCG' },
    { value: 'Agriculture', label: 'Agriculture' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Education', label: 'Education' },
    { value: 'Real Estate', label: 'Real Estate' },
    { value: 'Hospitality & Tourism', label: 'Hospitality & Tourism' },
    { value: 'Other', label: 'Other' }
  ]

  const businessStageOptions = [
    { value: 'Idea Stage', label: 'Idea Stage' },
    { value: 'Startup (0-2 years)', label: 'Startup (0-2 years)' },
    { value: 'Early Growth (2-5 years)', label: 'Early Growth (2-5 years)' },
    { value: 'Established (5+ years)', label: 'Established (5+ years)' },
    { value: 'Scaling/Expansion', label: 'Scaling/Expansion' }
  ]

  const serviceInterestOptions = [
    { value: 'Strategic Planning & Execution', label: 'Strategic Planning & Execution' },
    { value: 'Funding & Capital Access', label: 'Funding & Capital Access' },
    { value: 'AI Consulting & Digital Transformation', label: 'AI Consulting & Digital Transformation' },
    { value: 'Business Clinic & Leadership Development', label: 'Business Clinic & Leadership Development' },
    { value: 'Multiple Services', label: 'Multiple Services' }
  ]

  const fundingAmountOptions = [
    { value: 'Under ₦1 Million', label: 'Under ₦1 Million' },
    { value: '₦1 Million - ₦5 Million', label: '₦1 Million - ₦5 Million' },
    { value: '₦5 Million - ₦10 Million', label: '₦5 Million - ₦10 Million' },
    { value: '₦10 Million - ₦50 Million', label: '₦10 Million - ₦50 Million' },
    { value: '₦50 Million - ₦100 Million', label: '₦50 Million - ₦100 Million' },
    { value: 'Over ₦100 Million', label: 'Over ₦100 Million' },
    { value: 'Not Applicable', label: 'Not Applicable' }
  ]

  // Custom styles for react-select
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      padding: '0.375rem',
      boxShadow: 'none',
      borderColor: state.isFocused ? '#9ca3af' : '#d1d5db',
      '&:hover': {
        borderColor: '#9ca3af'
      }
    }),
    placeholder: (base) => ({
      ...base,
      color: '#9ca3af'
    }),
    menu: (base) => ({
      ...base,
      borderRadius: '0.5rem',
      overflow: 'hidden',
      border: '1px solid #d1d5db'
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      borderRadius: '0.5rem'
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#f3f4f6'
        : state.isFocused
        ? '#f3f4f6'
        : 'white',
      color: 'black',
      cursor: 'pointer',
      '&:active': {
        backgroundColor: '#f3f4f6'
      }
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#6b7280',
      '&:hover': {
        color: '#6b7280'
      }
    }),
    indicatorSeparator: () => ({
      display: 'none'
    })
  }

  return (
    <section id="consultation-form" className="py-12 lg:py-16 px-4 lg:px-8 bg-[#1a2332]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-8">
          <h2 className="text-2xl lg:text-4xl font-bold text-white mb-2 lg:mb-3">Schedule Your Consultation</h2>
          <p className="text-gray-300 text-sm lg:text-lg">
            Tell us about your venture and choose your preferred consultation time. Your first 15-minute consultation is free.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Business Email */}
            <div>
              <input
                type="email"
                name="businessEmail"
                placeholder="Business Email"
                value={formData.businessEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Company Name */}
            <div>
              <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                required
                disabled={isSubmitting}
              />
            </div>

            {/* Industry Sector */}
            <div>
              <Select
                name="industrySector"
                options={industrySectorOptions}
                value={formData.industrySector}
                onChange={handleSelectChange}
                placeholder="Industry Sector"
                styles={customSelectStyles}
                isSearchable={!isMobile}
                required
                isDisabled={isSubmitting}
              />
            </div>

            {/* Current Business Stage */}
            <div>
              <Select
                name="currentBusinessStage"
                options={businessStageOptions}
                value={formData.currentBusinessStage}
                onChange={handleSelectChange}
                placeholder="Current Business Stage"
                styles={customSelectStyles}
                isSearchable={!isMobile}
                required
                isDisabled={isSubmitting}
              />
            </div>

            {/* Primary Service Interest */}
            <div>
              <Select
                name="primaryServiceInterest"
                options={serviceInterestOptions}
                value={formData.primaryServiceInterest}
                onChange={handleSelectChange}
                placeholder="Primary Service Interest"
                styles={customSelectStyles}
                isSearchable={!isMobile}
                required
                isDisabled={isSubmitting}
              />
            </div>

            {/* Target Funding Amount */}
            <div className="lg:col-span-2">
              <Select
                name="targetFundingAmount"
                options={fundingAmountOptions}
                value={formData.targetFundingAmount}
                onChange={handleSelectChange}
                placeholder="Target Funding Amount (if applicable)"
                styles={customSelectStyles}
                isSearchable={!isMobile}
                isClearable
                isDisabled={isSubmitting}
              />
            </div>

            {/* Available Time Slots */}
            <div className="lg:col-span-2">
              {loadingSlots ? (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#1a2332]"></div>
                  <span className="ml-2 text-gray-600">Loading available slots...</span>
                </div>
              ) : availableSlots.length === 0 ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-sm">
                    No available time slots at the moment. Please check back later or contact us directly.
                  </p>
                </div>
              ) : (
                <Select
                  name="selectedSlot"
                  options={availableSlots}
                  value={formData.selectedSlot}
                  onChange={handleSelectChange}
                  placeholder="Choose your preferred date and time"
                  styles={customSelectStyles}
                  isSearchable={!isMobile}
                  required
                  isDisabled={isSubmitting}
                />
              )}
            </div>

            {/* Business Summary */}
            <div className="lg:col-span-2">
              <textarea
                name="businessSummary"
                placeholder="Quick Summary of Business Idea or Challenge"
                value={formData.businessSummary}
                onChange={handleChange}
                rows="4"
                className="w-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 resize-none"
                required
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Privacy Policy */}
          <p className="text-xs lg:text-sm text-gray-600 mt-4 lg:mt-6 mb-4 lg:mb-6">
            By submitting, you agree to our{' '}
            <a href="/company-policies" className="underline hover:text-[#60a5fa]">
              Privacy Policy
            </a>
          </p>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting || loadingSlots || availableSlots.length === 0}
              className="bg-[#1a2332] text-white px-12 py-2.5 lg:px-16 lg:py-3 text-sm lg:text-base rounded-full hover:bg-[#2a3f52] transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Schedule Consultation'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default BankablePlanForm