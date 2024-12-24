import React, { useEffect, useState } from 'react';
import VolunteerCard from '../volunteercard/VolunteerCard';

const AllVolunteers = () => {
    const [volunteers,setVolunteers]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:5000/allvolunteer')
        .then(res=>res.json())
        .then(data=>setVolunteers(data))
    },[])
    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mb-10'>
                {
                    volunteers.map(volunteer=><VolunteerCard key={volunteer._id} volunteer={volunteer}></VolunteerCard>)
                }
            </div>
        </div>
    );
};

export default AllVolunteers;