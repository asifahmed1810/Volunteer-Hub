import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserAddedVolunteer = () => {
    const { user } = useContext(AuthContext);
    const [volunteers, setVolunteers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            axios
                .get(`https://volunteer-hub-server-ten.vercel.app/useraddedvolunteer?email=${user.email}`, { withCredentials: true })
                .then((res) => {
                    if (Array.isArray(res.data)) {
                        setVolunteers(res.data);
                    } else {
                        console.error('Expected an array but got:', res.data);
                        setVolunteers([]);
                    }
                })
                .catch((error) => console.error('Error fetching user-added volunteers:', error))
                .finally(() => setLoading(false));
        }
    }, [user]);

    if (loading) {
        return <p className="text-center">Loading...</p>;
    }

    return (
        <div className="w-11/12 mx-auto mt-20 my-10">
            <h1 className="text-2xl font-bold text-center mb-8">My Added Posts</h1>

            {volunteers.length === 0 ? (
                <p className="text-center">No posts added yet.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {volunteers.map((volunteer) => (
                        <div key={volunteer._id} className="card card-compact bg-base-100 shadow-xl">
                            <figure>
                                <img
                                    className="h-64 w-96 rounded-xl"
                                    src={volunteer.thumbnail || "https://via.placeholder.com/150"}
                                    alt={volunteer.postTitle || 'Volunteer Thumbnail'}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title font-semibold">{volunteer.title}</h2>
                                <p className="font-semibold">Category: {volunteer.category}</p>
                                <div className="card-actions justify-center">
                                    <Link to={`/volunteerDetails/${volunteer._id}`}>
                                        <button className="btn btn-neutral">Details</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UserAddedVolunteer;
