import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';

const Register = () => {
    // const { createUser, setUser } = useContext(AuthContext);

    const handleSignUp = (e) => {
        e.preventDefault();

        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        // Password Validation
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'error',
                title: 'Password must contain:',
                html: `
                <ul class="text-left">
                    <li>At least one uppercase letter.</li>
                    <li>At least one lowercase letter.</li>
                    <li>At least 6 characters.</li>
                </ul>
                `,
                showConfirmButton: false,
                timer: 4000,
            });
            return;
        }

        // Create User with Firebase
        createUser(email, password)
            .then((result) => {
                const user = result.user;
                user.displayName = name;
                user.photoURL = photo;
                setUser(user);

                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful!',
                    text: 'Your account has been created successfully.',
                    confirmButtonText: 'OK',
                });
            })
            .catch((error) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                });
            });
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen mt-10">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl font-bold">Create a New Account</h1>
                    </div>
                    <div className="card bg-base-100 w-full mt-5 max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSignUp} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo-Url</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="url"
                                    name="photo"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
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
                                    placeholder="password"
                                    name="password"
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
                                <button className="btn btn-neutral">Register</button>
                            </div>
                        </form>
                        <div>
                            <p className="text-center pb-3">
                                Already Have an account?
                                <Link
                                    to={'/auth/login'}
                                    className="text-xl font-semibold ml-1 text-red-500"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
