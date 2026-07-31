import emailjs from '@emailjs/browser';

// Configuration - Get these from https://www.emailjs.com/
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export async function sendConfirmationEmail(name: string, email: string, whatsappLink: string) {
  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_name: name,
        to_email: email,
        from_name: 'IRIS MIT-WPU',
        subject: 'Application Received - IRIS Recruitment',
        message: `Hi ${name},

Thank you for applying to IRIS - Innovation, Research, Intelligence & Support!

We have successfully received your application. Our team will review it and get back to you within 3-5 business days.

Next Steps:
• Join our WhatsApp community for updates: ${whatsappLink}
• Keep an eye on your email for further communication
• Follow us on Instagram: https://www.instagram.com/iris_mitwpu/

We're excited to have you on board!

Best regards,
IRIS Recruitment Team
MIT-WPU, Pune`,
      },
      EMAILJS_PUBLIC_KEY
    );
    return true;
  } catch (error) {
    console.error('Email send failed:', error);
    return false;
  }
}
