import { useState, useCallback, useEffect, useMemo } from 'react';

const INITIAL_DATA = {
    personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: '',
    },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: {
        technical: [],
        soft: [],
        tools: []
    },
    links: {
        github: '',
        linkedin: '',
    },
};

const STORAGE_KEY = 'resumeBuilderData_v2';
const TEMPLATE_KEY = 'selectedTemplate';
const COLOR_KEY = 'selectedColor';

const DEFAULT_COLOR = 'hsl(168, 60%, 40%)';

export const useResumeData = () => {
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Simple migration for old skills string structure
                if (typeof parsed.skills === 'string') {
                    parsed.skills = {
                        technical: parsed.skills.split(',').map(s => s.trim()).filter(Boolean),
                        soft: [],
                        tools: []
                    };
                }
                return parsed;
            } catch (e) {
                return INITIAL_DATA;
            }
        }
        return INITIAL_DATA;
    });

    const [selectedTemplate, setSelectedTemplate] = useState(() => {
        return localStorage.getItem(TEMPLATE_KEY) || 'Classic';
    });

    const [selectedColor, setSelectedColor] = useState(() => {
        return localStorage.getItem(COLOR_KEY) || DEFAULT_COLOR;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    }, [resumeData]);

    useEffect(() => {
        localStorage.setItem(TEMPLATE_KEY, selectedTemplate);
    }, [selectedTemplate]);

    useEffect(() => {
        localStorage.setItem(COLOR_KEY, selectedColor);
    }, [selectedColor]);

    const updatePersonalInfo = useCallback((info) => {
        setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...info } }));
    }, []);

    const updateSummary = useCallback((summary) => {
        setResumeData(prev => ({ ...prev, summary }));
    }, []);

    const addEducation = useCallback(() => {
        setResumeData(prev => ({ ...prev, education: [...prev.education, { school: '', degree: '', year: '' }] }));
    }, []);

    const updateEducation = useCallback((index, field, value) => {
        setResumeData(prev => {
            const newEdu = [...prev.education];
            newEdu[index] = { ...newEdu[index], [field]: value };
            return { ...prev, education: newEdu };
        });
    }, []);

    const removeEducation = useCallback((index) => {
        setResumeData(prev => ({ ...prev, education: prev.education.filter((_, i) => i !== index) }));
    }, []);

    const addExperience = useCallback(() => {
        setResumeData(prev => ({ ...prev, experience: [...prev.experience, { company: '', role: '', duration: '', description: '' }] }));
    }, []);

    const updateExperience = useCallback((index, field, value) => {
        setResumeData(prev => {
            const newExp = [...prev.experience];
            newExp[index] = { ...newExp[index], [field]: value };
            return { ...prev, experience: newExp };
        });
    }, []);

    const removeExperience = useCallback((index) => {
        setResumeData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
    }, []);

    const addProject = useCallback(() => {
        setResumeData(prev => ({ ...prev, projects: [...prev.projects, { title: '', description: '', techStack: [], liveUrl: '', githubUrl: '' }] }));
    }, []);

    const updateProject = useCallback((index, field, value) => {
        setResumeData(prev => {
            const newProjects = [...prev.projects];
            newProjects[index] = { ...newProjects[index], [field]: value };
            return { ...prev, projects: newProjects };
        });
    }, []);

    const removeProject = useCallback((index) => {
        setResumeData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
    }, []);

    const updateSkills = useCallback((category, skills) => {
        setResumeData(prev => ({
            ...prev,
            skills: {
                ...prev.skills,
                [category]: Array.isArray(skills) ? skills : []
            }
        }));
    }, []);

    const suggestSkills = useCallback(() => {
        setResumeData(prev => ({
            ...prev,
            skills: {
                technical: Array.from(new Set([...prev.skills.technical, "TypeScript", "React", "Node.js", "PostgreSQL", "GraphQL"])),
                soft: Array.from(new Set([...prev.skills.soft, "Team Leadership", "Problem Solving"])),
                tools: Array.from(new Set([...prev.skills.tools, "Git", "Docker", "AWS"]))
            }
        }));
    }, []);

    const updateLinks = useCallback((links) => {
        setResumeData(prev => ({ ...prev, links: { ...prev.links, ...links } }));
    }, []);

    const loadSampleData = useCallback(() => {
        const SAMPLE_DATA = {
            personalInfo: {
                name: 'Rahul Coder',
                email: 'rahul@example.com',
                phone: '+91 98765 43210',
                location: 'Bangalore, India',
            },
            summary: 'Passionate software developer with 3+ years of experience in building scalable web applications using React and Node.js. Expertise in full-stack development and UI/UX design. Highly skilled in optimizing performance.',
            education: [
                { school: 'KodNest University', degree: 'B.Tech in Computer Science', year: '2019-2023' },
            ],
            experience: [
                { company: 'Tech Solutions', role: 'Frontend Developer', duration: '2023 - Present', description: 'Developing premium web interfaces and optimizing performance by 40% using modern frameworks.' },
            ],
            projects: [
                {
                    title: 'AI Portfolio Builder',
                    description: 'An automated platform for generating developer portfolios with 95% accuracy.',
                    techStack: ['React', 'OpenAI', 'Tailwind'],
                    liveUrl: 'https://portfolio-builder.ai',
                    githubUrl: 'https://github.com/rahul/ai-portfolio'
                },
                {
                    title: 'Task Manager Pro',
                    description: 'A collaborative tool for team project management serving 10k users.',
                    techStack: ['Node.js', 'PostgreSQL', 'Socket.io'],
                    githubUrl: 'https://github.com/rahul/taskpro'
                },
            ],
            skills: {
                technical: ['React', 'Javascript', 'Node.js', 'PostgreSQL'],
                soft: ['Problem Solving', 'Communication'],
                tools: ['Git', 'Docker', 'AWS']
            },
            links: {
                github: 'https://github.com/rahul-coder',
                linkedin: 'https://linkedin.com/in/rahul-coder',
            },
        };
        setResumeData(SAMPLE_DATA);
    }, []);

    // ATS Scoring Logic
    const atsAnalysis = useMemo(() => {
        let score = 20; // Base score
        const suggestions = [];

        // Summary length 40–120 words
        const summaryWords = resumeData.summary.trim().split(/\s+/).filter(w => w.length > 0).length;
        if (summaryWords >= 40 && summaryWords <= 120) {
            score += 15;
        } else {
            suggestions.push("Write a stronger summary (40–120 words).");
        }

        // Projects count >= 2
        if (resumeData.projects.length >= 2) {
            score += 10;
        } else {
            suggestions.push("Add at least 2 projects.");
        }

        // Experience count >= 1
        if (resumeData.experience.length >= 1) {
            score += 10;
        } else {
            suggestions.push("Add at least 1 professional experience entry.");
        }

        // Skills list >= 12 total items across categories
        const totalSkillCount = Object.values(resumeData.skills).flat().length;
        if (totalSkillCount >= 12) {
            score += 15;
        } else {
            suggestions.push("Add more skills across categories (target 12+ total).");
        }

        // Links
        if (resumeData.links.github || resumeData.links.linkedin) {
            score += 10;
        } else {
            suggestions.push("Add GitHub or LinkedIn.");
        }

        // Impact
        const hasNumbers = [...resumeData.experience, ...resumeData.projects].some(item =>
            /\d+|%|\b\d+k\b/i.test(item.description)
        );
        if (hasNumbers) {
            score += 15;
        } else {
            suggestions.push("Add metrics/numbers to descriptions.");
        }

        // Education
        if (resumeData.education.length > 0) score += 5;

        return {
            score: Math.min(100, score),
            suggestions: suggestions.slice(0, 3)
        };
    }, [resumeData]);

    return {
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
        atsScore: atsAnalysis.score,
        suggestions: atsAnalysis.suggestions,
        selectedTemplate,
        setSelectedTemplate,
        selectedColor,
        setSelectedColor
    };
};
