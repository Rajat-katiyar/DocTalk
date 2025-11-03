import React from 'react';
import Banner from '../Components/Banner';
import MainSection from '../Components/Layout/Main/MainSection';
import Success from '../Components/Layout/Success/Success';

const Home = () => {
    return (
        <>
            <Banner></Banner>
            <MainSection></MainSection>
            <Success></Success>
        </>
    );
};

export default Home;