import React, { useEffect, useState } from 'react';
import VolunteerCard from '../volunteercard/VolunteerCard';
import { Link } from 'react-router-dom';

const AllVolunteers = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Track the search input value
    const [isGridLayout, setIsGridLayout] = useState(true); // State to toggle layout
    const [isSorted, setIsSorted] = useState(false); // State to toggle sorting

    // Fetch volunteers based on the search term
    const fetchVolunteers = async () => {
        try {
            const response = await fetch(`https://volunteer-hub-server-ten.vercel.app/allvolunteer?title=${searchTerm}`);
            const data = await response.json();
            setVolunteers(data); // Update the volunteers state
        } catch (error) {
            console.error('Error fetching volunteers:', error);
        }
    };

    useEffect(() => {
        fetchVolunteers();
    }, [searchTerm]);

    // Toggle the layout between grid and table
    const toggleLayout = () => {
        setIsGridLayout(!isGridLayout);
    };

    // Sort the volunteers by numOfVolunteer
    const sortVolunteers = () => {
        const sortedData = [...volunteers].sort((a, b) => b.numOfvolunteer - a.numOfvolunteer);
        setVolunteers(sortedData);
        setIsSorted(true);
    };

    return (
        <div className='mt-20 px-4 md:px-8 lg:px-16'>
            <div className="flex flex-col md:flex-row justify-between my-5 gap-4">
                <input
                    type="text"
                    placeholder="Search by Post Title"
                    className="input input-bordered w-full md:w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} // Update the search term on input change
                />
                <div className="max-sm:grid max-sm:grid-cols-1 lg:space-x-2 gap-2">
                    <button onClick={toggleLayout} className="btn btn-neutral w-full md:w-auto">
                        {isGridLayout ? 'Switch to Table Layout' : 'Switch to Grid Layout'}
                    </button>
                    <button onClick={sortVolunteers} className="btn btn-primary w-full md:w-auto">
                        Sort by Volunteers
                    </button>
                </div>
            </div>
    
            {/* Conditional Layout Rendering */}
            <div className={isGridLayout ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mb-10" : "overflow-x-auto"}>
                {volunteers.length === 0 ? (
                    <p className="text-center">No results found</p> // Show this if no results
                ) : isGridLayout ? (
                    volunteers.map((volunteer) => (
                        <VolunteerCard key={volunteer._id} volunteer={volunteer} />
                    ))
                ) : (
                    <div className="w-full overflow-auto">
                        <table className="table w-full min-w-max">
                            <thead>
                                <tr>
                                    <th>Thumbnail</th>
                                    <th>Post Title</th>
                                    <th>Category</th>
                                    <th>Location</th>
                                    <th>Deadline</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {volunteers.map((volunteer) => (
                                    <tr key={volunteer._id}>
                                        <td>
                                            <img
                                                className="h-20 w-32 rounded-xl"
                                                src={volunteer.thumbnail || "https://via.placeholder.com/150"}
                                                alt={volunteer.postTitle}
                                            />
                                        </td>
                                        <td>{volunteer.postTitle}</td>
                                        <td>{volunteer.category}</td>
                                        <td>{volunteer.location}</td>
                                        <td>{volunteer.deadlineDate}</td>
                                        <td>
                                            <Link to={`/volunteerDetails/${volunteer._id}`}>
                                                <button className="btn btn-neutral">Details</button>
                                            </Link>
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

export default AllVolunteers;
