import React, { useState } from 'react';
import VolunteerModal from '../volunteerModal/VolunteerModal';
import { useLoaderData } from 'react-router-dom';

const VolunteerDetails = () => {
    const volunteer = useLoaderData();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <div className='w-3/4 mx-auto mb-10'>
            <div className="card bg-base-100 shadow-xl mt-10">
                <figure>
                    <img className='h-96 w-96 mx-auto' src={volunteer.thumbnail} alt={volunteer.title} />
                </figure>
                <div className="card-body ">
                    <h2 className="card-title ">{volunteer.title}</h2>
                    <p><span className='font-semibold'>Description:</span> {volunteer.description}</p>
                    <p><span className='font-semibold'>Category:</span> {volunteer.category}</p>
                    <p><span className='font-semibold'>Location:</span> {volunteer.location}</p>
                    <p><span className='font-semibold'>Number of Volunteers Needed:</span> {volunteer.numOfvolunteer}</p>
                    <p><span className='font-semibold'>Deadline:</span> {volunteer.deadlineDate}</p>
                    <p><span className='font-semibold'>Submitted By:</span> {volunteer.email}</p>

                    <div className="mt-4">
                        {volunteer.numOfvolunteer > 0 ? (
                            <button className="btn btn-neutral" onClick={handleOpenModal}>
                                Be a Volunteer
                            </button>
                        ) : (
                            <p className="text-red-500 font-semibold">
                                No more volunteers are needed for this event.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <VolunteerModal volunteer={volunteer} closeModal={handleCloseModal} />
            )}
        </div>
    );
};

export default VolunteerDetails;
