import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../service/firebase';
import { collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

const  LoginPage  = () =>{
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    identifier:'',
    password:''
  });

  const handleChange = e =>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleLogin = async (identifier, password) => {
    try{
      let emailToLogin = identifier; 
      // get user mail with username
      if(!identifier.includes('@')){
        const q = query(collection(db, 'users'), where('username','==', identifier));
        const snapshot = await getDocs(q);

        if(snapshot.empty){
          setErrorMessage('invalid username');
          return;
        }
        emailToLogin = snapshot.docs[0].data().email;
      }

      await signInWithEmailAndPassword(auth, emailToLogin, password);
      navigate('/seshcenter')
    }catch(err){
      if (err.message === 'Firebase: Error (auth/invalid-credential).'){
        setErrorMessage('invalid email or password')
      }else{
        setErrorMessage('Login failed ' + err.message);
      }
      console.log(err.message)
    }
  }

  const handleSubmit = async e =>{
    e.preventDefault();

    await handleLogin(formData.identifier, formData.password);
    

  };


  return(
    <>
    <div className='min-h-screen flex item-center justify-center mt-5'>
        <div className='w-full max-w-xs'>    

          <h1 className='text-center text-xl'> 
            LoginPage 
          </h1>

          <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='identifier'>
                Username or Email
              </label>
              <input 
                id='identifier' 
                type='text' 
                value={formData.identifier}
                onChange={handleChange}
                required={true}
                placeholder='Enter Username or Email'
                className='rounded shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
            </div>

            <div className='mb-4'>
              <label  className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                Password
              </label>
              <input 
                id='password' 
                type='password' 
                value={formData.password}
                onChange={handleChange}
                required={true}
                placeholder='Enter Password'
                className='rounded shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'/>
            </div>

            {errorMessage && (
              <p className='text-red-500 text-xs italic'>
                {errorMessage}
              </p>
            )}

            <div className='flex items-center justify-between'>
              <button id='login' type='submit' className='rounded font-bold text-white py-2 px-4 bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline'>
                LogIn
              </button>
              <Link className='inline-block align-baseline font-bold text-sm  text-blue-500 hover:text-blue-800' to='/resetrequest'>
                Forgot Password
              </Link>
            </div>
          </form>

          <div className='text-center text-gray-500 text-xs'>
            <p>
              new user?
            </p>
            <Link className='inline-block align-baseline font-bold text-blue-500 hover:text-blue-800' to='/signup'>
              SignUp
            </Link>
          </div>
      
        </div>
      </div>
    </>
  )
};

export default  LoginPage ;