import React from 'react';
import { useResumeData } from '../../hooks/useResumeData';
import { Plus, User, FileText, GraduationCap, Briefcase, Code, Link as LinkIcon, Database } from 'lucide-react';

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
        addExperience,
        updateExperience,
        addProject,
        updateProject,
        updateSkills,
        updateLinks,
        loadSampleData,
        saveToLocalStorage,
    } = useResumeData();

    return (
        <div className="h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2">
            {/* Left: Form sections */}
            <div className="overflow-y-auto p-12 border-r border-gray-100 space-y-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Builder</h1>
                        <p className="text-gray-500">Fill in your details to build your resume.</p>
                    </div>
                    <button
                        onClick={loadSampleData}
                        className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors"
                    >
                        <Database size={16} />
                        Load Sample Data
                    </button>
                </div>

                {/* Personal Info */}
                <section>
                    <SectionHeader icon={User} title="Personal Info" />
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Full Name"
                            placeholder="John Doe"
                            value={resumeData.personalInfo.name}
                            onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                        />
                        <Input
                            label="Email"
                            placeholder="john@example.com"
                            value={resumeData.personalInfo.email}
                            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                        />
                        <Input
                            label="Phone"
                            placeholder="+1 234 567 890"
                            value={resumeData.personalInfo.phone}
                            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                        />
                        <Input
                            label="Location"
                            placeholder="New York, USA"
                            value={resumeData.personalInfo.location}
                            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                        />
                    </div>
                </section>

                {/* Summary */}
                <section>
                    <SectionHeader icon={FileText} title="Professional Summary" />
                    <TextArea
                        label="Summary"
                        placeholder="A brief overview of your career and goals..."
                        value={resumeData.summary}
                        onChange={(e) => updateSummary(e.target.value)}
                    />
                </section>

                {/* Education */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <SectionHeader icon={GraduationCap} title="Education" />
                        <button onClick={addEducation} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-black">
                            <Plus size={20} />
                        </button>
                    </div>
                    {resumeData.education.map((edu, i) => (
                        <div key={i} className="mb-6 p-4 border border-gray-50 rounded-xl">
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
                        <button onClick={addExperience} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-black">
                            <Plus size={20} />
                        </button>
                    </div>
                    {resumeData.experience.map((exp, i) => (
                        <div key={i} className="mb-6 p-4 border border-gray-50 rounded-xl">
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Company" value={exp.company} onChange={(e) => updateExperience(i, 'company', e.target.value)} />
                                <Input label="Role" value={exp.role} onChange={(e) => updateExperience(i, 'role', e.target.value)} />
                            </div>
                            <Input label="Duration" value={exp.duration} onChange={(e) => updateExperience(i, 'duration', e.target.value)} />
                            <TextArea label="Description" value={exp.description} onChange={(e) => updateExperience(i, 'description', e.target.value)} />
                        </div>
                    ))}
                </section>

                {/* Projects */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <SectionHeader icon={Code} title="Projects" />
                        <button onClick={addProject} className="p-1 hover:bg-gray-100 rounded text-gray-400 hover:text-black">
                            <Plus size={20} />
                        </button>
                    </div>
                    {resumeData.projects.map((proj, i) => (
                        <div key={i} className="mb-6 p-4 border border-gray-50 rounded-xl">
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
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="GitHub" value={resumeData.links.github} onChange={(e) => updateLinks({ github: e.target.value })} />
                        <Input label="LinkedIn" value={resumeData.links.linkedin} onChange={(e) => updateLinks({ linkedin: e.target.value })} />
                    </div>
                </section>

                <button
                    onClick={saveToLocalStorage}
                    className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-800 transition-all shadow-lg active:scale-[0.98]"
                >
                    Save Data
                </button>
            </div>

            {/* Right: Live preview panel */}
            <div className="bg-gray-50 flex items-center justify-center p-12 overflow-hidden">
                <div className="w-[210mm] h-[297mm] bg-white shadow-2xl scale-[0.6] origin-center flex flex-col items-center justify-center text-gray-300 pointer-events-none border border-gray-200">
                    <FileText size={64} className="mb-4 opacity-20" />
                    <p className="font-bold uppercase tracking-widest text-sm opacity-20">Live Preview Placeholder</p>
                </div>
            </div>
        </div>
    );
};

export default Builder;
