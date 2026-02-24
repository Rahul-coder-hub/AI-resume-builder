import React from 'react';
import { useResumeData } from '../../hooks/useResumeData';
import ResumeSheet from '../../components/resume/ResumeSheet';

const Preview = () => {
    const { resumeData, selectedTemplate, setSelectedTemplate } = useResumeData();
    const templates = ['Classic', 'Modern', 'Minimal'];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-12">
            {/* Template Switcher overlay */}
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md p-1 rounded-full border border-gray-100 shadow-xl hidden md:flex">
                {templates.map(t => (
                    <button
                        key={t}
                        onClick={() => setSelectedTemplate(t)}
                        className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${selectedTemplate === t
                                ? 'bg-black text-white'
                                : 'text-gray-400 hover:text-black'
                            }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="flex-1 max-w-[210mm] mx-auto w-full mb-32 px-4 transition-all duration-500">
                <div className="shadow-2xl">
                    <ResumeSheet data={resumeData} template={selectedTemplate} />
                </div>
            </div>

            {/* Print Instructions */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-105 active:scale-95">
                Cmd + P to export as PDF
            </div>
        </div>
    );
};

export default Preview;
