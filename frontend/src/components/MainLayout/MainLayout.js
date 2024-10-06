import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const MainLayout = () => {
    return (
        <div className="main-layout" style={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
            <Header />
            <main style={{
                flex: '1 0 auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
