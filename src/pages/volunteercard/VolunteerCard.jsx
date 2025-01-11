import React from 'react';
import { Link } from 'react-router-dom';

const VolunteerCard = ({ volunteer }) => {
    const {_id, thumbnail, title, category, location,
        deadlineDate } = volunteer;

    return (
        <div className="card card-compact bg-base-100  shadow-xl">
            <figure>
                <img className='h-64 w-80 rounded-xl'
                    src={thumbnail || "https://via.placeholder.com/150"} // Fallback image if thumbnail is missing
                    alt={title}
                />
            </figure>
            <div className="card-body ">
                <h2 className="card-title  font-semibold ">{title}</h2>
                {/* <p className='font-semibold'>Category: {category}</p> */}
                <p className='font-semibold'>Location: {location}</p>
                <p className='font-semibold'>Deadline: {deadlineDate}</p>
                <div className="card-actions justify-center ">
                    <Link to={`/volunteerDetails/${_id}`}><button className="btn btn-neutral">Details</button></Link>
                </div>
            </div>
        </div>
    );
};

export default VolunteerCard;
