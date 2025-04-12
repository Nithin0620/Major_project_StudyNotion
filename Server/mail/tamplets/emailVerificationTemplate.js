const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>OTP Verification - StudyNotion</title>
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
		}

		.otp-box {
			display: inline-block;
			padding: 15px 30px;
			background-color: #FFD60A;
			color: #0F172A;
			font-size: 28px;
			font-weight: bold;
			letter-spacing: 4px;
			border-radius: 8px;
			margin-bottom: 20px;
		}

		.cta-button {
			display: inline-block;
			margin-top: 30px;
			padding: 12px 24px;
			background-color: #FFD60A;
			color: #0F172A;
			text-decoration: none;
			font-weight: bold;
			border-radius: 6px;
			transition: background 0.3s ease;
		}

		.cta-button:hover {
			background-color: #000435;
		}

		.support {
			margin-top: 35px;
			font-size: 14px;
			color: #94A3B8;
		}

		.support a {
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
		<div class="heading">Verify Your Email</div>
		<div class="body-text">
			<p>Dear User,</p>
			<p>Thank you for registering with <strong>StudyNotion</strong>. To secure your account and complete registration, please use the OTP below:</p>
		</div>
		<div class="otp-box">${otp}</div>
		<div class="body-text">
			<p>This OTP is valid for the next 5 minutes. Please do not share it with anyone.</p>
			<p>If you didn’t request this, please ignore this email.</p>
		</div>
		<a class="cta-button" href="https://studynotion-edtech-project.vercel.app">Visit StudyNotion</a>
		<div class="support">
			<p>Need help? Contact us at <a href="mailto:info@studynotion.com">info@studynotion.com</a></p>
		</div>
	</div>
</body>

</html>`;
};

module.exports = otpTemplate;
