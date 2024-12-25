import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AuthContext from '../../context/AuthContext/AuthContext';

const VolunteerModal = ({ volunteer, closeModal }) => {
    const {user}=useContext(AuthContext);
    const [suggestion, setSuggestion] = useState('');
    const navigate = useNavigate();

    const handleRequest = async () => {
        const requestData = {
            postId: volunteer._id,
            volunteerName: user?.displayName || 'Anonymous', // Fallback for missing user data
            volunteerEmail: user?.email || 'no-email@example.com', // Fallback for missing user data
            suggestion,
        };
    
        console.log('Request Data:', requestData); // Debugging
    
        try {
            const response = await fetch('http://localhost:5000/requestvolunteer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });
            const result = await response.json();
    
            if (result.success) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Request submitted successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    closeModal();
                    navigate('/allvolunteer'); // Navigate to a dashboard or relevant page
                });
            } else {
                console.error('Server Error:', result.error); // Debugging
                Swal.fire({
                    title: 'Error!',
                    text: result.error || 'Failed to submit the request.',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while submitting the request.',
                icon: 'error',
                confirmButtonText: 'Try Again',
            });
        }
    };
    
    return (
        <div className="modal modal-open ">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{volunteer.title}</h3>
                <p className="py-2">{volunteer.description}</p>
                <div>
                    <p><b>Category:</b> {volunteer.category}</p>
                    <p><b>Location:</b> {volunteer.location}</p>
                    <p><b>No. of Volunteers Needed:</b> {volunteer.numOfvolunteer}</p>
                    <p><b>Deadline:</b> {volunteer.deadlineDate}</p>
                    <p><b>Organizer:</b> {volunteer.email}</p>
                </div>
                <div className="mt-4">
                    <label htmlFor="suggestion" className="block mb-2">
                        Suggestion (optional):
                    </label>
                    <textarea
                        id="suggestion"
                        className="textarea textarea-bordered w-full"
                        value={suggestion}
                        onChange={(e) => setSuggestion(e.target.value)}
                    ></textarea>
                </div>
                <div className="modal-action">
                    <button className="btn btn-primary" onClick={handleRequest}>
                        Request
                    </button>
                    <button className="btn btn-secondary" onClick={closeModal}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VolunteerModal;
