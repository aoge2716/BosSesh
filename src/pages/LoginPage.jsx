import {Link} from 'react-router-dom'

const  LoginPage  = () =>{
  return(
    <>
    <div className='min-h-screen flex item-center justify-center mt-5'>
        <div className='w-full max-w-xs'>    

          <h1 className='text-center text-xl'> 
            LoginPage 
          </h1>

          <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2'>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                Username
              </label>
              <input id='username' className='rounded shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='text' placeholder='Enter Username'/>
            </div>

            <div className='mb-4'>
              <label  className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                Password
              </label>
              <input id='password' className='rounded shadow appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type='password' placeholder='Enter Password'/>
            </div>

            <div className='flex items-center justify-between'>
              <button id='login' className='rounded font-bold text-white py-2 px-4 bg-blue-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline' type='button'>
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