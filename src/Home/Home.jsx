import React from 'react';
import Banner from '../components/Banner';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import FeaturedFoods from '../Pages/FeaturedFoods/FeaturedFoods';

const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <FeaturedFoods></FeaturedFoods>
            <Testimonials></Testimonials>
            <HowItWorks></HowItWorks>

        </div>
    );
};

export default Home;