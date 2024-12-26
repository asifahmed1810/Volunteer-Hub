import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext/AuthContext";
import axios from "axios";

const MyVolunteerRequestPost = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    const userEmail = user?.email; // Replace with the logged-in user's email

    useEffect(() => {
        // Fetch requests made by the user
        const fetchRequests = async () => {
            try {
                const response = await axios.get(
                    `https://volunteer-hub-server-ten.vercel.app/requestvolunteer?email=${userEmail}`,
                    { withCredentials: true } // Include credentials if needed
                );
                setRequests(response.data); // Update state with the fetched data
                // console.log("Fetched Requests:", response.data); // Debugging output
            } catch (error) {
                console.error("Error fetching volunteer requests:", error); // Log errors for debugging
                Swal.fire("Error", "Error fetching volunteer requests", "error"); // User-friendly error alert
            } finally {
                setLoading(false); // Ensure loading state is properly updated
            }
        };

        if (userEmail) {
            fetchRequests();
        }
    }, [userEmail]); // Depend on userEmail to re-run when it changes


    // Handle cancellation of a volunteer request
    const handleCancel = (id) => {
        // console.log("Deleting request with ID:", id); // Log the ID to make sure it's correct

        Swal.fire({
            title: "Are you sure?",
            text: "This will cancel your volunteer request.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, cancel it!",
            cancelButtonText: "No, keep it",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://volunteer-hub-server-ten.vercel.app/requestvolunteer/${id}`, {
                    method: "DELETE",
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.success) {
                            Swal.fire("Cancelled!", "Your request has been cancelled.", "success");
                            setRequests((prevRequests) =>
                                prevRequests.filter((request) => request._id !== id)
                            );
                        } else {
                            Swal.fire("Error!", "Failed to cancel the request.", "error");
                        }
                    })
                    .catch((error) => {
                        console.error("Error cancelling request:", error);
                        Swal.fire("Error!", "An unexpected error occurred.", "error");
                    });
            }
        });
    };


    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (requests.length === 0) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-2xl font-semibold">You have no volunteer requests.</h2>
                <p className="text-gray-500">
                    Submit requests through the "Be a Volunteer" page.
                </p>
            </div>
        );
    }

    return (
        <div className="lg:w-3/4 mx-auto my-10">
            <h1 className="text-3xl font-bold text-center mb-5">My Volunteer Requests</h1>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Volunteer Email</th>
                            <th>Date</th>
                            <th>Suggestion</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request, index) => (
                            <tr key={request._id}>
                                <td>{index + 1}</td>
                                <td>{request.volunteerEmail}</td>
                                <td>{request.requestDate}</td>
                                <td>{request.suggestion}</td>
                                <td>{request.status}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleCancel(request._id)}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyVolunteerRequestPost;
