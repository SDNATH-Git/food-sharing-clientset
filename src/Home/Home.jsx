import React from 'react';
import Banner from '../components/Banner';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <Testimonials></Testimonials>
            <HowItWorks></HowItWorks>

        </div>
    );
};

export default Home;