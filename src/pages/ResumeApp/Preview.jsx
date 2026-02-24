import React from 'react';
import { useResumeData } from '../../hooks/useResumeData';
import ResumeSheet from '../../components/resume/ResumeSheet';

const Preview = () => {
    const { resumeData } = useResumeData();

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-12">
            <div className="flex-1 max-w-[210mm] mx-auto w-full mb-20 px-4">
                <div className="shadow-2xl">
                    <ResumeSheet data={resumeData} />
                </div>
            </div>

            {/* Print Instructions */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-2xl opacity-50 hover:opacity-100 transition-opacity whitespace-nowrap">
                Cmd + P to export as PDF
            </div>
        </div>
    );
};

export default Preview;
