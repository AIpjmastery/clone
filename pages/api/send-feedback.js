// pages/api/send-feedback.js
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullName, email, course, rating, review, ideas } = req.body;

    try {
      await sendgrid.send({
        to: 'contact@aimasteryworkshops.com',
        from: 'no-reply@aimasteryworkshops.com', // Your verified sender
        subject: `New Feedback Submission`,
        html: `
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Course/Service:</strong> ${course}</p>
          <p><strong>Rating:</strong> ${rating}</p>
          <p><strong>Review:</strong></p>
          <p>${review}</p>
          <p><strong>Ideas/Suggestions:</strong></p>
          <p>${ideas}</p>
        `,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending feedback:', error);
      res.status(500).json({ error: 'Error sending feedback' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
