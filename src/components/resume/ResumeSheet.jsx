import React from 'react';

const ResumeSheet = ({ data }) => {
    if (!data) return null;

    const { personalInfo, summary, education, experience, projects, skills, links } = data;

    return (
        <div className="bg-white p-[15mm] md:p-[20mm] text-black font-serif shadow-sm min-h-full border border-gray-100">
            {/* Header */}
            <header className="border-b-2 border-black pb-6 mb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase mb-1">
                        {personalInfo.name || 'Your Name'}
                    </h1>
                    <div className="text-[10px] font-bold tracking-wide text-gray-500 flex flex-wrap gap-x-4 gap-y-1 uppercase">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>
                </div>
                <div className="flex flex-col items-end text-[9px] font-bold uppercase tracking-widest text-gray-400">
                    {links.github && <span>{links.github}</span>}
                    {links.linkedin && <span>{links.linkedin}</span>}
                </div>
            </header>

            {/* Summary */}
            {summary && (
                <section className="mb-8">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 border-b border-gray-100 pb-1">Summary</h2>
                    <p className="text-xs leading-relaxed text-gray-800">{summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="mb-8">
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-b border-gray-100 pb-1">Experience</h2>
                    <div className="space-y-6">
                        {experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="font-bold text-sm tracking-tight">{exp.role || 'Role'}</h3>
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{exp.duration}</span>
                                </div>
                                <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wide">{exp.company || 'Company'}</div>
                                {exp.description && <p className="text-xs leading-relaxed text-gray-700">{exp.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education & Skills */}
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 mb-8">
                {education.length > 0 && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-b border-gray-100 pb-1">Education</h2>
                        <div className="space-y-4">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-xs uppercase tracking-wide">{edu.degree || 'Degree'}</h3>
                                    <div className="text-[11px] text-gray-600 font-medium">{edu.school || 'School'}</div>
                                    <div className="text-[9px] font-bold text-gray-400 mt-0.5">{edu.year}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills && (
                    <section>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-b border-gray-100 pb-1">Technical Skills</h2>
                        <div className="flex flex-wrap gap-1.5">
                            {skills.split(',').filter(s => s.trim()).map((skill, i) => (
                                <span key={i} className="text-[9px] font-bold uppercase tracking-widest bg-gray-50 px-1.5 py-0.5 border border-gray-100">
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Projects */}
            {projects.length > 0 && (
                <section>
                    <h2 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-b border-gray-100 pb-1">Projects</h2>
                    <div className="grid grid-cols-1 gap-6">
                        {projects.map((proj, i) => (
                            <div key={i}>
                                <h3 className="font-bold text-xs uppercase tracking-wide mb-1.5">{proj.title || 'Project Title'}</h3>
                                {proj.description && <p className="text-xs leading-relaxed text-gray-600">{proj.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ResumeSheet;
