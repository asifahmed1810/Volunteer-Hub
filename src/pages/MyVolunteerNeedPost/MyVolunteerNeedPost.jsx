import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const MyVolunteerNeedPost = () => {
    const { user } = useContext(AuthContext);
    const [volunteers, setVolunteers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // if (user) {
            // fetch(`https://volunteer-hub-server-ten.vercel.app/useraddedvolunteer?email=${user.email}`)
            //     .then((res) => res.json())
            //     .then((data) => setVolunteers(data))
            axios.get(`https://volunteer-hub-server-ten.vercel.app/useraddedvolunteer?email=${user.email}`, { withCredentials: true })
                .then(res=>setVolunteers(res.data))
                .catch((error) => Swal.fire('Error', 'Error fetching user-added volunteers', 'error'));
        // }
    }, [user.email]);

    // Handle delete action
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://volunteer-hub-server-ten.vercel.app/useraddedvolunteer/${id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            setVolunteers(volunteers.filter((volunteer) => volunteer._id !== id));
                            Swal.fire('Deleted!', 'Your post has been deleted.', 'success');
                        } else {
                            Swal.fire('Error', 'Failed to delete the post.', 'error');
                        }
                    })
                    .catch((error) => Swal.fire('Error', 'Error deleting post.', 'error'));

            }
        });
    };

    const handleUpdate = (id) => {
        navigate(`/updatevolunteerneedpost/${id}`);
    };

    return (
        <div>
            <div className="w-11/12 mx-auto my-10">
                <h1 className="text-2xl font-bold text-center mb-8">My Volunteer need Post</h1>

                {volunteers.length === 0 ? (
                    <p className="text-center">No posts added yet.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border px-4 py-2">Title</th>
                                    <th className="border px-4 py-2">Category</th>
                                    <th className="border px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {volunteers.map((volunteer) => (
                                    <tr key={volunteer._id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2">{volunteer.title}</td>
                                        <td className="border px-4 py-2">{volunteer.category}</td>
                                        <td className="border px-4 py-2 flex justify-center space-x-2">
                                            {/* Update Button */}

                                            <button onClick={() => handleUpdate(volunteer._id)} className="btn btn-primary btn-sm">Update</button>


                                            {/* Delete Button */}
                                            <button
                                                onClick={() => handleDelete(volunteer._id)}
                                                className="btn btn-danger btn-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyVolunteerNeedPost;
