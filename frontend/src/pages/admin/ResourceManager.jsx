// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import AdminLayout from '../../components/admin/AdminLayout'
// import api from '../../config/api'
// import { getAdminAuth, getAdminRedirectPath } from '../../utils/adminAuth'

// function ResourceManager() {
//     const navigate = useNavigate()
//     const [resources, setResources] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)
//     const [isAddingResource, setIsAddingResource] = useState(false)
//     const [editingResource, setEditingResource] = useState(null)
//     const [submitting, setSubmitting] = useState(false)

//     const [newResource, setNewResource] = useState({
//         category: '',
//         title: '',
//         description: '',
//         file: null,
//         imageFile: null,
//         imageUrl: ''
//     })

//     const [uploadingImage, setUploadingImage] = useState(false)

//     const categories = [
//         'Strategic Planning',
//         'Financial Planning',
//         'Funding Access',
//         'Market Analysis',
//         'Legal & Compliance',
//         'Marketing',
//         'AI Consulting',
//         'Operations',
//         'Other'
//     ]

//     // Check authentication - UPDATED
//     useEffect(() => {
//         const { isAuth, token } = getAdminAuth()

//         if (!isAuth || !token) {
//             navigate(getAdminRedirectPath())
//             return
//         }

//         api.defaults.headers.common['Authorization'] = `Bearer ${token}`

//         fetchResources()
//     }, [navigate])

//     const fetchResources = async () => {
//         try {
//             setLoading(true)
//             setError(null)
//             const response = await api.get('/resources/admin')

//             if (response.data.success) {
//                 setResources(response.data.data)
//             }
//         } catch (err) {
//             console.error('Error fetching resources:', err)
//             setError(err.response?.data?.message || 'Failed to load resources')
//         } finally {
//             setLoading(false)
//         }
//     }

//     const handleFileChange = (e) => {
//         const file = e.target.files[0]
//         if (file) {
//             if (file.size > 50 * 1024 * 1024) {
//                 alert('File size should be less than 50MB')
//                 return
//             }
//             setNewResource({ ...newResource, file })
//         }
//     }
//     const handleImageUpload = async (file) => {
//         if (!file) return null

//         setUploadingImage(true)

//         try {
//             const formData = new FormData()
//             formData.append('image', file)

//             const response = await api.post('/resources/upload-image', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             })

//             if (response.data.success) {
//                 return response.data.data.imageUrl
//             }
//         } catch (err) {
//             console.error('Error uploading image:', err)
//             alert(err.response?.data?.message || 'Failed to upload image')
//             return null
//         } finally {
//             setUploadingImage(false)
//         }
//     }

//     const handleAddResource = async () => {
//         if (!newResource.category || !newResource.title || !newResource.description || !newResource.file) {
//             alert('Please fill all fields and select a file')
//             return
//         }

//         setSubmitting(true)

//         try {
//             let imageUrl = newResource.imageUrl

//             // Upload image first if provided
//             if (newResource.imageFile) {
//                 imageUrl = await handleImageUpload(newResource.imageFile)
//                 if (!imageUrl) {
//                     setSubmitting(false)
//                     return
//                 }
//             }

//             const formData = new FormData()
//             formData.append('category', newResource.category)
//             formData.append('title', newResource.title)
//             formData.append('description', newResource.description)
//             formData.append('file', newResource.file)
//             if (imageUrl) {
//                 formData.append('imageUrl', imageUrl)
//             }

//             const response = await api.post('/resources', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             })

//             if (response.data.success) {
//                 await fetchResources()
//                 setNewResource({ category: '', title: '', description: '', file: null, imageFile: null, imageUrl: '' })
//                 setIsAddingResource(false)
//                 alert('Resource uploaded successfully!')
//             }
//         } catch (err) {
//             console.error('Error creating resource:', err)
//             alert(err.response?.data?.message || 'Failed to upload resource')
//         } finally {
//             setSubmitting(false)
//         }
//     }

//     const handleUpdateResource = async () => {
//         if (!editingResource.category || !editingResource.title || !editingResource.description) {
//             alert('Please fill all required fields')
//             return
//         }

//         setSubmitting(true)

//         try {
//             const formData = new FormData()
//             formData.append('category', editingResource.category)
//             formData.append('title', editingResource.title)
//             formData.append('description', editingResource.description)
//             formData.append('isActive', editingResource.isActive)

//             if (editingResource.newFile) {
//                 formData.append('file', editingResource.newFile)
//             }

//             const response = await api.put(`/resources/${editingResource.id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             })

//             if (response.data.success) {
//                 await fetchResources()
//                 setEditingResource(null)
//                 alert('Resource updated successfully!')
//             }
//         } catch (err) {
//             console.error('Error updating resource:', err)
//             alert(err.response?.data?.message || 'Failed to update resource')
//         } finally {
//             setSubmitting(false)
//         }
//     }

//     const handleDeleteResource = async (id) => {
//         if (!window.confirm('Are you sure you want to delete this resource? This will also delete the file from Cloudinary.')) {
//             return
//         }

//         try {
//             const response = await api.delete(`/resources/${id}`)

//             if (response.data.success) {
//                 setResources(resources.filter(resource => resource.id !== id))
//                 alert('Resource deleted successfully!')
//             }
//         } catch (err) {
//             console.error('Error deleting resource:', err)
//             alert(err.response?.data?.message || 'Failed to delete resource')
//         }
//     }

//     const toggleResourceStatus = async (id) => {
//         try {
//             const response = await api.patch(`/resources/${id}/toggle`)

//             if (response.data.success) {
//                 await fetchResources()
//                 alert(response.data.message)
//             }
//         } catch (err) {
//             console.error('Error toggling resource status:', err)
//             alert(err.response?.data?.message || 'Failed to toggle resource status')
//         }
//     }

//     return (
//         <AdminLayout>
//             <div>
//                 <div className="flex justify-between items-center mb-8">
//                     <div>
//                         <h1 className="text-3xl font-bold text-gray-800">Resource Manager</h1>
//                         <p className="text-gray-600 mt-1">Upload and manage downloadable resources</p>
//                     </div>
//                     <button
//                         onClick={() => setIsAddingResource(true)}
//                         className="bg-[#60a5fa] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors flex items-center gap-2"
//                     >
//                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
//                         </svg>
//                         Upload New Resource
//                     </button>
//                 </div>

//                 {loading && (
//                     <div className="bg-white rounded-xl shadow-md p-8 text-center">
//                         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
//                         <p className="mt-4 text-gray-600">Loading resources...</p>
//                     </div>
//                 )}

//                 {error && (
//                     <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
//                         <p className="text-red-600">{error}</p>
//                         <button
//                             onClick={fetchResources}
//                             className="mt-2 text-red-700 underline hover:text-red-800"
//                         >
//                             Try again
//                         </button>
//                     </div>
//                 )}
//                 {!loading && !error && resources.length === 0 && (
//                     <div className="bg-white rounded-xl shadow-md p-8 text-center">
//                         <p className="text-gray-600 text-lg">No resources yet.</p>
//                         <p className="text-gray-500 text-sm mt-2">Upload your first resource to get started.</p>
//                     </div>
//                 )}

//                 {!loading && !error && resources.length > 0 && (
//                     <div className="bg-white rounded-xl shadow-md overflow-hidden">
//                         <table className="w-full">
//                             <thead className="bg-gray-50">
//                                 <tr>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Downloads</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody className="divide-y divide-gray-200">
//                                 {resources.map((resource) => (
//                                     <tr key={resource.id} className="hover:bg-gray-50">
//                                         <td className="px-6 py-4">
//                                             <div className="text-sm font-medium text-gray-900">{resource.title}</div>
//                                             <div className="text-sm text-gray-500 line-clamp-1">{resource.description}</div>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
//                                                 {resource.category}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                             {resource.fileType} • {resource.fileSize}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
//                                             {resource.downloadCount || 0}
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap">
//                                             <span className={`px-2 py-1 text-xs font-semibold rounded-full ${resource.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                                                 }`}>
//                                                 {resource.isActive ? 'Active' : 'Inactive'}
//                                             </span>
//                                         </td>
//                                         <td className="px-6 py-4 whitespace-nowrap text-sm">
//                                             <div className="flex gap-2">
//                                                 <button
//                                                     onClick={() => setEditingResource({ ...resource, newFile: null })}
//                                                     className="text-blue-600 hover:text-blue-800"
//                                                     title="Edit"
//                                                 >
//                                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                                                     </svg>
//                                                 </button>
//                                                 <button
//                                                     onClick={() => toggleResourceStatus(resource.id)}
//                                                     className="text-yellow-600 hover:text-yellow-800"
//                                                     title={resource.isActive ? 'Deactivate' : 'Activate'}
//                                                 >
//                                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//                                                     </svg>
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleDeleteResource(resource.id)}
//                                                     className="text-red-600 hover:text-red-800"
//                                                     title="Delete"
//                                                 >
//                                                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                                                     </svg>
//                                                 </button>
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}

//                 {/* Add Resource Modal */}
//                 {isAddingResource && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
//                         <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8">
//                             <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//                                 <h2 className="text-2xl font-bold text-gray-800">Upload New Resource</h2>
//                                 <button
//                                     onClick={() => {
//                                         setIsAddingResource(false)
//                                         setNewResource({ category: '', title: '', description: '', file: null })
//                                     }}
//                                     className="text-gray-400 hover:text-gray-600"
//                                     disabled={submitting}
//                                 >
//                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>

//                             <div className="p-6 space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
//                                     <select
//                                         value={newResource.category}
//                                         onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
//                                         disabled={submitting}
//                                     >
//                                         <option value="">Select category</option>
//                                         {categories.map(cat => (
//                                             <option key={cat} value={cat}>{cat}</option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
//                                     <input
//                                         type="text"
//                                         value={newResource.title}
//                                         onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
//                                         placeholder="e.g., Business Plan Template"
//                                         disabled={submitting}
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
//                                     <textarea
//                                         value={newResource.description}
//                                         onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
//                                         rows="4"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa] resize-none"
//                                         placeholder="Describe what this resource contains and how it helps..."
//                                         disabled={submitting}
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         File * (PDF, Excel, PowerPoint, Word, ZIP - Max 50MB)
//                                     </label>
//                                     <input
//                                         type="file"
//                                         accept=".pdf,.xlsx,.xls,.pptx,.ppt,.docx,.doc,.zip"
//                                         onChange={handleFileChange}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
//                                         disabled={submitting}
//                                     />
//                                     {newResource.file && (
//                                         <p className="text-sm text-green-600 mt-2">
//                                             ✓ {newResource.file.name} ({(newResource.file.size / 1024 / 1024).toFixed(2)} MB)
//                                         </p>
//                                     )}
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                                         Placeholder Image (Optional - for card display)
//                                     </label>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={(e) => {
//                                             const file = e.target.files[0]
//                                             if (file) {
//                                                 setNewResource({ ...newResource, imageFile: file })
//                                             }
//                                         }}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
//                                         disabled={submitting || uploadingImage}
//                                     />
//                                     {newResource.imageFile && (
//                                         <p className="text-sm text-green-600 mt-2">
//                                             ✓ {newResource.imageFile.name}
//                                         </p>
//                                     )}
//                                     {uploadingImage && (
//                                         <p className="text-sm text-blue-600 mt-2">
//                                             ⏳ Uploading image...
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="p-6 border-t border-gray-200 flex gap-4">
//                                 <button
//                                     onClick={() => {
//                                         setIsAddingResource(false)
//                                         setNewResource({ category: '', title: '', description: '', file: null })
//                                     }}
//                                     className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
//                                     disabled={submitting}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleAddResource}
//                                     disabled={submitting}
//                                     className="flex-1 bg-[#60a5fa] text-white py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                     {submitting ? 'Uploading...' : 'Upload Resource'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Edit Resource Modal */}
//                 {editingResource && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
//                         <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8">
//                             <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//                                 <h2 className="text-2xl font-bold text-gray-800">Edit Resource</h2>
//                                 <button
//                                     onClick={() => setEditingResource(null)}
//                                     className="text-gray-400 hover:text-gray-600"
//                                     disabled={submitting}
//                                 >
//                                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                                     </svg>
//                                 </button>
//                             </div>

//                             <div className="p-6 space-y-4">
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
//                                     <select
//                                         value={editingResource.category}
//                                         onChange={(e) => setEditingResource({ ...editingResource, category: e.target.value })}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
//                                         disabled={submitting}
//                                     >
//                                         {categories.map(cat => (
//                                             <option key={cat} value={cat}>{cat}</option>
//                                         ))}
//                                     </select>
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
//                                     <input
//                                         type="text"
//                                         value={editingResource.title}
//                                         onChange={(e) => setEditingResource({ ...editingResource, title: e.target.value })}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
//                                         disabled={submitting}
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
//                                     <textarea
//                                         value={editingResource.description}
//                                         onChange={(e) => setEditingResource({ ...editingResource, description: e.target.value })}
//                                         rows="4"
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa] resize-none"
//                                         disabled={submitting}
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Current File</label>
//                                     <p className="text-sm text-gray-600 mb-2">{editingResource.fileType} • {editingResource.fileSize}</p>

//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Replace File (Optional)</label>
//                                     <input
//                                         type="file"
//                                         accept=".pdf,.xlsx,.xls,.pptx,.ppt,.docx,.doc,.zip"
//                                         onChange={(e) => {
//                                             const file = e.target.files[0]
//                                             if (file) {
//                                                 setEditingResource({ ...editingResource, newFile: file })
//                                             }
//                                         }}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
//                                         disabled={submitting}
//                                     />
//                                     {editingResource.newFile && (
//                                         <p className="text-sm text-green-600 mt-2">
//                                             ✓ New file: {editingResource.newFile.name} ({(editingResource.newFile.size / 1024 / 1024).toFixed(2)} MB)
//                                         </p>
//                                     )}
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Current Image</label>
//                                     {editingResource.imageUrl && (
//                                         <img
//                                             src={editingResource.imageUrl}
//                                             alt="Current"
//                                             className="w-32 h-32 object-cover rounded-lg mb-2"
//                                         />
//                                     )}

//                                     <label className="block text-sm font-semibold text-gray-700 mb-2">Replace Image (Optional)</label>
//                                     <input
//                                         type="file"
//                                         accept="image/*"
//                                         onChange={(e) => {
//                                             const file = e.target.files[0]
//                                             if (file) {
//                                                 setEditingResource({ ...editingResource, newImageFile: file })
//                                             }
//                                         }}
//                                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
//                                         disabled={submitting || uploadingImage}
//                                     />
//                                     {editingResource.newImageFile && (
//                                         <p className="text-sm text-green-600 mt-2">
//                                             ✓ New image: {editingResource.newImageFile.name}
//                                         </p>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className="p-6 border-t border-gray-200 flex gap-4">
//                                 <button
//                                     onClick={() => setEditingResource(null)}
//                                     className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
//                                     disabled={submitting}
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     onClick={handleUpdateResource}
//                                     disabled={submitting}
//                                     className="flex-1 bg-[#60a5fa] text-white py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                     {submitting ? 'Updating...' : 'Update Resource'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </AdminLayout>
//     )
// }

// export default ResourceManager

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../config/api'
import { getAdminAuth, getAdminRedirectPath } from '../../utils/adminAuth'
import { useNotification } from '../../context/NotificationContext'

function ResourceManager() {
    const navigate = useNavigate()
    const { showSuccess, showError } = useNotification()
    const [resources, setResources] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [isAddingResource, setIsAddingResource] = useState(false)
    const [editingResource, setEditingResource] = useState(null)
    const [submitting, setSubmitting] = useState(false)

    const [newResource, setNewResource] = useState({
        category: '',
        title: '',
        description: '',
        file: null,
        imageFile: null,
        imageUrl: ''
    })

    const [uploadingImage, setUploadingImage] = useState(false)

    const categories = [
        'Strategic Planning',
        'Financial Planning',
        'Funding Access',
        'Market Analysis',
        'Legal & Compliance',
        'Marketing',
        'AI Consulting',
        'Operations',
        'Other'
    ]

    // Check authentication
    useEffect(() => {
        const { isAuth, token } = getAdminAuth()

        if (!isAuth || !token) {
            navigate(getAdminRedirectPath())
            return
        }

        api.defaults.headers.common['Authorization'] = `Bearer ${token}`

        fetchResources()
    }, [navigate])

    const fetchResources = async () => {
        try {
            setLoading(true)
            setError(null)
            const response = await api.get('/resources/admin')

            if (response.data.success) {
                setResources(response.data.data)
            }
        } catch (err) {
            console.error('Error fetching resources:', err)
            setError(err.response?.data?.message || 'Failed to load resources')
        } finally {
            setLoading(false)
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (file.size > 50 * 1024 * 1024) {
                showError(
                    'File too large',
                    'File size should be less than 50MB'
                )
                return
            }
            setNewResource({ ...newResource, file })
        }
    }
    
    const handleImageUpload = async (file) => {
        if (!file) return null

        setUploadingImage(true)

        try {
            const formData = new FormData()
            formData.append('image', file)

            const response = await api.post('/resources/upload-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.data.success) {
                return response.data.data.imageUrl
            }
        } catch (err) {
            console.error('Error uploading image:', err)
            showError(
                'Image upload failed',
                err.response?.data?.message || 'Please try again'
            )
            return null
        } finally {
            setUploadingImage(false)
        }
    }

    const handleAddResource = async () => {
        if (!newResource.category || !newResource.title || !newResource.description || !newResource.file) {
            showError(
                'Missing Information',
                'Please fill all fields and select a file'
            )
            return
        }

        setSubmitting(true)

        try {
            let imageUrl = newResource.imageUrl

            // Upload image first if provided
            if (newResource.imageFile) {
                imageUrl = await handleImageUpload(newResource.imageFile)
                if (!imageUrl) {
                    setSubmitting(false)
                    return
                }
            }

            const formData = new FormData()
            formData.append('category', newResource.category)
            formData.append('title', newResource.title)
            formData.append('description', newResource.description)
            formData.append('file', newResource.file)
            if (imageUrl) {
                formData.append('imageUrl', imageUrl)
            }

            const response = await api.post('/resources', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.data.success) {
                await fetchResources()
                setNewResource({ category: '', title: '', description: '', file: null, imageFile: null, imageUrl: '' })
                setIsAddingResource(false)
                
                showSuccess(
                    'Resource uploaded successfully',
                    'Check resource center page'
                )
            }
        } catch (err) {
            console.error('Error creating resource:', err)
            showError(
                'Resource upload was unsuccessful',
                'Refresh and try again'
            )
        } finally {
            setSubmitting(false)
        }
    }

    const handleUpdateResource = async () => {
        if (!editingResource.category || !editingResource.title || !editingResource.description) {
            showError(
                'Missing Information',
                'Please fill all required fields'
            )
            return
        }

        setSubmitting(true)

        try {
            const formData = new FormData()
            formData.append('category', editingResource.category)
            formData.append('title', editingResource.title)
            formData.append('description', editingResource.description)
            formData.append('isActive', editingResource.isActive)

            if (editingResource.newFile) {
                formData.append('file', editingResource.newFile)
            }

            const response = await api.put(`/resources/${editingResource.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.data.success) {
                await fetchResources()
                setEditingResource(null)
                
                showSuccess(
                    'Resource updated successfully',
                    'Changes have been saved'
                )
            }
        } catch (err) {
            console.error('Error updating resource:', err)
            showError(
                'Failed to update resource',
                'Please refresh and try again'
            )
        } finally {
            setSubmitting(false)
        }
    }

    const handleDeleteResource = async (id) => {
        if (!window.confirm('Are you sure you want to delete this resource? This will also delete the file from Cloudinary.')) {
            return
        }

        try {
            const response = await api.delete(`/resources/${id}`)

            if (response.data.success) {
                setResources(resources.filter(resource => resource.id !== id))
                
                showSuccess(
                    'Resource deleted successfully',
                    'The resource has been removed'
                )
            }
        } catch (err) {
            console.error('Error deleting resource:', err)
            showError(
                'Failed to delete resource',
                'Please refresh and try again'
            )
        }
    }

    const toggleResourceStatus = async (id) => {
        try {
            const response = await api.patch(`/resources/${id}/toggle`)

            if (response.data.success) {
                await fetchResources()
                
                showSuccess(
                    'Resource status updated',
                    response.data.message
                )
            }
        } catch (err) {
            console.error('Error toggling resource status:', err)
            showError(
                'Failed to toggle resource status',
                'Please refresh and try again'
            )
        }
    }

    return (
        <AdminLayout>
            <div>
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Resource Manager</h1>
                        <p className="text-gray-600 mt-1">Upload and manage downloadable resources</p>
                    </div>
                    <button
                        onClick={() => setIsAddingResource(true)}
                        className="bg-[#60a5fa] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors flex items-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Upload New Resource
                    </button>
                </div>

                {loading && (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading resources...</p>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                        <p className="text-red-600">{error}</p>
                        <button
                            onClick={fetchResources}
                            className="mt-2 text-red-700 underline hover:text-red-800"
                        >
                            Try again
                        </button>
                    </div>
                )}
                {!loading && !error && resources.length === 0 && (
                    <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <p className="text-gray-600 text-lg">No resources yet.</p>
                        <p className="text-gray-500 text-sm mt-2">Upload your first resource to get started.</p>
                    </div>
                )}

                {!loading && !error && resources.length > 0 && (
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">File</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Downloads</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {resources.map((resource) => (
                                    <tr key={resource.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">{resource.title}</div>
                                            <div className="text-sm text-gray-500 line-clamp-1">{resource.description}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                                {resource.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {resource.fileType} • {resource.fileSize}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {resource.downloadCount || 0}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${resource.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                {resource.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setEditingResource({ ...resource, newFile: null })}
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Edit"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => toggleResourceStatus(resource.id)}
                                                    className="text-yellow-600 hover:text-yellow-800"
                                                    title={resource.isActive ? 'Deactivate' : 'Activate'}
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteResource(resource.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Delete"
                                                >
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Add Resource Modal */}
                {isAddingResource && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8">
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">Upload New Resource</h2>
                                <button
                                    onClick={() => {
                                        setIsAddingResource(false)
                                        setNewResource({ category: '', title: '', description: '', file: null })
                                    }}
                                    className="text-gray-400 hover:text-gray-600"
                                    disabled={submitting}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                                    <select
                                        value={newResource.category}
                                        onChange={(e) => setNewResource({ ...newResource, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                                        disabled={submitting}
                                    >
                                        <option value="">Select category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                                    <input
                                        type="text"
                                        value={newResource.title}
                                        onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                                        placeholder="e.g., Business Plan Template"
                                        disabled={submitting}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                                    <textarea
                                        value={newResource.description}
                                        onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa] resize-none"
                                        placeholder="Describe what this resource contains and how it helps..."
                                        disabled={submitting}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        File * (PDF, Excel, PowerPoint, Word, ZIP - Max 50MB)
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,.xlsx,.xls,.pptx,.ppt,.docx,.doc,.zip"
                                        onChange={handleFileChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                                        disabled={submitting}
                                    />
                                    {newResource.file && (
                                        <p className="text-sm text-green-600 mt-2">
                                            ✓ {newResource.file.name} ({(newResource.file.size / 1024 / 1024).toFixed(2)} MB)
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Placeholder Image (Optional - for card display)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0]
                                            if (file) {
                                                setNewResource({ ...newResource, imageFile: file })
                                            }
                                        }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                                        disabled={submitting || uploadingImage}
                                    />
                                    {newResource.imageFile && (
                                        <p className="text-sm text-green-600 mt-2">
                                            ✓ {newResource.imageFile.name}
                                        </p>
                                    )}
                                    {uploadingImage && (
                                        <p className="text-sm text-blue-600 mt-2">
                                            ⏳ Uploading image...
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-200 flex gap-4">
                                <button
                                    onClick={() => {
                                        setIsAddingResource(false)
                                        setNewResource({ category: '', title: '', description: '', file: null })
                                    }}
                                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddResource}
                                    disabled={submitting}
                                    className="flex-1 bg-[#60a5fa] text-white py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Uploading...' : 'Upload Resource'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Resource Modal */}
                {editingResource && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
                        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8">
                            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-800">Edit Resource</h2>
                                <button
                                    onClick={() => setEditingResource(null)}
                                    className="text-gray-400 hover:text-gray-600"
                                    disabled={submitting}
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                                    <select
                                        value={editingResource.category}
                                        onChange={(e) => setEditingResource({ ...editingResource, category: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                                        disabled={submitting}
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                                    <input
                                        type="text"
                                        value={editingResource.title}
                                        onChange={(e) => setEditingResource({ ...editingResource, title: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                                        disabled={submitting}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                                    <textarea
                                        value={editingResource.description}
                                        onChange={(e) => setEditingResource({ ...editingResource, description: e.target.value })}
                                        rows="4"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa] resize-none"
                                        disabled={submitting}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current File</label>
                                    <p className="text-sm text-gray-600 mb-2">{editingResource.fileType} • {editingResource.fileSize}</p>

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Replace File (Optional)</label>
                                    <input
                                        type="file"
                                        accept=".pdf,.xlsx,.xls,.pptx,.ppt,.docx,.doc,.zip"
                                        onChange={(e) => {
                                            const file = e.target.files[0]
                                            if (file) {
                                                setEditingResource({ ...editingResource, newFile: file })
                                            }
                                        }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                                        disabled={submitting}
                                    />
                                    {editingResource.newFile && (
                                        <p className="text-sm text-green-600 mt-2">
                                            ✓ New file: {editingResource.newFile.name} ({(editingResource.newFile.size / 1024 / 1024).toFixed(2)} MB)
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Current Image</label>
                                    {editingResource.imageUrl && (
                                        <img
                                            src={editingResource.imageUrl}
                                            alt="Current"
                                            className="w-32 h-32 object-cover rounded-lg mb-2"
                                        />
                                    )}

                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Replace Image (Optional)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0]
                                            if (file) {
                                                setEditingResource({ ...editingResource, newImageFile: file })
                                            }
                                        }}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#60a5fa]"
                                        disabled={submitting || uploadingImage}
                                    />
                                    {editingResource.newImageFile && (
                                        <p className="text-sm text-green-600 mt-2">
                                            ✓ New image: {editingResource.newImageFile.name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 border-t border-gray-200 flex gap-4">
                                <button
                                    onClick={() => setEditingResource(null)}
                                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                                    disabled={submitting}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdateResource}
                                    disabled={submitting}
                                    className="flex-1 bg-[#60a5fa] text-white py-3 rounded-lg font-semibold hover:bg-[#3b82f6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? 'Updating...' : 'Update Resource'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}

export default ResourceManager