import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../config/api'

function SlotManagement() {
  const navigate = useNavigate()
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Single slot creation
  const [showSingleForm, setShowSingleForm] = useState(false)
  const [singleSlot, setSingleSlot] = useState({
    date: '',
    time: ''
  })

  // Bulk slot creation
  const [showBulkForm, setShowBulkForm] = useState(false)
  const [bulkSlots, setBulkSlots] = useState({
    startDate: '',
    endDate: '',
    times: ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM']
  })
  const [customTime, setCustomTime] = useState('')

  // Check authentication
  useEffect(() => {
    const isAuth = localStorage.getItem('consultationAdminAuth')
    const token = localStorage.getItem('consultationAdminToken')
    
    if (!isAuth || !token) {
      navigate('/admin/consultation-login')
      return
    }

    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
    fetchSlots()
  }, [navigate])

  const fetchSlots = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await api.get('/slots/all')
      
      if (response.data.success) {
        setSlots(response.data.data)
      }
    } catch (err) {
      console.error('Error fetching slots:', err)
      setError(err.response?.data?.message || 'Failed to load slots')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('consultationAdminAuth')
    localStorage.removeItem('consultationAdminToken')
    localStorage.removeItem('consultationAdminUser')
    navigate('/admin/consultation-login')
  }

  const handleCreateSingleSlot = async (e) => {
    e.preventDefault()
    try {
      setError('')
      setSuccess('')

      const response = await api.post('/slots/create', singleSlot)
      
      if (response.data.success) {
        setSuccess('Time slot created successfully!')
        setSingleSlot({ date: '', time: '' })
        setShowSingleForm(false)
        fetchSlots()
        
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      console.error('Error creating slot:', err)
      setError(err.response?.data?.message || 'Failed to create slot')
    }
  }

  const handleCreateBulkSlots = async (e) => {
    e.preventDefault()
    try {
      setError('')
      setSuccess('')

      // Generate array of dates between start and end
      const dates = []
      const start = new Date(bulkSlots.startDate)
      const end = new Date(bulkSlots.endDate)
      
      for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
        dates.push(new Date(date).toISOString().split('T')[0])
      }

      const response = await api.post('/slots/create-multiple', {
        dates,
        times: bulkSlots.times
      })
      
      if (response.data.success) {
        setSuccess(`${response.data.data.count} time slots created successfully!`)
        setBulkSlots({
          startDate: '',
          endDate: '',
          times: ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM']
        })
        setShowBulkForm(false)
        fetchSlots()
        
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      console.error('Error creating bulk slots:', err)
      setError(err.response?.data?.message || 'Failed to create slots')
    }
  }

  const handleDeleteSlot = async (id, isBooked) => {
    if (isBooked) {
      alert('Cannot delete a booked slot. Please cancel the associated consultation first.')
      return
    }

    if (!window.confirm('Are you sure you want to delete this time slot?')) {
      return
    }

    try {
      setError('')
      const response = await api.delete(`/slots/${id}`)
      
      if (response.data.success) {
        setSuccess('Time slot deleted successfully!')
        fetchSlots()
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      console.error('Error deleting slot:', err)
      setError(err.response?.data?.message || 'Failed to delete slot')
    }
  }

  const addCustomTime = () => {
    if (customTime && !bulkSlots.times.includes(customTime)) {
      setBulkSlots({
        ...bulkSlots,
        times: [...bulkSlots.times, customTime]
      })
      setCustomTime('')
    }
  }

  const removeTime = (timeToRemove) => {
    setBulkSlots({
      ...bulkSlots,
      times: bulkSlots.times.filter(time => time !== timeToRemove)
    })
  }

  const getMinDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  const groupSlotsByDate = () => {
    const grouped = {}
    slots.forEach(slot => {
      const dateKey = new Date(slot.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      if (!grouped[dateKey]) {
        grouped[dateKey] = []
      }
      grouped[dateKey].push(slot)
    })
    return grouped
  }

  const groupedSlots = groupSlotsByDate()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Slot Management</h1>
              <p className="text-sm text-gray-600 mt-1">Manage available consultation time slots</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/admin/consultations')}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors text-sm"
              >
                View Applications
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success/Error Messages */}
        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-600">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => {
              setShowSingleForm(!showSingleForm)
              setShowBulkForm(false)
            }}
            className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            + Add Single Slot
          </button>
          <button
            onClick={() => {
              setShowBulkForm(!showBulkForm)
              setShowSingleForm(false)
            }}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
          >
            + Add Multiple Slots
          </button>
        </div>

        {/* Single Slot Form */}
        {showSingleForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Create Single Time Slot</h3>
            <form onSubmit={handleCreateSingleSlot} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={singleSlot.date}
                  onChange={(e) => setSingleSlot({ ...singleSlot, date: e.target.value })}
                  min={getMinDate()}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
                <input
                  type="text"
                  value={singleSlot.time}
                  onChange={(e) => setSingleSlot({ ...singleSlot, time: e.target.value })}
                  placeholder="e.g., 10:00 AM"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex items-end gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Create Slot
                </button>
                <button
                  type="button"
                  onClick={() => setShowSingleForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Bulk Slot Form */}
        {showBulkForm && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Create Multiple Time Slots</h3>
            <form onSubmit={handleCreateBulkSlots}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={bulkSlots.startDate}
                    onChange={(e) => setBulkSlots({ ...bulkSlots, startDate: e.target.value })}
                    min={getMinDate()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                  <input
                    type="date"
                    value={bulkSlots.endDate}
                    onChange={(e) => setBulkSlots({ ...bulkSlots, endDate: e.target.value })}
                    min={bulkSlots.startDate || getMinDate()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Time Slots</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {bulkSlots.times.map((time, index) => (
                    <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-2">
                      <span>{time}</span>
                      <button
                        type="button"
                        onClick={() => removeTime(time)}
                        className="text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    placeholder="Add custom time (e.g., 5:00 PM)"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                  <button
                    type="button"
                    onClick={addCustomTime}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Add Time
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                >
                  Create {bulkSlots.times.length} Slots per Day
                </button>
                <button
                  type="button"
                  onClick={() => setShowBulkForm(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Slots List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Available Time Slots</h3>
            <p className="text-sm text-gray-600 mt-1">
              Total: {slots.length} slots ({slots.filter(s => s.isBooked).length} booked, {slots.filter(s => !s.isBooked).length} available)
            </p>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading slots...</p>
            </div>
          ) : Object.keys(groupedSlots).length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No time slots created yet.</p>
              <p className="text-sm text-gray-500 mt-2">Click "Add Single Slot" or "Add Multiple Slots" to get started.</p>
            </div>
          ) : (
            <div className="p-6">
              {Object.entries(groupedSlots).map(([date, dateSlots]) => (
                <div key={date} className="mb-6 last:mb-0">
                  <h4 className="font-bold text-gray-800 mb-3">{date}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {dateSlots.map((slot) => (
                      <div
                        key={slot.id}
                        className={`p-3 rounded-lg border-2 ${
                          slot.isBooked
                            ? 'bg-red-50 border-red-200'
                            : 'bg-green-50 border-green-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`font-semibold ${
                            slot.isBooked ? 'text-red-800' : 'text-green-800'
                          }`}>
                            {slot.time}
                          </span>
                          {!slot.isBooked && (
                            <button
                              onClick={() => handleDeleteSlot(slot.id, slot.isBooked)}
                              className="text-red-500 hover:text-red-700"
                              title="Delete slot"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          )}
                        </div>
                        <span className={`text-xs ${
                          slot.isBooked ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {slot.isBooked ? 'Booked' : 'Available'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SlotManagement