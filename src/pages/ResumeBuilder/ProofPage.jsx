import React from 'react';
import { useBuildTrack } from '../../hooks/useBuildTrack';
import { CheckCircle2, Circle, ExternalLink, Copy } from 'lucide-react';

const ProofPage = () => {
    const { STEPS, isStepComplete, links, updateLinks } = useBuildTrack();

    const handleCopyFinal = () => {
        const summary = `
🚀 AI Resume Builder - Submission
----------------------------------
Steps Completed: ${STEPS.filter((_, i) => isStepComplete(i)).length}/${STEPS.length}
Lovable: ${links.lovable}
GitHub: ${links.github}
Deploy: ${links.deploy}
    `.trim();
        navigator.clipboard.writeText(summary);
        alert('Final submission copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <header>
                    <h1 className="text-4xl font-extrabold text-gray-900">Project Proof</h1>
                    <p className="text-xl text-gray-600">Finalize your submission for AI Resume Builder.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Step Status */}
                    <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-6">Build Track Progress</h3>
                        <div className="space-y-4">
                            {STEPS.map((step, i) => (
                                <div key={step} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                                    <div className="flex items-center gap-3">
                                        {isStepComplete(i) ? (
                                            <CheckCircle2 className="text-green-500" size={20} />
                                        ) : (
                                            <Circle className="text-gray-300" size={20} />
                                        )}
                                        <span className={`capitalize ${isStepComplete(i) ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                                            {i + 1}. {step}
                                        </span>
                                    </div>
                                    {isStepComplete(i) && <span className="text-xs font-bold text-green-600 uppercase">Artifact Saved</span>}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Submission Links */}
                    <section className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold mb-6">Deployment Links</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Lovable Edit Link</label>
                                    <input
                                        type="url"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                        placeholder="https://lovable.dev/projects/..."
                                        value={links.lovable}
                                        onChange={(e) => updateLinks({ lovable: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Repository</label>
                                    <input
                                        type="url"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                        placeholder="https://github.com/..."
                                        value={links.github}
                                        onChange={(e) => updateLinks({ github: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Live Deployment</label>
                                    <input
                                        type="url"
                                        className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                        placeholder="https://..."
                                        value={links.deploy}
                                        onChange={(e) => updateLinks({ deploy: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleCopyFinal}
                            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200 flex items-center justify-center gap-2"
                        >
                            <Copy size={20} />
                            Copy Final Submission
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProofPage;
