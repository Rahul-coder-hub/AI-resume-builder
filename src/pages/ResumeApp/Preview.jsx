import React, { useState } from 'react';
import { useResumeData } from '../../hooks/useResumeData';
import ResumeSheet from '../../components/resume/ResumeSheet';
import { Printer, Copy, Check, AlertCircle, Sparkles, Download } from 'lucide-react';
import { convertToPlainText } from '../../lib/resumeExportUtils';

const Preview = () => {
    const { resumeData, selectedTemplate, selectedColor } = useResumeData();
    const [copied, setCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleCopyText = async () => {
        const text = convertToPlainText(resumeData);
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownloadPDF = () => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        // window.print() is still available via the Printer button
    };

    const isComplete = resumeData.personalInfo.name && (resumeData.experience.length > 0 || resumeData.projects.length > 0);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-20 no-print">
                <div className="max-w-[1200px] mx-auto px-8 h-16 flex items-center justify-between">
                    <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">Preview</h2>
                    <div className="flex items-center gap-4">
                        {!isComplete && (
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-lg text-xs font-bold border border-amber-100 animate-pulse">
                                <AlertCircle size={14} />
                                Your resume may look incomplete.
                            </div>
                        )}
                        <button
                            onClick={handleCopyText}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors"
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                            {copied ? 'Copied!' : 'Copy Text'}
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm"
                        >
                            <Download size={16} />
                            Download PDF
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
                        >
                            <Printer size={16} />
                            Print / Save
                        </button>
                    </div>
                </div>
            </div>

            {/* Toast */}
            {showToast && (
                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 backdrop-blur-xl">
                        <div style={{ backgroundColor: selectedColor }} className="p-1.5 rounded-full">
                            <Check size={14} strokeWidth={4} />
                        </div>
                        <span className="text-sm font-bold">PDF export ready! Check your downloads.</span>
                    </div>
                </div>
            )}

            {/* Resume Content */}
            <div className="max-w-[1000px] mx-auto mt-12 px-4 print:mt-0 print:px-0">
                <div className="bg-white shadow-2xl shadow-gray-200/50 rounded-[2px] print:shadow-none overflow-hidden">
                    <ResumeSheet
                        data={resumeData}
                        template={selectedTemplate}
                        accentColor={selectedColor}
                    />
                </div>
            </div>

            {/* Print Footer Hint */}
            <div className="text-center mt-12 no-print">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    <Sparkles size={12} className="text-blue-500" />
                    Pro Tip: Use 'Save as PDF' in the print dialog for best results
                </p>
            </div>
        </div>
    );
};

export default Preview;
