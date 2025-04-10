const PasswordResetLinktamplet = (url) => {
	return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset</title>
  <style>
    body {
      background-color: #0d1b2a;
      color: #ffffff;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #1b263b;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    h1 {
      color: #e0e1dd;
      text-align: center;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
      color: #cbd5e1;
    }
    .button {
      display: block;
      width: fit-content;
      margin: 30px auto;
      padding: 12px 24px;
      background-color: #0077b6;
      color: #ffffff;
      text-decoration: none;
      font-weight: bold;
      border-radius: 6px;
      transition: background-color 0.3s ease;
    }
    .button:hover {
      background-color: #0096c7;
    }
    .footer {
      text-align: center;
      margin-top: 40px;
      font-size: 12px;
      color: #a9a9a9;
    }
      .header{
         background-color: #FFD60A;
         text-align:center;
         color:#FEF9F3;
         border-radius : 10px;
         width:400px;
         margin-left:60px;
      }
  </style>
</head>
<body>
  <div class="container">
    <h1 class="header">Password Reset Request</h1>
    <p>Hello,</p>
    <p>We received a request to reset your password. If you made this request, please click the button below to reset your password:</p>
    <a href="${ url }" class="button">Reset Password</a>
    <p>If you didn’t request a password reset, you can safely ignore this email. This link will expire in 24 hours for your security.</p>
    <p>Stay safe,<br>The Support Team</p>
  </div>
  <div class="footer">
    &copy; 2025 Your Company. All rights reserved.
  </div>
</body>
</html>
` ;
};

module.exports = PasswordResetLinktamplet;
