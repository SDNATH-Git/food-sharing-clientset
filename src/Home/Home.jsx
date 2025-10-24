import React from 'react';
import Banner from '../components/Banner';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import FeaturedFoods from '../Pages/FeaturedFoods/FeaturedFoods';
import FoodHeroesSection from '../components/FoodHeroesSection';
import TestimonialSection from '../components/TestimonialSection';
import CoverageMap from '../components/CoverageMap';



const Home = () => {
    return (
        <div className=''>
            <Banner></Banner>
            <FeaturedFoods></FeaturedFoods>
            <CoverageMap></CoverageMap>
            <Testimonials></Testimonials>
            <HowItWorks></HowItWorks>
            <FoodHeroesSection></FoodHeroesSection>
            <TestimonialSection></TestimonialSection>

        </div>
    );
};

export default Home;