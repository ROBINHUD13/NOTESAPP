<!-- import React, { useState, useEffect } from 'react';
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Check if the title already exists in the database
      const response = await databases.listDocuments(
        '67ba052f0033a5682d51',
        '67ba0564002b5f20147e',
        [Query.equal('title', formData.title)]
      );

      if (response.total > 0) {
        setMessage('Error: A note with this title already exists!');
        setIsSubmitting(false);
        return;
      }

      // If title is unique, proceed to create the document
      await databases.createDocument(
        '67ba052f0033a5682d51',
        '67ba0564002b5f20147e',
        formData.id.toString(),
        formData
      );

      setMessage('Note successfully added!');
      setFormData({ id: ID.unique(), title: '', branch: '', semester: '', link: '' });
    } catch (error) {
      setMessage('Error adding note: ' + error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div className={`min-h-screen pt-20 px-6 pb-12 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      <button onClick={toggleTheme} className="absolute top-4 right-4 p-2 bg-gray-700 text-white rounded-lg shadow-lg">
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <div className="max-w-2xl mx-auto relative">
        <h1 className="text-4xl mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          Upload Notes
        </h1>
        <form onSubmit={handleSubmit} className={`space-y-6 p-8 rounded-2xl shadow-xl backdrop-blur-xl border border-white/20 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white/60 text-black'}`}>
          {['Title', 'Branch', 'Semester', 'Link'].map((field) => (
            <div key={field.toLowerCase()}>
              <label className="block text-sm font-medium mb-2">{field}</label>
              <input
                type="text"
                name={field.toLowerCase()}
                value={formData[field.toLowerCase()]}
                onChange={handleChange}
                required
                className={`w-full px-4 py-2.5 rounded-xl backdrop-blur-sm border shadow-sm ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              />
            </div>
          ))}
          <button type="submit" disabled={isSubmitting} className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg">
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
        {message && <div className="mt-6 p-4 text-center bg-green-500/20 rounded-xl text-green-700">{message}</div>}
      </div>
    </div>
  );
}

export default Upload; -->
