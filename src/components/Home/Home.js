import React from 'react';
import Footer from '../Footer/Footer';
import Navigation from '../Navigation/Navigation';
import Services from '../Services/Services';
import Slider from '../Slider/Slider';

const Home = () => {
    return (
        <>
            <Navigation />
            <Slider />
            <Services />
            <Footer />
        </>
    );
};

export default Home;