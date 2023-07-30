import React, { useState }  from 'react';
import './App.css';
import OtpInput from "otp-input-react"
import {CgSpinner} from "react-icons/cg"
import PhoneInput from 'react-phone-input-2';
import "react-phone-input-2/lib/style.css"
import {auth} from "./firebase.config";
import {RecaptchaVerifier} from "firebase/auth"
import {signInWithPhoneNumber } from "firebase/auth";
import { setLogLevel } from 'firebase/app';
import { Toaster ,toast } from 'react-hot-toast';

function App() {
    const [otp,setOtp] = useState("");
    const [ph,setPh] = useState("");
    const [loading,setloading] = useState(false);
    const [showOTP,setShowOTP] = useState(false);
    const[user,setUser] = useState(null);


    function onCaptchVerify(){
      if(!window.recaptchaVerifier){
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {
            onSignup()
          },
          'expired-callback': () => {
            
          }
        },auth);
      }
    }

  function onSignup(){
    setloading(true)
    onCaptchVerify()

    const appVerifier = window.recaptchaVerifier
    const formatPh = '+' + ph
    signInWithPhoneNumber(auth, formatPh, appVerifier)
    .then((confirmationResult) => {
      
      window.confirmationResult = confirmationResult;
      setloading(false)
      setShowOTP(true)
      toast.success("OTP sent successfully !")
      // ...
    }).catch((error) => {
      console.log(error)
      setloading(false)
    });
  }

  function onOTPVerify(){
     setloading(true)
     window.confirmationResult.confirm(otp).then(async(res)=>{
      console.log(res)
      setUser(res.user);
      setloading(false);
     }).catch((error) =>{
        console.log(error);
        toast.success("Wrong OTP !")
        setloading(false)
     })
  }

  return (
    <section className="bg-emerald-500 flex items-center jsutify-center h-screen section1">
          <div>
            <Toaster toastOptions={{duration:4000}} />
             <div id="recaptcha-container">

             </div>
            {user ? (
               <h2 className='text-center  text-white font-medium text-3xl mb-6'>
               Login Successfull
            </h2>
            ):(
              <div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
                  <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
                    TeachersBridge
                  </h1>
                  {
                    showOTP ? 
                           <>
                   <div>
                    <label htmlFor="otp" className='font-bold text-2xl text-white text-center '>
                      Enter your OTP
                    </label>
                    
                    <OtpInput
                    value ={otp}
                    onChange = {setOtp}
                    autoFocus OTPLength={6} otpType="number" disabled={false} secure className="opt-container"/>
                    <button  onClick={onOTPVerify}  className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'>
                      {loading && <CgSpinner size={20} className="mt-1 animate-spin"/>}
                      <span>Verify OTP</span>
                    </button>
                    
                   </div>
                           </> :
                           <>
                       <div>
                        <label htmlFor="ph" className='font-bold text-1xl text-white text-center '>
                          Verify your Phone Number
                        </label>
                        
                        <PhoneInput country={"in"} value={ph} onChange={setPh}/>
                        
                        <button onClick={onSignup} className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'>
                          {loading && <CgSpinner size={20} className="mt-1 animate-spin"/>}
                          <span>Send OTP via SMS </span>
                        </button>
                        
                       </div>
                           </>
                            
                  }
                  

            </div>
            )
            
            }
            

            
          </div>
    </section>
  );
}

export default App;
