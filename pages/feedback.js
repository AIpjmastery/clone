import React, { useState } from 'react';
import Head from 'next/head';

const StudentFeedback = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    course: '',
    rating: '',
    review: '',
    ideas: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccessMessage('Feedback submitted successfully.');
        setErrorMessage('');
        setFormData({
          fullName: '',
          email: '',
          course: '',
          rating: '',
          review: '',
          ideas: ''
        });
      } else {
        setSuccessMessage('');
        setErrorMessage('Error submitting feedback. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSuccessMessage('');
      setErrorMessage('Error submitting feedback. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Student Feedback</title>
      </Head>
      <header className="bg-white text-purple-700 p-4 flex justify-between items-center" style={{ maxWidth: '400px', margin: '0 auto' }}>
        <img src="/images/Modern Creative Technology Logo.png" alt="Logo" className="h-12"/>
        <div className="relative">
          <button className="p-2 rounded hover:bg-purple-500" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-6 h-1 bg-purple-700 mb-1"></div>
            <div className="w-6 h-1 bg-purple-700"></div>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg">
              <a href="/subscription" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Subscription</a>
              <a href="/help" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Help</a>
              <a href="/feedback" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Feedback</a>
              <a href="/coming-soon" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Coming Soon</a>
            </div>
          )}
        </div>
      </header>
      <div className="max-w-lg mx-auto p-4 bg-white rounded shadow-md" style={{ maxWidth: '400px' }}>
        <h1 className="text-2xl font-bold text-center text-purple-700 my-4">We Value Your Feedback!</h1>
        <p className="text-center text-gray-700 mb-8">
          Your feedback is essential for us to improve our courses and services. Please share your thoughts, reviews, and ideas with us. Fill out the form below to submit your feedback.
        </p>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Share Your Experience</h2>
          <p className="text-gray-700 mb-4">Please fill out the form below to provide your feedback.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name (optional)</label>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email Address (optional)</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Course/Service</label>
              <input
                type="text"
                name="course"
                placeholder="Specify the course or service you are providing feedback for"
                value={formData.course}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="">Select a rating</option>
                <option value="1">1 (Poor)</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5 (Excellent)</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Review</label>
              <textarea
                name="review"
                placeholder="Write your review here"
                value={formData.review}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Ideas/Suggestions</label>
              <textarea
                name="ideas"
                placeholder="Share your ideas or suggestions for improvement"
                value={formData.ideas}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button type="submit" className="w-full bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800">Submit Feedback</button>
          </form>
          {successMessage && <p className="text-green-500 mt-4">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Thank You for Your Feedback!</h2>
          <p className="text-gray-700">
            We appreciate you taking the time to share your thoughts with us. Your input helps us create better experiences for everyone.
          </p>
        </section>

        <footer className="text-center text-gray-600 mt-8">
          <p>Thank you for reaching out! We appreciate your patience and will respond to your inquiry as soon as possible.</p>
        </footer>
      </div>
    </div>
  );
};

export default StudentFeedback;
