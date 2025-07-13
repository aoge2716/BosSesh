import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db, auth } from '../service/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const SignupPage = () =>{
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();
  const [formData, setFormData] =useState({
    username: '',
    email: '',
    password:'',
    repass:''
  });

  const handleChange= e=>{
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    

    // check password reuiqrement 
    if (formData.password.length< 8){
      setErrorMessage("Password has to be more than 8 digits");
      return;
    }
    else if (formData.password !== formData.repass){
      setErrorMessage("Passwords don't match");
      return;
    }
    
    
    // create user
    try{
      // check if username already exsists
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', formData.username));
      const snapshot = await getDocs(q);
      if(!snapshot.empty){
        setErrorMessage("Username already exists");
        return
      }

      // user creation with firebase auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );

      // add user data to firestore
      await addDoc(usersRef, {
        uid: userCredential.user.uid,
        username: formData.username, 
        email: formData.email,
        createdAt: new Date()
      })

      navigate('/');
      console.log(response)
    }catch(err){
      setErrorMessage(err.message)
    }
  }


  return(
    <>
      <div className='flex item-center justify-center mt-5'>
        <div className='w-full max-w-xs'>    

          <h1 className='text-center text-xl'> 
            SignUpPage
          </h1>

          <form onSubmit={handleSubmit} className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2'>
            <div className='mb-4'>
              
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                Username
              </label>
              <input 
                id='username' 
                type='text' 
                value={formData.username}
                onChange={handleChange}
                required={true}
                placeholder='Enter Username'
                className='rounded shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
                />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                Email
              </label>
              <input 
                id='email' 
                type='email' 
                value={formData.email} 
                onChange={handleChange} 
                required={true}
                placeholder='Enter Email' 
                className='rounded shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              />
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
                className='rounded shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
              />
            </div>

            <div className='mb-4'>
              <label  className='block text-gray-700 text-sm font-bold mb-2' htmlFor='repass'>
                Confirm Password
              </label>
              <input 
                id='repass'  
                type='password' 
                placeholder='Enter Password'
                value={formData.repass}
                onChange={handleChange}
                required={true}
                className='rounded shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
              />
              {errorMessage && (
                <p className='text-red-500 text-xs italic'>
                  {errorMessage}
                </p>
              )}

            </div>

            <div className='flex items-center justify-center'>
              <button id='signup'  type='submit' className='rounded font-bold text-white py-2 px-4 bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline'>
                SignUp
              </button>
            </div>
          </form>

          <div className='text-center text-gray-500 text-xs'>
            <p>
              already have an account?
            </p>
            <Link className='inline-block align-baseline font-bold text-blue-500 hover:text-blue-800' to='/login'>
              LogIn
            </Link>
          </div>

        </div>
      </div>
    </>
    
  )
};

export default SignupPage;