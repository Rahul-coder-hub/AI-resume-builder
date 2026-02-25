import React from 'react';
import { ExternalLink, Github, Mail, Phone, MapPin } from 'lucide-react';

const ResumeSheet = ({ data, template = 'Classic', accentColor = 'hsl(168, 60%, 40%)' }) => {
    if (!data) return null;

    const { personalInfo, summary, education, experience, projects, skills, links } = data;

    const SkillGroup = ({ title, list, isSidebar = false }) => {
        if (!list || list.length === 0) return null;
        return (
            <div className={`mb-6 break-inside-avoid ${isSidebar ? 'text-white' : ''}`}>
                <div className={`text-[9px] font-black uppercase tracking-widest mb-3 px-1 ${isSidebar ? 'text-white/50' : 'text-gray-300'}`}>
                    {title}
                </div>
                <div className="flex flex-wrap gap-2">
                    {list.map((skill, i) => (
                        <span
                            key={i}
                            style={isSidebar ? {} : { borderColor: `${accentColor}20`, color: accentColor }}
                            className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 border ${isSidebar
                                    ? 'bg-white/10 border-white/20 text-white'
                                    : 'bg-gray-50/50'
                                }`}
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    const EducationItem = ({ edu, isSidebar = false }) => (
        <div className="mb-4">
            <h3 className={`font-bold text-xs uppercase tracking-wide ${isSidebar ? 'text-white' : 'text-gray-900'}`}>{edu.degree || 'Degree'}</h3>
            <div className={`text-[10px] font-medium ${isSidebar ? 'text-white/70' : 'text-gray-600'}`}>{edu.school || 'School'}</div>
            <div className={`text-[9px] font-bold mt-1 ${isSidebar ? 'text-white/40' : 'text-gray-400'}`}>{edu.year}</div>
        </div>
    );

    // Template Renders
    if (template === 'Modern') {
        return (
            <div className="bg-white grid grid-cols-[260px_1fr] min-h-[297mm] shadow-xl font-sans text-gray-900 print:shadow-none overflow-hidden">
                {/* Sidebar */}
                <aside style={{ backgroundColor: accentColor }} className="p-8 text-white flex flex-col gap-10">
                    <div className="space-y-4">
                        <div className="w-20 h-2 bg-white/20 rounded-full" />
                        <h1 className="text-3xl font-black tracking-tighter uppercase leading-none">
                            {personalInfo.name.split(' ')[0]}<br />
                            <span className="opacity-50">{personalInfo.name.split(' ').slice(1).join(' ')}</span>
                        </h1>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 border-b border-white/10 pb-2">Contact</h2>
                        <div className="space-y-3 text-[10px] font-medium">
                            {personalInfo.email && <div className="flex items-center gap-2"><Mail size={12} className="opacity-50" /> {personalInfo.email}</div>}
                            {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={12} className="opacity-50" /> {personalInfo.phone}</div>}
                            {personalInfo.location && <div className="flex items-center gap-3"><MapPin size={12} className="opacity-50" /> {personalInfo.location}</div>}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 border-b border-white/10 pb-2 mb-4">Skills</h2>
                        <SkillGroup title="Technical" list={skills.technical} isSidebar={true} />
                        <SkillGroup title="Professional" list={skills.soft} isSidebar={true} />
                        <SkillGroup title="Tools" list={skills.tools} isSidebar={true} />
                    </div>

                    {education.length > 0 && (
                        <div>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 border-b border-white/10 pb-2 mb-4">Education</h2>
                            {education.map((edu, i) => <EducationItem key={i} edu={edu} isSidebar={true} />)}
                        </div>
                    )}
                </aside>

                {/* Main Content */}
                <main className="p-12 space-y-10">
                    {summary && (
                        <section>
                            <h2 style={{ color: accentColor }} className="text-[11px] font-black uppercase tracking-[0.3em] mb-4">Profile</h2>
                            <p className="text-sm leading-relaxed text-gray-600">{summary}</p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section>
                            <h2 style={{ color: accentColor }} className="text-[11px] font-black uppercase tracking-[0.3em] mb-6">Experience</h2>
                            <div className="space-y-8">
                                {experience.map((exp, i) => (
                                    <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-1.5 before:w-2 before:h-2 before:bg-gray-200 before:rounded-full">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-sm text-gray-900">{exp.role}</h3>
                                            <span className="text-[10px] font-bold text-gray-400">{exp.duration}</span>
                                        </div>
                                        <div className="text-[10px] font-bold uppercase tracking-wide text-gray-400 mb-2">{exp.company}</div>
                                        <p className="text-xs text-gray-600 leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <h2 style={{ color: accentColor }} className="text-[11px] font-black uppercase tracking-[0.3em] mb-6">Featured Projects</h2>
                            <div className="space-y-6">
                                {projects.map((proj, i) => (
                                    <div key={i} className="group border border-gray-100 p-4 rounded-xl hover:border-gray-200 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-sm tracking-tight">{proj.title}</h3>
                                            <div className="flex gap-2">
                                                {proj.githubUrl && <a href={proj.githubUrl} className="text-gray-300 hover:text-black"><Github size={14} /></a>}
                                                {proj.liveUrl && <a href={proj.liveUrl} className="text-gray-300 hover:text-black"><ExternalLink size={14} /></a>}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5 mb-2">
                                            {proj.techStack?.map((tech, j) => (
                                                <span key={j} className="text-[8px] font-bold px-1.5 py-0.5 bg-gray-50 text-gray-400 rounded">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-xs text-gray-500 line-clamp-2">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </main>
            </div>
        );
    }

    if (template === 'Minimal') {
        return (
            <div className="bg-white p-[20mm] font-sans text-gray-800 min-h-[297mm]">
                <header className="mb-16">
                    <h1 className="text-4xl font-light tracking-tight text-gray-900 mb-4">{personalInfo.name}</h1>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-medium text-gray-400 uppercase tracking-widest">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                    </div>
                </header>

                <div className="space-y-16">
                    {summary && (
                        <section className="grid grid-cols-[120px_1fr] gap-8">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 pt-1">About</span>
                            <p className="text-sm leading-relaxed text-gray-600 font-light">{summary}</p>
                        </section>
                    )}

                    {experience.length > 0 && (
                        <section className="grid grid-cols-[120px_1fr] gap-8">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 pt-1">History</span>
                            <div className="space-y-10">
                                {experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-2">
                                            <h3 className="font-bold text-sm tracking-tight text-gray-900">{exp.role}</h3>
                                            <span style={{ color: accentColor }} className="text-[10px] font-bold">{exp.duration}</span>
                                        </div>
                                        <div className="text-[10px] font-bold uppercase text-gray-400 mb-3">{exp.company}</div>
                                        <p className="text-xs text-gray-500 font-light leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section className="grid grid-cols-[120px_1fr] gap-8">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 pt-1">Works</span>
                            <div className="grid grid-cols-2 gap-6">
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <h3 className="font-bold text-xs mb-2">{proj.title}</h3>
                                        <p className="text-[11px] text-gray-500 font-light mb-3 line-clamp-2">{proj.description}</p>
                                        <div className="flex gap-2">
                                            {proj.techStack?.slice(0, 3).map((tech, j) => (
                                                <span key={j} className="text-[8px] px-1.5 py-0.5 border border-gray-100 text-gray-400 uppercase font-black">{tech}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    <section className="grid grid-cols-[120px_1fr] gap-8">
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 pt-1">Toolkit</span>
                        <div className="flex flex-wrap gap-x-8 gap-y-4">
                            {[...skills.technical, ...skills.soft, ...skills.tools].slice(0, 10).map((skill, i) => (
                                <span key={i} className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">{skill}</span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        );
    }

    // Default: Classic
    return (
        <div className="bg-white p-[20mm] text-black font-serif min-h-[297mm]">
            <header className="border-b-2 border-black pb-8 mb-10 text-center">
                <h1 className="text-5xl font-black tracking-tighter uppercase mb-4">{personalInfo.name}</h1>
                <div className="text-[10px] font-bold tracking-[0.2em] text-gray-400 flex justify-center gap-8 uppercase">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>
            </header>

            {summary && (
                <section className="mb-10">
                    <h2 style={{ backgroundColor: accentColor + '10' }} className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 border-b border-black/10 py-1 px-4">Summary</h2>
                    <p className="text-sm leading-relaxed text-gray-800">{summary}</p>
                </section>
            )}

            <div className="grid grid-cols-[1.8fr_1fr] gap-12">
                <div className="space-y-10">
                    {experience.length > 0 && (
                        <section>
                            <h2 style={{ color: accentColor }} className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 border-b border-gray-100 pb-1">Experience</h2>
                            <div className="space-y-8">
                                {experience.map((exp, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-sm">{exp.role}</h3>
                                            <span className="text-[9px] font-bold uppercase text-gray-400">{exp.duration}</span>
                                        </div>
                                        <div className="text-[10px] font-bold text-gray-500 mb-2 uppercase">{exp.company}</div>
                                        <p className="text-xs leading-relaxed text-gray-700">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <h2 style={{ color: accentColor }} className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 border-b border-gray-100 pb-1">Key Projects</h2>
                            <div className="grid grid-cols-1 gap-6">
                                {projects.map((proj, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="font-bold text-xs uppercase underline decoration-2 underline-offset-4 decoration-black/10">{proj.title}</h4>
                                            <div className="flex gap-2">
                                                {proj.githubUrl && <Github size={12} className="text-gray-300" />}
                                                {proj.liveUrl && <ExternalLink size={12} className="text-gray-300" />}
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-600 mt-2 italic">{proj.description}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                <div className="space-y-10">
                    <section>
                        <h2 style={{ color: accentColor }} className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 border-b border-gray-100 pb-1">Expertise</h2>
                        <SkillGroup title="Technical" list={skills.technical} />
                        <SkillGroup title="Soft" list={skills.soft} />
                        <SkillGroup title="Tools" list={skills.tools} />
                    </section>

                    {education.length > 0 && (
                        <section>
                            <h2 style={{ color: accentColor }} className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 border-b border-gray-100 pb-1">Education</h2>
                            {education.map((edu, i) => <EducationItem key={i} edu={edu} />)}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResumeSheet;
