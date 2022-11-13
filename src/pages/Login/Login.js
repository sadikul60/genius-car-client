import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { FaGithub, FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
    const {login, GoogleSignIn} = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        login(email, password)
        .then(result => {
            const user = result.user;
            const currentUser = {
                email: user.email
            }

            // console.log(currentUser);

            fetch('https://genius-car-server-alpha.vercel.app/jwt', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(currentUser),
            })
            .then(res => res.json())
            .then(data => {

                // localstorage is the eusiest but not the best solution;
                localStorage.setItem('genius-token', data?.token);
                console.log(data);
                navigate(from, {replace: true});
            })
            
            
            
        })
        .catch(err => console.log(err))
    }

    // handle Google Log In
    const handleGoogle = () => {
        GoogleSignIn(googleProvider)
        .then(result => {
            const user = result.user;
            const currentUser = {
                email: user?.email,
            }
            

            fetch('https://genius-car-server-alpha.vercel.app/jwt', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(currentUser),
            })
            .then(res => res.json())
            .then(data => {

                // localstorage is the eusiest but not the best solution;
                localStorage.setItem('genius-token', data?.token);
                console.log(data);
                navigate(from, {replace: true});
            })
        })
        .catch(err => console.log(err))
    }


   
    return (
        <div className="hero w-full my-12">
            <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={img} alt="" />
                </div>
                <div className="card  w-full max-w-sm shadow-2xl bg-slate-300">
                    <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-5xl text-center font-bold text-black">Login</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-black">Email</span>
                            </label>
                            <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text  text-black">Password</span>
                            </label>
                            <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <Link className="label-text-alt link link-hover text-black">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary" type="submit" value="Login" />
                        </div>
                        <p className='text-black text-center py-3'>New to Genius Car? 
                            <Link to='/signup'><span className='text-orange-500 font-semibold'>Sign Up</span></Link>
                        </p>
                    </form>
                        <div className='pb-12 text-center'>
                            <button onClick={handleGoogle} className='btn btn-outline btn-primary font-bold mr-3'><span className='mr-2'><FaGoogle /></span> Google</button>
                            <button className='btn btn-outline btn-primary font-bold '><span className='mr-2'><FaGithub /></span> Github</button>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Login;