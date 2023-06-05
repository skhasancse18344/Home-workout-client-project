
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import  { AuthContext } from '../../auth/AuthContext/AuthProvider';

const SignIn = () => {
    
    const{checkAuth, setCheckAuth}=useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
    
    if(checkAuth.isAuth){
        navigate('/');
    }
    },[checkAuth]);
    const { register, formState: { errors }, handleSubmit } = useForm();

    const handleLogin = data => {
       
        fetch('http://localhost:5000/login',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then((data)=>{
          if(data){
            window.localStorage.setItem('token', data.token);
            setCheckAuth({ 
                isAuth:true,
                token:data.token
            });
          }
        })
     
    }

    return (
        <>{
            !checkAuth.isAuth?
        
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center text-workout-primary'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text" style={{color: "white"}}>Email</span></label>
                        <input type="text"
                        
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered w-full max-w-xs"  style={{color: "black"}}/>
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text" style={{color: "white"}}>Password</span></label>
                        <input type="password"
                        style={{color: "black"}}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                            className="input input-bordered w-full max-w-xs" />
                     
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <input className='btn bg-workout-primary text-neutral-50 w-full mt-6' value="Login" type="submit" />
                    <div>
                    
                    </div>
                </form>
                <p style={{color: "white"}} className='mt-4'>New to Our Site!!! <Link className='text-secondary' to="/Register">Create new Account</Link></p>
             
            </div>
        </div>:<></>}
        
        </>
    );
};

export default SignIn;