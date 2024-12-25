import React, { useEffect, useState } from 'react';
import Banner from '../../shared/Banner/Banner';
import VolunteerCard from '../volunteercard/VolunteerCard'; // Import the VolunteerCard

const Home = () => {
    const [volunteers, setVolunteers] = useState([]);

    // Fetch volunteers from the server
    const fetchVolunteers = async () => {
        try {
            const response = await fetch('http://localhost:5000/allvolunteer');
            const data = await response.json();
            setVolunteers(data); // Update the volunteers state
        } catch (error) {
            console.error('Error fetching volunteers:', error);
        }
    };

    useEffect(() => {
        fetchVolunteers();
    }, []);

    return (
        <div>
            <h2>This is Home</h2>
            <Banner />

            {/* Volunteer Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mb-10">
                {volunteers.length === 0 ? (
                    <p className="text-center">No results found</p> // Show this if no results
                ) : (
                    volunteers.map((volunteer) => (
                        <VolunteerCard key={volunteer._id} volunteer={volunteer} />
                    ))
                )}
            </div>

            <div className='mb-10'>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" defaultChecked />
                    <div className="collapse-title text-xl font-medium">What is the purpose of this project?</div>
                    <div className="collapse-content">
                        <p>The project allows users to submit and manage volunteer requests for specific posts. Users can request to volunteer for different tasks and later cancel their requests if needed.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium"> How does the backend handle the volunteer requests?
                    </div>
                    <div className="collapse-content">
                        <p>The backend stores volunteer requests in a database, where each request is linked to a specific volunteer post. The server validates requests, updates the number of volunteers needed, and allows users to cancel their requests.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">How does the frontend display the volunteer requests?
                    </div>
                    <div className="collapse-content">
                        <p> The frontend fetches volunteer requests made by the logged-in user and displays them in a table with columns such as volunteer name, suggestion, status, and a cancel button for each request.
                        </p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium">What happens when a user clicks the 'Cancel' button?
                    </div>
                    <div className="collapse-content">
                        <p>When the user clicks 'Cancel', a confirmation prompt appears. If confirmed, the request is deleted from the database, and the frontend updates to reflect the cancellation.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200">
                    <input type="radio" name="my-accordion-2" />
                    <div className="collapse-title text-xl font-medium"> How does the system ensure no more volunteers are requested after the limit is reached?
                    </div>
                    <div className="collapse-content">
                        <p>The backend checks if the numOfvolunteer field is greater than zero before allowing a new request. If the limit is reached, the system prevents further requests and sends an error message.</p>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default Home;
