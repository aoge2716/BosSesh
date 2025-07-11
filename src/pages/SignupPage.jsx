import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../service/firebase';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

const SignupPage = () =>{

  return(
    <>
      <div className='mini-h-screen flex item-center justify-center mt-5'>
        <div className='w-full max-w-xs'>    

          <h1 className='text-center text-xl'> 
            SignUpPage 
          </h1>

        </div>
      </div>
    </>
    
  )
};

export default SignupPage;