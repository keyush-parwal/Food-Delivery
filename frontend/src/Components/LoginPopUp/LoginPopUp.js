import React, {useState} from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets';

const LoginPopUp = ({setShowLogin}) => {

    const [currState,SetCurrState]=useState('Sign Up');
    
  return (
    <div className='login-popup'>
        <form className='login-popup-container'>
            <div className='login-popup-title'>
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=''/>
            </div>

            <div className='login-popup-inputs'>
                {currState==='Login'? <></>:  <input type='text' placeholder='Enter Your Name' required/>}
                <input type='email' placeholder='Enter Your Email' required/>
                <input type='password' placeholder='Enter Your Password' required/>
            </div>

            <button>{currState==='Sign Up'?"Create Account":"Login"}</button>

            <div className='login-popup-condition'>
                <input type='checkbox' required/>
                <p>By continuing, you agree to our Terms and Conditions.</p>
            </div>

            {currState==='Login'
            ? <p>Create a new account ? <span onClick={()=>SetCurrState('Sign Up')}>Click Here</span></p>
            : <p>Already Have an account ? <span onClick={()=>SetCurrState('Login')}>Login Here</span> </p>
        }

            
        </form>
      
    </div>
  )
}

export default LoginPopUp
