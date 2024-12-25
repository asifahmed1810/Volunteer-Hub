import React, { useEffect, useState } from 'react';
import VolunteerCard from '../volunteercard/VolunteerCard';

const AllVolunteers = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Track the search input value

    // Fetch volunteers based on the search term
    const fetchVolunteers = async () => {
        try {
            const response = await fetch(`http://localhost:5000/allvolunteer?title=${searchTerm}`);
            const data = await response.json();
            setVolunteers(data); // Update the volunteers state
        } catch (error) {
            console.error('Error fetching volunteers:', error);
        }
    };

    useEffect(() => {
        console.log("Search term from frontend:", searchTerm);  // Log the search term
        const fetchVolunteers = async () => {
            const response = await fetch(`http://localhost:5000/allvolunteer?title=${searchTerm}`);
            const data = await response.json();
            console.log("Response from server:", data);  // Log the response from the server
            setVolunteers(data);
        };
    
        fetchVolunteers();
    }, [searchTerm]);
    

    return (
        <div>
            <div className="flex justify-center my-5">
                <input
                    type="text"
                    placeholder="Search by Post Title"
                    className="input input-bordered w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on input change
                />
            </div>
    
            {/* Volunteer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mb-10">
                {volunteers.length === 0 ? (
                    <p className="text-center">No results found</p> // Show this if no results
                ) : (
                    volunteers.map((volunteer) => (
                        <VolunteerCard key={volunteer._id} volunteer={volunteer}></VolunteerCard>
                    ))
                )}
            </div>
        </div>
    );
    
    
};

export default AllVolunteers;
