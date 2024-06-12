import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <img src={assets.logo} alt=''/>
                <p>Elevate your dining experience with Tomato – where every bite is a journey of flavor, delivered right to your doorstep! From savory classics to exotic delights, explore our menu and let your taste buds dance with delight. With Tomato, enjoy the convenience of exceptional dining, redefined. </p>

                <div className='footer-social-icons'>
                    <img src={assets.twitter_icon} alt=''/>
                    <img src={assets.facebook_icon} alt=''/>
                    <img src={assets.linkedin_icon} alt=''/>
                </div>
                
            </div>

            <div className='footer-content-center'>
                <h2>Company</h2>

                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
                
            </div>

            <div className='footer-content-right'>
                <h2>Get In Touch</h2>
                <ul>
                    <li>+91-123-321-1234</li>
                    <li>Keyushparwal7@gmail.com</li>
                </ul>
                
            </div>

        </div>

        <hr/>
        <p className='footer-copyright'>
            Copyright © 2024 Tomato. All rights reserved. Unauthorized duplication or publication of any materials from this site is expressly prohibited. 
        </p>
      
    </div>
  )
}

export default Footer
