import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"

function Login(){
   return(
      <Template
         title="Join the millions learning to code with StudyNotion for free"
         description1="Build Skills for today, tomorrow and Beyond"
         description2="Education to future-proof your career."
         image={signupImg}
         formType="signup"
      />
   )
}


export default Login