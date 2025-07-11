import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../service/firebase';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

const ResetRequestPage = () =>{

  return(
    <>
      <div className='flex item-center justify-center mt-5'>
        <div className='w-full max-w-xs'>    

          <h1 className='text-center text-xl'> 
            Reset Password
          </h1>

          <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>
              <input id='email' className='rounded shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' placeholder='Enter Email'/>
            </div>

            <div className='flex items-center justify-center'>
              <button id='reset-request' className='rounded font-bold text-white py-2 px-4 bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline' type='button'>
                Get link
              </button>
            </div>
          </form>

          <div className='text-center text-gray-500 text-xs'>
            <p>
              new user?
            </p>
            <Link className='inline-block align-baseline font-bold text-blue-500 hover:text-blue-800' to='/signUp'>
              SignUp
            </Link>
          </div>

        </div>
      </div>
    </>
    
  )
};

export default ResetRequestPage;