import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const Header = () => {
    const {user, logOut} = useContext(AuthContext);

     // Sign Out
     const handleSignOut = () => {
        logOut()
        .then()
        .catch(err => console.error(err))
    }
    const menuItems = <>
        <li className='font-semibold'><Link to='/'>Home</Link></li>
        {
            user?.email ?
            <>
            <li className='font-semibold'><Link to='/orders'>Orders</Link></li>
            <button onClick={handleSignOut} className='btn-ghost rounded-lg'><li className='font-semibold'><Link>Sign Out</Link></li></button>
            </>
            :
            <li className='font-semibold'><Link to='/login'>Login</Link></li>
        }
    </>
    return (
        <div className="navbar bg-slate-500 h-20 pb-16 pt-16 text-white">
            <div className="navbar-start">
                <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </label>
                <ul tabIndex={0} className="menu menu-compact lg-hidden dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                    {menuItems}
                </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl"><img src={logo} alt="logo" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
            <button className="btn btn-outline btn-warning">Appoinment</button>
            </div>
        </div>
    );
};

export default Header;