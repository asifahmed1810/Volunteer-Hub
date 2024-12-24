import React from 'react';

const VolunteerCard = ({ volunteer }) => {
    const { thumbnail, postTitle, category, location,
        deadlineDate } = volunteer;

    return (
        <div className="card card-compact bg-base-100  shadow-xl">
            <figure>
                <img className='h-64 w-96 rounded-xl'
                    src={thumbnail || "https://via.placeholder.com/150"} // Fallback image if thumbnail is missing
                    alt={postTitle}
                />
            </figure>
            <div className="card-body ">
                <h2 className="card-title font-semibold ">{postTitle}</h2>
                <p className='font-semibold'>Category: {category}</p>
                <p className='font-semibold'>Location: {location}</p>
                <p className='font-semibold'>Deadline: {deadlineDate}</p>
                <div className="card-actions justify-center ">
                    <button className="btn btn-neutral">Be a Volunteer</button>
                </div>
            </div>
        </div>
    );
};

export default VolunteerCard;
