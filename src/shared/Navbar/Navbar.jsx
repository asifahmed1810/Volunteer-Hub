import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import { FiMoon, FiSun } from 'react-icons/fi';

const Navbar = () => {
    const { user, logOut, isDarkTheme, toggleTheme } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logOut();
        navigate('/signin');
    };

    const links = (
        <>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/allvolunteer'}>All Volunteer</NavLink></li>
            <li><NavLink to={'/addVolunteer'}>Add Volunteer</NavLink></li>
            {user && <li><NavLink to={'/useraddedvolunteer'}>My Added Post</NavLink></li>}
        </>
    );

    return (
        <div className="navbar bg-base-200 rounded-lg">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to={'/'}>
                    <span className="btn btn-neutral text-xl">volunteerHub</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end flex items-center gap-4">
                <button onClick={toggleTheme} className="btn btn-ghost">
                    {isDarkTheme ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
                </button>
                {!user ? (
                    <Link to={'/signin'}>
                        <button className="btn btn-neutral">Login</button>
                    </Link>
                ) : (
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            className="avatar cursor-pointer"
                            title={user.displayName || user.email}>
                            <div className="w-10 rounded-full">
                                <img src={user.photoURL || '/default-avatar.png'} alt="Profile" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2">
                            <li><NavLink to={'/myvolunteerneedpost'} className={'font-semibold'}>My Volunteer Need Post</NavLink></li>
                            <li><NavLink to={'/myvolunteerrequestpost'} className={'font-semibold'}>Manage My Posts</NavLink></li>
                            <li><button onClick={handleLogout} className="btn btn-neutral">Logout</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
