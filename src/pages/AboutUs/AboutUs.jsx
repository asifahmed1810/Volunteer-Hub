import React from 'react';
import { FaUsers, FaClipboardList, FaToggleOn, FaUserShield, FaLaptop, FaExclamationCircle } from 'react-icons/fa';

const AboutUs = () => {
    return (
        <div className="w-11/12 mx-auto mt-20 my-10 p-6 bg-gray-100 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
                Welcome to VolunteerHub
            </h1>
            <p className="text-lg text-gray-700 mb-6">
                VolunteerHub is an innovative platform that bridges the gap between volunteers and organizers.
                Designed to streamline the volunteering process, it empowers communities to connect, collaborate, and contribute to meaningful causes.
            </p>
            <p className="text-lg text-gray-700 mb-6">
                Our mission is to simplify volunteering by providing an intuitive platform where organizers can post events and volunteers can find opportunities to make a difference.
            </p>

            <h2 className="text-2xl font-semibold text-slate-800  mb-4">Key Features</h2>
            <ul className="list-none space-y-4">
                <li className="flex items-start gap-2">
                    <FaUserShield className="text-slate-800  mt-1" />
                    <span>
                        <strong>User Authentication:</strong> Secure login and registration system for users and organizers.
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <FaClipboardList className="text-slate-800  mt-1" />
                    <span>
                        <strong>Volunteer Posts:</strong> Organizers can post events requiring volunteers with all necessary details.
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <FaUsers className="text-slate-800  mt-1" />
                    <span>
                        <strong>Volunteer Sign-Up:</strong> Users can sign up for opportunities and manage their participation.
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <FaToggleOn className="text-slate-800  mt-1" />
                    <span>
                        <strong>Theme Toggling:</strong> Seamlessly switch between light and dark modes for a personalized experience.
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <FaLaptop className="text-slate-800  mt-1" />
                    <span>
                        <strong>Responsive Design:</strong> A mobile-friendly interface optimized for all devices.
                    </span>
                </li>
                <li className="flex items-start gap-2">
                    <FaExclamationCircle className="text-slate-800 mt-1" />
                    <span>
                        <strong>Error Handling:</strong> User-friendly alerts and error messages for smooth navigation.
                    </span>
                </li>
            </ul>

            <h2 className="text-2xl font-semibold text-slate-800 mb-4 mt-8">NPM Packages Used</h2>
            <ul className="list-disc list-inside text-gray-800 space-y-2">
                <li><strong>React Router DOM:</strong> For seamless navigation between pages.</li>
                <li><strong>Axios:</strong> To handle API requests efficiently.</li>
                <li><strong>SweetAlert2 (Swal):</strong> For elegant alerts and confirmations.</li>
                <li><strong>Firebase:</strong> To power user authentication and data storage.</li>
                <li><strong>Tailwind CSS:</strong> For a modern and responsive design.</li>
                <li><strong>React Icons:</strong> To enhance the UI with meaningful icons.</li>
                <li><strong>Dotenv:</strong> To securely manage environment variables.</li>
            </ul>

            
        </div>
    );
};

export default AboutUs;
