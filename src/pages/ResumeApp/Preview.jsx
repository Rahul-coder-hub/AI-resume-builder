import React from 'react';
import { useResumeData } from '../../hooks/useResumeData';

const Preview = () => {
    const { resumeData } = useResumeData();

    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4">
            <div className="max-w-[210mm] mx-auto bg-white p-[20mm] shadow-xl min-h-[297mm] text-black font-serif">
                {/* Header */}
                <header className="border-b-2 border-black pb-8 mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">{resumeData.personalInfo.name || 'Your Name'}</h1>
                        <div className="text-sm font-medium tracking-wide text-gray-600 flex gap-4 uppercase">
                            <span>{resumeData.personalInfo.email}</span>
                            <span>{resumeData.personalInfo.phone}</span>
                            <span>{resumeData.personalInfo.location}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-end text-xs font-bold uppercase tracking-widest text-gray-400">
                        <span>{resumeData.links.github}</span>
                        <span>{resumeData.links.linkedin}</span>
                    </div>
                </header>

                {/* Summary */}
                {resumeData.summary && (
                    <section className="mb-10">
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-4 border-b border-gray-100 pb-1">Summary</h2>
                        <p className="text-sm leading-relaxed text-gray-800">{resumeData.summary}</p>
                    </section>
                )}

                <div className="grid grid-cols-1 gap-10">
                    {/* Experience */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-6 border-b border-gray-100 pb-1">Experience</h2>
                        <div className="space-y-8">
                            {resumeData.experience.map((exp, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <h3 className="font-bold text-lg">{exp.role}</h3>
                                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{exp.duration}</span>
                                    </div>
                                    <div className="text-sm font-bold text-gray-600 mb-2 uppercase tracking-wide">{exp.company}</div>
                                    <p className="text-sm leading-relaxed text-gray-700">{exp.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education & Skills */}
                    <div className="grid grid-cols-2 gap-10">
                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-6 border-b border-gray-100 pb-1">Education</h2>
                            <div className="space-y-6">
                                {resumeData.education.map((edu, i) => (
                                    <div key={i}>
                                        <h3 className="font-bold text-sm uppercase tracking-wide">{edu.degree}</h3>
                                        <div className="text-sm text-gray-600">{edu.school}</div>
                                        <div className="text-xs font-medium text-gray-400 mt-1">{edu.year}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-6 border-b border-gray-100 pb-1">Technical Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {resumeData.skills.split(',').map((skill, i) => (
                                    <span key={i} className="text-xs font-bold uppercase tracking-widest bg-gray-50 px-2 py-1 border border-gray-100">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Projects */}
                    <section>
                        <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-6 border-b border-gray-100 pb-1">Projects</h2>
                        <div className="grid grid-cols-2 gap-8">
                            {resumeData.projects.map((proj, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-sm uppercase tracking-wide mb-2">{proj.title}</h3>
                                    <p className="text-xs leading-relaxed text-gray-600">{proj.description}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Preview;
