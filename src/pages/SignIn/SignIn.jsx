import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext/AuthContext';
import Swal from 'sweetalert2';


const Login = () => {

    const navigate = useNavigate();

    const { userLogin, setUser,signInWithGoogle } = useContext(AuthContext);

    const handleLogIn = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        userLogin(email, password)
            .then(result => {
                const user = result.user;
                setUser(user);
                navigate('/');
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Invalid email or password. Please try again.',

                })
            })

    }


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                navigate("/");
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Google sign-in failed. Please try again.',
                });
            });
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen mt-10">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card bg-base-100 w-full mt-5 max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleLogIn} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">
                                        Forgot password?
                                    </a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-neutral">Login</button>

                                <div className="pb-4 ">
                                    <button
                                        onClick={handleGoogleSignIn}
                                        className="btn w-full btn-ghost mt-2 border border-black"
                                    >
                                        Google
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div>
                            <p className="text-center pb-3">
                                Don't Have an account?
                                <Link
                                    className="ml-1 text-red-500 font-semibold"
                                    to={"/register"}
                                >
                                    Register
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
