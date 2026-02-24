import React from 'react';
import { Copy, Rocket, CheckCircle2, AlertCircle } from 'lucide-react';

const BuildTrackLayout = ({
    children,
    title,
    description,
    stepNumber,
    totalSteps,
    artifactContent,
    onArtifactChange,
    onSave,
    onNext,
    isNextDisabled
}) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(artifactContent);
        alert('Copied to clipboard!');
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Top Bar */}
            <nav className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">AI</div>
                    <span className="font-bold text-gray-900">AI Resume Builder</span>
                </div>

                <div className="text-sm font-medium text-gray-500">
                    Project 3 — <span className="text-indigo-600">Step {stepNumber} of {totalSteps}</span>
                </div>

                <div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                        Build Track
                    </span>
                </div>
            </nav>

            {/* Context Header */}
            <header className="bg-white border-b border-gray-100 py-10 px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{title}</h1>
                    <p className="mt-2 text-lg text-gray-600 max-w-3xl">{description}</p>
                </div>
            </header>

            {/* Main Workspace Area */}
            <main className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-0">
                {/* Left: Main Workspace */}
                <div className="p-8 border-r border-gray-200 bg-white min-h-[calc(100vh-280px)]">
                    {children}
                </div>

                {/* Right: Secondary Build Panel */}
                <aside className="bg-gray-50 p-6 flex flex-col gap-6">
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Build Panel</h3>

                        <div className="relative group">
                            <label className="block text-xs font-bold text-gray-500 mb-2">Copy This Into Lovable</label>
                            <textarea
                                className="w-full h-64 p-4 text-sm font-mono bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none shadow-sm"
                                placeholder="Paste your artifact content here..."
                                value={artifactContent}
                                onChange={(e) => onArtifactChange(e.target.value)}
                            />
                            <button
                                onClick={handleCopy}
                                className="absolute top-10 right-3 p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
                                title="Copy to clipboard"
                            >
                                <Copy size={16} className="text-gray-600" />
                            </button>
                        </div>

                        <a
                            href="https://lovable.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full bg-white border border-gray-200 text-gray-900 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all shadow-sm group"
                        >
                            <Rocket size={18} className="text-indigo-600 group-hover:scale-110 transition-transform" />
                            Build in Lovable
                        </a>

                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={onSave}
                                className="flex flex-col items-center gap-2 p-3 bg-green-50 border border-green-100 rounded-xl hover:bg-green-100 transition-colors"
                            >
                                <CheckCircle2 size={20} className="text-green-600" />
                                <span className="text-xs font-bold text-green-700">It Worked</span>
                            </button>
                            <button className="flex flex-col items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-colors opacity-50 cursor-not-allowed">
                                <AlertCircle size={20} className="text-red-600" />
                                <span className="text-xs font-bold text-red-700">Error</span>
                            </button>
                        </div>

                        <button className="w-full py-3 text-xs font-bold text-gray-500 border border-dashed border-gray-300 rounded-xl hover:bg-white transition-colors">
                            + Add Screenshot
                        </button>
                    </div>
                </aside>
            </main>

            {/* Proof Footer */}
            <footer className="h-20 bg-white border-t border-gray-200 sticky bottom-0 z-50 px-8 flex items-center justify-between">
                <div className="flex items-center gap-8 text-sm font-bold text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${artifactContent ? 'bg-green-500' : 'bg-gray-300'}`} />
                        Artifact Uploaded
                    </div>
                    <div className="flex items-center gap-2 opacity-50">
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                        Proof Recorded
                    </div>
                </div>

                <button
                    onClick={onNext}
                    disabled={isNextDisabled}
                    className={`px-10 py-3 rounded-full font-bold transition-all shadow-lg ${isNextDisabled
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200'
                        }`}
                >
                    Next Step
                </button>
            </footer>
        </div>
    );
};

export default BuildTrackLayout;
