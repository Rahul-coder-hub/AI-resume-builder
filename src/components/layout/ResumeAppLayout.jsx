import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';

const ResumeAppLayout = () => {
    return (
        <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">
            {/* Top Navigation */}
            <nav className="h-16 border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white font-bold text-xs tracking-tighter">AI</div>
                    <span className="font-bold tracking-tight text-xl">Resume Builder</span>
                </Link>

                <div className="flex items-center gap-8">
                    <NavLink
                        to="/builder"
                        className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                    >
                        Builder
                    </NavLink>
                    <NavLink
                        to="/preview"
                        className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                    >
                        Preview
                    </NavLink>
                    <NavLink
                        to="/proof"
                        className={({ isActive }) => `text-sm font-medium transition-colors ${isActive ? 'text-black' : 'text-gray-400 hover:text-black'}`}
                    >
                        Proof
                    </NavLink>
                </div>

                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">RC</div>
            </nav>

            {/* Page Content */}
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
};

export default ResumeAppLayout;
