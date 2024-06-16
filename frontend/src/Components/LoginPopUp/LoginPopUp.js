import React, { useContext, useState} from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const LoginPopUp = ({setShowLogin}) => {

    const {url,setToken}=useContext(StoreContext);

    const [currState,SetCurrState]=useState('Sign Up');
    const [data,setData]=useState({
        name:'',
        email:'',
        password:''
    });

    const onChangeHandler=(e)=>{
        const name=e.target.name;
        const value=e.target.value;

        setData(data=>({...data,[name]:value}))
    }

    const onLogin=async (event)=>{
        event.preventDefault();
        let newUrl=url;
        if(currState==='Login'){
            newUrl+='/api/user/login';
        }
        else{
            newUrl+='/api/user/register';
        }

        const response =await axios.post(newUrl,data);
        if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token',response.data.token);
            setShowLogin(false);
        }
        else{
            alert(response.data.message);
        }

    }
    
  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className='login-popup-title'>
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=''/>
            </div>

            <div className='login-popup-inputs'>
                {currState==='Login'? <></>:  <input name='name' onChange={onChangeHandler} value={data.name}  type='text' placeholder='Enter Your Name' required/>}
                <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Enter Your Email' required/>
                <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='Enter Your Password' required/>
            </div>

            <button type='submit'>{currState==='Sign Up'?"Create Account":"Login"}</button>

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
