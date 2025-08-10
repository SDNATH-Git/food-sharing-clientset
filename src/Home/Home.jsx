import React from 'react';
import Banner from '../components/Banner';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import FeaturedFoods from '../Pages/FeaturedFoods/FeaturedFoods';
import FoodHeroesSection from '../components/FoodHeroesSection';


const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <FeaturedFoods></FeaturedFoods>
            <Testimonials></Testimonials>
            <HowItWorks></HowItWorks>
            <FoodHeroesSection></FoodHeroesSection>

        </div>
    );
};

export default Home;