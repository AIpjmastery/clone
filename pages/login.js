import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Login = () => {
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const emailOrUsername = event.target.emailOrUsername.value;
    const password = event.target.password.value;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${errorText}`);
      }

      const result = await response.json();
      localStorage.setItem('token', result.token); // Store the token
      alert(result.message);
      router.push('/dashboard'); // Redirect to the dashboard page
    } catch (error) {
      alert('Error: ' + error.message);
      console.error('Error details:', error);
    }
  };

  return (
    <div>
      <Head>
        <title>Login</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        <style>{`
          body, html {
            padding: 0;
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #FFFFFF;
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

          .link {
            margin-top: 10px;
            color: #6a1b9a;
            cursor: pointer;
            text-decoration: underline;
          }
        `}</style>
      </Head>
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="fas fa-user"></i>
            <input type="text" name="emailOrUsername" className="input" placeholder="Email or Username" required />
          </div>
          <div className="input-container">
            <i className="fas fa-lock"></i>
            <input type="password" name="password" className="input" placeholder="Password" required />
          </div>
          <button type="submit" className="submit-button">Login</button>
        </form>
        <div className="link" onClick={() => window.location.href = 'recover.html'}>Forgot Password?</div>
      </div>
    </div>
  );
};

export default Login;
