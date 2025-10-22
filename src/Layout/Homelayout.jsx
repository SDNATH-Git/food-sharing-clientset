import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatBoth from '../AIchatBoth/ChatBoth';

const Homelayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <ChatBoth></ChatBoth>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Homelayout;



















