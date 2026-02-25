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

const ACTION_VERBS = ['built', 'led', 'designed', 'improved', 'developed', 'created', 'optimized', 'automated', 'managed', 'implemented'];

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
            summary: 'Passionate software developer with 3+ years of experience in building scalable web applications using React and Node.js. Expertise in full-stack development and UI/UX design. Highly skilled in optimizing performance and leading technical teams to success.',
            education: [
                { school: 'KodNest University', degree: 'B.Tech in Computer Science', year: '2019-2023' },
            ],
            experience: [
                { company: 'Tech Solutions', role: 'Frontend Developer', duration: '2023 - Present', description: 'Developed premium web interfaces and optimized performance by 40% using modern frameworks. Led a team of 5 developers to create a scalable architecture.' },
            ],
            projects: [
                {
                    title: 'AI Portfolio Builder',
                    description: 'Built an automated platform for generating developer portfolios with 95% accuracy.',
                    techStack: ['React', 'OpenAI', 'Tailwind'],
                    liveUrl: 'https://portfolio-builder.ai',
                    githubUrl: 'https://github.com/rahul/ai-portfolio'
                },
            ],
            skills: {
                technical: ['React', 'Javascript', 'Node.js', 'PostgreSQL', 'TypeScript'],
                soft: ['Problem Solving', 'Communication', 'Leadership'],
                tools: ['Git', 'Docker', 'AWS', 'Figma']
            },
            links: {
                github: 'https://github.com/rahul-coder',
                linkedin: 'https://linkedin.com/in/rahul-coder',
            },
        };
        setResumeData(SAMPLE_DATA);
    }, []);

    // Deterministic ATS Scoring Logic
    const atsAnalysis = useMemo(() => {
        let score = 0;
        const suggestions = [];

        // 1. Name (+10)
        if (resumeData.personalInfo.name.trim()) {
            score += 10;
        } else {
            suggestions.push({ text: "Add your full name", points: 10 });
        }

        // 2. Email (+10)
        if (resumeData.personalInfo.email.trim()) {
            score += 10;
        } else {
            suggestions.push({ text: "Add your professional email", points: 10 });
        }

        // 3. Summary > 50 chars (+10)
        if (resumeData.summary.length > 50) {
            score += 10;
        } else {
            suggestions.push({ text: "Add a detailed summary (>50 chars)", points: 10 });
        }

        // 4. Experience (+15)
        if (resumeData.experience.length > 0 && resumeData.experience.some(exp => exp.description.trim().length > 20)) {
            score += 15;
        } else {
            suggestions.push({ text: "Add work experience with details", points: 15 });
        }

        // 5. Education (+10)
        if (resumeData.education.length > 0) {
            score += 10;
        } else {
            suggestions.push({ text: "Add your educational background", points: 10 });
        }

        // 6. 5+ Skills (+10)
        const totalSkills = Object.values(resumeData.skills).flat().length;
        if (totalSkills >= 5) {
            score += 10;
        } else {
            suggestions.push({ text: "Add at least 5 skills", points: 10 });
        }

        // 7. 1+ Projects (+10)
        if (resumeData.projects.length > 0) {
            score += 10;
        } else {
            suggestions.push({ text: "Add at least one project", points: 10 });
        }

        // 8. Phone (+5)
        if (resumeData.personalInfo.phone.trim()) {
            score += 5;
        } else {
            suggestions.push({ text: "Add your phone number", points: 5 });
        }

        // 9. LinkedIn (+5)
        if (resumeData.links?.linkedin?.trim()) {
            score += 5;
        } else {
            suggestions.push({ text: "Add your LinkedIn profile", points: 5 });
        }

        // 10. GitHub (+5)
        if (resumeData.links?.github?.trim()) {
            score += 5;
        } else {
            suggestions.push({ text: "Add your GitHub profile", points: 5 });
        }

        // 11. Summary Action Verbs (+10)
        const containsActionVerbs = ACTION_VERBS.some(verb =>
            (resumeData.summary || '').toLowerCase().includes(verb) ||
            (resumeData.experience || []).some(exp => (exp.description || '').toLowerCase().includes(verb))
        );
        if (containsActionVerbs) {
            score += 10;
        } else {
            suggestions.push({ text: "Use action verbs (e.g., Led, Built)", points: 10 });
        }

        return {
            score: Math.min(100, score),
            suggestions: suggestions.slice(0, 4) // Show top 4 suggestions
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
