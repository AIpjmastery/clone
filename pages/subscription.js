import React, { useState } from 'react';
import Head from 'next/head';

const SubscriptionManagement = () => {
  const [feedback, setFeedback] = useState('');
  const [otherFeedback, setOtherFeedback] = useState('');
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleOtherFeedbackChange = (event) => {
    setOtherFeedback(event.target.value);
  };

  const handleConfirmCancel = () => {
    setConfirmCancel(true);
  };

  const handleCancelSubscription = () => {
    // Handle subscription cancellation logic here
    alert('Your subscription has been cancelled.');
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Subscription Management</title>
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
        <h1 className="text-2xl font-bold text-center text-purple-700 my-4">Welcome to Your Subscription Management Portal</h1>
        <p className="text-center text-gray-700 mb-8">
          Thank you for being a valued subscriber! Here, you can manage your subscription plan, including upgrading, downgrading, or canceling your subscription. Please choose the option that best suits your needs.
        </p>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Choose a New Plan</h2>
          <a href="http://127.0.0.1:3002/public_html/plan.html" className="block bg-purple-700 text-white py-2 px-4 rounded text-center hover:bg-purple-800">Go to Plan Subscription Page</a>
          <p className="text-gray-600 mt-2">Changes to your subscription plan will take effect on your next billing cycle.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">We’re sorry to see you go!</h2>
          <button onClick={handleConfirmCancel} className="block w-full bg-red-600 text-white py-2 px-4 rounded text-center hover:bg-red-700">Cancel Subscription</button>
        </section>

        {confirmCancel && (
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-purple-700 mb-2">Tell Us Why</h2>
            <p className="text-gray-700 mb-4">We value your feedback. Please let us know why you are canceling your subscription.</p>
            <div className="mb-4">
              <label className="block text-gray-700">
                <input type="radio" value="Too expensive" checked={feedback === 'Too expensive'} onChange={handleFeedbackChange} className="mr-2"/>
                Too expensive
              </label>
              <label className="block text-gray-700">
                <input type="radio" value="Not using the service enough" checked={feedback === 'Not using the service enough'} onChange={handleFeedbackChange} className="mr-2"/>
                Not using the service enough
              </label>
              <label className="block text-gray-700">
                <input type="radio" value="Found a better alternative" checked={feedback === 'Found a better alternative'} onChange={handleFeedbackChange} className="mr-2"/>
                Found a better alternative
              </label>
              <label className="block text-gray-700">
                <input type="radio" value="Other" checked={feedback === 'Other'} onChange={handleFeedbackChange} className="mr-2"/>
                Other
              </label>
              {feedback === 'Other' && (
                <input type="text" value={otherFeedback} onChange={handleOtherFeedbackChange} className="w-full mt-2 p-2 border border-gray-300 rounded"/>
              )}
            </div>
            <button onClick={handleCancelSubscription} className="block w-full bg-red-600 text-white py-2 px-4 rounded text-center hover:bg-red-700">Confirm Cancellation</button>
            <p className="text-gray-600 mt-2">Are you sure you want to cancel your subscription?</p>
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-purple-700 mb-2">Need Help?</h2>
          <p className="text-gray-700">If you need assistance or have any questions about your subscription, please contact our support team:</p>
          <p className="text-gray-700 mt-2">Email: <a href="mailto:contact@aimasteryworkshops.com" className="text-purple-700">contact@aimasteryworkshops.com</a></p>
          <p className="text-gray-700 mt-4">We are here to help you with any issues or concerns you may have.</p>
        </section>

        <footer className="text-center text-gray-600 mt-8">
          <p>Thank you for being a part of our community!</p>
          <p>We appreciate your business and hope to continue serving you in the future.</p>
        </footer>
      </div>
    </div>
  );
};

export default SubscriptionManagement;
