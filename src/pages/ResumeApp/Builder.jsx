import React from 'react';
import { useResumeData } from '../../hooks/useResumeData';
import ResumeSheet from '../../components/resume/ResumeSheet';
import { Plus, User, FileText, GraduationCap, Briefcase, Code, Link as LinkIcon, Database, Trash2, AlertCircle } from 'lucide-react';

const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
        <Icon size={18} className="text-gray-400" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">{title}</h3>
    </div>
);

const Input = ({ label, ...props }) => (
    <div className="mb-4">
        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{label}</label>
        <input
            {...props}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all"
        />
    </div>
);

const TextArea = ({ label, ...props }) => (
    <div className="mb-4">
        <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{label}</label>
        <textarea
            {...props}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none h-24"
        />
    </div>
);

const Builder = () => {
    const {
        resumeData,
        updatePersonalInfo,
        updateSummary,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addProject,
        updateProject,
        removeProject,
        updateSkills,
        updateLinks,
        loadSampleData,
        atsScore,
        suggestions,
    } = useResumeData();

    return (
        <div className="h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-[1fr_1fr]">
            {/* Left: Form sections */}
            <div className="overflow-y-auto p-8 lg:p-12 border-r border-gray-100 space-y-12">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Builder</h1>
                        <p className="text-gray-500 text-sm">Design your professional narrative.</p>
                    </div>
                    <button
                        onClick={loadSampleData}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm"
                    >
                        <Database size={16} />
                        Load Sample Data
                    </button>
                </div>

                {/* ATS Score Section */}
                <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">ATS Readiness Score</h3>
                            <div className="text-4xl font-black text-black">{atsScore}<span className="text-lg text-gray-300 ml-1">/100</span></div>
                        </div>
                        <div className="w-16 h-16 relative">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-200" />
                                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 * (1 - atsScore / 100)} className="text-black transition-all duration-1000 ease-out" />
                            </svg>
                        </div>
                    </div>

                    {suggestions.length > 0 && (
                        <div className="space-y-2 mt-4">
                            {suggestions.map((suggestion, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs font-medium text-gray-600 bg-white p-2 rounded-lg border border-gray-100">
                                    <AlertCircle size={14} className="text-gray-400 mt-0.5 shrink-0" />
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Personal Info */}
                <section>
                    <SectionHeader icon={User} title="Personal Info" />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                        <Input label="Full Name" value={resumeData.personalInfo.name} onChange={(e) => updatePersonalInfo({ name: e.target.value })} />
                        <Input label="Email" value={resumeData.personalInfo.email} onChange={(e) => updatePersonalInfo({ email: e.target.value })} />
                        <Input label="Phone" value={resumeData.personalInfo.phone} onChange={(e) => updatePersonalInfo({ phone: e.target.value })} />
                        <Input label="Location" value={resumeData.personalInfo.location} onChange={(e) => updatePersonalInfo({ location: e.target.value })} />
                    </div>
                </section>

                {/* Summary */}
                <section>
                    <SectionHeader icon={FileText} title="Professional Summary" />
                    <TextArea
                        label="Summary"
                        placeholder="A brief overview of your career..."
                        value={resumeData.summary}
                        onChange={(e) => updateSummary(e.target.value)}
                    />
                </section>

                {/* Education */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <SectionHeader icon={GraduationCap} title="Education" />
                        <button onClick={addEducation} className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-black uppercase tracking-tighter transition-colors">
                            <Plus size={16} /> Add
                        </button>
                    </div>
                    {resumeData.education.map((edu, i) => (
                        <div key={i} className="mb-6 p-6 border border-gray-50 bg-white rounded-2xl shadow-sm relative group">
                            <button
                                onClick={() => removeEducation(i)}
                                className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                            <Input label="School" value={edu.school} onChange={(e) => updateEducation(i, 'school', e.target.value)} />
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Degree" value={edu.degree} onChange={(e) => updateEducation(i, 'degree', e.target.value)} />
                                <Input label="Year" value={edu.year} onChange={(e) => updateEducation(i, 'year', e.target.value)} />
                            </div>
                        </div>
                    ))}
                </section>

                {/* Experience */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <SectionHeader icon={Briefcase} title="Experience" />
                        <button onClick={addExperience} className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-black uppercase tracking-tighter transition-colors">
                            <Plus size={16} /> Add
                        </button>
                    </div>
                    {resumeData.experience.map((exp, i) => (
                        <div key={i} className="mb-6 p-6 border border-gray-50 bg-white rounded-2xl shadow-sm relative group">
                            <button
                                onClick={() => removeExperience(i)}
                                className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Company" value={exp.company} onChange={(e) => updateExperience(i, 'company', e.target.value)} />
                                <Input label="Role" value={exp.role} onChange={(e) => updateExperience(i, 'role', e.target.value)} />
                            </div>
                            <Input label="Duration" value={exp.duration} onChange={(e) => updateExperience(i, 'duration', e.target.value)} />
                            <TextArea label="Description" placeholder="Tip: Include numbers like % or $ to boost ATS score." value={exp.description} onChange={(e) => updateExperience(i, 'description', e.target.value)} />
                        </div>
                    ))}
                </section>

                {/* Projects */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <SectionHeader icon={Code} title="Projects" />
                        <button onClick={addProject} className="flex items-center gap-1 text-xs font-bold text-gray-400 hover:text-black uppercase tracking-tighter transition-colors">
                            <Plus size={16} /> Add
                        </button>
                    </div>
                    {resumeData.projects.map((proj, i) => (
                        <div key={i} className="mb-6 p-6 border border-gray-50 bg-white rounded-2xl shadow-sm relative group">
                            <button
                                onClick={() => removeProject(i)}
                                className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                            >
                                <Trash2 size={16} />
                            </button>
                            <Input label="Project Title" value={proj.title} onChange={(e) => updateProject(i, 'title', e.target.value)} />
                            <TextArea label="Description" value={proj.description} onChange={(e) => updateProject(i, 'description', e.target.value)} />
                        </div>
                    ))}
                </section>

                {/* Skills */}
                <section>
                    <SectionHeader icon={Code} title="Skills" />
                    <Input
                        label="Skills (comma separated)"
                        placeholder="React, Javascript, Node.js..."
                        value={resumeData.skills}
                        onChange={(e) => updateSkills(e.target.value)}
                    />
                </section>

                {/* Links */}
                <section>
                    <SectionHeader icon={LinkIcon} title="Links" />
                    <div className="grid grid-cols-2 gap-4 px-1">
                        <Input label="GitHub" value={resumeData.links.github} onChange={(e) => updateLinks({ github: e.target.value })} />
                        <Input label="LinkedIn" value={resumeData.links.linkedin} onChange={(e) => updateLinks({ linkedin: e.target.value })} />
                    </div>
                </section>
            </div>

            {/* Right: Live preview panel */}
            <div className="bg-gray-100 flex items-start justify-center p-4 lg:p-12 overflow-y-auto sticky top-16 h-[calc(100vh-64px)]">
                <div className="w-full max-w-[210mm] scale-[0.6] lg:scale-[0.85] xl:scale-[0.95] origin-top shadow-2xl">
                    <ResumeSheet data={resumeData} />
                </div>
            </div>
        </div>
    );
};

export default Builder;
