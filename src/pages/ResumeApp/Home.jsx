import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-white to-gray-50">
            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 tracking-tighter leading-tight">
                Build a Resume That <br />
                <span className="text-gray-400">Gets Read.</span>
            </h1>
            <p className="text-xl text-gray-500 mb-12 max-w-2xl leading-relaxed">
                The premium AI resume builder for modern developers. <br />
                Professional, minimal, and designed for results.
            </p>
            <Link
                to="/builder"
                className="bg-black text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-gray-800 transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
                Start Building
            </Link>
        </div>
    );
};

export default Home;
