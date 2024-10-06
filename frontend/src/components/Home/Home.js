import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page" style={{
            textAlign: 'center',
            padding: '50px 20px',
            backgroundImage: "url('/home-pic-2.jpg')",
            backgroundSize: 'cover',
            color: 'white',
            borderRadius: '10px',
            maxWidth: '75%',
            opacity: '0.9',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)'
        }}>
            <h1>Bine ai venit la Aplicația de Gestionare a Portofoliului!</h1>
            <p>
                Această aplicație te ajută să gestionezi lucrările tale ca artist digital într-un mod simplu și eficient.
            </p>
            <h2>Funcționalități Cheie:</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li> Interfață atractivă și intuitivă</li>
                <li> Creare, citire, actualizare și ștergere a lucrărilor</li>
                <li> Încărcare imagini pentru fiecare lucrare</li>
                <li> Link către site-ul clientului pentru fiecare lucrare</li>
                <li> Responsivitate completă pe toate dispozitivele</li>
            </ul>
            <Link to="portfolio" style={{ padding: '10px 20px', background: '#4CAF50', color: '#fff', borderRadius: '5px', textDecoration: 'none', marginTop: '20px', display: 'inline-block' }}>
                Vezi portofoliile
            </Link>
        </div>
    );
};

export default Home;
