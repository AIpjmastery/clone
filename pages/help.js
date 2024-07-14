import React, { useState } from 'react';
import Head from 'next/head';

const HelpSupport = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSuccessMessage('Message sent successfully.');
        setErrorMessage('');
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSuccessMessage('');
        setErrorMessage('Error sending message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSuccessMessage('');
      setErrorMessage('Error sending message. Please try again later.');
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Help & Support</title>
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
        <h1 className="text-2xl font-bold text-center text-purple-700 my-4">Need Assistance? We're Here to Help!</h1>
        <p className="text-center text-gray-700 mb-8">
          If you have any questions, issues, or need assistance, please don't hesitate to reach out to us. Fill out the form below, and our support team will get back to you as soon as possible.
        </p>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Get in Touch with Us</h2>
          <p className="text-gray-700 mb-4">Please fill out the form below to send us a message.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Full Name</label>
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
              <label className="block text-gray-700 mb-2">Email Address</label>
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
              <label className="block text-gray-700 mb-2">Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter the subject of your message"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea
                name="message"
                placeholder="Write your message here"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <button type="submit" className="w-full bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-800">Send Message</button>
          </form>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Alternatively, you can contact us through the following:</h2>
          <p className="text-gray-700 mb-4">Email: <a href="mailto:contact@aimasteryworkshops.com" className="text-purple-700">contact@aimasteryworkshops.com</a></p>
          <p className="text-gray-700">Our support team is available. We look forward to assisting you!</p>
        </section>

        <footer className="text-center text-gray-600 mt-8">
          <p>Thank you for reaching out! We appreciate your patience and will respond to your inquiry as soon as possible.</p>
        </footer>
      </div>
    </div>
  );
};

export default HelpSupport;
