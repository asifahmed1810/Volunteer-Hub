import React from 'react';
import Banner from '../../shared/Banner/Banner';
import AllVolunteers from '../AllVolunteer/AllVolunteers';

const Home = () => {
    return (
        <div>
            <h2>THis is home</h2>
            <Banner></Banner>
            <AllVolunteers></AllVolunteers>
        </div>
    );
};

export default Home;