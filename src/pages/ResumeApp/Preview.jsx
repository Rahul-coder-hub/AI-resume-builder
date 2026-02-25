import React, { useState } from 'react';
import { useResumeData } from '../../hooks/useResumeData';
import ResumeSheet from '../../components/resume/ResumeSheet';
import { Printer, Copy, Check, AlertCircle } from 'lucide-react';
import { convertToPlainText } from '../../lib/resumeExportUtils';

const Preview = () => {
    const { resumeData, selectedTemplate, setSelectedTemplate } = useResumeData();
    const [copied, setCopied] = useState(false);
    const [warning, setWarning] = useState(null);
    const templates = ['Classic', 'Modern', 'Minimal'];

    const validateBeforeExport = (callback) => {
        const missingName = !resumeData.personalInfo.name;
        const missingExpOrProj = resumeData.experience.length === 0 && resumeData.projects.length === 0;

        if ((missingName || missingExpOrProj) && !warning) {
            setWarning("Your resume may look incomplete.");
            return;
        }

        setWarning(null);
        callback();
    };

    const handlePrint = () => {
        validateBeforeExport(() => {
            window.print();
        });
    };

    const handleCopy = () => {
        const text = convertToPlainText(resumeData);
        navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col pt-12 print:pt-0 print:bg-white">
            {/* Template Switcher overlay */}
            <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-white/80 backdrop-blur-md p-1 rounded-full border border-gray-100 shadow-xl hidden md:flex no-print">
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

            <div className="flex-1 max-w-[210mm] mx-auto w-full mb-32 px-4 transition-all duration-500 print:mb-0 print:px-0 print:max-w-none">
                <div className="shadow-2xl print:shadow-none">
                    <ResumeSheet data={resumeData} template={selectedTemplate} />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 no-print z-[60]">
                {warning && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">{warning}</span>
                        <button
                            onClick={() => setWarning(null)}
                            className="ml-2 hover:opacity-50"
                        >
                            <Check className="w-3 h-3" />
                        </button>
                    </div>
                )}

                <div className="flex bg-black/80 backdrop-blur-md p-1.5 rounded-full shadow-2xl border border-white/10">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-3 px-6 py-3 rounded-full hover:bg-white/10 transition-all text-white group"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400 group-hover:text-white" />}
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{copied ? 'Copied' : 'Copy Text'}</span>
                    </button>

                    <div className="w-[1px] bg-white/10 mx-1 my-2" />

                    <button
                        onClick={handlePrint}
                        className="flex items-center gap-3 px-8 py-3 rounded-full bg-white text-black hover:bg-gray-100 transition-all group"
                    >
                        <Printer className="w-4 h-4" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Print / Save PDF</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Preview;
