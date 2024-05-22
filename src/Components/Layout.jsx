import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    return (
        <>
            <div className="App max-w-screen-lg mx-auto py-5 px-4 sm:px-8">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </>
    );
};

export default Layout;
