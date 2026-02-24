import React from 'react';

const ResumeSheet = ({ data, template = 'Classic' }) => {
    if (!data) return null;

    const { personalInfo, summary, education, experience, projects, skills, links } = data;

    // Template-specific style classes
    const layouts = {
        Classic: {
            header: "border-b-2 border-black pb-6 mb-8 text-center",
            headerContent: "flex flex-col items-center",
            name: "text-4xl font-black tracking-tighter uppercase mb-2",
            contact: "text-[10px] font-bold tracking-widest text-gray-500 flex flex-wrap justify-center gap-x-6 gap-y-1 uppercase",
            section: "mb-8",
            sectionTitle: "text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-b border-gray-100 pb-1 text-center bg-gray-50/50 py-1",
            grid: "grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10",
        },
        Modern: {
            header: "flex justify-between items-start border-b-2 border-black pb-8 mb-10",
            headerContent: "flex flex-col items-start",
            name: "text-5xl font-black tracking-tighter uppercase",
            contact: "text-[10px] font-bold tracking-widest text-gray-500 flex flex-col gap-1 uppercase mt-4",
            section: "mb-10",
            sectionTitle: "text-[11px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-4 before:h-[1px] before:flex-1 before:bg-gray-100 after:h-[1px] after:flex-1 after:bg-gray-100",
            grid: "grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-12",
        },
        Minimal: {
            header: "mb-12",
            headerContent: "flex flex-col items-start",
            name: "text-3xl font-bold tracking-tight mb-2",
            contact: "text-[9px] font-medium tracking-wide text-gray-400 flex gap-4 lowercase",
            section: "mb-12",
            sectionTitle: "text-[9px] font-bold uppercase tracking-widest mb-6 text-gray-300",
            grid: "grid grid-cols-1 gap-12",
        }
    };

    const style = layouts[template] || layouts.Classic;

    return (
        <div className={`bg-white p-[15mm] md:p-[20mm] text-black font-serif shadow-sm min-h-full border border-gray-100 ${template === 'Minimal' ? 'font-sans' : ''}`}>
            {/* Header */}
            <header className={style.header}>
                <div className={style.headerContent}>
                    <h1 className={style.name}>
                        {personalInfo.name || 'Your Name'}
                    </h1>
                    <div className={style.contact}>
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>
                </div>
                {template !== 'Classic' && (
                    <div className="flex flex-col items-end text-[9px] font-bold uppercase tracking-widest text-gray-400">
                        {links.github && <span>{links.github}</span>}
                        {links.linkedin && <span>{links.linkedin}</span>}
                    </div>
                )}
            </header>

            {/* Summary */}
            {summary && (
                <section className={style.section}>
                    <h2 className={style.sectionTitle}>Summary</h2>
                    <p className="text-sm leading-relaxed text-gray-800">{summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className={style.section}>
                    <h2 className={style.sectionTitle}>Experience</h2>
                    <div className="space-y-8">
                        {experience.map((exp, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="font-bold text-sm tracking-tight">{exp.role || 'Role'}</h3>
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{exp.duration}</span>
                                </div>
                                <div className="text-[10px] font-bold text-gray-500 mb-3 uppercase tracking-wide">{exp.company || 'Company'}</div>
                                {exp.description && <p className="text-xs leading-relaxed text-gray-700 whitespace-pre-line">{exp.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            <div className={style.grid}>
                {/* Education */}
                {education.length > 0 && (
                    <section className={style.section}>
                        <h2 className={style.sectionTitle}>Education</h2>
                        <div className="space-y-6">
                            {education.map((edu, i) => (
                                <div key={i}>
                                    <h3 className="font-bold text-xs uppercase tracking-wide">{edu.degree || 'Degree'}</h3>
                                    <div className="text-[11px] text-gray-600 font-medium">{edu.school || 'School'}</div>
                                    <div className="text-[9px] font-bold text-gray-400 mt-1">{edu.year}</div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && (
                    <section className={style.section}>
                        <h2 className={style.sectionTitle}>Technical Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {skills.split(',').filter(s => s.trim()).map((skill, i) => (
                                <span key={i} className="text-[9px] font-bold uppercase tracking-widest bg-gray-50 px-2 py-1 border border-gray-100">
                                    {skill.trim()}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>

            {/* Projects */}
            {projects.length > 0 && (
                <section className={style.section}>
                    <h2 className={style.sectionTitle}>Projects</h2>
                    <div className="grid grid-cols-1 gap-8">
                        {projects.map((proj, i) => (
                            <div key={i}>
                                <h3 className="font-bold text-xs uppercase tracking-wide mb-2">{proj.title || 'Project Title'}</h3>
                                {proj.description && <p className="text-xs leading-relaxed text-gray-600 whitespace-pre-line">{proj.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ResumeSheet;
