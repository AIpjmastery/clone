import React from 'react';
import Head from 'next/head';

const Register = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    const username = event.target.username.value;
    const password = event.target.password.value;

    if (!email) {
      alert('Email is missing in URL');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      alert(result.message);
      window.location.href = 'login';
    } catch (error) {
      alert('Error: ' + error.message);
      console.error('Error details:', error);
    }
  };

  return (
    <div>
      <Head>
        <title>Register</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <style>{`
          body, html {
            padding: 0;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #FDF0FF;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            height: 100vh;
          }

          .container {
            max-width: 370px;
            width: 100%;
            padding: 20px;
            text-align: center;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          h1 {
            color: #6a1b9a;
            font-size: 1.5em;
            margin-bottom: 20px;
          }

          .input-container {
            display: flex;
            align-items: center;
            background-color: #f3f3f3;
            padding: 10px;
            border-radius: 5px;
            border: 1px solid #3e3e3e;
            margin-bottom: 20px;
          }

          .input-container i {
            margin-right: 10px;
            color: #6a1b9a;
          }

          .input {
            flex: 1;
            border: none;
            background: none;
            outline: none;
            font-size: 1em;
          }

          .submit-button {
            width: 100%;
            padding: 15px;
            font-size: 1.2em;
            color: white;
            background-color: #6a1b9a;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .submit-button:hover {
            background-color: #9c27b0;
          }
        `}</style>
      </Head>
      <div className="container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="fas fa-user"></i>
            <input type="text" name="username" className="input" placeholder="Username" required />
          </div>
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input type="password" name="password" className="input" placeholder="Password" required />
          </div>
          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
