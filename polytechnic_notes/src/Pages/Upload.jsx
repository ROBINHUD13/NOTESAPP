import React, { useState, useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import { Client, Databases, ID, Query } from 'appwrite';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('67b9769f0033365ffa52');
const databases = new Databases(client);

function Upload() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    id: ID.unique(),
    title: '',
    branch: '',
    semester: '',
    link: '',
  });
  const [formErrors, setFormErrors] = useState({
    semester: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success'); // 'success' or 'error'
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const cloudinaryPreset = 'ml_default';
  const cloudinaryCloudName = 'duyzcrsjq';

  useEffect(() => {
    const fetchLastId = async () => {
      try {
        await databases.listDocuments('67ba052f0033a5682d51', '67ba0564002b5f20147e', { orderDesc: '$id', limit: 1 });
      } catch (error) {
        console.error('Error fetching last ID:', error);
      }
    };
    fetchLastId();
  }, []);

  const validateSemester = (value) => {
    // Check if value is a number between 1 and 6
    const semesterNum = parseInt(value);
    if (isNaN(semesterNum) || semesterNum < 1 || semesterNum > 6) {
      return 'Semester must be a number between 1 and 6';
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Validate semester field when it changes
    if (name === 'semester') {
      const error = validateSemester(value);
      setFormErrors(prev => ({
        ...prev,
        semester: error
      }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadStatus('File selected: ' + e.target.files[0].name);
    }
  };

  const uploadToCloudinary = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first');
      return null;
    }

    setUploadStatus('Uploading to Cloudinary...');
    
    const formDataForUpload = new FormData();
    formDataForUpload.append('file', selectedFile);
    formDataForUpload.append('upload_preset', cloudinaryPreset);
    
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`,
        {
          method: 'POST',
          body: formDataForUpload,
        }
      );
      
      const data = await response.json();
      
      if (data.secure_url) {
        setUploadStatus('Upload successful!');
        return data.secure_url;
      } else {
        setUploadStatus('Upload failed: ' + (data.error?.message || 'Unknown error'));
        return null;
      }
    } catch (error) {
      setUploadStatus('Upload failed: ' + error.message);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate semester field before submission
    const semesterError = validateSemester(formData.semester);
    if (semesterError) {
      setFormErrors(prev => ({
        ...prev,
        semester: semesterError
      }));
      // Show an error message
      setMessage('Please fix the errors in the form before submitting');
      setMessageType('error');
      return;
    }
    
    setIsSubmitting(true);
    setMessage('');

    try {
      let finalData = { ...formData };
      
      if (selectedFile) {
        const cloudinaryUrl = await uploadToCloudinary();
        
        if (!cloudinaryUrl) {
          setMessage('Failed to upload file to Cloudinary');
          setMessageType('error');
          setIsSubmitting(false);
          return;
        }
        
        finalData.link = cloudinaryUrl;
      }

      const response = await databases.listDocuments(
        '67ba052f0033a5682d51',
        '67ba0564002b5f20147e',
        [Query.equal('title', formData.title)]
      );

      if (response.total > 0) {
        setMessage('Error: A note with this title already exists!');
        setMessageType('error');
        setIsSubmitting(false);
        return;
      }

      await databases.createDocument(
        '67ba052f0033a5682d51',
        '67ba0564002b5f20147e',
        finalData.id.toString(),
        finalData
      );

      setMessage('Note successfully added!');
      setMessageType('success');
      setFormData({ id: ID.unique(), title: '', branch: '', semester: '', link: '' });
      setFormErrors({ semester: '' });
      setSelectedFile(null);
      setUploadStatus('');
    } catch (error) {
      setMessage('Error adding note: ' + error.message);
      setMessageType('error');
    }

    setIsSubmitting(false);
  };

  return (
    <div className={`min-h-screen pt-20 px-6 pb-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-800'}`}>
      <button 
        onClick={toggleTheme} 
        className={`absolute top-4 right-4 p-2 rounded-lg shadow-lg transition-colors ${
          isDarkMode 
            ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400' 
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
      >
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      
      <div className="max-w-2xl mx-auto">
        <h1 className={`text-4xl mb-6 font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Upload Notes</h1>
        
        <div className={`rounded-xl shadow-lg overflow-hidden transition-colors ${
          isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        }`}>
          <div className={`p-4 font-medium text-lg ${
            isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-50 text-gray-700'
          }`}>
            Submit New Notes
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6 p-8">
            <div>
              <label className={`block text-sm font-medium mb-2 capitalize ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter title"
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
                }`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 capitalize ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Branch
              </label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                required
                placeholder="Enter branch"
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
                }`}
              />
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 capitalize ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Semester (1-6)
              </label>
              <input
                type="number"
                name="semester"
                min="1"
                max="6"
                value={formData.semester}
                onChange={handleChange}
                required
                placeholder="Enter semester (1-6)"
                className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none transition-colors ${
                  isDarkMode 
                    ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' 
                    : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'
                } ${formErrors.semester ? 'border-red-500' : ''}`}
              />
              {formErrors.semester && (
                <p className="mt-1 text-sm text-red-500">
                  {formErrors.semester}
                </p>
              )}
            </div>
            
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Upload PDF File
              </label>
              <div className={`flex items-center justify-center w-full`}>
                <label className={`flex flex-col w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-700 hover:bg-gray-600' 
                    : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
                }`}>
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className={`w-8 h-8 mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className={`mb-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>PDF files only</p>
                  </div>
                  <input 
                    type="file" 
                    accept=".pdf" 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                </label>
              </div>
              {uploadStatus && (
                <p className={`mt-2 text-sm ${
                  uploadStatus.includes('successful') 
                    ? 'text-green-500' 
                    : uploadStatus.includes('failed') 
                      ? 'text-red-500' 
                      : 'text-blue-500'
                }`}>
                  {uploadStatus}
                </p>
              )}
            </div>
            
            <button 
              type="submit" 
              disabled={isSubmitting || formErrors.semester !== ''} 
              className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                isSubmitting || formErrors.semester !== '' 
                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                  : isDarkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : 'Submit Notes'}
            </button>
          </form>
        </div>
        
        {message && (
          <div className={`mt-6 p-4 rounded-lg text-white ${
            messageType === 'success' ? 'bg-green-500' : 'bg-red-500'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;