const PasswordResetLinkTemplate = (url) => {
return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Password Reset - StudyNotion</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0F172A; /* Dark Blue */
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #E2E8F0;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      padding: 30px;
      background-color: #1E293B;
      border-radius: 12px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
      text-align: center;
    }

    .logo {
      max-width: 180px;
      margin-bottom: 25px;
    }

    .heading {
      font-size: 22px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #FFD60A;
    }

    .body-text {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 25px;
      color: #CBD5E1;
      text-align: left;
    }

    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #FFD60A;
      color: #0F172A;
      text-decoration: none;
      font-weight: bold;
      border-radius: 6px;
      transition: background 0.3s ease;
      margin: 30px 0;
    }

    .button:hover {
      transform: scale(0.99);
			box-shadow: 0 4px 14px rgba(250, 204, 21, 0.6);
		}

    .footer {
      margin-top: 40px;
      font-size: 13px;
      color: #94A3B8;
    }

    .footer a {
      color: #FFD60A;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <a href="https://studynotion-edtech-project.vercel.app">
      <img class="logo" src="https://res.cloudinary.com/dii5njq9f/image/upload/v1744377710/Logo-Small-Light_ve8rdn.png" alt="StudyNotion Logo">
    </a>
    <div class="heading">Password Reset Request</div>
    <div class="body-text">
      <p>Hello,</p>
      <p>We received a request to reset your password. If this was you, click the button below to set a new password:</p>
    </div>
    <a class="button" href="${url}">Reset Password</a>
    <div class="body-text">
      <p>This link will expire in 24 hours. If you did not request a password reset, you can safely ignore this email.</p>
      <p>Stay safe,<br>The StudyNotion Team</p>
    </div>
    <div class="footer">
      &copy; 2025 <a href="https://studynotion-edtech-project.vercel.app">StudyNotion</a>. All rights reserved.
    </div>
  </div>
</body>
</html>`;
};

module.exports = PasswordResetLinkTemplate;
