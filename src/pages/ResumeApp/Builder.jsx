import React, { useMemo, useState } from 'react';
import { useResumeData } from '../../hooks/useResumeData';
import ResumeSheet from '../../components/resume/ResumeSheet';
import {
    Plus, User, FileText, GraduationCap, Briefcase,
    Code, Link as LinkIcon, Database, Trash2,
    AlertCircle, Layout as LayoutIcon, CheckCircle2,
    X, Sparkles, ChevronDown, ChevronUp, ExternalLink, Github,
    Check
} from 'lucide-react';

const SectionHeader = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
        <Icon size={18} className="text-gray-400" />
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">{title}</h3>
    </div>
);

const Input = ({ label, ...props }) => (
    <div className="mb-4">
        {label && <label className="block text-xs font-bold text-gray-400 uppercase mb-1">{label}</label>}
        <input
            {...props}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm"
        />
    </div>
);

const BulletGuidance = ({ text }) => {
    const ACTION_VERBS = ['Built', 'Developed', 'Designed', 'Implemented', 'Led', 'Improved', 'Created', 'Optimized', 'Automated'];

    const suggestions = useMemo(() => {
        if (!text.trim()) return [];
        const results = [];

        const startsWithVerb = ACTION_VERBS.some(verb =>
            text.trim().toLowerCase().startsWith(verb.toLowerCase())
        );
        if (!startsWithVerb) {
            results.push("Start with a strong action verb (e.g., Developed, Optimized).");
        }

        const hasNumbers = /\d+|%|\b\d+k\b/i.test(text);
        if (!hasNumbers) {
            results.push("Add measurable impact (numbers/metrics).");
        }

        return results;
    }, [text]);

    if (suggestions.length === 0) return null;

    return (
        <div className="mt-2 space-y-1">
            {suggestions.map((s, i) => (
                <div key={i} className="text-[10px] font-medium text-amber-600 flex items-center gap-1.5 opacity-80">
                    <AlertCircle size={10} />
                    {s}
                </div>
            ))}
        </div>
    );
};

const TextArea = ({ label, showGuidance, maxLength, value = '', ...props }) => (
    <div className="mb-4">
        <div className="flex justify-between items-end mb-1">
            <label className="block text-xs font-bold text-gray-400 uppercase">{label}</label>
            {maxLength && (
                <span className={`text-[10px] font-bold ${value.length > maxLength ? 'text-red-500' : 'text-gray-300'}`}>
                    {value.length}/{maxLength}
                </span>
            )}
        </div>
        <textarea
            {...props}
            value={value}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-100 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all resize-none h-24 text-sm"
        />
        {showGuidance && <BulletGuidance text={value} />}
    </div>
);

const TagInput = ({ tags = [], onUpdate, placeholder = "Type and press Enter..." }) => {
    const [input, setInput] = useState('');

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            e.preventDefault();
            if (!tags.includes(input.trim())) {
                onUpdate([...tags, input.trim()]);
            }
            setInput('');
        } else if (e.key === 'Backspace' && !input && tags.length > 0) {
            onUpdate(tags.slice(0, -1));
        }
    };

    const removeTag = (tagToRemove) => {
        onUpdate(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-2 p-2 bg-gray-50 border border-gray-100 rounded-lg focus-within:ring-2 focus-within:ring-black transition-all min-h-[42px]">
                {tags.map((tag, i) => (
                    <span key={i} className="flex items-center gap-1.5 px-2 py-1 bg-black text-white rounded text-[10px] font-bold uppercase tracking-wider animate-in zoom-in-95 duration-200">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="hover:text-red-400 transition-colors">
                            <X size={10} />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={tags.length === 0 ? placeholder : ""}
                    className="flex-1 bg-transparent border-none outline-none text-sm min-w-[120px] py-1"
                />
            </div>
        </div>
    );
};

// Thumbnail helper
const TemplateThumbnail = ({ name, active, onClick }) => {
    const renderMini = () => {
        if (name === 'Classic') return (
            <div className="w-full h-full bg-white p-2 flex flex-col items-center gap-1">
                <div className="w-1/2 h-0.5 bg-gray-900 mb-1" />
                <div className="w-full h-px bg-gray-100" />
                <div className="w-full flex flex-col gap-1 mt-1">
                    <div className="w-full h-[2px] bg-gray-100" />
                    <div className="w-3/4 h-[2px] bg-gray-100" />
                    <div className="w-full h-[2px] bg-gray-100" />
                </div>
            </div>
        );
        if (name === 'Modern') return (
            <div className="w-full h-full bg-white flex">
                <div className="w-1/3 h-full bg-gray-200 p-1 flex flex-col gap-1">
                    <div className="w-4 h-4 bg-white/50 rounded-full" />
                    <div className="w-full h-[2px] bg-white/50" />
                    <div className="w-full h-[2px] bg-white/50" />
                </div>
                <div className="flex-1 p-2 flex flex-col gap-1">
                    <div className="w-1/2 h-[2px] bg-gray-300" />
                    <div className="w-full h-[1px] bg-gray-100" />
                    <div className="w-full h-[1px] bg-gray-100" />
                    <div className="w-full h-[1px] bg-gray-100" />
                </div>
            </div>
        );
        if (name === 'Minimal') return (
            <div className="w-full h-full bg-white p-3 flex flex-col gap-2">
                <div className="w-1/3 h-[2px] bg-gray-900" />
                <div className="w-full grid grid-cols-[30px_1fr] gap-2">
                    <div className="h-1 bg-gray-100" />
                    <div className="h-1 bg-gray-100" />
                    <div className="h-1 bg-gray-100" />
                    <div className="h-1 bg-gray-100" />
                </div>
            </div>
        );
    };

    return (
        <button
            onClick={onClick}
            className={`group relative w-[120px] aspect-[1/1.4] rounded-lg border-2 transition-all overflow-hidden ${active ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-100 hover:border-gray-300'
                }`}
        >
            {renderMini()}
            {active && (
                <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md">
                    <Check size={12} strokeWidth={4} />
                </div>
            )}
            <div className="absolute inset-x-0 bottom-0 bg-white/90 backdrop-blur-sm py-1 border-t border-gray-100">
                <span className="text-[10px] font-black uppercase text-gray-900">{name}</span>
            </div>
        </button>
    );
};

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
        suggestSkills,
        updateLinks,
        loadSampleData,
        atsScore,
        suggestions,
        selectedTemplate,
        setSelectedTemplate,
        selectedColor,
        setSelectedColor
    } = useResumeData();

    const [isSuggesting, setIsSuggesting] = useState(false);
    const [expandedProject, setExpandedProject] = useState(0);

    const templates = ['Classic', 'Modern', 'Minimal'];
    const themes = [
        { name: 'Teal', value: 'hsl(168, 60%, 40%)' },
        { name: 'Navy', value: 'hsl(220, 60%, 35%)' },
        { name: 'Burgundy', value: 'hsl(345, 60%, 35%)' },
        { name: 'Forest', value: 'hsl(150, 50%, 30%)' },
        { name: 'Charcoal', value: 'hsl(0, 0%, 25%)' }
    ];

    const handleSuggestSkills = () => {
        setIsSuggesting(true);
        setTimeout(() => {
            suggestSkills();
            setIsSuggesting(false);
        }, 1000);
    };

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

                {/* ATS Score & Improvements */}
                <section className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ATS Readiness Score</h3>
                            <div className="text-4xl font-black text-black">{atsScore}<span className="text-lg text-gray-300 ml-1">/100</span></div>
                        </div>
                        <div className="w-16 h-16 relative">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-200" />
                                <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={175.9} strokeDashoffset={175.9 * (1 - atsScore / 100)} className="text-black transition-all duration-1000 ease-out" />
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black text-gray-900 uppercase tracking-wider">Top 3 Improvements</h4>
                        {suggestions.length > 0 ? (
                            <div className="space-y-2">
                                {suggestions.map((suggestion, i) => (
                                    <div key={i} className="flex items-start gap-2 text-xs font-semibold text-gray-600 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                                        <AlertCircle size={14} className="text-amber-500 mt-0.5 shrink-0" />
                                        {typeof suggestion === 'string' ? suggestion : suggestion.text}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-50/50 p-3 rounded-xl border border-green-100">
                                <CheckCircle2 size={14} />
                                Your resume is highly optimized!
                            </div>
                        )}
                    </div>
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
                                className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all z-10"
                            >
                                <Trash2 size={16} />
                            </button>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Company" value={exp.company} onChange={(e) => updateExperience(i, 'company', e.target.value)} />
                                <Input label="Role" value={exp.role} onChange={(e) => updateExperience(i, 'role', e.target.value)} />
                            </div>
                            <Input label="Duration" value={exp.duration} onChange={(e) => updateExperience(i, 'duration', e.target.value)} />
                            <TextArea
                                label="Description"
                                placeholder="Tip: Start with Built, Led, Optimized... and add numbers."
                                value={exp.description}
                                onChange={(e) => updateExperience(i, 'description', e.target.value)}
                                showGuidance={true}
                            />
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
                        <div key={i} className="mb-4 border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm transition-all duration-300">
                            {/* Accordion Header */}
                            <button
                                onClick={() => setExpandedProject(expandedProject === i ? null : i)}
                                className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-[10px] font-black">
                                        {i + 1}
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-gray-600 truncate max-w-[200px]">
                                        {proj.title || "Untitled Project"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); removeProject(i); }}
                                        className="text-gray-300 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                    {expandedProject === i ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                </div>
                            </button>

                            {/* Accordion Content */}
                            {expandedProject === i && (
                                <div className="p-6 border-t border-gray-50 animate-in slide-in-from-top-2 duration-300">
                                    <Input
                                        label="Project Title"
                                        value={proj.title}
                                        onChange={(e) => updateProject(i, 'title', e.target.value)}
                                        placeholder="e.g. AI Content Generator"
                                    />

                                    <div className="mb-4">
                                        <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Tech Stack</label>
                                        <TagInput
                                            tags={Array.isArray(proj.techStack) ? proj.techStack : []}
                                            onUpdate={(tags) => updateProject(i, 'techStack', tags)}
                                            placeholder="React, Firebase..."
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <Input
                                            label="Live URL"
                                            value={proj.liveUrl || ''}
                                            onChange={(e) => updateProject(i, 'liveUrl', e.target.value)}
                                            placeholder="https://..."
                                        />
                                        <Input
                                            label="GitHub URL"
                                            value={proj.githubUrl || ''}
                                            onChange={(e) => updateProject(i, 'githubUrl', e.target.value)}
                                            placeholder="https://github.com/..."
                                        />
                                    </div>

                                    <TextArea
                                        label="Project Description"
                                        maxLength={200}
                                        value={proj.description}
                                        onChange={(e) => updateProject(i, 'description', e.target.value)}
                                        showGuidance={true}
                                        placeholder="Explain what you built and the impact..."
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </section>

                {/* Skills Section */}
                <section>
                    <div className="flex justify-between items-center mb-6">
                        <SectionHeader icon={Code} title="Skills" />
                        <button
                            onClick={handleSuggestSkills}
                            disabled={isSuggesting}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${isSuggesting
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-violet-50 text-violet-600 hover:bg-violet-100'
                                }`}
                        >
                            <Sparkles size={14} className={isSuggesting ? 'animate-spin' : ''} />
                            {isSuggesting ? 'Predicting...' : '✨ Suggest Skills'}
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Technical Skills ({resumeData.skills.technical?.length || 0})</label>
                            </div>
                            <TagInput
                                tags={resumeData.skills.technical || []}
                                onUpdate={(tags) => updateSkills('technical', tags)}
                                placeholder="React, Python, AWS..."
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Soft Skills ({resumeData.skills.soft?.length || 0})</label>
                            </div>
                            <TagInput
                                tags={resumeData.skills.soft || []}
                                onUpdate={(tags) => updateSkills('soft', tags)}
                                placeholder="Teamwork, Leadership..."
                            />
                        </div>

                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tools & Technologies ({resumeData.skills.tools?.length || 0})</label>
                            </div>
                            <TagInput
                                tags={resumeData.skills.tools || []}
                                onUpdate={(tags) => updateSkills('tools', tags)}
                                placeholder="Git, Docker, Figma..."
                            />
                        </div>
                    </div>
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

                {/* Links */}
                <section>
                    <SectionHeader icon={LinkIcon} title="Links" />
                    <div className="grid grid-cols-2 gap-4 px-1">
                        <Input label="GitHub" value={resumeData.links.github} onChange={(e) => updateLinks({ github: e.target.value })} />
                        <Input label="LinkedIn" value={resumeData.links.linkedin} onChange={(e) => updateLinks({ linkedin: e.target.value })} />
                    </div>
                </section>
            </div>

            {/* Right: Preview & Customization panel */}
            <div className="bg-gray-100 p-8 lg:p-12 overflow-y-auto sticky top-16 h-[calc(100vh-64px)] flex flex-col gap-10">
                <div className="mx-auto w-full max-w-[500px] flex flex-col gap-10 animate-in fade-in duration-500">
                    {/* Template Selection */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <SectionHeader icon={LayoutIcon} title="Layout Templates" />
                        <div className="flex flex-wrap justify-between gap-4 mt-4">
                            {templates.map(t => (
                                <TemplateThumbnail
                                    key={t}
                                    name={t}
                                    active={selectedTemplate === t}
                                    onClick={() => setSelectedTemplate(t)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Color Customization */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <SectionHeader icon={Sparkles} title="Color Theme" />
                        <div className="flex gap-4 mt-4">
                            {themes.map(theme => (
                                <button
                                    key={theme.name}
                                    onClick={() => setSelectedColor(theme.value)}
                                    className={`w-10 h-10 rounded-full transition-all flex items-center justify-center p-0.5 border-4 ${selectedColor === theme.value ? 'scale-110 shadow-lg' : 'hover:scale-105 border-transparent'
                                        }`}
                                    style={{ backgroundColor: theme.value, borderColor: selectedColor === theme.value ? 'white' : 'transparent' }}
                                >
                                    {selectedColor === theme.value && <Check size={16} className="text-white" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Resume Sheet Preview */}
                    <div className="w-full flex justify-center">
                        <div className="w-full origin-top scale-[0.5] sm:scale-[0.6] lg:scale-[0.7] xl:scale-[0.8] shadow-2xl transition-all">
                            <ResumeSheet
                                data={resumeData}
                                template={selectedTemplate}
                                accentColor={selectedColor}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Builder;
