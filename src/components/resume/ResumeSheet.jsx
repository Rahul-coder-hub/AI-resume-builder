import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const ResumeSheet = ({ data, template = 'Classic' }) => {
    if (!data) return null;

    const { personalInfo, summary, education, experience, projects, skills, links } = data;

    // Template-specific style classes
    const layouts = {
        Classic: {
            header: "border-b-2 border-black pb-6 mb-8 text-center",
            headerContent: "flex flex-col items-center",
            name: "text-4xl font-black tracking-tighter uppercase mb-2",
            contact: "text-[10px] font-bold tracking-widest text-gray-400 flex flex-wrap justify-center gap-x-6 gap-y-1 uppercase",
            section: "mb-8",
            sectionTitle: "text-[10px] font-black uppercase tracking-[0.2em] mb-4 border-b border-gray-100 pb-1 text-center bg-gray-50/50 py-1",
            grid: "grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10",
        },
        Modern: {
            header: "flex justify-between items-start border-b-2 border-black pb-8 mb-10",
            headerContent: "flex flex-col items-start",
            name: "text-5xl font-black tracking-tighter uppercase",
            contact: "text-[10px] font-bold tracking-widest text-gray-400 flex flex-col gap-1 uppercase mt-4 text-left",
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

    const SkillGroup = ({ title, list }) => {
        if (!list || list.length === 0) return null;
        return (
            <div className="mb-4 break-inside-avoid">
                <div className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-2 px-1">{title}</div>
                <div className="flex flex-wrap gap-1.5">
                    {list.map((skill, i) => (
                        <span key={i} className="text-[9px] font-bold uppercase tracking-widest bg-gray-50 print:bg-white px-2 py-0.5 border border-gray-100">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className={`bg-white p-[15mm] md:p-[20mm] text-black font-serif min-h-full print:border-0 print:shadow-none print:p-0 ${template === 'Minimal' ? 'font-sans' : ''}`}>
            {/* Header */}
            <header className={`${style.header} break-inside-avoid`}>
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
                        {links.github && <span>{links.github.replace('https://', '')}</span>}
                        {links.linkedin && <span>{links.linkedin.replace('https://', '')}</span>}
                    </div>
                )}
            </header>

            {/* Summary */}
            {summary && (
                <section className={`${style.section} break-inside-avoid`}>
                    <h2 className={style.sectionTitle}>Summary</h2>
                    <p className="text-sm leading-relaxed text-gray-800">{summary}</p>
                </section>
            )}

            <div className={style.grid}>
                <div className="space-y-8">
                    {/* Experience */}
                    {experience.length > 0 && (
                        <section className={style.section}>
                            <h2 className={style.sectionTitle}>Experience</h2>
                            <div className="space-y-6">
                                {experience.map((exp, i) => (
                                    <div key={i} className="break-inside-avoid">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-sm tracking-tight">{exp.role || 'Role'}</h3>
                                            <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">{exp.duration}</span>
                                        </div>
                                        <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase tracking-wide">{exp.company || 'Company'}</div>
                                        {exp.description && <p className="text-xs leading-relaxed text-gray-700 whitespace-pre-line">{exp.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Projects */}
                    {projects.length > 0 && (
                        <section className={style.section}>
                            <h2 className={style.sectionTitle}>Projects</h2>
                            <div className="space-y-6">
                                {projects.map((proj, i) => (
                                    <div key={i} className="break-inside-avoid group">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-sm uppercase tracking-wide">{proj.title || 'Project Title'}</h3>
                                            <div className="flex gap-3">
                                                {proj.githubUrl && (
                                                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors print:hidden">
                                                        <Github size={12} />
                                                    </a>
                                                )}
                                                {proj.liveUrl && (
                                                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-black transition-colors print:hidden">
                                                        <ExternalLink size={12} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {proj.techStack && proj.techStack.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-2">
                                                {proj.techStack.map((tech, j) => (
                                                    <span key={j} className="text-[8px] font-black uppercase tracking-tighter text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {proj.description && <p className="text-xs leading-relaxed text-gray-600 whitespace-pre-line">{proj.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="space-y-10">
                    {/* Skills */}
                    {skills && (
                        <section className={style.section}>
                            <h2 className={style.sectionTitle}>Skills</h2>
                            <SkillGroup title="Technical" list={skills.technical} />
                            <SkillGroup title="Professional" list={skills.soft} />
                            <SkillGroup title="Tools" list={skills.tools} />
                        </section>
                    )}

                    {/* Education */}
                    {education.length > 0 && (
                        <section className={`${style.section} break-inside-avoid`}>
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
                </div>
            </div>
        </div>
    );
};

export default ResumeSheet;
