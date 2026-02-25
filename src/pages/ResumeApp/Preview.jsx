import React, { useState, useMemo } from 'react';
import { useResumeData } from '../../hooks/useResumeData';
import ResumeSheet from '../../components/resume/ResumeSheet';
import { Printer, Copy, Check, AlertCircle, Sparkles, Download, ArrowUpRight } from 'lucide-react';
import { convertToPlainText } from '../../lib/resumeExportUtils';

const Preview = () => {
    const { resumeData, selectedTemplate, selectedColor, atsScore, suggestions } = useResumeData();
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
        // Tip: window.print() is the most reliable way for local PDF export in browser
    };

    const scoreInfo = useMemo(() => {
        if (atsScore <= 40) return { label: 'Needs Work', color: '#ef4444' };
        if (atsScore <= 70) return { label: 'Getting There', color: '#f59e0b' };
        return { label: 'Strong Resume', color: '#10b981' };
    }, [atsScore]);

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 sticky top-0 z-20 no-print">
                <div className="max-w-[1200px] mx-auto px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">Preview</h2>
                        <div className="h-6 w-px bg-gray-100" />
                        <div className="flex items-center gap-2">
                            <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Score</div>
                            <div style={{ color: scoreInfo.color }} className="text-sm font-black">{atsScore}/100</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
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

            {/* Analysis Dashboard */}
            <div className="max-w-[1200px] mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-[1fr_350px] gap-10 no-print">
                {/* Score Section */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-10">
                    <div className="relative w-40 h-40 shrink-0">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle
                                cx="80" cy="80" r="72"
                                stroke="#f3f4f6" strokeWidth="12" fill="transparent"
                            />
                            <circle
                                cx="80" cy="80" r="72"
                                stroke={scoreInfo.color}
                                strokeWidth="12"
                                fill="transparent"
                                strokeDasharray={452.3}
                                strokeDashoffset={452.3 * (1 - atsScore / 100)}
                                className="transition-all duration-1000 ease-out"
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-4xl font-black text-gray-900">{atsScore}</span>
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Foundational</span>
                        </div>
                    </div>
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4"
                            style={{ backgroundColor: `${scoreInfo.color}15`, color: scoreInfo.color }}>
                            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: scoreInfo.color }} />
                            {scoreInfo.label}
                        </div>
                        <h3 className="text-2xl font-black text-gray-900 mb-2 leading-tight">Your Resume Optimizer</h3>
                        <p className="text-gray-500 text-sm max-w-md leading-relaxed">
                            We've analyzed your resume content against ATS best practices. Use the suggestions to boost your score and pass automated filters.
                        </p>
                    </div>
                </div>

                {/* Suggestions Section */}
                <div className="bg-[#fdfdfd] p-8 rounded-3xl border border-gray-100 flex flex-col gap-6">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Next Milestones</h4>
                    <div className="space-y-4">
                        {suggestions.length > 0 ? (
                            suggestions.map((s, i) => (
                                <div key={i} className="group bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:border-black transition-all cursor-default">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold text-gray-900">{s.text}</span>
                                        <div className="flex items-center gap-1">
                                            <span className="text-[10px] font-black text-blue-500">+{s.points}</span>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-gray-400 font-medium">Recommended for high ATS compliance.</p>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-8 text-center">
                                <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-4">
                                    <Check size={24} />
                                </div>
                                <span className="text-sm font-bold text-gray-900">Maximum Impact Reached!</span>
                                <p className="text-[10px] text-gray-400 mt-1 uppercase font-black">Ready to apply</p>
                            </div>
                        )}
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
            <div className="max-w-[1000px] mx-auto mt-4 px-4 print:mt-0 print:px-0 flex justify-center">
                <div className="bg-white shadow-2xl shadow-gray-200/50 rounded-[2px] print:shadow-none overflow-hidden transform-gpu hover:scale-[1.01] transition-transform duration-500">
                    <ResumeSheet
                        data={resumeData}
                        template={selectedTemplate}
                        accentColor={selectedColor}
                    />
                </div>
            </div>

            {/* Print Footer Hint */}
            <div className="text-center mt-12 mb-20 no-print">
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    <Sparkles size={12} className="text-blue-500" />
                    Pro Tip: Most companies use ATS to scan your resume. Aim for 80+.
                </p>
            </div>
        </div>
    );
};

export default Preview;
