import React from 'react';
import { Package, Search, CheckCircle2 } from 'lucide-react';

const Proof = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-12">
            <div className="max-w-4xl mx-auto space-y-8">
                <header>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Proof of Work</h1>
                    <p className="text-xl text-gray-500">Documenting the development artifacts for AI Resume Builder.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-black text-white rounded-2xl flex items-center justify-center mb-6">
                            <Package size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Build Artifacts</h3>
                        <p className="text-gray-500 mb-6 text-sm">Design tokens, architecture diagrams, and core implementation logs.</p>
                        <div className="w-full space-y-3">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm font-medium">
                                <span>Layout System</span>
                                <CheckCircle2 size={16} className="text-green-500" />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm font-medium">
                                <span>Route Rail</span>
                                <CheckCircle2 size={16} className="text-green-500" />
                            </div>
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg text-sm font-medium">
                                <span>Gating Logic</span>
                                <CheckCircle2 size={16} className="text-green-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center justify-center border-dashed">
                        <Search size={48} className="text-gray-200 mb-4" />
                        <p className="text-gray-400 font-medium">No additional proofs recorded yet.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Proof;
